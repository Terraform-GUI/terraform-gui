<?php

namespace App\Controller;

use App\Client\Github;
use App\Document\EmailUpdateRequest;
use App\Document\User;
use App\Form\UserRegistrationType;
use App\Form\UserUpdateEmailType;
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
            ->subject('Welcome to Terraform GUI')
            ->text('Welcome to Terraform GUI!')
            ->html('<p>Welcome to Terraform GUI!</p>');

            $mailer->send($email);

            return $this->json(['success' => true], Response::HTTP_CREATED);
        }

        $errors = $validator->getErrors($form, false);

        return $this->json(['errors' => $errors], Response::HTTP_UNPROCESSABLE_ENTITY);
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

    #[Route('/users/{user_id}/email-update', name: 'email_update', methods: ['POST'])]
    public function updateEmail(Request $request, DocumentManager $dm, Validator $validator, MailerInterface $mailer): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $form = $this->createForm(UserUpdateEmailType::class);

        $form->submit(array_merge($data, $request->request->all()));

        if ($form->isSubmitted() && $form->isValid()) {
            $formData = $form->getData();

            $emailUpdateRequest = $dm
                ->getRepository(EmailUpdateRequest::class)
                ->findOneBy(
                    ['token' => $formData['token'], 'used' => false],
                    ['createdAt' => 'desc']
                )
            ;

            if (null === $emailUpdateRequest) {
                return $this->json(['errors' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
            }

            if ($emailUpdateRequest->getCreatedAt()->diff(new \DateTimeImmutable())->s > (int) $_ENV['PASSWORD_RESET_EXPIRATION']) {
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
