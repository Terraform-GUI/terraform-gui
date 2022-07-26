<?php

namespace App\Document;

use App\Document\Embed\ResourceArgument;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Symfony\Component\Serializer\Annotation\Ignore;

#[MongoDB\Document(collection: 'resource')]
class Resource
{
    public const PROVIDER_AWS = 'aws';

    #[MongoDB\Id]
    #[Ignore]
    protected string $id;

    #[MongoDB\Field(type: 'string')]
    private string $provider;

    #[MongoDB\Field(type: 'string')]
    private string $type;

    #[MongoDB\Field(type: 'string')]
    private string $description;

    #[MongoDB\EmbedMany(targetDocument: ResourceArgument::class)]
    private Collection $arguments;

    public function __construct()
    {
        $this->arguments = new ArrayCollection();
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function getProvider(): string
    {
        return $this->provider;
    }

    public function setProvider(string $provider): self
    {
        $this->provider = $provider;

        return $this;
    }

    public function getType(): string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function addArgument(ResourceArgument $argument): self
    {
        if (!$this->arguments->contains($argument)) {
            $this->arguments[] = $argument;
        }

        return $this;
    }

    public function removeArgument(ResourceArgument $argument): self
    {
        $this->arguments->removeElement($argument);

        return $this;
    }

    public function getArguments(): Collection
    {
        return $this->arguments;
    }
}
