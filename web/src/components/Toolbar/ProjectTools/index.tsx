import ChangeProject from "./ChangeProject";
import {Project} from "../../../interfaces/Project";
import {Dispatch, SetStateAction} from "react";
import {Node} from "react-flow-renderer";
import {ResourceNodeData} from "../../../interfaces/ResourceNodeData";
import CurrentProject from "./CurrentProject";
import CreateProject from "./CreateProject";
import DeleteProject from "./DeleteProject";

interface ProjectToolsProps {
    project: Project,
    setProject: Dispatch<SetStateAction<Project>>,
    setNodes: Dispatch<SetStateAction<Node<ResourceNodeData>[]>>,
    setIsProjectSaved: Dispatch<SetStateAction<boolean>>,
    isProjectSaved: boolean
}

function ProjectTools(props: ProjectToolsProps) {

    return (
        <>
            <ChangeProject
                setProject={props.setProject}
                setNodes={props.setNodes}
                project={props.project}
                setIsProjectSaved={props.setIsProjectSaved}
                isProjectSaved={props.isProjectSaved}
            />
            <CurrentProject
                project={props.project}
                setIsProjectSaved={props.setIsProjectSaved}
            />
            <CreateProject
                setProject={props.setProject}
                setNodes={props.setNodes}
                project={props.project}
                setIsProjectSaved={props.setIsProjectSaved}
                isProjectSaved={props.isProjectSaved}
            />
            <DeleteProject
                project={props.project}
            />
        </>
    )
}

export default ProjectTools;