<?php

namespace App\Security;

use App\Document\User;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAccountStatusException;
use Symfony\Component\Security\Core\User\UserCheckerInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class UserChecker implements UserCheckerInterface
{
    public function checkPreAuth(UserInterface $user): void
    {
        if (!$user instanceof User) {
            return;
        }

        if (null !== $user->getToken() && !$user->getViaGithub()) {
            throw new CustomUserMessageAccountStatusException('Please verify your email address');
        }
    }

    public function checkPostAuth(UserInterface $user): void
    {
    }
}
