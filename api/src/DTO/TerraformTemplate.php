<?php

namespace App\DTO;

class TerraformTemplate
{
    private string $content;
    private string $filename;

    public function __construct(string $content, string $filename)
    {
        $this->content  = $content;
        $this->filename = $filename;
    }

    public function getContent(): string
    {
        return $this->content;
    }

    public function getFilename(): string
    {
        return $this->filename;
    }
}
