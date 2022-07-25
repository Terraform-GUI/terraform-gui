<?php

namespace App\Controller;

use App\Document\User;
use App\Form\UserRegistrationType;
use App\Form\UserType;
use App\Utils\Validator;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

#[Route(name: 'user_')]
class UserController extends AbstractController
{
    #[Route('/register', name: 'register', methods: ['POST'])]
    public function create(Request $request, UserPasswordHasherInterface $passwordHasher, DocumentManager $dm, Validator $validator): JsonResponse
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

            return $this->json(['success' => true], Response::HTTP_CREATED);
        }

        $errors = $validator->getErrors($form, false);

        return $this->json(['errors' => $errors], Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    #[Route('/users/{user_id}', name: 'update-user', methods: ['PUT'])]
    public function update(Request $request, DocumentManager $dm, Validator $validator, $user_id): JsonResponse
    {
        $user = $dm->getRepository(User::class)->find($user_id);
        if (!$user) {
            return $this->json(['error' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);
        $form = $this->createForm(UserType::class);
        $form->submit($data);
        
        if ($form->isSubmitted() && $form->isValid()) {
            $formData = $form->getData();
        
            $user->setEmail($formData['email']);

            $dm->flush();
        
            return $this->json(['success' => true], Response::HTTP_OK);
        }
        
        $errors = $validator->getErrors($form, false);
        
        return $this->json(['errors' => $errors], Response::HTTP_UNPROCESSABLE_ENTITY);
    }
}
