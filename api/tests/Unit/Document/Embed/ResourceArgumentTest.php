<?php

namespace App\Tests\Unit\Document\Embed;

use App\Document\Embed\ResourceArgument as ResourceArgumentAlias;
use Exception;
use PHPUnit\Framework\TestCase;

class ResourceArgumentTest extends TestCase
{
    public function testCantSetMinIfWrongType(): void
    {
        $this->expectExceptionMessage("Can't set App\Document\Embed\ResourceArgument::\$min when App\Document\Embed\ResourceArgument::\$type is not App\Document\Embed\ResourceArgument::TYPE_NUMBER, App\Document\Embed\ResourceArgument::TYPE_FLOAT, App\Document\Embed\ResourceArgument::TYPE_STRING or App\Document\Embed\ResourceArgument::TYPE_INT");

        (new ResourceArgumentAlias())
            ->setType(ResourceArgumentAlias::TYPE_SELECT)
            ->setMin('1')
        ;
    }

    public function testCantSetMaxIfWrongType(): void
    {
        $this->expectExceptionMessage("Can't set App\Document\Embed\ResourceArgument::\$max when App\Document\Embed\ResourceArgument::\$type is not App\Document\Embed\ResourceArgument::TYPE_NUMBER, App\Document\Embed\ResourceArgument::TYPE_FLOAT, App\Document\Embed\ResourceArgument::TYPE_STRING or App\Document\Embed\ResourceArgument::TYPE_INT");

        (new ResourceArgumentAlias())
            ->setType(ResourceArgumentAlias::TYPE_SELECT)
            ->setMax('1')
        ;
    }

    /**
     * @throws Exception
     */
    public function testCanSetMinAndMaxIfRightType(): void
    {
        (new ResourceArgumentAlias())
            ->setType(ResourceArgumentAlias::TYPE_FLOAT)
            ->setMin('1')
            ->setMax('1')
        ;

        (new ResourceArgumentAlias())
            ->setType(ResourceArgumentAlias::TYPE_INT)
            ->setMax('1')
        ;

        (new ResourceArgumentAlias())
            ->setType(ResourceArgumentAlias::TYPE_NUMBER)
            ->setMax('1')
        ;

        (new ResourceArgumentAlias())
            ->setType(ResourceArgumentAlias::TYPE_STRING)
            ->setMax('1')
        ;

        $this->assertTrue(true);
    }
}
