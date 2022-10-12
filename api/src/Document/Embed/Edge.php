<?php

namespace App\Document\Embed;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Symfony\Component\Validator\Constraints as Assert;

#[MongoDB\EmbeddedDocument]
class Edge
{
    #[MongoDB\Field(type: 'string')]
    #[Assert\NotBlank]
    private string $id; // Unique edge identifier (combination of two nodes identifier) for react flow

    #[MongoDB\Field(type: 'string')]
    #[Assert\NotBlank]
    private string $source; // Unique node identifier for react flow

    #[MongoDB\Field(type: 'string')]
    #[Assert\NotBlank]
    private string $target; // Unique node identifier for react flow

    public function getId(): string
    {
        return $this->id;
    }

    public function setId(string $id): void
    {
        $this->id = $id;
    }

    public function getSource(): string
    {
        return $this->source;
    }

    public function setSource(string $source): void
    {
        $this->source = $source;
    }

    public function getTarget(): string
    {
        return $this->target;
    }

    public function setTarget(string $target): void
    {
        $this->target = $target;
    }

    /**
     * @param ArrayCollection<Node> $nodes
     */
    public function getTargetNode(Collection $nodes): ?Node
    {
        $targetNodes = $nodes->filter(function ($node) {
            return $this->getTarget() == $node->getId();
        });

        return $targetNodes[0] ?? null;
    }
}
