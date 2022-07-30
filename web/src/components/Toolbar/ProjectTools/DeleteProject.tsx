import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Tooltip
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {Project} from "../../../interfaces/Project";
import {useState} from "react";

interface DeleteProjectProps {
    project: Project
}

function DeleteProject(props: DeleteProjectProps) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        setOpen(false);
        // TODO call api to delete project, then get all projects and load the first one, if there is no project, create a new one
    }

    return (
        <>
            <Tooltip title="Delete project">
                <IconButton aria-label="delete" onClick={handleClickOpen}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Delete project
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete <b>{props.project.name}</b> ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDelete} autoFocus variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DeleteProject;