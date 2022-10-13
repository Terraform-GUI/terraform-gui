import * as React from "react";
import AppBar from "@mui/material/AppBar";
import MuiToolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import ResourceList from "./ResourceList.tsx";
import ProjectTools from "./ProjectTools";
import {Divider} from "@mui/material";
import {Dispatch, SetStateAction} from "react";
import {Edge, Node} from "react-flow-renderer";
import {INodeData} from "../../interfaces/INodeData";
import SaveProject from "./SaveProject";
import ExportProject from "./ExportProject";

interface ToolbarProps {
    setNodes: Dispatch<SetStateAction<Node<INodeData>[]>>,
    nodes: Node<INodeData>[],
    edges: Edge[],
    setEdges: Dispatch<SetStateAction<Edge[]>>,
}

const Toolbar = (props: ToolbarProps) => {
    return (
        <div>
            <AppBar style={{ backgroundColor: "white" }} position="static">
                <Container maxWidth="xl" style={{position: 'relative'}}>
                    <MuiToolbar disableGutters>
                        <ProjectTools setNodes={props.setNodes} nodes={props.nodes} edges={props.edges} setEdges={props.setEdges} />
                        <Divider orientation="vertical" variant="middle" flexItem style={{marginRight: '20px', marginLeft: '20px'}} />
                        <ResourceList />
                        <div style={{position: 'absolute', right: 0, display: 'flex'}}>
                            <ExportProject />
                            <div style={{marginLeft: '20px'}}>
                                <SaveProject nodes={props.nodes} edges={props.edges} />
                            </div>
                        </div>
                    </MuiToolbar>
                </Container>
            </AppBar>
        </div>
    );
};
export default Toolbar;
