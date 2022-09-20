import {Button, IconButton, Tooltip} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import React, {Dispatch, SetStateAction, useContext, useState} from "react";
import ConfirmDialog from "../../ConfirmDialog";
import ProjectContext from "../../../contexts/ProjectContext";
import {Project} from "../../../interfaces/Project";
import {Node} from "react-flow-renderer";
import {ResourceNodeData} from "../../../interfaces/ResourceNodeData";

interface DeleteProjectProps {
    setNodes: Dispatch<SetStateAction<Node<ResourceNodeData>[]>>,
}

function DeleteProject(props: DeleteProjectProps) {
    const {setNodes} = props;
    const {currentProject, setCurrentProject, setProjectList} = useContext(ProjectContext);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleDelete = () => {
        const createProject = () => {
            setIsDialogOpen(false);
            setCurrentProject({
                id: null,
                name: 'Unnamed project',
                nodes: []
            } as Project);
            setNodes([]);
        }

        const changeCurrentProject = (updatedProjectList: Project[]) => {
            if (updatedProjectList.length === 0 ) {
                createProject();
                return;
            }

            setCurrentProject(updatedProjectList[0]);
            setNodes(updatedProjectList[0].nodes);
        }

        const updateInterface = () => {
            setIsDialogOpen(false);
            setProjectList((projectList: Project[]) => {
                const updatedProjectList =  projectList.filter((project: Project) => project.id !== currentProject.id);
                changeCurrentProject(updatedProjectList);

                return updatedProjectList;
            });
        }

        updateInterface();

        // TODO call api to delete project
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
                textContent={`Are you sure you want to delete ${currentProject.name} ?`}
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