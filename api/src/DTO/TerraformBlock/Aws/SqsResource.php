<?php

namespace App\DTO\Aws;

use App\Document\Embed\Node;

class SqsResource extends AbstractResource
{
    public function __construct(Node $node)
    {
        parent::__construct($node);

        $this->templates = [
            $this->getUniqueLabel() => 'terraform/aws/resources/aws_sqs.txt.twig',
            'variables'             => 'terraform/aws/variables/aws_sqs.txt.twig',
            'outputs'               => 'terraform/aws/outputs/aws_sqs.txt.twig',
        ];
    }

    public function getDefaultName(): string
    {
        return 'sqs';
    }
}
