<?php

$finder = (new PhpCsFixer\Finder())
    ->in(__DIR__)
    ->exclude('var')
;

return (new PhpCsFixer\Config())
    ->setRules([
        '@Symfony' => true,
        'binary_operator_spaces' => [
            'operators' => [
                '=>' => 'align',
                '=' => 'align_single_space'
                ]
            ]
    ])
    ->setFinder($finder)
;
