<?php

namespace App\Command;

use App\Document\Embed\ResourceArgument;
use App\Document\Resource;
use App\Document\User;
use Doctrine\ODM\MongoDB\DocumentManager;
use Exception;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Question\ConfirmationQuestion;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[AsCommand(name: 'load:fixtures', description: 'Load data fixtures')]
class LoadDataFixturesCommand extends Command
{
    public function __construct(
        protected DocumentManager $documentManager,
        protected UserPasswordHasherInterface $passwordHasher
    ) {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        if ($input->isInteractive()) {
            $helper   = $this->getHelper('question');
            $question = new ConfirmationQuestion('Careful, database will be purged. Do you want to continue (y/N) ?', false);

            if (!$helper->ask($input, $output, $question)) {
                return 0;
            }
        }

        $this->purgeDatabase();
        $output->writeln(sprintf('  <comment>></comment> <info>%s</info>', 'purging database'));
        $this->loadResource($output);
        $this->loadUser($output);

        return Command::SUCCESS;
    }

    /**
     * @throws Exception
     */
    protected function purgeDatabase(): void
    {
        $db = $this->documentManager->getClient()->selectDatabase($_ENV['MONGODB_DB']);

        foreach ($db->listCollections() as $collection) {
            $db->dropCollection($collection->getName());
        }
    }

    private function loadResource(OutputInterface $output): void
    {
        $argument = (new ResourceArgument())
            ->setName('engine')
            ->setType(ResourceArgument::TYPE_STRING)
            ->setRequired(true)
            ->setDefaultValue('MySQL')
            ->addValue('MySQL')
            ->addValue('Aurora DB')
            ->addValue('PostgreSQL')
        ;

        $resource = (new Resource())
            ->setProvider(Resource::PROVIDER_AWS)
            ->setDescription('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris finibus eros ut tempus cursus. Praesent fermentum, libero eu ultricies fermentum, sapien ligula fermentum mi, vel laoreet est elit quis tortor.')
            ->setType('rds')
            ->addArgument($argument)
        ;

        $this->documentManager->persist($resource);
        $this->documentManager->flush();

        $output->writeln(sprintf('  <comment>></comment> <info>%s</info>', 'loading 1 App\Document\Resource'));
    }

    private function loadUser(OutputInterface $output): void
    {
        $user           = new User();
        $hashedPassword = $this->passwordHasher->hashPassword($user, 'toto');
        $user->setPassword($hashedPassword);
        $user->setEmail('john@doe.fr');

        $this->documentManager->persist($user);
        $this->documentManager->flush();

        $output->writeln(sprintf('  <comment>></comment> <info>%s</info>', 'loading 1 App\Document\User'));
    }
}
