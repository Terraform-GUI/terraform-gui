import {
    Button,
    IconButton,
    Tooltip
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import React, {Dispatch, SetStateAction, useState} from "react";
import {Project} from "../../../interfaces/Project";
import {Node} from "react-flow-renderer";
import {ResourceNodeData} from "../../../interfaces/ResourceNodeData";
import SaveProject from "../SaveProject";
import ConfirmDialog from "../../ConfirmDialog";

interface CreateProjectProps {
    setProject: Dispatch<SetStateAction<Project>>
    setNodes: Dispatch<SetStateAction<Node<ResourceNodeData>[]>>,
    project: Project,
    setIsProjectSaved: Dispatch<SetStateAction<boolean>>,
    isProjectSaved: boolean
}

function CreateProject(props: CreateProjectProps) {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const createProject = () => {
        props.setIsProjectSaved(true);
        setIsDialogOpen(false);
        props.setProject({
            id: null,
            name: 'Unnamed project',
            nodes: []
        } as Project);
        props.setNodes([]);
    }
    return (
        <>
            <Tooltip title="Create new project">
                <IconButton aria-label="create" onClick={() => {
                    if (props.isProjectSaved) {
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
                        setIsProjectSaved={props.setIsProjectSaved}
                        project={props.project}
                        secondaryAction={createProject}
                    />
                ]}
            />
        </>
    )
}

export default CreateProject;