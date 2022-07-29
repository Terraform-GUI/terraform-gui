import {IconButton, Tooltip} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {Dispatch, SetStateAction} from "react";
import {Project} from "../../../interfaces/Project";
import {Node} from "react-flow-renderer";
import {ResourceNodeData} from "../../../interfaces/ResourceNodeData";

interface CreateProjectProps {
    setProject: Dispatch<SetStateAction<Project>>
    setNodes: Dispatch<SetStateAction<Node<ResourceNodeData>[]>>,
}

function CreateProject(props: CreateProjectProps) {
    const handleCreate = () => {
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
                <IconButton aria-label="create" onClick={handleCreate}>
                    <AddIcon />
                </IconButton>
            </Tooltip>
        </>
    )
}

export default CreateProject;