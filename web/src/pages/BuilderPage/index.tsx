import React, {useState} from 'react';
import {Node, useNodesState} from "react-flow-renderer";
import {ResourceNodeData} from "../../interfaces/ResourceNodeData";
import SchemaUI from '../../components/SchemaUI';
import HeaderRessourceBar from '../../components/HeaderRessourceBar';
import Description from '../../components/Description';
import ResourceSideBar from "../../components/ResourceSideBar";

function BuilderPage() {
    // TODO get nodes from existing project if exist
    const data_nodes: Node<ResourceNodeData>[] = [
        {
            id: '1',
            type: 'input',
            data: {
                type: 'RDS',
                label: (
                    'RDS'
                ),
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

    const [nodes, setNodes, onNodesChange] = useNodesState(data_nodes);
    const [save, setSave] = useState(Boolean);

    const isBoolean = (res : boolean) => {
        setSave(res)
    }

    return (
        <div className="wrapper">
            <div className="ressourceSideBar">
                <ResourceSideBar nodes={nodes} setNodes={setNodes}/>
            </div>
            <div className="header">
                <HeaderRessourceBar saves={isBoolean}/>
            </div>
            <div className="schemaUI">
                <SchemaUI saves={save} nodes={nodes} setNodes={setNodes} onNodesChange={onNodesChange}/>
            </div>
            <div className="renderCode">Render Code</div>
            <div className="descriptions">
                <Description/>
            </div>
        </div>
    );
}

export default BuilderPage;