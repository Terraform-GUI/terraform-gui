<?php

namespace App\Controller;

use App\Document\User;
use App\Form\UserRegistrationType;
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

#[Route(name: 'user_')]
class RegistrationController extends AbstractController
{
    #[Route('/register', name: 'register', methods: ['POST'])]
    public function create(Request $request, UserPasswordHasherInterface $passwordHasher, DocumentManager $dm, Validator $validator, MailerInterface $mailer): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $form = $this->createForm(UserRegistrationType::class);

        $form->submit(array_merge($data, $request->request->all()));

        if ($form->isSubmitted() && $form->isValid()) {
            $formData = $form->getData();

            $user = new User();
            $user->setEmail($formData['email']);

            $plaintextPassword = $formData['password'];

            $hashedPassword = $passwordHasher->hashPassword($user, $plaintextPassword);
            $user->setPassword($hashedPassword);

            $errors = $validator->getErrors($user);

            if (count($errors) > 0) {
                return $this->json(['errors' => $errors], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $dm->persist($user);
            $dm->flush();

            $email = (new Email())
                ->from($_ENV['MAILER_FROM_EMAIL'])
                ->to($user->getEmail())
                ->subject('Confirm your Terraform GUI account')
                ->text('Confirm your Terraform GUI account')
                ->html('<p>Confirm your Terraform GUI account</p> <p>Please click on the following link to confirm your account: <a href="'.$_ENV['FRONT_URL'].'/user/confirm?token='.$user->getToken().'">Confirm my account</a></p>')
            ;

            $mailer->send($email);

            return $this->json(['success' => true], Response::HTTP_CREATED);
        }

        $errors = $validator->getErrors($form, false);

        return $this->json(['errors' => $errors], Response::HTTP_UNPROCESSABLE_ENTITY);
    }
}
