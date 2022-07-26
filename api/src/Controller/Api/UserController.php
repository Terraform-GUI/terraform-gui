<?php

namespace App\Controller\Api;

use App\Document\PasswordRecoveryRequest;
use App\Document\User;
use App\Form\UserUpdateEmailType;
use App\Utils\Validator;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api', name: 'api_user_')]
class UserController extends AbstractController
{
    #[Route('/users/{user_id}', name: 'update_email', methods: ['PUT'])]
    public function updateEmail(Request $request, DocumentManager $dm, Validator $validator, $user_id): JsonResponse
    {
        $user = $dm->getRepository(User::class)->find($user_id);
        if (!$user) {
            return $this->json(['error' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);
        $form = $this->createForm(UserUpdateEmailType::class);
        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            $formData = $form->getData();

            $user->setEmail($formData['email']);

            $errors = $validator->getErrors($user);

            if (count($errors) > 0) {
                return $this->json(['errors' => $errors], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $dm->flush();

            return $this->json(['success' => true], Response::HTTP_OK);
        }

        $errors = $validator->getErrors($form, false);

        return $this->json(['errors' => $errors], Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    #[Route('/users/{user_id}', name: 'delete_user', methods: ['DELETE'])]
    public function delete(DocumentManager $dm, $user_id): JsonResponse
    {
        $user = $dm->getRepository(User::class)->find($user_id);
        if (!$user) {
            return $this->json(['error' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        $qb = $dm->createQueryBuilder(PasswordRecoveryRequest::class);
        $qb->remove()
            ->field('email')->equals($user->getEmail())
            ->getQuery()
            ->execute();

        $dm->remove($user);
        $dm->flush();

        return $this->json(['success' => true], Response::HTTP_OK);
    }
}
