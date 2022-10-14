import * as React from 'react';
import ChangeProject from './ChangeProject';
import { Dispatch, SetStateAction } from 'react';
import { Edge, Node } from 'react-flow-renderer';
import { INodeData } from '../../../interfaces/INodeData';
import CurrentProject from './CurrentProject';
import CreateProject from './CreateProject';

import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import Drawer from '@mui/material/Drawer';

import BackupTableIcon from '@mui/icons-material/BackupTable';

interface ProjectToolsProps {
  setNodes: Dispatch<SetStateAction<Node<INodeData>[]>>;
  nodes: Node<INodeData>[];
  edges: Edge[];
  setEdges: Dispatch<SetStateAction<Edge[]>>;
}
const drawerWidth = 300;

function ProjectTools(props: ProjectToolsProps) {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => setOpen(true);

  const handleDrawerClose = () => setOpen(false);

  return (
    <>
      <IconButton color="inherit" onClick={handleDrawerOpen}>
        <BackupTableIcon style={{ fill: 'black' }} />
      </IconButton>

      <Drawer
        open={open}
        anchor="left"
        variant="persistent"
        sx={{
          flexShrink: 0,
          width: drawerWidth,
          '& .MuiDrawer-paper': { width: drawerWidth },
        }}
      >
        <IconButton onClick={handleDrawerClose}>
          <ChevronRightIcon />
        </IconButton>
        <CurrentProject setNodes={props.setNodes} />

        <ChangeProject
          nodes={props.nodes}
          edges={props.edges}
          setNodes={props.setNodes}
          setEdges={props.setEdges}
        />
        <CreateProject
          nodes={props.nodes}
          edges={props.edges}
          setNodes={props.setNodes}
        />
      </Drawer>
    </>
  );
}

export default ProjectTools;
