import {createContext, Dispatch, SetStateAction} from "react";
import {IProject} from "../interfaces/IProject";

interface ProjectContextInterface {
    isProjectSaved: boolean,
    setIsProjectSaved: Dispatch<SetStateAction<boolean>>,
    currentProject: IProject;
    setCurrentProject: Dispatch<SetStateAction<IProject>>
    projectList: IProject[]
    setProjectList: Dispatch<SetStateAction<IProject[]>>
}

const ProjectContext = createContext<ProjectContextInterface>(undefined!);

export const ProjectProvider = ProjectContext.Provider;

export default  ProjectContext;