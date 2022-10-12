import Button from "@mui/material/Button";
import * as React from "react";
import {useContext, useState} from "react";
import ProjectContext from "../../../contexts/ProjectContext";
import {IProject} from "../../../interfaces/IProject";
import {Edge, Node} from "react-flow-renderer";
import {INodeData} from "../../../interfaces/INodeData";
import {setUpNodesForSave} from "../../../services/ReactFlowTransformer";
import {projectService} from "../../../api";
import {ICreateProjectResponse} from "../../../api/ResponseTypes";
import {Box, CircularProgress} from "@mui/material";

interface SaveProjectProps {
    secondaryAction?: Function,
    nodes: Node<INodeData>[],
    edges: Edge[]
}

function SaveProject(props: SaveProjectProps) {
    const {setIsProjectSaved, setProjectList, currentProject, setCurrentProject} = useContext(ProjectContext);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSave = async () => {
        setIsLoading(true);
        setIsProjectSaved(true);
        currentProject.nodes = props.nodes;
        currentProject.edges = props.edges;

        const nodes = setUpNodesForSave(props.nodes);

        if (currentProject.id === null) {
            const savedProject: ICreateProjectResponse | undefined = await projectService.createProject(currentProject.name, nodes, props.edges);
            if (savedProject) {
                currentProject.id = savedProject.project.id;
            }
        } else {
            await projectService.updateProject(currentProject.id, currentProject.name, nodes, props.edges);
        }

        if (currentProject.id != null) {
            const hcl = await projectService.getHCL(currentProject.id);
            if (typeof hcl === 'string') {
                currentProject.hcl = hcl;
                setCurrentProject({
                    ...currentProject,
                    hcl: hcl
                });
            }
        }

        setProjectList((projectList: IProject[]) => {
            let currentProjectIsInProjectList = false;
            // update project from projectList if exist
            const updatedProjectList = projectList.map((project: IProject) => {
                if (project.id === currentProject.id) {
                    currentProjectIsInProjectList = true;
                    return currentProject;
                }

                return project;
            });

            if (currentProjectIsInProjectList) {
                return updatedProjectList;
            }

            return [...projectList, currentProject];
        })
        setIsLoading(false);
    };

    return (
        <Box sx={{ position: 'absolute', right: '20px' }}>
            <Box sx={{ m: 1, position: 'relative' }}>
            <Button
                variant="contained"
                disabled={isLoading}
                onClick={() => {
                    handleSave();
                    if (props.secondaryAction) props.secondaryAction();
                }}
            >
                SAVE
            </Button>
            {isLoading && (
                <CircularProgress
                    size={24}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px',
                    }}
                />
            )}
            </Box>
        </Box>
    )
}

export default SaveProject;