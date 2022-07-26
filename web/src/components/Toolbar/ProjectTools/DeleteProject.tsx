import {Button, IconButton, Tooltip} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import React, {Dispatch, SetStateAction, useContext, useState} from "react";
import ConfirmDialog from "../../ConfirmDialog";
import ProjectContext from "../../../contexts/ProjectContext";
import {IProject} from "../../../interfaces/IProject";
import {Node} from "react-flow-renderer";
import {INodeData} from "../../../interfaces/INodeData";
import {projectService} from "../../../api";

interface DeleteProjectProps {
    setNodes: Dispatch<SetStateAction<Node<INodeData>[]>>,
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
                nodes: [],
                edges: []
            } as IProject);
            setNodes([]);
        }

        const changeCurrentProject = (updatedProjectList: IProject[]) => {
            if (updatedProjectList.length === 0 ) {
                createProject();
                return;
            }

            setCurrentProject(updatedProjectList[0]);
            setNodes(updatedProjectList[0].nodes);
        }

        const updateInterface = () => {
            setIsDialogOpen(false);
            setProjectList((projectList: IProject[]) => {
                const updatedProjectList =  projectList.filter((project: IProject) => project.id !== currentProject.id);
                changeCurrentProject(updatedProjectList);

                return updatedProjectList;
            });
        }

        updateInterface();

        const deleteProject = async () => {
            if (currentProject.id) {
                return await projectService.deleteProject(currentProject.id);
            }
        }

        deleteProject();
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