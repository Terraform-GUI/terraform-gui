<?php

namespace App\DTO\Aws;

use App\Document\Embed\Node;

class S3Resource extends AbstractResource
{
    public function __construct(Node $node)
    {
        parent::__construct($node);

        $this->templates = [
            $this->getUniqueLabel() => 'terraform/aws/resources/aws_s3.txt.twig',
            'variables'             => 'terraform/aws/variables/aws_s3.txt.twig',
            'outputs'               => 'terraform/aws/outputs/aws_s3.txt.twig',
        ];
    }

    public function getDefaultName(): string
    {
        return 's3';
    }
}
