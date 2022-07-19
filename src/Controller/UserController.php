<?php

namespace App\Controller;

use App\Document\User;
use App\Utils\Validator;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    #[Route('/user', name: 'user_create', methods: ['POST'])]
    public function create(UserPasswordHasherInterface $passwordHasher, DocumentManager $dm, Validator $validator): JsonResponse
    {
        $user = new User();
        $user->setEmail('john@doe.fr');

        $plaintextPassword = 'toto';

        $hashedPassword = $passwordHasher->hashPassword($user, $plaintextPassword);
        $user->setPassword($hashedPassword);

        $errors = $validator->getErrors($user);

        if (count($errors) > 0) {
            return $this->json(['errors' => $errors], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $dm->persist($user);
        $dm->flush();

        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path'    => 'src/Controller/UserController.php',
        ]);
    }
}
