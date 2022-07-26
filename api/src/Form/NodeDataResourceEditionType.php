<?php

namespace App\Form;

use App\Document\Embed\NodeDataResource;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class NodeDataResourceEditionType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('type', TextType::class)
            ->add('description', TextType::class)
            ->add('arguments', CollectionType::class, [
                'entry_type'    => NodeDataResourceArgumentEditionType::class,
                'entry_options' => ['label'=> false],
                'allow_add'     => true,
                'allow_delete'  => true,
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class'      => NodeDataResource::class,
            'csrf_protection' => false,
        ]);
    }
}
