<?php

namespace App\Command\DataFixtures;

use App\Document\Embed\ResourceArgument;
use App\Document\Resource;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Component\Console\Output\OutputInterface;

class AwsResourceFixtures
{
    public function __construct(
        protected DocumentManager $documentManager,
    ) {
    }

    public function loadResources(OutputInterface $output): void
    {
        $this->loadVPC();
        $this->loadS3();
        $this->loadEC2();
        $this->loadRDS();
        $this->loadSQS();
        $this->documentManager->flush();

        $output->writeln(sprintf('  <comment>></comment> <info>%s</info>', 'loading 5 App\Document\Resource'));
    }

    private function loadVPC(): void
    {
        $resource = (new Resource())
            ->setProvider(Resource::PROVIDER_AWS)
            ->setDescription("Amazon Virtual Private Cloud (Amazon VPC) enables you to launch AWS resources into a virtual network that you've defined. This virtual network closely resembles a traditional network that you'd operate in your own data center, with the benefits of using the scalable infrastructure of AWS.")
            ->setType('VPC')
        ;

        $argument = (new ResourceArgument())
            ->setName('tenancy')
            ->setType(ResourceArgument::TYPE_STRING)
            ->setDefaultValue('default')
        ;
        $resource->addArgument($argument);

        $argument = (new ResourceArgument())
            ->setName('cidr')
            ->setType(ResourceArgument::TYPE_STRING)
            ->setDefaultValue('10.0.0.0/24')
            ->setMax('15')
        ;
        $resource->addArgument($argument);

        $argument = (new ResourceArgument())
            ->setName('pub_subnet')
            ->setType(ResourceArgument::TYPE_STRING)
            ->setDefaultValue('10.0.0.128/26')
            ->setMax('15')
        ;
        $resource->addArgument($argument);

        $argument = (new ResourceArgument())
            ->setName('prv_subnet')
            ->setType(ResourceArgument::TYPE_STRING)
            ->setDefaultValue('10.0.0.192/26')
            ->setMax('15')
        ;
        $resource->addArgument($argument);

        $this->documentManager->persist($resource);
    }

    private function loadS3(): void
    {
        $resource = (new Resource())
            ->setProvider(Resource::PROVIDER_AWS)
            ->setDescription('Amazon Simple Storage Service (Amazon S3) is an object storage service that offers industry-leading scalability, data availability, security, and performance. Customers of all sizes and industries can use Amazon S3 to store and protect any amount of data for a range of use cases, such as data lakes, websites, mobile applications, backup and restore, archive, enterprise applications, IoT devices, and big data analytics. Amazon S3 provides management features so that you can optimize, organize, and configure access to your data to meet your specific business, organizational, and compliance requirements.')
            ->setType('S3')
        ;

        $argument = (new ResourceArgument())
            ->setName('acl')
            ->setType(ResourceArgument::TYPE_STRING)
            ->setDefaultValue('private')
        ;
        $resource->addArgument($argument);

        $this->documentManager->persist($resource);
    }

    private function loadEC2(): void
    {
        $resource = (new Resource())
            ->setProvider(Resource::PROVIDER_AWS)
            ->setDescription("Amazon Elastic Compute Cloud (Amazon EC2) is a web service that provides resizable computing capacity—literally, servers in Amazon's data centers—that you use to build and host your software systems.")
            ->setType('EC2')
        ;

        // TODO on propose une liste d'AMI ou on laisse le champ en libre saisie ?
        $argument = (new ResourceArgument())
            ->setName('ami')
            ->setType(ResourceArgument::TYPE_STRING)
            ->setDefaultValue('ami-052efd3df9dad4825')
        ;
        $resource->addArgument($argument);

        // TODO on s'arrête aux instances T2 ou à tout les types d'instances ?
        $argument = (new ResourceArgument())
            ->setName('type')
            ->setType(ResourceArgument::TYPE_SELECT)
            ->setDefaultValue('t2.micro')
            ->addValue('t2.nano')
            ->addValue('t2.micro')
            ->addValue('t2.small')
            ->addValue('t2.medium')
            ->addValue('t2.large')
            ->addValue('t2.xlarge')
            ->addValue('t2.2xlarge')
        ;
        $resource->addArgument($argument);

        $argument = (new ResourceArgument())
            ->setName('public_ip')
            ->setType(ResourceArgument::TYPE_BOOL)
            ->setDefaultValue(true)
        ;
        $resource->addArgument($argument);

        $this->documentManager->persist($resource);
    }

