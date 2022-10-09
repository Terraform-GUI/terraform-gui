<?php

namespace App\DTO\TerraformBlock;

interface TerraformBlockInterface
{
    public function getPriority(): int;

    public function getTemplates(): array;

    public function getVariables(): array;
}
