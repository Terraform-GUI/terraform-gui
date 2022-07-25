<?php

namespace App\Controller\Api;

use App\Document\Project;
use App\Document\User;
use Doctrine\ODM\MongoDB\DocumentManager;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

#[Route('/api', name: 'api_')]
class ProjectController extends AbstractController
{
    #[Route('/projects', name: 'projects')]
    public function getAll(DocumentManager $dm): JsonResponse
    {
        /** @var User $user */
        $user     = $this->getUser();
        $projects = $dm->getRepository(Project::class)
            ->findBy(['user_id' => $user->getId()]);

        return $this->json([
            'projects' => $projects,
        ]);
    }

    #[Route('/projects/{id}', name: 'project')]
    public function get(string $id, DocumentManager $dm): JsonResponse
    {
        try {
            $project = $dm->getRepository(Project::class)->find($id);

            if (!$project) {
                throw $this->createNotFoundException('This project does not exist!');
            }

            $this->denyAccessUnlessGranted('view', $project);
        } catch (NotFoundHttpException $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (AccessDeniedException $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_UNAUTHORIZED);
        } catch (Exception $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }

        return $this->json([
            'project' => $project,
        ]);
    }
}
