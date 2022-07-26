<?php

namespace App\Controller;

use App\Document\Variable;
use App\Form\VariableType;
use App\Utils\Validator;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api', name: 'api_variables_')]
class VariableController extends AbstractController
{
    #[Route('/projects/{project_id}/variables', name: 'get-variables', methods: ['GET'])]
    public function get(string $project_id, DocumentManager $dm): JsonResponse
    {
        $variables = $dm->getRepository(Variable::class)->findBy(['projectId' => $project_id]);

        return $this->json($variables, Response::HTTP_OK);
    }

    #[Route('/projects/{project_id}/variables', name: 'create-variable', methods: ['POST'])]
    public function create(Request $request, DocumentManager $dm, Validator $validator, $project_id): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $form = $this->createForm(VariableType::class);

        $form->submit(array_merge($data, $request->request->all()));

        if ($form->isSubmitted() && $form->isValid()) {
            $formData = $form->getData();

            $variable = new Variable();
            $variable->setProjectId($project_id);
            $variable->setName($formData['name']);
            $variable->setData($formData['data']);

            $errors = $validator->getErrors($variable);

            if (count($errors) > 0) {
                return $this->json(['errors' => $errors], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $dm->persist($variable);
            $dm->flush();

            return $this->json(['success' => true], Response::HTTP_CREATED);
        }

        $errors = $validator->getErrors($form, false);

        return $this->json(['errors' => $errors], Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    #[Route('/projects/{project_id}/variables/{variable_id}', name: 'update-variable', methods: ['PUT'])]
    public function update(Request $request, DocumentManager $dm, Validator $validator, $project_id, $variable_id): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $variable = $dm->getRepository(Variable::class)->findOneBy(['projectId' => $project_id, 'id' => $variable_id]);
        if (!$variable) {
            return $this->json(['errors' => ['Variable not found']], Response::HTTP_NOT_FOUND);
        }

        $form = $this->createForm(VariableType::class);

        $form->submit(array_merge($data, $request->request->all()));

        if ($form->isSubmitted() && $form->isValid()) {
            $formData = $form->getData();

            $variable->setName($formData['name']);
            $variable->setData($formData['data']);

            $errors = $validator->getErrors($variable);

            if (count($errors) > 0) {
                return $this->json(['errors' => $errors], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $dm->persist($variable);
            $dm->flush();

            return $this->json(['success' => true], Response::HTTP_OK);
        }

        $errors = $validator->getErrors($form, false);

        return $this->json(['errors' => $errors], Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    #[Route('/projects/{project_id}/variables/{variable_id}', name: 'delete-variable', methods: ['DELETE'])]
    public function delete(DocumentManager $dm, $project_id, $variable_id): JsonResponse
    {
        $variable = $dm->getRepository(Variable::class)->findOneBy(['projectId' => $project_id, 'id' => $variable_id]);
        if (!$variable) {
            return $this->json(['errors' => ['Variable not found']], Response::HTTP_NOT_FOUND);
        }

        $dm->remove($variable);
        $dm->flush();

        return $this->json(['success' => true], Response::HTTP_OK);
    }
}
