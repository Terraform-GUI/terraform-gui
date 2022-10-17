import React, { useEffect, useState } from 'react';

import SchemaUI from '../../components/SchemaUI';
import Toolbar from '../../components/Toolbar';
import Description from '../../components/Description';
import { Node, useEdgesState, useNodesState } from 'react-flow-renderer';
import ResourceSidebar from '../../components/ResourceSidebar';
import { IProject } from '../../interfaces/IProject';
import { ProjectProvider } from '../../contexts/ProjectContext';
import { ResourcesProvider } from '../../contexts/ResourcesContext';
import './index.css';
import { IResource } from '../../interfaces/IResource';
import { mergeNodesWithResource } from '../../services/ReactFlowTransformer';
import { INodeData } from '../../interfaces/INodeData';
import { ISavedProject } from '../../interfaces/ISavedProject';
import { projectService, resourceService } from '../../api';
import { Box, CircularProgress, Stack, Card } from '@mui/material';
import BaseLayout from '../../components/Layout/BaseLayout';
import { useNavigate } from 'react-router-dom';

function BuilderPage() {
  const [isProjectSaved, setIsProjectSaved] = useState<boolean>(true);
  const [projectList, setProjectList] = useState<IProject[]>([]);
  const [resources, setResources] = useState<IResource[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const [project, setProject] = useState<IProject>({
    id: null,
    name: 'Unnamed project',
    nodes: [],
    edges: [],
  } as IProject);

  const [nodes, setNodes, onNodesChange] = useNodesState(project.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(project.edges);

  useEffect(() => {
    if (
      !(
        !!localStorage.getItem('access_token') &&
        localStorage.getItem('access_token') != null
      )
    ) {
      navigate('/home');
    }

    const loadResources = async () => {
      const distantResources = await resourceService.getResources();
      if (distantResources !== undefined) {
        setResources(distantResources);
      }

      return distantResources;
    };

    const loadProjects = async () => {
      const projects = await projectService.getProjects();
      return projects ? projects.projects : undefined;
    };

    loadResources().then((distantResources: IResource[] | undefined) => {
      loadProjects().then((savedProjectList: ISavedProject[] | undefined) => {
        if (savedProjectList !== undefined) {
          const onArgumentUpdate = (
            nodeId: string,
            argumentName: string,
            argumentValue: any
          ) => {
            setNodes((nodes: Node<INodeData>[]) =>
              nodes.map((node: Node<INodeData>) => {
                if (node.id === nodeId) {
                  node.data.resource.arguments.map((argument: any) => {
                    if (argument.name === argumentName) {
                      argument.value = argumentValue;
                    }
                  });
                }
                return node;
              })
            );
          };

          const projectList: IProject[] = [];

          // convert SavedProject[] to Project[]
          savedProjectList.map((savedProject: ISavedProject) => {
            projectList.push({
              ...savedProject,
              nodes: mergeNodesWithResource(
                savedProject.nodes,
                distantResources ?? [],
                onArgumentUpdate
              ),
            });
            return project;
          });

          setProjectList(projectList);
          if (projectList.length > 0) {
            setProject(projectList[0]);
            setNodes(projectList[0].nodes);
            setEdges(projectList[0].edges);

            if (projectList[0].id != null) {
              projectService
                .getHCL(projectList[0].id)
                .then((hcl: string | undefined) => {
                  if (typeof hcl === 'string') {
                    projectList[0].hcl = hcl;
                    setProject({
                      ...projectList[0],
                      hcl: hcl,
                    });
                  }
                });
            }
          }
        }
        setIsLoading(false);
      });
    });
  }, []);

  if (isLoading) {
    return (
      <BaseLayout>
        <Box
          height="80vh"
          display="flex"
          alignItems="center"
          flexDirection="row"
          justifyContent="center"
        >
          <CircularProgress />
        </Box>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <ResourcesProvider value={{ resources: resources }}>
        <ProjectProvider
          value={{
            currentProject: project,
            projectList: projectList,
            setCurrentProject: setProject,
            setProjectList: setProjectList,
            isProjectSaved: isProjectSaved,
            setIsProjectSaved: setIsProjectSaved,
          }}
        >
          <Toolbar
            nodes={nodes}
            edges={edges}
            setNodes={setNodes}
            setEdges={setEdges}
          />
          <Stack direction="row" m={2} spacing={2}>
            <Box minWidth="300px">
              <ResourceSidebar nodes={nodes} setNodes={setNodes} />
            </Box>
            <Box flex="auto">
              <Stack direction="column">
                <Card variant="outlined">
                  <Box maxHeight="60vh">
                    <SchemaUI
                      nodes={nodes}
                      edges={edges}
                      setNodes={setNodes}
                      setEdges={setEdges}
                      onNodesChange={onNodesChange}
                      onEdgesChange={onEdgesChange}
                    />
                  </Box>
                </Card>
                <Box p={2} m={2} bgcolor="white">
                  <Description nodes={nodes} />
                </Box>
              </Stack>
            </Box>
          </Stack>
        </ProjectProvider>
      </ResourcesProvider>
    </BaseLayout>
  );
}

export default BuilderPage;
