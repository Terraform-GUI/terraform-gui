import * as React from "react";
import AppBar from "@mui/material/AppBar";
import MuiToolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import ResourceList from "./ResourceList.tsx";
import ProjectTools from "./ProjectTools";
import {Divider} from "@mui/material";
import {Dispatch, SetStateAction} from "react";
import {Node} from "react-flow-renderer";
import {ResourceNodeData} from "../../interfaces/ResourceNodeData";
import SaveProject from "./SaveProject";

interface ToolbarProps {
    setNodes: Dispatch<SetStateAction<Node<ResourceNodeData>[]>>,
    nodes: Node<ResourceNodeData>[],
}

const Toolbar = (props: ToolbarProps) => {
    return (
        <div>
            <AppBar style={{ backgroundColor: "brown" }} position="static">
                <Container maxWidth="xl">
                    <MuiToolbar disableGutters>
                        <ProjectTools setNodes={props.setNodes} nodes={props.nodes}/>
                        <Divider orientation="vertical" variant="middle" flexItem style={{marginRight: '20px', marginLeft: '20px'}} />
                        <ResourceList />
                        <SaveProject nodes={props.nodes} />
                    </MuiToolbar>
                </Container>
            </AppBar>
        </div>
    );
};
export default Toolbar;
