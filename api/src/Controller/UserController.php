<?php

namespace App\Controller;

use App\Document\EmailUpdateRequest;
use App\Document\User;
use App\Form\UserConfirmEmailType;
use App\Utils\Validator;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/users', name: 'user_')]
class UserController extends AbstractController
{
    #[Route('/confirm', name: 'confirm', methods: ['POST'])]
    public function confirm(Request $request, DocumentManager $dm, Validator $validator): JsonResponse
    {
        $token = $request->query->get('token');

        $data = json_decode($request->getContent(), true);

        $form = $this->createForm(UserConfirmEmailType::class);

        $form->submit(array_merge($data, $request->request->all()));

        if ($form->isSubmitted() && $form->isValid()) {
            $formData = $form->getData();

            $user = $dm->getRepository(User::class)->findOneBy(['token' => $formData['token']]);

            if (!$user) {
                return $this->json(['errors' => ['Invalid token']], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $user->setToken(null);

            $dm->persist($user);
            $dm->flush();

            return $this->json(['success' => true], Response::HTTP_OK);
        }

        $errors = $validator->getErrors($form, false);

        return $this->json(['errors' => $errors], Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    #[Route('/confirm/email', name: 'email_update', methods: ['POST'])]
    public function updateEmail(Request $request, DocumentManager $dm, Validator $validator, MailerInterface $mailer): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $form = $this->createForm(UserConfirmEmailType::class);

        $form->submit(array_merge($data, $request->request->all()));

        if ($form->isSubmitted() && $form->isValid()) {
            $formData = $form->getData();

            $emailUpdateRequest = $dm
                ->getRepository(EmailUpdateRequest::class)
                ->findOneBy(['token' => $formData['token'], 'used' => false])
            ;

            if (null === $emailUpdateRequest) {
                return $this->json(['errors' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
            }

            if ($emailUpdateRequest->getCreatedAt()->diff(new \DateTimeImmutable())->s > (int) $_ENV['EMAIL_UPDATE_RESET_EXPIRATION']) {
                return $this->json(['errors' => 'Token expired'], Response::HTTP_UNAUTHORIZED);
            }

            $user = $dm->getRepository(User::class)->findOneBy(['email' => $emailUpdateRequest->getEmail()]);

            if (null === $user) {
                return $this->json(['errors' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
            }

            $user->setEmail($emailUpdateRequest->getNewEmail());

            $errors = $validator->getErrors($user);

            if (count($errors) > 0) {
                return $this->json(['errors' => $errors], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $emailUpdateRequest->setUsed(true);

            $dm->flush();

            $email = (new Email())
                ->from($_ENV['MAILER_FROM_EMAIL'])
                ->to($user->getEmail())
                ->subject('Your email has been updated')
                ->text('Your email has been updated')
                ->html('<p>Your email has been updated</p>');

            $mailer->send($email);

            return $this->json(['success' => true], Response::HTTP_CREATED);
        }

        $errors = $validator->getErrors($form, false);

        return $this->json(['errors' => $errors], Response::HTTP_UNPROCESSABLE_ENTITY);
    }
}
