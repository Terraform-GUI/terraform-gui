import Button from "@mui/material/Button";
import * as React from "react";
import {useContext} from "react";
import ProjectContext from "../../../contexts/ProjectContext";
import {IProject} from "../../../interfaces/IProject";
import {Edge, Node} from "react-flow-renderer";
import {INodeData} from "../../../interfaces/INodeData";
import {setUpNodesForSave} from "../../../services/ReactFlowTransformer";
import {projectService} from "../../../api";
import {ISavedProject} from "../../../interfaces/ISavedProject";

interface SaveProjectProps {
    secondaryAction?: Function,
    nodes: Node<INodeData>[],
    edges: Edge[]
}

function SaveProject(props: SaveProjectProps) {
    const {setIsProjectSaved, setProjectList, currentProject} = useContext(ProjectContext);

    const handleSave = async () => {
        setIsProjectSaved(true);
        currentProject.nodes = props.nodes;

        const nodes = setUpNodesForSave(props.nodes);

        // TODO save currentProject through api
        if (currentProject.id === null) {
            const savedProject: ISavedProject | undefined = await projectService.createProject(currentProject.name, nodes, props.edges);
            if (savedProject) {
                currentProject.id = savedProject.id;
            }
        } else {
            await projectService.updateProject(currentProject.id, currentProject.name, nodes, props.edges);
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