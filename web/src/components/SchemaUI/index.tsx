import React, {
  useState,
  useRef,
  useCallback,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';
import ReactFlow, {
  addEdge,
  Controls,
  Background,
  ReactFlowProvider,
  OnNodesChange,
  OnEdgesChange,
  Node,
  Edge,
} from 'react-flow-renderer';
import { INodeData } from '../../interfaces/INodeData';
import ProjectContext from '../../contexts/ProjectContext';
import ResourceNode from '../ResourceNode';
import { v4 as uuidv4 } from 'uuid';
import { IProject } from '../../interfaces/IProject';

const nodeTypes = { ResourceNode: ResourceNode };

interface SchemaUIProps {
  nodes: Node<INodeData>[];
  setNodes: Dispatch<SetStateAction<Node<INodeData>[]>>;
  edges: Edge[];
  setEdges: Dispatch<SetStateAction<Edge[]>>;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
}

function SchemaUI(props: SchemaUIProps) {
  const reactFlowWrapper: any = useRef(null);
  const [reactFlowInstance, setReactFlowInstance]: any = useState(null);
  const { currentProject, setIsProjectSaved } = useContext(ProjectContext);

  const deleteNodesFromProject = (elementsToRemove: Node<INodeData>[]) => {
    currentProject.nodes = currentProject.nodes.filter(
      (node: Node<INodeData>) => {
        for (const nodeToRemove of elementsToRemove) {
          if (nodeToRemove.id == node.id) {
            return false;
          }
        }
        return true;
      }
    );
    setIsProjectSaved(false);
  };

  const onConnect = useCallback((params: any) => {
    props.setEdges((eds) => addEdge(params, eds));
  }, []);

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: any, currentProject: IProject) => {
      event.preventDefault();

      const reactFlowBounds: any =
        reactFlowWrapper.current.getBoundingClientRect();
      const { type, resource } = JSON.parse(
        event.dataTransfer.getData('application/reactflow')
      );

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position: any = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const onArgumentUpdate = (
        nodeId: string,
        argumentName: string,
        argumentValue: any
      ) => {
        props.setNodes((nodes: Node<INodeData>[]) =>
          nodes.map((node: Node<INodeData>) => {
            if (node.id === nodeId) {
              node.data.resource.arguments.map((argument: any) => {
                if (argument.name == argumentName) {
                  argument.value = argumentValue;
                }
              });
            }
            return node;
          })
        );
      };

      const newNode: Node<INodeData> = {
        id: resource.type + '_' + uuidv4(),
        type,
        position,
        data: {
          label: resource.type,
          onArgumentUpdate: onArgumentUpdate,
          resource: {
            description: resource.description,
            type: resource.type,
            arguments: resource.arguments,
          },
        },
      };

      props.setNodes((nds) => nds.concat(newNode));
      currentProject.nodes.push(newNode);
      setIsProjectSaved(false);
    },
    [reactFlowInstance]
  );

  return (
    <ReactFlowProvider>
      <div className="wrapper_reactflow" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={props.nodes}
          edges={props.edges}
          onNodesDelete={deleteNodesFromProject}
          onNodesChange={props.onNodesChange}
          onEdgesChange={props.onEdgesChange}
          onNodeDragStart={() => setIsProjectSaved(false)}
          onEdgeClick={() => setIsProjectSaved(false)}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={(event: any) => onDrop(event, currentProject)}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
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
