<?php

namespace App\Command\DataFixtures;

use App\Document\User;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures
{
    public function __construct(
        protected DocumentManager $documentManager,
        protected UserPasswordHasherInterface $passwordHasher,
    ) {
    }

    public function loadUser(OutputInterface $output): void
    {
        $user           = new User();
        $hashedPassword = $this->passwordHasher->hashPassword($user, 'toto');
        $user->setPassword($hashedPassword);
        $user->setEmail('john@doe.fr');
        $user->setToken(null);

        $this->documentManager->persist($user);
        $this->documentManager->flush();

        $output->writeln(sprintf('  <comment>></comment> <info>%s</info>', 'loading 1 App\Document\User'));
    }
}
