<?php

namespace App\Command;

use App\Document\User;
use App\Utils\Validator;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[AsCommand(name: 'app:user:create', description: 'Create a User')]
class UserCreateCommand extends Command
{
    public function __construct(
        protected DocumentManager $dm,
        protected Validator $validator,
        protected UserPasswordHasherInterface $passwordHasher
    ) {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->addArgument('email', InputArgument::REQUIRED, 'Email of the user to create')
            ->addArgument('password', InputArgument::REQUIRED, 'Password of the user to create')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io       = new SymfonyStyle($input, $output);
        $email    = $input->getArgument('email');
        $password = $input->getArgument('password');

        $io->section('Creating User in db');

        if ($email) {
            $io->note(sprintf('Email : %s', $email));
        }
        if ($password) {
            $io->note(sprintf('Password : %s', $password));
        }

        $user           = new User();
        $hashedPassword = $this->passwordHasher->hashPassword($user, $password);
        $user->setPassword($hashedPassword);

        $user->setEmail($email);

        $errors = $this->validator->getErrors($user);

        if (count($errors) > 0) {
            $errors = call_user_func_array('array_merge', array_values($errors));
            $io->error($errors);

            return Command::FAILURE;
        }

        $this->dm->persist($user);
        $this->dm->flush();

        $io->success('User created !');

        return Command::SUCCESS;
    }
}
