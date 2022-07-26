<?php

namespace App\Document\Embed;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Symfony\Component\Validator\Constraints as Assert;

#[MongoDB\EmbeddedDocument]
class Node
{
    #[MongoDB\Field(type: 'string')]
    #[Assert\NotBlank]
    private string $id; // Unique identifier used by nodes for react flow

    #[MongoDB\EmbedOne(targetDocument: NodeData::class)]
    private NodeData $data;

    #[MongoDB\EmbedOne(targetDocument: NodePosition::class)]
    private NodePosition $position;

    public function getId(): string
    {
        return $this->id;
    }

    public function setId(string $id): void
    {
        $this->id = $id;
    }

    public function getData(): NodeData
    {
        return $this->data;
    }

    public function setData(NodeData $data): void
    {
        $this->data = $data;
    }

    public function getPosition(): NodePosition
    {
        return $this->position;
    }

    public function setPosition(NodePosition $position): void
    {
        $this->position = $position;
    }
}
