import React, {useEffect, useState} from 'react';

import SchemaUI from '../../components/SchemaUI';
import Toolbar from '../../components/Toolbar';
import Description from '../../components/Description';
import {useNodesState} from "react-flow-renderer";
import ResourceSidebar from "../../components/ResourceSidebar";
import {Project} from "../../interfaces/Project";
import {ProjectProvider} from "../../contexts/ProjectContext";
import CodeEditor from "../../components/CodeEditor";
import "./index.css"

function BuilderPage() {

    const [isProjectSaved, setIsProjectSaved] = useState<boolean>(true);
    const [projectList, setProjectList] = useState<Project[]>([]);

    const [project, setProject] = useState<Project>({
        id: null,
        name: 'Unnamed project',
        nodes: []
    } as Project);

    const [nodes, setNodes, onNodesChange] = useNodesState(project.nodes);

    useEffect(() => {
        // TODO fetch users project from api
        setProjectList([{
            id: '1',
            name: 'My first project',
            nodes: [{
                id: '1',
                type: 'input',
                data: {
                    type: 'RDS',
                    label: (
                        'RDS'
                    ),
                    description: 'Description',
                    arguments: [{
                        name: 'IP',
                        value: '127.0.0.1'
                    }]
                },
                position: { x: 250, y: 0 },
            },
                {
                    id: '2',
                    type: 'input',
                    data: {
                        type: 'EC2',
                        label: (
                            'EC2'
                        ),
                        description: 'Description',
                        arguments: [{
                            name: 'IP',
                            value: '127.0.0.1'
                        }, {
                            name: 'name',
                            value: 'tf-gui-app'
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
                        label: (
                            'RDS'
                        ),
                        description: 'Description',
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
        ]);
    }, []);

    return (
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
    );
}

export default BuilderPage;
