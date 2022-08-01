import {
    Button,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListSubheader,
    Popover,
    Tooltip
} from "@mui/material";
import React, {Dispatch, SetStateAction, useState} from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {Project} from "../../../interfaces/Project";
import {Node} from "react-flow-renderer";
import {ResourceNodeData} from "../../../interfaces/ResourceNodeData";
import SaveProject from "../SaveProject";
import ConfirmDialog from "../../ConfirmDialog";

interface ChangeProjectProps {
    setProject: Dispatch<SetStateAction<Project>>,
    setNodes: Dispatch<SetStateAction<Node<ResourceNodeData>[]>>,
    project: Project,
    isProjectSaved: boolean,
    setIsProjectSaved: Dispatch<SetStateAction<boolean>>
}

function ChangeProject(props: ChangeProjectProps) {
    // TODO get users project from api
    const projects: Project[] = [{
        id: '1',
        name: 'My first project',
        nodes: [{
            id: '1',
            type: 'input',
            data: {
                type: 'RDS',
                label: (
                    'RDS'
                ),
                arguments: [{
                    name: 'IP',
                    value: '127.0.0.1'
                }]
            },
            position: { x: 250, y: 0 },
        },
            {
                id: '2',
                type: 'input',
                data: {
                    type: 'EC2',
                    label: (
                        'EC2'
                    ),
                    arguments: [{
                        name: 'IP',
                        value: '127.0.0.1'
                    }, {
                        name: 'name',
                        value: 'tf-gui-app'
                    }]
                },
                position: { x: 100, y: 100 },
            },
        ]
    },
        {
            id: '2',
            name: 'My second project',
            nodes: [{
                id: '1',
                type: 'input',
                data: {
                    type: 'RDS',
                    label: (
                        'RDS'
                    ),
                    arguments: [{
                        name: 'IP',
                        value: '127.0.0.1'
                    }]
                },
                position: { x: 250, y: 0 },
            }]
        },
        {
            id: '3',
            name: 'My third project',
            nodes: []
        }
    ];

    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
    const [projectToSwitch, setProjectToSwitch] = useState<Project|null>(null);

    const selectProject = (project: Project) => {
        if (props.isProjectSaved) {
            switchProject(project);
            return;
        }

        setProjectToSwitch(project);
        setIsDialogOpen(true);
        setIsPopoverOpen(false);
    };

    const switchProject = (project: Project) => {
        props.setIsProjectSaved(true);
        setIsDialogOpen(false);
        setIsPopoverOpen(false);
        // TODO load project details from api
        props.setProject(project);
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
                    {projects.map((project: Project, index: number) => (
                        <>
                            {props.project.id != project.id && (
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
                        setIsProjectSaved={props.setIsProjectSaved}
                        project={props.project}
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