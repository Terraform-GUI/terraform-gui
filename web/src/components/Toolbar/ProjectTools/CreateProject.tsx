import {Button, IconButton, Tooltip} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import React, {Dispatch, SetStateAction, useContext, useState} from "react";
import {IProject} from "../../../interfaces/IProject";
import {Node} from "react-flow-renderer";
import {IResourceNodeData} from "../../../interfaces/IResourceNodeData";
import SaveProject from "../SaveProject";
import ConfirmDialog from "../../ConfirmDialog";
import ProjectContext from "../../../contexts/ProjectContext";

interface CreateProjectProps {
    setNodes: Dispatch<SetStateAction<Node<IResourceNodeData>[]>>,
    nodes: Node<IResourceNodeData>[],
}

function CreateProject(props: CreateProjectProps) {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const {setCurrentProject, setIsProjectSaved, isProjectSaved} = useContext(ProjectContext);

    const createProject = () => {
        setIsProjectSaved(true);
        setIsDialogOpen(false);
        setCurrentProject({
            id: null,
            name: 'Unnamed project',
            nodes: []
        } as IProject);
        props.setNodes([]);
    }
    return (
        <>
            <Tooltip title="Create new project">
                <IconButton aria-label="create" onClick={() => {
                    if (isProjectSaved) {
                        createProject();
                        return;
                    }

                    setIsDialogOpen(true);
                }}>
                    <AddIcon />
                </IconButton>
            </Tooltip>

            <ConfirmDialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                title={'Unsaved changes'}
                textContent={'Are you sure you want to create a new project without saving'}
                dialogActions={[
                    <Button onClick={createProject}>Create project</Button>,
                    <SaveProject
                        secondaryAction={createProject}
                        nodes={props.nodes}
                    />
                ]}
            />
        </>
    )
}

export default CreateProject;