<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints as Assert;

class VariableType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name', TextType::class,
                [
                    'constraints' => [
                        new Assert\NotBlank(),
                        new Assert\Length([
                            'min' => 2,
                            'max' => 30,
                            'minMessage' => "Your variable name must be at least {{ limit }} characters long",
                            'maxMessage' => "Your variable name cannot be longer than {{ limit }} characters"
                        ]),
                    ],
                ]
            )
            ->add('data', TextType::class, [
                'constraints'     => [
                    new Assert\NotBlank(),
                    new Assert\Json(),
                    // @TODO: ^ add payload specifications for Assert\Json() ?
                ],
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'csrf_protection' => false,
        ]);
    }
}
