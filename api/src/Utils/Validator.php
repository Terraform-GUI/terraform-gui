<?php

namespace App\Utils;

use Symfony\Component\Validator\Validator\ValidatorInterface;

class Validator
{
    public function __construct(protected ValidatorInterface $validator)
    {
    }

    public function getErrors($entity, bool $withPrefix = true): array
    {
        $errors = $this->validator->validate($entity);

        $messages = [];

        if (count($errors) > 0) {
            foreach ($errors as $violation) {
                $errorMessage = $violation->getMessage();

                if ($withPrefix) {
                    $errorMessage = $violation->getPropertyPath().' '.$errorMessage;
                }

                $messages[$violation->getPropertyPath()][] = $errorMessage;
            }
        }

        return $messages;
    }
}
