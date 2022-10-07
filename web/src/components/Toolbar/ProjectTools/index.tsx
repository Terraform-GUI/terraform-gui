import ChangeProject from "./ChangeProject";
import {Dispatch, SetStateAction} from "react";
import {Node} from "react-flow-renderer";
import {IResourceNodeData} from "../../../interfaces/IResourceNodeData";
import CurrentProject from "./CurrentProject";
import CreateProject from "./CreateProject";
import DeleteProject from "./DeleteProject";

interface ProjectToolsProps {
    setNodes: Dispatch<SetStateAction<Node<IResourceNodeData>[]>>,
    nodes: Node<IResourceNodeData>[],
}

function ProjectTools(props: ProjectToolsProps) {

    return (
        <>
            <ChangeProject setNodes={props.setNodes} nodes={props.nodes} />
            <CurrentProject />
            <CreateProject setNodes={props.setNodes} nodes={props.nodes} />
            <DeleteProject setNodes={props.setNodes} />
        </>
    )
}

export default ProjectTools;