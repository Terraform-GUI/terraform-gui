import Button from "@mui/material/Button";
import * as React from "react";
import {useContext} from "react";
import ProjectContext from "../../../contexts/ProjectContext";
import {IProject} from "../../../interfaces/IProject";
import {Node} from "react-flow-renderer";
import {IResourceNodeData} from "../../../interfaces/IResourceNodeData";
import {setUpNodesForSave} from "../../../services/ReactFlowTransformer";

interface SaveProjectProps {
    secondaryAction?: Function,
    nodes: Node<IResourceNodeData>[],
}

function SaveProject(props: SaveProjectProps) {
    const {setIsProjectSaved, setProjectList, currentProject, projectList} = useContext(ProjectContext);

    const handleSave = () => {
        setIsProjectSaved(true);
        currentProject.nodes = props.nodes;

        // TODO nodes to include in the POST request
        const nodes = setUpNodesForSave(props.nodes);

        // TODO save currentProject through api
        if (currentProject.id === null) {
            currentProject.id = (projectList.length + 1).toString(); // TODO insert real id from api
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
            <Button variant="contained" onClick={() => {
                handleSave();
                if (props.secondaryAction) props.secondaryAction();
            }}>SAVE</Button>
        </>
    )
}

export default SaveProject;