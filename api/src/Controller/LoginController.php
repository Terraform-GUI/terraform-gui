<?php

namespace App\Controller;

use App\Client\Github;
use App\Document\User;
use App\Utils\Validator;
use Doctrine\ODM\MongoDB\DocumentManager;
use Lexik\Bundle\JWTAuthenticationBundle\Security\Http\Authentication\AuthenticationSuccessHandler;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/login', name: 'login_')]
class LoginController extends AbstractController
{
    #[Route('/github', name: 'login_github', methods: ['GET'])]
    public function loginViaGithub(Github $github): JsonResponse
    {
        $state = $github->createState();

        return $this->json(['url' => $github->getOauthUrl($state)]);
    }

    #[Route('/github/callback', name: 'login_github_callback', methods: ['GET'])]
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
