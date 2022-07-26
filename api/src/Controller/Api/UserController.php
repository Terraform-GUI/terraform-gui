<?php

namespace App\Controller\Api;

use App\Document\EmailUpdateRequest;
use App\Document\PasswordRecoveryRequest;
use App\Document\User;
use App\Form\UserUpdateEmailType;
use App\Utils\Validator;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api', name: 'api_user_')]
class UserController extends AbstractController
{
    #[Route('/users/{user_id}/request-email-update', name: 'request_update_email', methods: ['POST'])]
    public function requestEmailUpdate(Request $request, DocumentManager $dm, Validator $validator, MailerInterface $mailer): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $form = $this->createForm(UserUpdateEmailType::class);

        $form->submit(array_merge($data, $request->request->all()));

        if ($form->isSubmitted() && $form->isValid()) {
            $formData = $form->getData();

            $user = $dm->getRepository(User::class)->findOneBy(['email' => $formData['email']]);

            if (null === $user) {
                return $this->json(['errors' => ['email' => 'User not found']], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $emailUpdateRequest = $dm
                ->getRepository(EmailUpdateRequest::class)
                ->findOneBy(
                    ['email' => $formData['email'], 'used' => false],
                    ['createdAt' => 'desc']
                )
            ;

            if (null === $emailUpdateRequest) {
                $emailUpdateRequest = new EmailUpdateRequest();
                $emailUpdateRequest->setEmail($formData['email']);
                $emailUpdateRequest->setNewEmail($formData['new_email']);
                $emailUpdateRequest->setToken(bin2hex(random_bytes(32)));
                $dm->persist($emailUpdateRequest);
            } else {
                $emailUpdateRequest->setNewEmail($formData['new_email']);
                $emailUpdateRequest->setToken(bin2hex(random_bytes(32)));
                $emailUpdateRequest->setCreatedAt(new \DateTimeImmutable());
            }

            $dm->flush();

            $email = (new Email())
                ->from($_ENV['MAILER_FROM_EMAIL'])
                ->to($emailUpdateRequest->getNewEmail())
                ->subject('Verify your email address')
                ->text('Verify your email address')
                ->html('<p>You have requested an email update. Please click the following link to confirm your new email address.</p> <a href="'.$_ENV['FRONT_URL'].'users/'.$user->getId().'/email-update?token='.$emailUpdateRequest->getToken().'">Confirm your email</a>');

            $mailer->send($email);

            return $this->json(['success' => true], Response::HTTP_CREATED);
        }

        return $this->json(['errors' => $validator->getErrors($form)], Response::HTTP_UNPROCESSABLE_ENTITY);
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
