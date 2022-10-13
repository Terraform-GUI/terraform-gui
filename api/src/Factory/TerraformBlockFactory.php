<?php

namespace App\Factory;

use App\Document\Embed\Node;
use App\DTO\Aws\Ec2Resource;
use App\DTO\Aws\RdsResource;
use App\DTO\Aws\S3Resource;
use App\DTO\Aws\SqsResource;
use App\DTO\Aws\VpcResource;
use App\DTO\TerraformBlock\TerraformBlockInterface;
use Doctrine\Common\Collections\Collection;
use Exception;

class TerraformBlockFactory
{
    public function createTerraformBlock(Node $node, ?Collection $edgeNodes = null): TerraformBlockInterface
    {
        $resource = $node->getData()->getResource();

        return match ($resource->getProvider()) {
            'aws'   => $this->createAwsTerraformBlock($node, $edgeNodes),
            default => throw new Exception('Specified provider isn\'t supported')
        };
    }

    private function createAwsTerraformBlock(Node $node, ?Collection $edgeNodes = null): TerraformBlockInterface
    {
        $resource = $node->getData()->getResource();

        return match ($resource->getType()) {
            'aws_vpc' => new VpcResource($node),
            'aws_ec2' => new Ec2Resource($node, $edgeNodes),
            'aws_rds' => new RdsResource($node, $edgeNodes),
            'aws_sqs' => new SqsResource($node),
            'aws_s3'  => new S3Resource($node),
            default   => throw new Exception('Specified resource isn\'t supported')
        };
    }
}
