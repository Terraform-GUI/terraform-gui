<?php

namespace App\Security;

use App\Document\Project;
use App\Document\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class ProjectVoter extends Voter
{
    public const VIEW = 'view';
    public const EDIT = 'edit';

    public function supports(string $attribute, mixed $subject): bool
    {
        // if the attribute isn't one we support, return false
        if (!in_array($attribute, [self::VIEW, self::EDIT])) {
            return false;
        }

        // only vote on `Project` objects
        if (!$subject instanceof Project) {
            return false;
        }

        return true;
    }

    public function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        $user = $token->getUser();
        if (!$user instanceof User) {
            // the user must be logged in; if not, deny access
            return false;
        }

        /** @var Project $project */
        $project = $subject;

        switch ($attribute) {
            case self::VIEW:
            case self::EDIT:
                return $this->canViewOrEdit($project, $user);
        }

        throw new \LogicException('This code should not be reached!');
    }

    private function canViewOrEdit(Project $project, User $user): bool
    {
        return $user->getId() === $project->getUserId();
    }
}