    private function loadRDS(): void
    {
        $resource = (new Resource())
            ->setProvider(Resource::PROVIDER_AWS)
            ->setDescription('Amazon Relational Database Service (Amazon RDS) is a web service that makes it easier to set up, operate, and scale a relational database in the cloud. It provides cost-efficient, resizable capacity for an industry-standard relational database and manages common database administration tasks.')
            ->setType('RDS')
        ;

        // TODO on propose une liste d'AMI ou on laisse le champ en libre saisie ?
        $argument = (new ResourceArgument())
            ->setName('ami')
            ->setType(ResourceArgument::TYPE_STRING)
            ->setDefaultValue('ami-052efd3df9dad4825')
        ;
        $resource->addArgument($argument);

        // TODO on s'arrête aux instances T2 ou à tout les types d'instances ?
        $argument = (new ResourceArgument())
            ->setName('type')
            ->setType(ResourceArgument::TYPE_SELECT)
            ->setDefaultValue('db.t3.micro')
            ->addValue('db.t3.nano')
            ->addValue('db.t3.micro')
            ->addValue('db.t3.small')
            ->addValue('db.t3.medium')
            ->addValue('db.t3.large')
            ->addValue('db.t3.xlarge')
            ->addValue('db.t3.2xlarge')
        ;
        $resource->addArgument($argument);

        $argument = (new ResourceArgument())
            ->setName('engine')
            ->setType(ResourceArgument::TYPE_SELECT)
            ->setDefaultValue('mysql')
            ->addValue('mysql')
            ->addValue('postgres')
            ->addValue('sqlserver-ex')
            ->addValue('oracle-ee')
        ;
        $resource->addArgument($argument);

        $argument = (new ResourceArgument())
            ->setName('version')
            ->setType(ResourceArgument::TYPE_STRING)
        ;
        $resource->addArgument($argument);

        $argument = (new ResourceArgument())
            ->setName('family')
            ->setType(ResourceArgument::TYPE_STRING)
        ;
        $resource->addArgument($argument);

        $argument = (new ResourceArgument())
            ->setName('username')
            ->setType(ResourceArgument::TYPE_STRING)
        ;
        $resource->addArgument($argument);

        $argument = (new ResourceArgument())
            ->setName('password')
            ->setType(ResourceArgument::TYPE_STRING)
        ;
        $resource->addArgument($argument);

        $argument = (new ResourceArgument())
            ->setName('publicly_accessible')
            ->setType(ResourceArgument::TYPE_BOOL)
            ->setDefaultValue(false)
        ;
        $resource->addArgument($argument);

        $argument = (new ResourceArgument())
            ->setName('skip_final_snapshot')
            ->setType(ResourceArgument::TYPE_BOOL)
            ->setDefaultValue(true)
        ;
        $resource->addArgument($argument);

        $this->documentManager->persist($resource);
    }

    private function loadSQS(): void
    {
        $resource = (new Resource())
            ->setProvider(Resource::PROVIDER_AWS)
            ->setDescription('Amazon Simple Queue Service (Amazon SQS) is a fully managed message queuing service that makes it easy to decouple and scale microservices, distributed systems, and serverless applications. Amazon SQS moves data between distributed application components and helps you decouple these components.')
            ->setType('SQS')
        ;

        $argument = (new ResourceArgument())
            ->setName('delay_seconds')
            ->setType(ResourceArgument::TYPE_NUMBER)
            ->setDefaultValue(90)
        ;
        $resource->addArgument($argument);

        $argument = (new ResourceArgument())
            ->setName('max_message_size')
            ->setType(ResourceArgument::TYPE_NUMBER)
            ->setDefaultValue(2048)
        ;
        $resource->addArgument($argument);

        $argument = (new ResourceArgument())
            ->setName('message_retention_seconds')
            ->setType(ResourceArgument::TYPE_NUMBER)
            ->setDefaultValue(86400)
        ;
        $resource->addArgument($argument);

        $argument = (new ResourceArgument())
            ->setName('receive_wait_time_seconds')
            ->setType(ResourceArgument::TYPE_NUMBER)
            ->setDefaultValue(10)
        ;
        $resource->addArgument($argument);

        $this->documentManager->persist($resource);
    }
}