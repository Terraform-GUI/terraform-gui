import React, { useCallback } from "react";
import logo from "./logo.svg";
import "../App.css";

import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "react-flow-renderer";

const onInit = (reactFlowInstance: any) =>
  console.log("flow loaded:", reactFlowInstance);

const data_nodes = [
    {
        id: '1',
        type: 'input',
        data: {
          label: (
            "<>Welcome to <strong>React Flow!</strong></>"
          ),
        },
        position: { x: 250, y: 0 },
      },
      {
        id: '2',
        data: {
          label: (
            `<>This is a <strong>default node</strong></>`
          ),
        },
        position: { x: 100, y: 100 },
      },
]

const data_edges = [
    { id: 'e1-2', source: '1', target: '2', label: 'this is an edge label' }
]

  function SchemaUI() {
    const [nodes, setNodes, onNodesChange] = useNodesState(data_nodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(data_edges);
    const onConnect = useCallback(
      (params: any) => setEdges((eds) => addEdge(params, eds)),
      []
    );
  
    const addNode = () => {
      console.log(nodes.length);
      const newData = [
        {
          id: "3",
          type: "output",
          data: { label: "My new data" },
          position: { x: 1, y: 1 },
        },
      ];
  
      setNodes([...nodes, ...newData]);
    };
  

    return (
<div style={{ height: 960 }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
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
        