<?php

namespace App\Command\DataFixtures;

use Doctrine\ODM\MongoDB\DocumentManager;
use Exception;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Question\ConfirmationQuestion;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(name: 'load:fixtures', description: 'Load data fixtures')]
class LoadDataFixturesCommand extends Command
{
    public function __construct(
        protected DocumentManager $documentManager,
        protected AwsResourceFixtures $awsResourceFixtures,
        protected UserFixtures $userFixtures
    ) {
        parent::__construct();
    }

    protected function execute(
        InputInterface $input,
        OutputInterface $output,
    ): int {
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
        $this->awsResourceFixtures->loadResources($output);
        $this->userFixtures->loadUser($output);

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
}
