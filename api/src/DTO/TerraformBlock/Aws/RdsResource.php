<?php

namespace App\DTO\Aws;

use App\Document\Embed\Node;
use App\Utils\StringManipulator;
use Doctrine\Common\Collections\Collection;

class RdsResource extends AbstractResource
{
    private string $vpcUniqueLabel;

    public function __construct(Node $node, Collection $edgeNodes)
    {
        parent::__construct($node);

        /** @var Node $edgeNode */
        foreach ($edgeNodes as $edgeNode) {
            $typeInfo = explode('_', $edgeNode->getData()->getResource()->getType());
            if ('vpc' == $typeInfo[1]) {
                $vpcLabel = $edgeNode->getData()->getLabel() ?: 'vpc';

                $this->vpcUniqueLabel                = StringManipulator::convertToSnakeCase($vpcLabel).'_'.$edgeNode->getId();
                $this->variables['vpc_unique_label'] = $this->vpcUniqueLabel;
            }
        }

        $this->templates = [
            $this->getUniqueLabel() => 'terraform/aws/resources/aws_rds.txt.twig',
            'variables'             => 'terraform/aws/variables/aws_rds.txt.twig',
            'outputs'               => 'terraform/aws/outputs/aws_rds.txt.twig',
        ];
    }

    public function getDefaultName(): string
    {
        return 'rds';
    }
}
