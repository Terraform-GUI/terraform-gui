import * as React from 'react';
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CodeIcon from '@mui/icons-material/Code';
import ResourceList from './ResourceList.tsx';
import ProjectTools from './ProjectTools';
import { Box, Divider, Stack } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { Edge, Node } from 'react-flow-renderer';
import { INodeData } from '../../interfaces/INodeData';
import SaveProject from './SaveProject';
import ExportProject from './ExportProject';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CodeEditor from '../CodeEditor';

interface ToolbarProps {
  edges: Edge[];
  nodes: Node<INodeData>[];
  setEdges: Dispatch<SetStateAction<Edge[]>>;
  setNodes: Dispatch<SetStateAction<Node<INodeData>[]>>;
}
const drawerWidth = 500;

const Toolbar = (props: ToolbarProps) => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => setOpen(true);

  const handleDrawerClose = () => setOpen(false);

  return (
    <div>
      <AppBar style={{ backgroundColor: 'white' }} position="static">
        <Box p={2}>
          <Stack direction="row" justifyContent="space-between">
            <ProjectTools
              setNodes={props.setNodes}
              nodes={props.nodes}
              edges={props.edges}
              setEdges={props.setEdges}
            />

            <Stack direction="row" spacing={2}>
              <ExportProject />
              <SaveProject nodes={props.nodes} edges={props.edges} />
              <IconButton color="inherit" onClick={handleDrawerOpen}>
                <CodeIcon style={{ fill: 'black' }} />
              </IconButton>
            </Stack>
          </Stack>
        </Box>
      </AppBar>
      <AppBar style={{ backgroundColor: 'white' }} position="static">
        <Box p={1}>
          <ResourceList />
        </Box>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
        <Divider />
        <List>
          <CodeEditor />
        </List>
      </Drawer>
    </div>
  );
};
export default Toolbar;
