<?php

namespace App\Controller;

use App\Client\Github;
use App\Document\User;
use App\Form\UserRegistrationType;
use App\Utils\Validator;
use Doctrine\ODM\MongoDB\DocumentManager;
use Lexik\Bundle\JWTAuthenticationBundle\Security\Http\Authentication\AuthenticationSuccessHandler;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

#[Route(name: 'user_')]
class UserController extends AbstractController
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

    #[Route('/user/confirm', name: 'confirm', methods: ['GET'])]
    public function confirm(Request $request, DocumentManager $dm): JsonResponse
    {
        $token = $request->query->get('token');

        $user = $dm->getRepository(User::class)->findOneBy(['token' => $token]);

        if (!$user) {
            return $this->json(['errors' => ['Invalid token']], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $user->setToken(null);

        $dm->persist($user);
        $dm->flush();

        return $this->json(['success' => true], Response::HTTP_OK);
    }

    #[Route('/login/github', name: 'login_github', methods: ['GET'])]
    public function loginViaGithub(Github $github): JsonResponse
    {
        $state = $github->createState();

        return $this->json(['url' => $github->getOauthUrl($state)]);
    }

    #[Route('/login/github/callback', name: 'login_github_callback', methods: ['GET'])]
    public function loginViaGithubCallback(Request $request, Github $github, AuthenticationSuccessHandler $authenticationSuccessHandler, DocumentManager $dm, Validator $validator): RedirectResponse
    {
        // check if query parameter exist
        if ($request->query->has('error')) {
            return $this->redirect($_ENV['FRONT_URL'].'/login?'.http_build_query(['error' => true]));
        }

        $code  = $request->query->get('code', null);
        $state = $request->query->get('state', null);

        if (null === $state || null === $code) {
            return $this->redirect($_ENV['FRONT_URL'].'/login?'.http_build_query(['error' => true]));
        }

        $host = $request->getHost();

        if (!$github->verifyState($state, $host)) {
            return $this->redirect($_ENV['FRONT_URL'].'/login?'.http_build_query(['error' => true]));
        }

        $accessToken = $github->getAccessToken($code);

        if (null === $accessToken) {
            return $this->redirect($_ENV['FRONT_URL'].'/login?'.http_build_query(['error' => true]));
        }

        $email = $github->getEmail($accessToken);

        if (null === $email) {
            return $this->redirect($_ENV['FRONT_URL'].'/login?'.http_build_query(['error' => true]));
        }

        $user = $dm->getRepository(User::class)->findOneBy(['email' => $email]);

        if (!$user) {
            $user = new User();
            $user->setEmail($email);
            $user->setViaGithub(true);

            $errors = $validator->getErrors($user);

            if (count($errors) > 0) {
                return $this->redirect($_ENV['FRONT_URL'].'/login?'.http_build_query(['error' => true]));
            }

            $dm->persist($user);
            $dm->flush();
        }

        $tokens = $authenticationSuccessHandler->handleAuthenticationSuccess($user)->getContent();

        $tokens = json_decode($tokens, true);

        return $this->redirect($_ENV['FRONT_URL'].'?'.http_build_query($tokens));
    }
}
