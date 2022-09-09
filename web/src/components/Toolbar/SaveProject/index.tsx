import Button from "@mui/material/Button";
import * as React from "react";
import {useContext} from "react";
import ProjectContext from "../../../contexts/ProjectContext";
import {Project} from "../../../interfaces/Project";
import {Node} from "react-flow-renderer";
import {ResourceNodeData} from "../../../interfaces/ResourceNodeData";

interface SaveProjectProps {
    secondaryAction?: Function,
    nodes: Node<ResourceNodeData>[],
}

function SaveProject(props: SaveProjectProps) {
    const {setIsProjectSaved, setProjectList, currentProject, projectList} = useContext(ProjectContext);

    const handleSave = () => {
        setIsProjectSaved(true);
        currentProject.nodes = props.nodes;

        // TODO save currentProject through api
        if (currentProject.id === null) {
            currentProject.id = (projectList.length + 1).toString(); // TODO insert real id from api
        }

        setProjectList((projectList: Project[]) => {
            const currentProjectIsInProjectList = projectList.find((project: Project) => project.id === currentProject.id);
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