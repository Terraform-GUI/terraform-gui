import {createContext, Dispatch, SetStateAction} from "react";
import {Project} from "../interfaces/Project";

interface ProjectContextInterface {
    isProjectSaved: boolean,
    setIsProjectSaved: Dispatch<SetStateAction<boolean>>,
    currentProject: Project;
    setCurrentProject: Dispatch<SetStateAction<Project>>
    projectList: Project[]
    setProjectList: Dispatch<SetStateAction<Project[]>>
}

const ProjectContext = createContext<ProjectContextInterface>(undefined!);

export const ProjectProvider = ProjectContext.Provider;

export default  ProjectContext;