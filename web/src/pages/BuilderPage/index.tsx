import React, {useCallback, useState} from 'react';

import SchemaUI from '../../components/SchemaUI';
import Toolbar from '../../components/Toolbar';
import Description from '../../components/Description';
import {useNodesState} from "react-flow-renderer";
import ResourceSidebar from "../../components/ResourceSidebar";
import {Project} from "../../interfaces/Project";

function BuilderPage() {

    const [isProjectSaved, setIsProjectSaved] = useState(true as boolean);

    const [project, setProject] = useState({
        id: null,
        name: 'Unnamed project',
        nodes: []
    } as Project);
    const [nodes, setNodes, onNodesChange] = useNodesState(project.nodes);

    return (
        <div className="wrapper">
            <div className="ressourceSideBar">
                <ResourceSidebar nodes={nodes} setNodes={setNodes} />
            </div>
            <div className="header">
                <Toolbar
                    project={project}
                    setProject={setProject}
                    setNodes={setNodes}
                    isProjectSaved={isProjectSaved}
                    setIsProjectSaved={setIsProjectSaved}
                />
            </div>
            <div className="schemaUI">
                <SchemaUI
                    nodes={nodes}
                    setNodes={setNodes}
                    onNodesChange={onNodesChange}
                    project={project}
                    setIsProjectSaved={setIsProjectSaved}
                />
            </div>
            <div className="renderCode">Render Code</div>
            <div className="descriptions">
                <Description/>
            </div>
        </div>
    );
}

export default BuilderPage;