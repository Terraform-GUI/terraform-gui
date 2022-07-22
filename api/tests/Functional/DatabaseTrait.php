<?php

namespace App\Tests\Functional;

use Doctrine\ODM\MongoDB\DocumentManager;
use Exception;

trait DatabaseTrait
{
    protected function getDocumentManager(): DocumentManager
    {
        return static::getContainer()->get(DocumentManager::class);
    }

    /**
     * @throws Exception
     */
    protected function clearDatabase(): void
    {
        $db = $this->getDocumentManager()->getClient()->selectDatabase($_ENV['MONGODB_DB']);

        foreach ($db->listCollections() as $collection) {
            $db->dropCollection($collection->getName());
        }
    }
}
