<?php

namespace App\Factory;

use App\DTO\TerraformTemplate;
use Twig\Environment;

class TerraformTemplateFactory
{
    private Environment $twig;

    public function __construct(Environment $twig)
    {
        $this->twig = $twig;
    }

    public function createTerraformTemplate(string $templateName, string $filename, array $variables = []): TerraformTemplate
    {
        $content = $this->renderTemplate($templateName, [
            'variables' => $variables,
        ]);

        return new TerraformTemplate($content, $filename.'.tf');
    }

    protected function renderTemplate($templateName, $context = []): ?string
    {
        if (!$this->twig->getLoader()->exists($templateName)) {
            return null;
        }

        return $this->twig->render($templateName, $context);
    }
}
