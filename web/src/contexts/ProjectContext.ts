import {createContext, Dispatch, SetStateAction} from "react";
import {Project} from "../interfaces/Project";

interface ProjectContext {
    isProjectSaved: boolean,
    setIsProjectSaved: Dispatch<SetStateAction<boolean>>,
    currentProject: Project;
    setCurrentProject: Dispatch<SetStateAction<Project>>
}

const ProjectContext = createContext<ProjectContext>(undefined!);

export const ProjectProvider = ProjectContext.Provider;

export default  ProjectContext;