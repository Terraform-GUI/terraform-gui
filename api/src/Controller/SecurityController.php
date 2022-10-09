<?php

namespace App\Controller;

use App\Document\PasswordRecoveryRequest;
use App\Document\User;
use App\Form\UserPasswordForgetType;
use App\Form\UserPasswordResetType;
use App\Utils\Validator;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

#[Route(name: 'security_')]
class SecurityController extends AbstractController
{
    #[Route('/password/forget', name: 'password_forget', methods: ['POST'])]
    public function forgotPassword(Request $request, DocumentManager $dm, Validator $validator, MailerInterface $mailer): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $form = $this->createForm(UserPasswordForgetType::class);

        $form->submit(array_merge($data, $request->request->all()));

        if ($form->isSubmitted() && $form->isValid()) {
            $formData = $form->getData();

            $user = $dm->getRepository(User::class)->findOneBy(['email' => $formData['email']]);

            if (null === $user) {
                return $this->json(['errors' => ['email' => 'User not found']], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $passwordRecoveryRequest = $dm
                ->getRepository(PasswordRecoveryRequest::class)
                ->findOneBy(
                    ['email' => $formData['email'], 'used' => false],
                    ['createdAt' => 'desc']
                )
            ;

            if (null === $passwordRecoveryRequest) {
                $passwordRecoveryRequest = new PasswordRecoveryRequest();
                $passwordRecoveryRequest->setEmail($formData['email']);
                $passwordRecoveryRequest->setToken(bin2hex(random_bytes(32)));
                $dm->persist($passwordRecoveryRequest);
            } else {
                $passwordRecoveryRequest->setToken(bin2hex(random_bytes(32)));
                $passwordRecoveryRequest->setCreatedAt(new \DateTimeImmutable());
            }

            $dm->flush();

            $email = (new Email())
                ->from($_ENV['MAILER_FROM_EMAIL'])
                ->to($user->getEmail())
                ->subject('Reset your password')
                ->text('Reset your password')
                ->html('<p>Reset your password</p> <a href="'.$_ENV['FRONT_URL'].'/password/reset?token='.$passwordRecoveryRequest->getToken().'">Reset your password</a>');

            $mailer->send($email);

            return $this->json(['success' => true], Response::HTTP_CREATED);
        }

        return $this->json(['errors' => $validator->getErrors($form)], Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    #[Route('/password/reset', name: 'password_reset', methods: ['POST'])]
    public function resetPassword(Request $request, DocumentManager $dm, Validator $validator, MailerInterface $mailer, UserPasswordHasherInterface $passwordHasher): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $form = $this->createForm(UserPasswordResetType::class);

        $form->submit(array_merge($data, $request->request->all()));

        if ($form->isSubmitted() && $form->isValid()) {
            $formData = $form->getData();

            $passwordRecoveryRequest = $dm
                ->getRepository(PasswordRecoveryRequest::class)
                ->findOneBy(
                    ['token' => $formData['token'], 'used' => false],
                    ['createdAt' => 'desc']
                )
            ;

            if (null === $passwordRecoveryRequest) {
                return $this->json(['errors' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
            }

            if ($passwordRecoveryRequest->getCreatedAt()->diff(new \DateTimeImmutable())->s > (int) $_ENV['PASSWORD_RESET_EXPIRATION']) {
                return $this->json(['errors' => 'Token expired'], Response::HTTP_UNAUTHORIZED);
            }

            $user = $dm->getRepository(User::class)->findOneBy(['email' => $passwordRecoveryRequest->getEmail()]);

            if (null === $user) {
                return $this->json(['errors' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
            }

            $plaintextPassword = $formData['password'];

            $hashedPassword = $passwordHasher->hashPassword($user, $plaintextPassword);
            $user->setPassword($hashedPassword);

            $errors = $validator->getErrors($user);

            if (count($errors) > 0) {
                return $this->json(['errors' => $errors], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $passwordRecoveryRequest->setUsed(true);

            $dm->flush();

            $email = (new Email())
                ->from($_ENV['MAILER_FROM_EMAIL'])
                ->to($user->getEmail())
                ->subject('Your password has been changed')
                ->text('Your password has been changed')
                ->html('<p>Your password has been changed</p>');

            $mailer->send($email);

            return $this->json(['success' => true], Response::HTTP_CREATED);
        }

        $errors = $validator->getErrors($form, false);

        return $this->json(['errors' => $errors], Response::HTTP_UNPROCESSABLE_ENTITY);
    }
}
