<?php

namespace App\Document\Embed;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Exception;

#[MongoDB\EmbeddedDocument()]
class ResourceArgument
{
    public const TYPE_STRING = 'string';
    public const TYPE_BOOL   = 'bool';
    public const TYPE_NUMBER = 'number';
    public const TYPE_INT    = 'int';
    public const TYPE_FLOAT  = 'float';
    public const TYPE_SELECT = 'select';

    #[MongoDB\Field(type: 'bool')]
    private bool $required;

    #[MongoDB\Field(type: 'string')]
    private string $type;

    #[MongoDB\Field(type: 'string')]
    private string $name;

    #[MongoDB\Field(type: 'raw')]
    private mixed $defaultValue = null;

    #[MongoDB\Field(type: 'collection')]
    private array $values = [];

    #[MongoDB\Field(type: 'string')]
    private ?string $min = null;

    #[MongoDB\Field(type: 'string')]
    private ?string $max = null;

    public function getRequired(): bool
    {
        return $this->required;
    }

    public function setRequired(bool $required): self
    {
        $this->required = $required;

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

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getDefaultValue(): mixed
    {
        return $this->defaultValue;
    }

    public function setDefaultValue(mixed $defaultValue): self
    {
        $this->defaultValue = $defaultValue;

        return $this;
    }

    public function addValue(mixed $value): self
    {
        $this->values[] = $value;

        return $this;
    }

    public function removeValue(mixed $valueToRemove): self
    {
        foreach ($this->values as $index => $value) {
            if ($value === $valueToRemove) {
                unset($this->values[$index]);
            }
        }

        return $this;
    }

    public function getValues(): array
    {
        return $this->values;
    }

    public function getMin(): ?string
    {
        return $this->min;
    }

    /**
     * @throws Exception
     */
    public function setMin(?string $min): self
    {
        $authorizedTypeWhenSettingMin = [self::TYPE_NUMBER, self::TYPE_FLOAT, self::TYPE_INT, self::TYPE_STRING];
        if (in_array($this->type, $authorizedTypeWhenSettingMin)) {
            $this->min = $min;

            return $this;
        }

        throw new Exception("Can't set App\Document\Embed\ResourceArgument::\$min when App\Document\Embed\ResourceArgument::\$type is not App\Document\Embed\ResourceArgument::TYPE_NUMBER, App\Document\Embed\ResourceArgument::TYPE_FLOAT, App\Document\Embed\ResourceArgument::TYPE_STRING or App\Document\Embed\ResourceArgument::TYPE_INT");
    }

    public function getMax(): ?string
    {
        return $this->max;
    }

    /**
     * @throws Exception
     */
    public function setMax(?string $max): self
    {
        $authorizedTypeWhenSettingMax = [self::TYPE_NUMBER, self::TYPE_FLOAT, self::TYPE_INT, self::TYPE_STRING];
        if (in_array($this->type, $authorizedTypeWhenSettingMax)) {
            $this->max = $max;

            return $this;
        }

        throw new Exception("Can't set App\Document\Embed\ResourceArgument::\$max when App\Document\Embed\ResourceArgument::\$type is not App\Document\Embed\ResourceArgument::TYPE_NUMBER, App\Document\Embed\ResourceArgument::TYPE_FLOAT, App\Document\Embed\ResourceArgument::TYPE_STRING or App\Document\Embed\ResourceArgument::TYPE_INT");
    }
}
