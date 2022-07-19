<?php

namespace App\Controller;

use App\Document\Product;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class VictoriousChefController extends AbstractController
{
    #[Route('/victorious/chef', name: 'app_victorious_chef')]
    public function index(DocumentManager $dm): Response
    {
        // dd('ok');

        $product = new Product();
        $product->setName('A Foo Bar');
        $product->setPrice(19.99);

        $dm->persist($product);
        $dm->flush();

        return new Response('Created product id '.$product->getId());
    }
}
