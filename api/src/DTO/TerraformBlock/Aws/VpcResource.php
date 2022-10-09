<?php

namespace App\DTO\Aws;

use App\Document\Embed\Node;

class VpcResource extends AbstractResource
{
    public function __construct(Node $node)
    {
        parent::__construct($node);

        $this->templates = [
            $this->getUniqueLabel() => 'terraform/aws/resources/aws_vpc.txt.twig',
            'variables'             => 'terraform/aws/variables/aws_vpc.txt.twig',
            'outputs'               => 'terraform/aws/outputs/aws_vpc.txt.twig',
        ];
    }

    public function getDefaultName(): string
    {
        return 'vpc';
    }
}
