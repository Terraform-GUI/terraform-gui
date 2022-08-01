import ChangeProject from "./ChangeProject";
import {Dispatch, SetStateAction} from "react";
import {Node} from "react-flow-renderer";
import {ResourceNodeData} from "../../../interfaces/ResourceNodeData";
import CurrentProject from "./CurrentProject";
import CreateProject from "./CreateProject";
import DeleteProject from "./DeleteProject";

interface ProjectToolsProps {
    setNodes: Dispatch<SetStateAction<Node<ResourceNodeData>[]>>,
}

function ProjectTools(props: ProjectToolsProps) {

    return (
        <>
            <ChangeProject setNodes={props.setNodes} />
            <CurrentProject />
            <CreateProject setNodes={props.setNodes} />
            <DeleteProject />
        </>
    )
}

export default ProjectTools;