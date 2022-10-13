import {Button, IconButton, List, ListItem, ListItemButton, ListItemText, ListSubheader, Popover, Tooltip} from "@mui/material";
import React, {Dispatch, SetStateAction, useContext, useState} from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {IProject} from "../../../interfaces/IProject";
import {Edge, Node} from "react-flow-renderer";
import {INodeData} from "../../../interfaces/INodeData";
import SaveProject from "../SaveProject";
import ConfirmDialog from "../../ConfirmDialog";
import ProjectContext from "../../../contexts/ProjectContext";
import {projectService} from "../../../api";

interface ChangeProjectProps {
    setNodes: Dispatch<SetStateAction<Node<INodeData>[]>>
    nodes: Node<INodeData>[]
    edges: Edge[]
    setEdges: Dispatch<SetStateAction<Edge[]>>
}

function ChangeProject(props: ChangeProjectProps) {

    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
    const [projectToSwitch, setProjectToSwitch] = useState<IProject|null>(null);
    const {isProjectSaved, setIsProjectSaved, setCurrentProject, projectList} = useContext(ProjectContext);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const selectProject = (project: IProject) => {
        if (isProjectSaved) {
            switchProject(project);
            return;
        }

        setProjectToSwitch(project);
        setIsDialogOpen(true);
        setIsPopoverOpen(false);
    };

    const switchProject = async (project: IProject) => {
        setIsProjectSaved(true);
        setIsDialogOpen(false);
        setIsPopoverOpen(false);
        setCurrentProject(project);
        props.setNodes(project.nodes);
        props.setEdges(project.edges);

        if (project.id != null) {
            projectService.getHCL(project.id)
                .then((hcl: string | undefined) => {
                    if (typeof hcl === 'string') {
                        project.hcl = hcl;
                        setCurrentProject({
                            ...project,
                            hcl: hcl
                        });
                    }
                });
        }
    }

    return (
        <>
            <Tooltip title="Change project">
                <IconButton aria-label="change project" onClick={(event:any) => {
                    setAnchorEl(event.currentTarget);
                    setIsPopoverOpen(true)
                }}>
                    <ArrowDropDownIcon />
                </IconButton>
            </Tooltip>

            <Popover
                id={"1"}
                open={isPopoverOpen}
                onClose={() => setIsPopoverOpen(false)}
                anchorEl={anchorEl}
            >
                <List
                    sx={{width: "400px"}}
                    component="nav"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Select a project
                        </ListSubheader>
                    }
                >
                    {projectList.map((project: IProject, index: number) => (
                        <div key={index}>
                                <ListItem disablePadding onClick={() => selectProject(project)} >
                                    <ListItemButton>
                                        <ListItemText
                                            primary={project.name}
                                        />
                                    </ListItemButton>
                                </ListItem>
                        </div>
                    ))}

                    {projectList.length === 0 && (
                        <p style={{paddingLeft: '16px'}}>You don't have any other project yet.</p>
                    )}
                </List>
            </Popover>

            <ConfirmDialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                title={'Unsaved project'}
                textContent={`Are you sure you want to switch ${projectToSwitch && `to ${projectToSwitch.name}`} without saving ?`}
                dialogActions={[
                    <Button onClick={() => {
                        if (projectToSwitch) switchProject(projectToSwitch)
                    }}>Change project</Button>,
                    <SaveProject
                        secondaryAction={() => {
                            if (projectToSwitch) switchProject(projectToSwitch)
                        }}
                        nodes={props.nodes}
                        edges={props.edges}
                    />
                ]}
            />
        </>
    )
}

export default ChangeProject;