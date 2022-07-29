import {IconButton, List, ListItem, ListItemButton, ListItemText, ListSubheader, Popover, Tooltip} from "@mui/material";
import React, {Dispatch, SetStateAction} from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {Project} from "../../../interfaces/Project";
import {Node} from "react-flow-renderer";
import {ResourceNodeData} from "../../../interfaces/ResourceNodeData";

interface ChangeProjectProps {
    setProject: Dispatch<SetStateAction<Project>>,
    setNodes: Dispatch<SetStateAction<Node<ResourceNodeData>[]>>,
    project: Project
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

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseWithProject = (project: Project) => {
        props.setProject(project);
        props.setNodes(project.nodes);
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <Tooltip title="Change project">
                <IconButton aria-label="change project" onClick={handleClick}>
                    <ArrowDropDownIcon />
                </IconButton>
            </Tooltip>

            <Popover
                id={"1"}
                open={open}
                onClose={handleClose}
                anchorEl={anchorEl}
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
                                    onClick={() => handleCloseWithProject(project)}
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

        </>
    )
}

export default ChangeProject;