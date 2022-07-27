<?php

namespace App\Controller\Api;

use App\Document\Project;
use App\Document\User;
use App\Form\ProjectEditionType;
use App\Utils\Validator;
use Doctrine\ODM\MongoDB\DocumentManager;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

#[Route('/api', name: 'api_')]
class ProjectController extends AbstractController
{
    #[Route('/projects', name: 'get_all_projects', methods: 'GET')]
    public function getAll(DocumentManager $dm): JsonResponse
    {
        /** @var User $user */
        $user     = $this->getUser();
        $projects = $dm->getRepository(Project::class)
            ->findBy(['userId' => $user->getId()]);

        return $this->json([
            'projects' => $projects,
        ]);
    }

    #[Route('/projects/{id}', name: 'get_project', methods: 'GET')]
    public function get(string $id, DocumentManager $dm): JsonResponse
    {
        try {
            $project = $dm->getRepository(Project::class)->find($id);

            if (!$project) {
                throw $this->createNotFoundException('This project does not exist!');
            }

            $this->denyAccessUnlessGranted(ProjectVoter::VIEW, $project);
        } catch (NotFoundHttpException $e) {
            return $this->json(['errors' => [$e->getMessage()]], Response::HTTP_NOT_FOUND);
        } catch (AccessDeniedException $e) {
            return $this->json(['errors' => [$e->getMessage()]], Response::HTTP_UNAUTHORIZED);
        } catch (Exception $e) {
            return $this->json(['errors' => [$e->getMessage()]], Response::HTTP_BAD_REQUEST);
        }

        return $this->json([
            'project' => $project,
        ]);
    }

    #[Route('/projects', name: 'create_project', methods: 'POST')]
    public function create(Request $request, DocumentManager $dm, Validator $validator): JsonResponse
    {
        /** @var User $user */
        $user     = $this->getUser();
        $project  = new Project();

        $project->setUserId($user->getId());
        $form = $this->createForm(ProjectEditionType::class, $project);

        $data = json_decode($request->getContent(), true);
        $form->submit(array_merge($data, $request->request->all()));

        if ($form->isSubmitted() && $form->isValid()) {
            $errors = $validator->getErrors($project);
            if (count($errors) > 0) {
                return $this->json(['errors' => $errors], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            try {
                $dm->persist($project);
                $dm->flush();
            } catch (Exception $e) {
                return $this->json(['errors' => [$e->getMessage()]], Response::HTTP_BAD_REQUEST);
            }

            return $this->json(['project' => $project], Response::HTTP_CREATED);
        }

        $errors = $validator->getErrors($form, false);

        return $this->json(['errors' => $errors], Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    #[Route('/projects/{id}', name: 'update_project', methods: 'PUT')]
    public function update(string $id, Request $request, DocumentManager $dm, Validator $validator): JsonResponse
    {
        try {
            $project = $dm->getRepository(Project::class)->find($id);

            if (!$project) {
                throw $this->createNotFoundException('This project does not exist!');
            }

            $this->denyAccessUnlessGranted('edit', $project);

            $form = $this->createForm(ProjectEditionType::class, $project);

            $data = json_decode($request->getContent(), true);
            $form->submit(array_merge($data, $request->request->all()));

            if ($form->isSubmitted() && $form->isValid()) {
                $errors = $validator->getErrors($project);
                if (count($errors) > 0) {
                    return $this->json(['errors' => $errors], Response::HTTP_UNPROCESSABLE_ENTITY);
                }

                $dm->persist($project);
                $dm->flush();

                return $this->json(['project' => $project], Response::HTTP_OK);
            }

            $errors = $validator->getErrors($form, false);

            return $this->json(['errors' => $errors], Response::HTTP_UNPROCESSABLE_ENTITY);
        } catch (NotFoundHttpException $e) {
            return $this->json(['errors' => [$e->getMessage()]], Response::HTTP_NOT_FOUND);
        } catch (AccessDeniedException $e) {
            return $this->json(['errors' => [$e->getMessage()]], Response::HTTP_UNAUTHORIZED);
        } catch (Exception $e) {
            return $this->json(['errors' => [$e->getMessage()]], Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('/projects/{id}', name: 'delete_project', methods: 'DELETE')]
    public function delete(string $id, DocumentManager $dm): JsonResponse
    {
        try {
            $project = $dm->getRepository(Project::class)->find($id);

            if (!$project) {
                throw $this->createNotFoundException('This project does not exist!');
            }

            $this->denyAccessUnlessGranted(ProjectVoter::EDIT, $project);

            $dm->remove($project);
            $dm->flush();

            return $this->json(['success' => true], Response::HTTP_OK);
        } catch (NotFoundHttpException $e) {
            return $this->json(['errors' => [$e->getMessage()]], Response::HTTP_NOT_FOUND);
        } catch (AccessDeniedException $e) {
            return $this->json(['errors' => [$e->getMessage()]], Response::HTTP_UNAUTHORIZED);
        } catch (Exception $e) {
            return $this->json(['errors' => [$e->getMessage()]], Response::HTTP_BAD_REQUEST);
        }
    }
}
