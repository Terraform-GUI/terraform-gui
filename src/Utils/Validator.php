<?php

namespace App\Utils;

use Symfony\Component\Validator\Validator\ValidatorInterface;

class Validator
{
    public function __construct(protected ValidatorInterface $validator)
    {
    }

    public function getErrors($entity): array
    {
        $errors = $this->validator->validate($entity);

        $messages = [];

        if (count($errors) > 0) {
            foreach ($errors as $violation) {
                $messages[$violation->getPropertyPath()][] = $violation->getPropertyPath().' '.$violation->getMessage();
            }
        }

        return $messages;
    }
}
