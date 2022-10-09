<?php

namespace App\Service;

use App\Document\Project;
use App\DTO\TerraformBlock\ProviderBase;
use App\DTO\TerraformBlock\TerraformBlockInterface;
use App\Factory\TerraformBlockFactory;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Criteria;
use ZipArchive;

class TerraformService
{
    private TerraformTemplatesRenderer $renderer;
    private TerraformBlockFactory $factory;

    private array $providers = [];
    private ArrayCollection $terraformBlocks;

    public function __construct(TerraformBlockFactory $factory, TerraformTemplatesRenderer $renderer)
    {
        $this->renderer = $renderer;
        $this->factory  = $factory;

        $this->terraformBlocks = new ArrayCollection();
    }

    public function loadProject(Project $project)
    {
        $nodes = $project->getNodes();
        $edges = $project->getEdges();

        foreach ($project->getNodes() as $node) {
            $provider = $node->getData()->getResource()->getProvider();
            if (!in_array($provider, $this->providers)) {
                $this->providers[] = $provider;
            }

            $edgeNodes = $nodes->filter(function ($nodeElement) use ($edges) {
                return $edges->exists(function ($key, $value) use ($nodeElement) {
                    return $value->getTarget() == $nodeElement->getId();
                });
            });

            $this->terraformBlocks->add($this->factory->createTerraformBlock($node, $edgeNodes));
        }

        $terraformProviderBlock = new ProviderBase($this->providers, $project->getName());
        $this->terraformBlocks->add($terraformProviderBlock);
        $this->sortTerraformBlockByPriority();
    }

    public function createTerraformArchive($zipName = ''): ZipArchive
    {
        /** @var TerraformBlockInterface $terraformBlock */
        foreach ($this->terraformBlocks as $terraformBlock) {
            $this->renderer->loadTerraformBlock($terraformBlock);
        }

        return $this->renderer->getTerraformTemplatesArchive($zipName);
    }

    public function renderTerraform(): string
    {
        /** @var TerraformBlockInterface $terraformBlock */
        foreach ($this->terraformBlocks as $terraformBlock) {
            $this->renderer->loadTerraformBlock($terraformBlock);
        }

        return $this->renderer->getTerraformTemplatesContent();
    }

    private function sortTerraformBlockByPriority(): void
    {
        $orderBy = Criteria::create()->orderBy([
            'priority'     => Criteria::ASC,
            'unique_label' => Criteria::ASC,
        ]);

        $terraformBlock        = $this->terraformBlocks->matching($orderBy)->toArray();
        $this->terraformBlocks = new ArrayCollection($terraformBlock);
    }
}
