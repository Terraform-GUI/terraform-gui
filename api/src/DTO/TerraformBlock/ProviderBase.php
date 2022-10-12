<?php

namespace App\DTO\TerraformBlock;

class ProviderBase implements TerraformBlockInterface
{
    private int $priority = 1;

    private array $templates;
    private array $variables;

    public function __construct(array $providers)
    {
        $this->variables = [
            'providers' => $providers,
        ];

        $this->templates = [
            'provider'  => 'terraform/providers.txt.twig',
            'variables' => 'terraform/global_variable.txt.twig',
        ];
    }

    public function getTemplates(): array
    {
        return $this->templates;
    }

    public function getVariables(): array
    {
        return $this->variables;
    }

    public function getPriority(): int
    {
        return $this->priority;
    }
}
