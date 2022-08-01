import * as React from "react";
import AppBar from "@mui/material/AppBar";
import MuiToolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import ResourceList from "./ResourceList.tsx";
import ProjectTools from "./ProjectTools";
import {Divider} from "@mui/material";
import {Project} from "../../interfaces/Project";
import {Dispatch, SetStateAction, useState} from "react";
import {Node} from "react-flow-renderer";
import {ResourceNodeData} from "../../interfaces/ResourceNodeData";
import SaveProject from "./SaveProject";

interface ToolbarProps {
    project: Project,
    setProject: Dispatch<SetStateAction<Project>>,
    setNodes: Dispatch<SetStateAction<Node<ResourceNodeData>[]>>,
    setIsProjectSaved: Dispatch<SetStateAction<boolean>>,
    isProjectSaved: boolean
}

const Toolbar = (props: ToolbarProps) => {
    return (
        <div>
            <AppBar style={{ backgroundColor: "brown" }} position="static">
                <Container maxWidth="xl">
                    <MuiToolbar disableGutters>
                        <ProjectTools
                            project={props.project}
                            setProject={props.setProject}
                            setNodes={props.setNodes}
                            setIsProjectSaved={props.setIsProjectSaved}
                            isProjectSaved={props.isProjectSaved}
                        />
                        <Divider orientation="vertical" variant="middle" flexItem style={{marginRight: '20px', marginLeft: '20px'}} />
                        <ResourceList />
                        <SaveProject setIsProjectSaved={props.setIsProjectSaved} project={props.project} />
                    </MuiToolbar>
                </Container>
            </AppBar>
        </div>
    );
};
export default Toolbar;
