import React, {useEffect, useState} from 'react';

import SchemaUI from '../../components/SchemaUI';
import Toolbar from '../../components/Toolbar';
import Description from '../../components/Description';
import {Node, useNodesState} from "react-flow-renderer";
import ResourceSidebar from "../../components/ResourceSidebar";
import {IProject} from "../../interfaces/IProject";
import {ProjectProvider} from "../../contexts/ProjectContext";
import {ResourcesProvider} from "../../contexts/ResourcesContext";
import CodeEditor from "../../components/CodeEditor";
import "./index.css"
import {IResource} from "../../interfaces/IResource";
import {mergeNodesWithResource} from "../../services/ReactFlowTransformer";
import {IResourceNodeData} from "../../interfaces/IResourceNodeData";
import {ISavedProject} from "../../interfaces/ISavedProject";

function BuilderPage() {

    const [isProjectSaved, setIsProjectSaved] = useState<boolean>(true);
    const [projectList, setProjectList] = useState<IProject[]>([]);
    const [resources, setResources] = useState<IResource[]>([]);

    const [project, setProject] = useState<IProject>({
        id: null,
        name: 'Unnamed project',
        nodes: []
    } as IProject);

    const [nodes, setNodes, onNodesChange] = useNodesState(project.nodes);

    useEffect(() => {

        // TODO get nodes from api
        const distantResources: IResource[] = [
            {
                "provider": "aws",
                "type": "VPC",
                "description": "Amazon Virtual Private Cloud (Amazon VPC) enables you to launch AWS resources into a virtual network that you've defined. This virtual network closely resembles a traditional network that you'd operate in your own data center, with the benefits of using the scalable infrastructure of AWS.",
                "arguments": [
                    {
                        "type": "string",
                        "name": "tenancy",
                        "defaultValue": "default",
                        "values": [],
                        "min": null,
                        "max": null
                    },
                    {
                        "type": "string",
                        "name": "cidr",
                        "defaultValue": "10.0.0.0/24",
                        "values": [],
                        "min": null,
                        "max": "15"
                    },
                    {
                        "type": "string",
                        "name": "pub_subnet",
                        "defaultValue": "10.0.0.128/26",
                        "values": [],
                        "min": null,
                        "max": "15"
                    },
                    {
                        "type": "string",
                        "name": "prv_subnet",
                        "defaultValue": "10.0.0.192/26",
                        "values": [],
                        "min": null,
                        "max": "15"
                    }
                ]
            },
            {
                "provider": "aws",
                "type": "S3",
                "description": "Amazon Simple Storage Service (Amazon S3) is an object storage service that offers industry-leading scalability, data availability, security, and performance. Customers of all sizes and industries can use Amazon S3 to store and protect any amount of data for a range of use cases, such as data lakes, websites, mobile applications, backup and restore, archive, enterprise applications, IoT devices, and big data analytics. Amazon S3 provides management features so that you can optimize, organize, and configure access to your data to meet your specific business, organizational, and compliance requirements.",
                "arguments": [
                    {
                        "type": "string",
                        "name": "acl",
                        "defaultValue": "private",
                        "values": [],
                        "min": null,
                        "max": null
                    }
                ]
            },
            {
                "provider": "aws",
                "type": "EC2",
                "description": "Amazon Elastic Compute Cloud (Amazon EC2) is a web service that provides resizable computing capacity—literally, servers in Amazon's data centers—that you use to build and host your software systems.",
                "arguments": [
                    {
                        "type": "string",
                        "name": "ami",
                        "defaultValue": "ami-052efd3df9dad4825",
                        "values": [],
                        "min": null,
                        "max": null
                    },
                    {
                        "type": "select",
                        "name": "type",
                        "defaultValue": "t2.micro",
                        "values": [
                            "t2.nano",
                            "t2.micro",
                            "t2.small",
                            "t2.medium",
                            "t2.large",
                            "t2.xlarge",
                            "t2.2xlarge"
                        ],
                        "min": null,
                        "max": null
                    },
                    {
                        "type": "bool",
                        "name": "public_ip",
                        "defaultValue": true,
                        "values": [],
                        "min": null,
                        "max": null
                    }
                ]
            },
            {
                "provider": "aws",
                "type": "RDS",
                "description": "Amazon Relational Database Service (Amazon RDS) is a web service that makes it easier to set up, operate, and scale a relational database in the cloud. It provides cost-efficient, resizable capacity for an industry-standard relational database and manages common database administration tasks.",
                "arguments": [
                    {
                        "type": "string",
                        "name": "ami",
                        "defaultValue": "ami-052efd3df9dad4825",
                        "values": [],
                        "min": null,
                        "max": null
                    },
                    {
                        "type": "select",
                        "name": "type",
                        "defaultValue": "db.t3.micro",
                        "values": [
                            "db.t3.nano",
                            "db.t3.micro",
                            "db.t3.small",
                            "db.t3.medium",
                            "db.t3.large",
                            "db.t3.xlarge",
                            "db.t3.2xlarge"
                        ],
                        "min": null,
                        "max": null
                    },
                    {
                        "type": "select",
                        "name": "engine",
                        "defaultValue": "mysql",
                        "values": [
                            "mysql",
                            "postgres",
                            "sqlserver-ex",
                            "oracle-ee"
                        ],
                        "min": null,
                        "max": null
                    },
                    {
                        "type": "string",
                        "name": "version",
                        "defaultValue": null,
                        "values": [],
                        "min": null,
                        "max": null
                    },
                    {
                        "type": "string",
                        "name": "family",
                        "defaultValue": null,
                        "values": [],
                        "min": null,
                        "max": null
                    },
                    {
                        "type": "string",
                        "name": "username",
                        "defaultValue": null,
                        "values": [],
                        "min": null,
                        "max": null
                    },
                    {
                        "type": "string",
                        "name": "password",
                        "defaultValue": null,
                        "values": [],
                        "min": null,
                        "max": null
                    },
                    {
                        "type": "bool",
                        "name": "publicly_accessible",
                        "defaultValue": false,
                        "values": [],
                        "min": null,
                        "max": null
                    },
                    {
                        "type": "bool",
                        "name": "skip_final_snapshot",
                        "defaultValue": true,
                        "values": [],
                        "min": null,
                        "max": null
                    }
                ]
            },
            {
                "provider": "aws",
                "type": "SQS",
                "description": "Amazon Simple Queue Service (Amazon SQS) is a fully managed message queuing service that makes it easy to decouple and scale microservices, distributed systems, and serverless applications. Amazon SQS moves data between distributed application components and helps you decouple these components.",
                "arguments": [
                    {
                        "type": "number",
                        "name": "delay_seconds",
                        "defaultValue": 90,
                        "values": [],
                        "min": null,
                        "max": null
                    },
                    {
                        "type": "number",
                        "name": "max_message_size",
                        "defaultValue": 2048,
                        "values": [],
                        "min": null,
                        "max": "2049"
                    },
                    {
                        "type": "number",
                        "name": "message_retention_seconds",
                        "defaultValue": 86400,
                        "values": [],
                        "min": null,
                        "max": null
                    },
                    {
                        "type": "number",
                        "name": "receive_wait_time_seconds",
                        "defaultValue": 10,
                        "values": [],
                        "min": null,
                        "max": null
                    }
                ]
            }
        ];
        setResources(distantResources);

        // TODO fetch users project from api
        let savedProjectList: ISavedProject[] = [{
            id: '1',
            name: 'My first project',
            nodes: [{
                id: '1',
                type: 'ResourceNode',
                data: {
                    type: 'RDS',
                    description: 'RDS description',
                    arguments: [{
                        name: 'ami',
                        value: 'ami-052efd3df9dad4666'
                    }]
                },
                position: { x: 250, y: 0 },
            },
                {
                    id: '2',
                    type: 'ResourceNode',
                    data: {
                        type: 'EC2',
                        description: 'EC2 description',
                        arguments: [{
                            name: 'public_ip',
                            value: true
                        }, {
                            name: 'type',
                            value: 't2.large'
                        }]
                    },
                    position: { x: 100, y: 100 },
                },
            ]
        },
            {
                id: '2',
                name: 'My second project',
                nodes: [{
                    id: '1',
                    type: 'input',
                    data: {
                        type: 'RDS',
                        description: 'RDS description',
                        arguments: [{
                            name: 'IP',
                            value: '127.0.0.1'
                        }]
                    },
                    position: { x: 250, y: 0 },
                }]
            },
            {
                id: '3',
                name: 'My third project',
                nodes: []
            }
        ];

        const onArgumentUpdate = (nodeId: string, argumentName: string, argumentValue: any) => {
            setNodes((nodes: Node<IResourceNodeData>[]) =>
                nodes.map((node: Node<IResourceNodeData>) => {
                    if (node.id === nodeId) {
                        node.data.arguments.map((argument: any) => {
                            if (argument.name == argumentName) {
                                argument.value = argumentValue;
                            }
                        })
                    }
                    return node;
                })
            );
        }

        const projectList: IProject[] = [];

        // convert SavedProject[] to Project[]
        savedProjectList.map((savedProject: ISavedProject) => {
            projectList.push({
                ...savedProject,
                nodes: mergeNodesWithResource(savedProject.nodes, distantResources, onArgumentUpdate)
            });
            return project;
        })

        setProjectList(projectList);
    }, []);

    return (
        <ResourcesProvider value={{
            resources: resources
        }}>
            <ProjectProvider value={{
                isProjectSaved: isProjectSaved,
                setIsProjectSaved: setIsProjectSaved,
                currentProject: project,
                setCurrentProject: setProject,
                projectList: projectList,
                setProjectList: setProjectList
            }} >
                <div className="wrapper">
                    <div className="ressourceSideBar">
                        <ResourceSidebar nodes={nodes} setNodes={setNodes} />
                    </div>
                    <div className="header">
                        <Toolbar setNodes={setNodes} nodes={nodes}  />
                    </div>
                    <div className="schemaUI">
                        <SchemaUI
                            nodes={nodes}
                            setNodes={setNodes}
                            onNodesChange={onNodesChange}
                        />
                    </div>
                    <div className="codeEditor">
                        <CodeEditor nodes={nodes} setNodes={setNodes}/>
                    </div>
                    <div className="descriptions">
                        <Description nodes={nodes} />
                    </div>
                </div>
            </ProjectProvider>
        </ResourcesProvider>

    );
}

export default BuilderPage;
