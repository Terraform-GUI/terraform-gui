import Button from "@mui/material/Button";
import * as React from "react";
import {useContext} from "react";
import ProjectContext from "../../../contexts/ProjectContext";
import {IProject} from "../../../interfaces/IProject";
import {Edge, Node} from "react-flow-renderer";
import {INodeData} from "../../../interfaces/INodeData";
import {setUpNodesForSave} from "../../../services/ReactFlowTransformer";
import {projectService} from "../../../api";
import {ICreateProjectResponse} from "../../../api/ResponseTypes";

interface SaveProjectProps {
    secondaryAction?: Function,
    nodes: Node<INodeData>[],
    edges: Edge[]
}

function SaveProject(props: SaveProjectProps) {
    const {setIsProjectSaved, setProjectList, currentProject, setCurrentProject} = useContext(ProjectContext);

    const handleSave = async () => {
        setIsProjectSaved(true);
        currentProject.nodes = props.nodes;
        currentProject.edges = props.edges;

        const nodes = setUpNodesForSave(props.nodes);

        if (currentProject.id === null) {
            const savedProject: ICreateProjectResponse | undefined = await projectService.createProject(currentProject.name, nodes, props.edges);
            if (savedProject) {
                currentProject.id = savedProject.project.id;
            }
        } else {
            await projectService.updateProject(currentProject.id, currentProject.name, nodes, props.edges);
        }

        if (currentProject.id != null) {
            const hcl = await projectService.getHCL(currentProject.id);
            if (typeof hcl === 'string') {
                currentProject.hcl = hcl;
                setCurrentProject({
                    ...currentProject,
                    hcl: hcl
                });
            }
        }

        setProjectList((projectList: IProject[]) => {
            const currentProjectIsInProjectList = projectList.find((project: IProject) => project.id === currentProject.id);
            if (currentProjectIsInProjectList) {
                return projectList;
            }

            return [...projectList, currentProject];
        })
    };

    return (
        <>
            <Button style={{ position: "absolute", right: "20px" }} variant="contained" onClick={() => {
                handleSave();
                if (props.secondaryAction) props.secondaryAction();
            }}>SAVE</Button>
        </>
    )
}

export default SaveProject;