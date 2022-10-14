import { ListItem, TextField } from '@mui/material';
import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import ProjectContext from '../../../contexts/ProjectContext';
import DeleteProject from './DeleteProject';
import { Node } from 'react-flow-renderer';
import { INodeData } from '../../../interfaces/INodeData';

interface CurrentProjectProps {
  setNodes: Dispatch<SetStateAction<Node<INodeData>[]>>;
}

function CurrentProject(props: CurrentProjectProps) {
  const { currentProject, setIsProjectSaved } = useContext(ProjectContext);
  const [projectName, setProjectName] = useState<string>(currentProject.name);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(event.target.value);
    setIsProjectSaved(false);
    currentProject.name = event.target.value;
  };

  return (
    <ListItem>
      <TextField
        variant="standard"
        id="standard-basic"
        label="Current project"
        onChange={handleChange}
        value={currentProject.name}
      />
      <DeleteProject setNodes={props.setNodes} />
    </ListItem>
  );
}

export default CurrentProject;
