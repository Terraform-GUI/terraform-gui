<?php

namespace App\Document\Embed;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

#[MongoDB\EmbeddedDocument]
class Node
{
    #[MongoDB\Id]
    private string $id;

    #[MongoDB\EmbedOne(targetDocument: NodeData::class)]
    private NodeData $data;

    #[MongoDB\EmbedOne(targetDocument: NodePosition::class)]
    private NodePosition $position;

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
