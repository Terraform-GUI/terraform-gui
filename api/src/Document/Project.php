<?php

namespace App\Document;

use App\Document\Embed\Edge;
use App\Document\Embed\Node;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[MongoDB\Document(collection: 'projects')]
class Project
{
    #[MongoDB\Id]
    #[Groups(['get_all_projects'])]
    protected string $id;

    #[MongoDB\Field(type: 'string')]
    #[Assert\NotNull]
    #[Groups(['get_all_projects'])]
    private string $name;

    #[MongoDB\Field(type: 'string')]
    #[Assert\NotNull]
    #[Groups(['get_all_projects'])]
    private string $userId;

    #[MongoDB\EmbedMany(targetDocument: Node::class)]
    private Collection $nodes;

    #[MongoDB\EmbedMany(targetDocument: Edge::class)]
    private Collection $edges;

    public function __construct()
    {
        $this->nodes = new ArrayCollection();
        $this->edges = new ArrayCollection();
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
     * @return Collection<Node>
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

    /**
     * @return Collection<Edge>
     */
    public function getEdges(): Collection
    {
        return $this->edges;
    }

    public function addEdge(Edge $edge): void
    {
        if (!$this->edges->contains($edge)) {
            $this->edges[] = $edge;
        }
    }

    public function removeEdge(Edge $edge): void
    {
        $this->edges->removeElement($edge);
    }
}
