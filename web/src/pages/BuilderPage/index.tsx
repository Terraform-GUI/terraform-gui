import React, {useState} from 'react';

import SchemaUI from '../../components/SchemaUI';
import Toolbar from '../../components/Toolbar';
import Description from '../../components/Description';
import {useNodesState} from "react-flow-renderer";
import ResourceSidebar from "../../components/ResourceSidebar";
import {Project} from "../../interfaces/Project";
import {ProjectProvider} from "../../contexts/ProjectContext";

function BuilderPage() {

    const [isProjectSaved, setIsProjectSaved] = useState<boolean>(true);

    const [project, setProject] = useState<Project>({
        id: null,
        name: 'Unnamed project',
        nodes: []
    } as Project);
    const [nodes, setNodes, onNodesChange] = useNodesState(project.nodes);

    return (
        <ProjectProvider value={{
            isProjectSaved: isProjectSaved,
            setIsProjectSaved: setIsProjectSaved,
            currentProject: project,
            setCurrentProject: setProject
        }} >
            <div className="wrapper">
                <div className="ressourceSideBar">
                    <ResourceSidebar nodes={nodes} setNodes={setNodes} />
                </div>
                <div className="header">
                    <Toolbar setNodes={setNodes} />
                </div>
                <div className="schemaUI">
                    <SchemaUI
                        nodes={nodes}
                        setNodes={setNodes}
                        onNodesChange={onNodesChange}
                    />
                </div>
                <div className="renderCode">Render Code</div>
                <div className="descriptions">
                    <Description/>
                </div>
            </div>
        </ProjectProvider>
    );
}

export default BuilderPage;