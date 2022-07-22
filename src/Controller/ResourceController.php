<?php

namespace App\Controller;

use App\Document\Resource;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class ResourceController extends AbstractController
{
    #[Route('/resources/aws', name: 'get_all_resources', methods: ['GET'])]
    public function getAllResources(DocumentManager $documentManager): JsonResponse
    {
        $resources = $documentManager->getRepository(Resource::class)->findBy(['provider' => Resource::PROVIDER_AWS]);

        return $this->json($resources);
    }
}
