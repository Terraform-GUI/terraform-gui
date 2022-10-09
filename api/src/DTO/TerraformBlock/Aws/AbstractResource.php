<?php

namespace App\DTO\Aws;

use App\Document\Embed\Node;
use App\DTO\TerraformBlock\TerraformBlockInterface;
use App\Utils\StringManipulator;

abstract class AbstractResource implements TerraformBlockInterface
{
    private string $uniqueLabel;
    private int $priority = 2;

    protected array $variables = [];
    protected array $templates = [];

    public function __construct(Node $node)
    {
        $label             = $node->getData()->getLabel() ?: $this->getDefaultName();
        $this->uniqueLabel = StringManipulator::convertToSnakeCase($label).'_'.$node->getId();

        foreach ($node->getData()->getResource()->getArguments() as $argument) {
            $this->variables[$argument->getName()] = $argument->getValue();
        }
        $this->variables['unique_label'] = $this->uniqueLabel;
    }

    public function getUniqueLabel(): string
    {
        return $this->uniqueLabel;
    }

    public function getPriority(): int
    {
        return $this->priority;
    }

    public function getVariables(): array
    {
        return $this->variables;
    }

    public function getTemplates(): array
    {
        return $this->templates;
    }

    abstract protected function getDefaultName(): string;
}
