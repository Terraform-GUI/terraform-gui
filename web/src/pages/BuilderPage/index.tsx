import React from 'react';
import './index.css';

import SchemaUI from '../../components/SchemaUI';
import {useNodesState} from "react-flow-renderer";
import ResourceNodeData from "../../interfaces/ResourceNodeData";
import {Node} from "react-flow-renderer";

function Index() {
    const data_nodes: Node<ResourceNodeData>[] = [
        {
            id: '1',
            type: 'input',
            data: {
                type: 'RDS',
                label: (
                    "<>Welcome to <strong>React Flow!</strong></>"
                ),
            },
            position: { x: 250, y: 0 },
        },
        {
            id: '2',
            type: 'input',
            data: {
                type: 'EC2',
                label: (
                    `<>This is a <strong>default node</strong></>`
                ),
            },
            position: { x: 100, y: 100 },
        },
    ]

    const [nodes, setNodes, onNodesChange] = useNodesState(data_nodes);

    return (
        <div className="wrapper">
            <div className="one">One</div>
            <div className="two">
                <SchemaUI nodes={nodes} setNodes={setNodes} onNodesChange={onNodesChange}/>
            </div>
            <div className="three">Trois</div>
            <div className="four">Quatre</div>
        </div>
    );
}

export default Index;
