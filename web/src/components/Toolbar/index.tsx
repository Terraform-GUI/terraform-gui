import * as React from "react";
import AppBar from "@mui/material/AppBar";
import MuiToolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ResourceList from "./ResourceList.tsx";
import ProjectTools from "./ProjectTools";
import {Divider} from "@mui/material";
import {Project} from "../../interfaces/Project";
import {Dispatch, SetStateAction} from "react";
import {Node} from "react-flow-renderer";
import {ResourceNodeData} from "../../interfaces/ResourceNodeData";

interface ToolbarProps {
    saves: any,
    project: Project,
    setProject: Dispatch<SetStateAction<Project>>,
    setNodes: Dispatch<SetStateAction<Node<ResourceNodeData>[]>>,
}

const Toolbar = (props: ToolbarProps) => {

  const save = () => {
    props.saves(true);
  };

  return (
    <div>
      <AppBar style={{ backgroundColor: "brown" }} position="static">
        <Container maxWidth="xl">
          <MuiToolbar disableGutters>
                <ProjectTools project={props.project} setProject={props.setProject} setNodes={props.setNodes} />
                <Divider orientation="vertical" variant="middle" flexItem style={{marginRight: '10px'}} />
                <ResourceList />
              <Button onClick={() => save()}>SAVE</Button>
          </MuiToolbar>
        </Container>
      </AppBar>
    </div>
  );
};
export default Toolbar;
