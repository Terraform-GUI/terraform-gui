import * as React from 'react';
import { useContext, useState } from 'react';
import ProjectContext from '../../../contexts/ProjectContext';
import { IProject } from '../../../interfaces/IProject';
import { Edge, Node } from 'react-flow-renderer';
import { INodeData } from '../../../interfaces/INodeData';
import { setUpNodesForSave } from '../../../services/ReactFlowTransformer';
import { projectService } from '../../../api';
import { ICreateProjectResponse } from '../../../api/ResponseTypes';
import LoadingButton from '@mui/lab/LoadingButton';

interface SaveProjectProps {
  secondaryAction?: Function;
  nodes: Node<INodeData>[];
  edges: Edge[];
}

function SaveProject(props: SaveProjectProps) {
  const {
    setIsProjectSaved,
    setProjectList,
    currentProject,
    setCurrentProject,
  } = useContext(ProjectContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSave = async () => {
    setIsLoading(true);
    setIsProjectSaved(true);
    currentProject.nodes = props.nodes;
    currentProject.edges = props.edges;

    const nodes = setUpNodesForSave(props.nodes);

    if (currentProject.id === null) {
      const savedProject: ICreateProjectResponse | undefined =
        await projectService.createProject(
          currentProject.name,
          nodes,
          props.edges
        );
      if (savedProject) {
        currentProject.id = savedProject.project.id;
      }
    } else {
      await projectService.updateProject(
        currentProject.id,
        currentProject.name,
        nodes,
        props.edges
      );
    }

    if (currentProject.id != null) {
      const hcl = await projectService.getHCL(currentProject.id);
      if (typeof hcl === 'string') {
        currentProject.hcl = hcl;
        setCurrentProject({
          ...currentProject,
          hcl: hcl,
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
    });
    setIsLoading(false);
  };

  function handleClick() {
    handleSave();
    if (props.secondaryAction) props.secondaryAction();
  }

  return (
    <LoadingButton
      loading={isLoading}
      variant="contained"
      onClick={handleClick}
    >
      Save
    </LoadingButton>
  );
}

export default SaveProject;
