<?php

namespace App\Document\Embed;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Symfony\Component\Validator\Constraints as Assert;

#[MongoDB\EmbeddedDocument]
class NodePosition
{
    #[MongoDB\Field(type: 'float')]
    #[Assert\NotNull]
    private float $x = 0;

    #[MongoDB\Field(type: 'float')]
    #[Assert\NotNull]
    private float $y = 0;

    public function getX(): float
    {
        return $this->x;
    }

    public function setX(float $x): void
    {
        $this->x = $x;
    }

    public function getY(): float
    {
        return $this->y;
    }

    public function setY(float $y): void
    {
        $this->y = $y;
    }
}
