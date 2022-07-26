import React, {Dispatch, SetStateAction, useCallback} from "react";
import "./index.css";
import {ResourceNodeData} from "../../interfaces/ResourceNodeData";

import ReactFlow, {
    addEdge,
    MiniMap,
    Controls,
    Background,
    useEdgesState,
    OnNodesChange,
    Node
} from "react-flow-renderer";


interface SchemaUIProps {
    nodes: Node<ResourceNodeData>[],
    setNodes: Dispatch<SetStateAction<Node<ResourceNodeData>[]>>
    onNodesChange: OnNodesChange
}

function SchemaUI(props: SchemaUIProps) {
    const onConnect = useCallback(
        (params: any) => setEdges((eds) => addEdge(params, eds)),
        []
    );

    const onInit = (reactFlowInstance: any) =>
        console.log("flow loaded:", reactFlowInstance);

    const data_edges = [
        { id: 'e1-2', source: '1', target: '2', label: 'this is an edge label' }
    ]

    const [edges, setEdges, onEdgesChange] = useEdgesState(data_edges);

    const addNode = () => {
        const newData = [
            {
                id: "3",
                type: "output",
                data: { label: "My new data", type:"RDS", arguments: [] },
                position: { x: 1, y: 1 },
            },
        ];

        props.setNodes([...props.nodes, ...newData]);
    };


    return (
        <div style={{ height: 960 }}>
            <ReactFlow
                nodes={props.nodes}
                edges={edges}
                onNodesChange={props.onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={onInit}
                fitView
                attributionPosition="top-right"
            >
                <MiniMap
                    nodeStrokeColor={(n: any) => {
                        if (n.style?.background) return n.style.background;
                        if (n.type === "input") return "#0041d0";
                        if (n.type === "output") return "#ff0072";
                        if (n.type === "default") return "#1a192b";
                        return "#eee";
                    }}
                    nodeColor={(n: any) => {
                        if (n.style?.background) return n.style.background;
                        return "#fff";
                    }}
                    nodeBorderRadius={2}
                />
                <Controls />
                <Background color="#aaa" gap={16} />
            </ReactFlow>
        </div>
    );
}

export default SchemaUI;
        