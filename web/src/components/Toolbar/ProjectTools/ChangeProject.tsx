import {Button, IconButton, List, ListItem, ListItemButton, ListItemText, ListSubheader, Popover, Tooltip} from "@mui/material";
import React, {Dispatch, SetStateAction, useContext, useState} from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {Project} from "../../../interfaces/Project";
import {Node} from "react-flow-renderer";
import {ResourceNodeData} from "../../../interfaces/ResourceNodeData";
import SaveProject from "../SaveProject";
import ConfirmDialog from "../../ConfirmDialog";
import ProjectContext from "../../../contexts/ProjectContext";

interface ChangeProjectProps {
    setNodes: Dispatch<SetStateAction<Node<ResourceNodeData>[]>>,
}

function ChangeProject(props: ChangeProjectProps) {

    const {projectList} = useContext(ProjectContext);

    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
    const [projectToSwitch, setProjectToSwitch] = useState<Project|null>(null);
    const {isProjectSaved, setIsProjectSaved, currentProject, setCurrentProject} = useContext(ProjectContext);

    const selectProject = (project: Project) => {
        if (isProjectSaved) {
            switchProject(project);
            return;
        }

        setProjectToSwitch(project);
        setIsDialogOpen(true);
        setIsPopoverOpen(false);
    };

    const switchProject = (project: Project) => {
        setIsProjectSaved(true);
        setIsDialogOpen(false);
        setIsPopoverOpen(false);
        // TODO load project details from api
        setCurrentProject(project);
        props.setNodes(project.nodes);
    }

    return (
        <>
            <Tooltip title="Change project">
                <IconButton aria-label="change project" onClick={() => setIsPopoverOpen(true)}>
                    <ArrowDropDownIcon />
                </IconButton>
            </Tooltip>

            <Popover
                id={"1"}
                open={isPopoverOpen}
                onClose={() => setIsPopoverOpen(false)}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
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
                    {projectList.map((project: Project, index: number) => (
                        <>
                            {currentProject.id !== project.id && (
                                <ListItem
                                    disablePadding
                                    onClick={() => selectProject(project)}
                                    key={index}
                                >
                                    <ListItemButton>
                                        <ListItemText
                                            primary={project.name}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            )}
                        </>
                    ))}

                    {projectList.length === 0 && (
                        <p style={{paddingLeft: '16px'}}>You don't have any project yet.</p>
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
                    />
                ]}
            />
        </>
    )
}

export default ChangeProject;