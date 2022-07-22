<?php

namespace App\Tests\Functional\Controller;

use App\Document\Embed\ResourceArgument;
use App\Document\Resource;
use App\Tests\Functional\DatabaseTrait;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Request;

class ResourceControllerTest extends WebTestCase
{
    use DatabaseTrait;

    private ?KernelBrowser $client = null;

    public function setUp(): void
    {
        $this->client = self::createClient();
        self::bootKernel();
        $this->clearDatabase();
    }

    public function testGettingAllResources(): void
    {
        $resource = $this->loadResource();
        $this->client->request(Request::METHOD_GET, '/resources/aws');
        $data = json_decode($this->client->getResponse()->getContent(), true);

        $this->assertNull($data[0]['id'] ?? null);
        $this->assertSame($resource->getProvider(), $data[0]['provider']);
        $this->assertSame($resource->getDescription(), $data[0]['description']);
        $this->assertSame($resource->getType(), $data[0]['type']);
        $this->assertSame($resource->getArguments()->first()->getName(), $data[0]['arguments'][0]['name']);
        $this->assertSame($resource->getArguments()->first()->getType(), $data[0]['arguments'][0]['type']);
        $this->assertSame($resource->getArguments()->first()->getRequired(), $data[0]['arguments'][0]['required']);
        $this->assertSame($resource->getArguments()->first()->getDefaultValue(), $data[0]['arguments'][0]['defaultValue']);
        $this->assertSame($resource->getArguments()->first()->getValues(), $data[0]['arguments'][0]['values']);
        $this->assertNull($data[0]['arguments'][0]['min']);
        $this->assertNull($data[0]['arguments'][0]['max']);
    }

    private function loadResource(): Resource
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

        $this->getDocumentManager()->persist($resource);
        $this->getDocumentManager()->flush();

        return $resource;
    }
}
