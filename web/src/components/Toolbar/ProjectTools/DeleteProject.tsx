import {
    Button,
    IconButton,
    Tooltip
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {Project} from "../../../interfaces/Project";
import React, {useState} from "react";
import ConfirmDialog from "../../ConfirmDialog";

interface DeleteProjectProps {
    project: Project
}

function DeleteProject(props: DeleteProjectProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleDelete = () => {
        setIsDialogOpen(false);
        // TODO call api to delete project, then get all projects and load the first one, if there is no project, create a new one
    }

    return (
        <>
            <Tooltip title="Delete project">
                <IconButton aria-label="delete" onClick={() => setIsDialogOpen(true)}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>

            <ConfirmDialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                title={'Delete project'}
                textContent={`Are you sure you want to delete ${props.project.name} ?`}
                dialogActions={[
                    <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>,
                    <Button onClick={handleDelete} autoFocus variant="contained">
                        Delete
                    </Button>
                ]}
            />
        </>
    )
}

export default DeleteProject;