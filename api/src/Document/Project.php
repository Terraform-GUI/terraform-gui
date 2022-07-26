<?php

namespace App\Document;

use App\Document\Embed\Node;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Symfony\Component\Validator\Constraints as Assert;

#[MongoDB\Document(collection: 'projects')]
class Project
{
    #[MongoDB\Id]
    protected string $id;

    #[MongoDB\Field(type: 'string')]
    #[Assert\NotNull]
    private string $name;

    #[MongoDB\Field(type: 'string')]
    #[Assert\NotNull]
    private string $userId;

    #[MongoDB\EmbedMany(targetDocument: Node::class)]
    private Collection $nodes;

    public function __construct()
    {
        $this->nodes = new ArrayCollection();
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): void
    {
        $this->name = $name;
    }

    public function getUserId(): string
    {
        return $this->userId;
    }

    public function setUserId(string $userId): void
    {
        $this->userId = $userId;
    }

    /**
     * @return Collection<string, Node>
     */
    public function getNodes(): Collection
    {
        return $this->nodes;
    }

    public function addNode(Node $node): void
    {
        if (!$this->nodes->contains($node)) {
            $this->nodes[] = $node;
        }
    }

    public function removeNode(Node $node): void
    {
        $this->nodes->removeElement($node);
    }
}
