import ChangeProject from "./ChangeProject";
import {Dispatch, SetStateAction} from "react";
import {Edge, Node} from "react-flow-renderer";
import {INodeData} from "../../../interfaces/INodeData";
import CurrentProject from "./CurrentProject";
import CreateProject from "./CreateProject";
import DeleteProject from "./DeleteProject";

interface ProjectToolsProps {
    setNodes: Dispatch<SetStateAction<Node<INodeData>[]>>,
    nodes: Node<INodeData>[],
    edges: Edge[]
}

function ProjectTools(props: ProjectToolsProps) {

    return (
        <>
            <ChangeProject setNodes={props.setNodes} nodes={props.nodes} edges={props.edges} />
            <CurrentProject />
            <CreateProject setNodes={props.setNodes} nodes={props.nodes} edges={props.edges} />
            <DeleteProject setNodes={props.setNodes} />
        </>
    )
}

export default ProjectTools;