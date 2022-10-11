import React, {useEffect, useState} from 'react';

import SchemaUI from '../../components/SchemaUI';
import Toolbar from '../../components/Toolbar';
import Description from '../../components/Description';
import {Node, useEdgesState, useNodesState} from "react-flow-renderer";
import ResourceSidebar from "../../components/ResourceSidebar";
import {IProject} from "../../interfaces/IProject";
import {ProjectProvider} from "../../contexts/ProjectContext";
import {ResourcesProvider} from "../../contexts/ResourcesContext";
import CodeEditor from "../../components/CodeEditor";
import "./index.css"
import {IResource} from "../../interfaces/IResource";
import {mergeNodesWithResource} from "../../services/ReactFlowTransformer";
import {INodeData} from "../../interfaces/INodeData";
import {ISavedProject} from "../../interfaces/ISavedProject";
import {projectService, resourceService} from '../../api'

function BuilderPage() {

    const [isProjectSaved, setIsProjectSaved] = useState<boolean>(true);
    const [projectList, setProjectList] = useState<IProject[]>([]);
    const [resources, setResources] = useState<IResource[]>([]);

    const [project, setProject] = useState<IProject>({
        id: null,
        name: 'Unnamed project',
        nodes: [],
        edges: [],
    } as IProject);

    const [nodes, setNodes, onNodesChange] = useNodesState(project.nodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(project.edges);

    useEffect(() => {
        const loadResources = async () => {
            const distantResources = await resourceService.getResources();
            if (distantResources !== undefined) {
                setResources(distantResources);
            }

            return distantResources;
        }

        const loadProjects = async () => {
            const projects =  await projectService.getProjects();
            return projects ? projects.projects : undefined;
        }

        loadResources().then((distantResources: IResource[] | undefined) => {
            loadProjects().then((savedProjectList: ISavedProject[] | undefined) => {
                if (savedProjectList !== undefined) {
                    const onArgumentUpdate = (nodeId: string, argumentName: string, argumentValue: any) => {
                        setNodes((nodes: Node<INodeData>[]) =>
                            nodes.map((node: Node<INodeData>) => {
                                if (node.id === nodeId) {
                                    node.data.resource.arguments.map((argument: any) => {
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
                }
            });
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
                        <Toolbar
                            setNodes={setNodes}
                            nodes={nodes}
                            edges={edges}
                            setEdges={setEdges}
                        />
                    </div>
                    <div className="schemaUI">
                        <SchemaUI
                            nodes={nodes}
                            setNodes={setNodes}
                            onNodesChange={onNodesChange}
                            edges={edges}
                            setEdges={setEdges}
                            onEdgesChange={onEdgesChange}
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
