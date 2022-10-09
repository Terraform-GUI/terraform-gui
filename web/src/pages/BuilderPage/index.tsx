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
import {resourceService} from '../../api'

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
        const loadResources = async () => {
            const distantResources = await resourceService.getResources();
            if (distantResources !== undefined) {
                setResources(distantResources);
            }

            return distantResources;
        }

        loadResources().then((distantResources: IResource[] | undefined) => {
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
                                if (argument.name === argumentName) {
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
                    nodes: mergeNodesWithResource(savedProject.nodes, distantResources ?? [], onArgumentUpdate)
                });
                return project;
            })

            setProjectList(projectList);
        });
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
