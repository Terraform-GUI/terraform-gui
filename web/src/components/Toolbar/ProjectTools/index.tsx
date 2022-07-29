import ChangeProject from "./ChangeProject";
import {Project} from "../../../interfaces/Project";
import {Dispatch, SetStateAction} from "react";
import {Node} from "react-flow-renderer";
import {ResourceNodeData} from "../../../interfaces/ResourceNodeData";
import CurrentProject from "./CurrentProject";
import CreateProject from "./CreateProject";

interface ProjectToolsProps {
    project: Project,
    setProject: Dispatch<SetStateAction<Project>>,
    setNodes: Dispatch<SetStateAction<Node<ResourceNodeData>[]>>,
}

function ProjectTools(props: ProjectToolsProps) {
    return (
        <>
            <ChangeProject setProject={props.setProject} setNodes={props.setNodes} project={props.project} />
            <CurrentProject project={props.project} />
            <CreateProject setProject={props.setProject} setNodes={props.setNodes} />
        </>
    )
}

export default ProjectTools;