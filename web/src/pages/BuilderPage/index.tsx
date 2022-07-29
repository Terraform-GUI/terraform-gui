import React, {useState} from 'react';

import SchemaUI from '../../components/SchemaUI';
import Toolbar from '../../components/Toolbar';
import Description from '../../components/Description';
import {useNodesState} from "react-flow-renderer";
import ResourceSidebar from "../../components/ResourceSidebar";
import {Project} from "../../interfaces/Project";

function BuilderPage() {
    const [project, setProject] = useState({
        id: null,
        name: 'Unnamed project',
        nodes: []
    } as Project);
    const [nodes, setNodes, onNodesChange] = useNodesState(project.nodes);
    const [save, setSave] = useState(Boolean);


    const isBoolean = (res : boolean) => {
        setSave(res)
    }

    return (
        <div className="wrapper">
            <div className="ressourceSideBar">
                <ResourceSidebar nodes={nodes} setNodes={setNodes} />
            </div>
            <div className="header">
                <Toolbar
                    saves={isBoolean}
                    project={project}
                    setProject={setProject}
                    setNodes={setNodes}
                />
            </div>
            <div className="schemaUI">
                <SchemaUI
                    saves={save}
                    nodes={nodes}
                    setNodes={setNodes}
                    onNodesChange={onNodesChange}
                    project={project}
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