<?php

namespace App\Document\Embed;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Symfony\Component\Validator\Constraints as Assert;

#[MongoDB\EmbeddedDocument]
class NodeDataResource
{
    #[MongoDB\Field(type: 'string')]
    #[Assert\NotNull]
    private ?string $type = null;

    #[MongoDB\Field(type: 'string')]
    private ?string $description = null;

    #[MongoDB\EmbedMany(targetDocument: NodeDataResourceArgument::class)]
    private Collection $arguments;

    public function __construct()
    {
        $this->arguments = new ArrayCollection();
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): void
    {
        $this->type = $type;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): void
    {
        $this->description = $description;
    }

    /**
     * @return Collection<string, NodeDataResourceArgument>
     */
    public function getArguments(): Collection
    {
        return $this->arguments;
    }

    public function addArgument(NodeDataResourceArgument $argument): void
    {
        if (!$this->arguments->contains($argument)) {
            $this->arguments[] = $argument;
        }
    }

    public function removeArgument(Node $argument): void
    {
        $this->arguments->removeElement($argument);
    }

    public function getProvider(): string
    {
        $typeInfo = explode('_', $this->type);

        return $typeInfo[0];
    }
}
