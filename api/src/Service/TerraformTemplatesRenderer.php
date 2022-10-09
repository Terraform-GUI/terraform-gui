<?php

namespace App\Service;

use App\DTO\TerraformBlock\TerraformBlockInterface;
use App\DTO\TerraformTemplate;
use App\Factory\TerraformTemplateFactory;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use ZipArchive;

class TerraformTemplatesRenderer
{
    private TerraformTemplateFactory $factory;
    private Collection $terraformTemplates;

    public function __construct(TerraformTemplateFactory $factory)
    {
        $this->factory            = $factory;
        $this->terraformTemplates = new ArrayCollection();
    }

    public function loadTerraformBlock(TerraformBlockInterface $terraformBlock)
    {
        foreach ($terraformBlock->getTemplates() as $filename => $templateName) {
            $terraformTemplate = $this->factory->createTerraformTemplate(
                $templateName,
                $filename,
                $terraformBlock->getVariables()
            );

            $this->terraformTemplates->add($terraformTemplate);
        }
    }

    public function getTerraformTemplatesArchive($zipName = 'my_project.zip'): ZipArchive
    {
        $zip          = new ZipArchive();
        $filesContent = [];

        /** @var TerraformTemplate $terraformTemplate */
        foreach ($this->terraformTemplates as $terraformTemplate) {
            if (!array_key_exists($terraformTemplate->getFilename(), $filesContent)) {
                $filesContent[$terraformTemplate->getFilename()] = '';
            }

            $filesContent[$terraformTemplate->getFilename()] .= $terraformTemplate->getContent()."\n";
        }

        if (file_exists($zipName)) {
            unlink($zipName);
        }

        $zip->open($zipName, ZipArchive::CREATE);
        foreach ($filesContent as $name => $content) {
            $zip->addFromString($name, $content);
        }
        $zip->close();

        return $zip;
    }

    public function getTerraformTemplatesContent(): string
    {
        $content = '';

        /** @var TerraformTemplate $terraformTemplate */
        foreach ($this->terraformTemplates as $terraformTemplate) {
            $content .= $terraformTemplate->getContent()."\n";
        }

        return $content;
    }
}
