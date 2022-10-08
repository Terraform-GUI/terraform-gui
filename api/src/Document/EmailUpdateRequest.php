<?php

namespace App\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Symfony\Component\Validator\Constraints as Assert;

#[MongoDB\Document(collection: 'email_update_requests')]
class EmailUpdateRequest
{
    #[MongoDB\Id]
    protected string $id;

    #[Assert\NotBlank]
    #[Assert\Email]
    #[MongoDB\Field(type: 'string')]
    protected ?string $email = null;

    #[Assert\NotBlank]
    #[Assert\Email]
    #[MongoDB\Field(type: 'string')]
    protected ?string $newEmail = null;

    #[Assert\NotBlank]
    #[MongoDB\Field(type: 'string')]
    protected ?string $token = null;

    #[Assert\NotBlank]
    #[MongoDB\Field(type: 'date_immutable')]
    protected ?\DateTimeImmutable $createdAt = null;

    #[Assert\NotBlank]
    #[MongoDB\Field(type: 'boolean')]
    protected $used = false;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): void
    {
        $this->email = $email;
    }

    public function getNewEmail(): ?string
    {
        return $this->newEmail;
    }

    public function setNewEmail(?string $newEmail): void
    {
        $this->newEmail = $newEmail;
    }

    public function getToken(): ?string
    {
        return $this->token;
    }

    public function setToken(?string $token): void
    {
        $this->token = $token;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(?\DateTimeImmutable $createdAt): void
    {
        $this->createdAt = $createdAt;
    }

    public function isUsed(): bool
    {
        return $this->used;
    }

    public function setUsed(bool $used): void
    {
        $this->used = $used;
    }
}
