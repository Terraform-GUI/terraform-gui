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

#[Route('/api/users', name: 'api_user_')]
class UserController extends AbstractController
{
    #[Route('/me', name: 'me', methods: ['GET'])]
    public function meAction(Request $request): JsonResponse
    {
        /** @var User $user */
        $user = $this->getUser();

        return $this->json($user->toArray(), Response::HTTP_OK);
    }

    #[Route('/email', name: 'request_update_email', methods: ['PATCH'])]
    public function requestEmailUpdate(Request $request, DocumentManager $dm, Validator $validator, MailerInterface $mailer): JsonResponse
    {
        /** @var User $user */
        $user = $this->getUser();

        $data = json_decode($request->getContent(), true);

        $form = $this->createForm(UserUpdateEmailType::class);

        $form->submit(array_merge($data, $request->request->all()));

        if ($form->isSubmitted() && $form->isValid()) {
            $formData = $form->getData();

            $userWithNewEmail = $dm->getRepository(User::class)->findOneBy(['email' => $formData['email']]);

            if ($userWithNewEmail) {
                return $this->json(['errors' => ['Email already in use']], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $emailUpdateRequest = $dm
                ->getRepository(EmailUpdateRequest::class)
                ->findOneBy(['email' => $formData['email'], 'used' => false])
            ;

            if (null === $emailUpdateRequest) {
                $emailUpdateRequest = new EmailUpdateRequest();
                $emailUpdateRequest->setEmail($user->getEmail());
                $emailUpdateRequest->setNewEmail($formData['email']);
                $emailUpdateRequest->setToken(bin2hex(random_bytes(32)));
                $dm->persist($emailUpdateRequest);
            } else {
                $emailUpdateRequest->setNewEmail($formData['email']);
                $emailUpdateRequest->setToken(bin2hex(random_bytes(32)));
                $emailUpdateRequest->setCreatedAt(new \DateTimeImmutable());
            }

            $dm->flush();

            $route = $_ENV['FRONT_URL'].'?confirm-token='.$emailUpdateRequest->getToken();

            $email = (new Email())
                ->from($_ENV['MAILER_FROM_EMAIL'])
                ->to($emailUpdateRequest->getNewEmail())
                ->subject('Verify your email address')
                ->text('Verify your email address')
                ->html('<p>You have requested an email update. Please click the following link to confirm your new email address.</p> <a href="'.$route.'">Confirm your email</a>');

            $mailer->send($email);

            return $this->json(['success' => true], Response::HTTP_CREATED);
        }

        return $this->json(['errors' => $validator->getErrors($form)], Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    #[Route('/delete', name: 'delete_user', methods: ['DELETE'])]
    public function delete(DocumentManager $dm): JsonResponse
    {
        /** @var User $user */
        $user = $this->getUser();

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
