<?php

namespace App\Document\Embed;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Symfony\Component\Validator\Constraints as Assert;

#[MongoDB\EmbeddedDocument]
class NodeData
{
    #[MongoDB\Field(type: 'string')]
    #[Assert\NotBlank]
    private ?string $label = null;

    #[MongoDB\EmbedOne(targetDocument: NodeDataResource::class)]
    private NodeDataResource $resource;

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function setLabel(string $label): void
    {
        $this->label = $label;
    }

    public function getResource(): NodeDataResource
    {
        return $this->resource;
    }

    public function setResource(NodeDataResource $resource): void
    {
        $this->resource = $resource;
    }
}
