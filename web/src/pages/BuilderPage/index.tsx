import React from 'react';
import './index.css';

import SchemaUI from '../../components/SchemaUI';
import {useNodesState} from "react-flow-renderer";
import {ResourceNodeData} from "../../interfaces/ResourceNodeData";
import {Node} from "react-flow-renderer";
import ResourceSideBar from "../../components/ResourceSideBar";

function BuilderPage() {
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

    return (
        <div className="wrapper">
            <div className="one">
                <ResourceSideBar nodes={nodes} setNodes={setNodes}/>
            </div>
            <div className="two">
                <SchemaUI nodes={nodes} setNodes={setNodes} onNodesChange={onNodesChange}/>
            </div>
            <div className="three">Trois</div>
            <div className="four">Quatre</div>
        </div>
    );
}

export default BuilderPage;
