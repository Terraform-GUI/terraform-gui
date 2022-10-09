import * as React from "react";
import AppBar from "@mui/material/AppBar";
import MuiToolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import ResourceList from "./ResourceList.tsx";
import ProjectTools from "./ProjectTools";
import {Divider} from "@mui/material";
import {Dispatch, SetStateAction} from "react";
import {Node} from "react-flow-renderer";
import {IResourceNodeData} from "../../interfaces/IResourceNodeData";
import SaveProject from "./SaveProject";

interface ToolbarProps {
    setNodes: Dispatch<SetStateAction<Node<IResourceNodeData>[]>>,
    nodes: Node<IResourceNodeData>[],
}

const Toolbar = (props: ToolbarProps) => {
    return (
        <div>
            <AppBar style={{ backgroundColor: "white" }} position="static">
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
