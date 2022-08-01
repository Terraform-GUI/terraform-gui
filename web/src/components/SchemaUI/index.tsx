import React, { useState, useRef, useCallback, Dispatch, SetStateAction } from "react";
import ReactFlow, {
    addEdge,
    Controls,
    Background,
    useEdgesState,
    ReactFlowProvider,
    OnNodesChange,
    Node,
} from "react-flow-renderer";
import {ResourceNodeData} from "../../interfaces/ResourceNodeData";
import {Project} from "../../interfaces/Project";

let id = 0;
const getId = () => `ressource_${id++}`;

interface SchemaUIProps {
    nodes: Node<ResourceNodeData>[],
    setNodes: Dispatch<SetStateAction<Node<ResourceNodeData>[]>>
    onNodesChange: OnNodesChange,
    project: Project,
    setIsProjectSaved: Dispatch<SetStateAction<boolean>>
}

function SchemaUI(props: SchemaUIProps) {
    const reactFlowWrapper: any = useRef(null);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance]: any = useState(null);

    const deleteNodesFromProject = (elementsToRemove: Node<ResourceNodeData>[]) => {
        props.project.nodes = props.project.nodes.filter((node: Node<ResourceNodeData>) => {
            for (const nodeToRemove of elementsToRemove) {
                if (nodeToRemove.id == node.id) {
                    return false;
                }
            }
            return true;
        })
        props.setIsProjectSaved(false);
    };

    const onConnect = useCallback(
        (params: any) => setEdges((eds) => addEdge(params, eds)),
        []
    );

    const onDragOver = useCallback((event: any) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback(
        (event: any) => {
            event.preventDefault();

            const reactFlowBounds: any =
                reactFlowWrapper.current.getBoundingClientRect();
            const type = event.dataTransfer.getData("application/reactflow");

            // check if the dropped element is valid
            if (typeof type === "undefined" || !type) {
                return;
            }

            const position: any = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });
            const newNode: Node<ResourceNodeData> = {
                id: getId(),
                type,
                position,
                data: {
                    label: type,
                    type: type,
                    arguments: [] // TODO fill arguments from the resource
                },
            };

            props.setNodes((nds) => nds.concat(newNode));
            props.project.nodes.push(newNode)
            props.setIsProjectSaved(false);
        },
        [reactFlowInstance]
    );

    return (
        <ReactFlowProvider>
            <div className="wrapper_reactflow" ref={reactFlowWrapper}>
                <ReactFlow
                    nodes={props.nodes}
                    edges={edges}
                    onNodesDelete={deleteNodesFromProject}
                    onNodesChange={props.onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onNodeDragStart={() => props.setIsProjectSaved(false)}
                    onEdgeClick={() => props.setIsProjectSaved(false)}
                    onConnect={onConnect}
                    onInit={setReactFlowInstance}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    fitView
                >
                    <Controls />
                    <Background color="#aaa" gap={16} />
                </ReactFlow>
            </div>
        </ReactFlowProvider>
    );
}

export default SchemaUI;
