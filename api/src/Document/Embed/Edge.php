<?php

namespace App\Document\Embed;

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
    private ?string $sourceHandle;

    #[MongoDB\Field(type: 'string')]
    #[Assert\NotBlank]
    private string $target; // Unique node identifier for react flow

    #[MongoDB\Field(type: 'string')]
    private ?string $targetHandle;

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

    public function getSourceHandle(): ?string
    {
        return $this->sourceHandle;
    }

    public function setSourceHandle(?string $sourceHandle): void
    {
        $this->sourceHandle = $sourceHandle;
    }

    public function getTarget(): string
    {
        return $this->target;
    }

    public function setTarget(string $target): void
    {
        $this->target = $target;
    }

    public function getTargetHandle(): ?string
    {
        return $this->targetHandle;
    }

    public function setTargetHandle(?string $targetHandle): void
    {
        $this->targetHandle = $targetHandle;
    }
}
