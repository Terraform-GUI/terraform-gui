import {IApiClient} from './ApiClient';
import {ICreateProjectResponse, IDeleteProjectResponse, IGetProjectsResponse} from "./ResponseTypes";
import {Edge, Node} from "react-flow-renderer";
import {ISavedNodeData} from "../interfaces/ISavedNodeData";
import {ISavedProject} from "../interfaces/ISavedProject";

export interface IProjectApiClient {
  getProjects: () => Promise<IGetProjectsResponse | undefined>
  createProject: (name: string, nodes: Node<ISavedNodeData>[], edges: Edge[]) => Promise<ICreateProjectResponse | undefined>
  updateProject: (id: string, name: string, nodes: Node<ISavedNodeData>[], edges: Edge[]) => Promise<ISavedProject | undefined>
  deleteProject: (id: string) => Promise<IDeleteProjectResponse | undefined>
  getArchive: (id: string) => Promise<BlobPart | undefined>
  getHCL: (id: string) => Promise<string | undefined>
}

export class ProjectApiClient implements IProjectApiClient {
  apiClient: IApiClient;

  constructor(projectApiClient: IApiClient) {
    this.apiClient = projectApiClient;
  }

  async getProjects(): Promise<IGetProjectsResponse | undefined> {
    try {
      return await this.apiClient.get('/api/projects');
    } catch (error) {
      console.log(error);
    }
  };

  async createProject(name: string, nodes: Node<ISavedNodeData>[], edges: Edge[]): Promise<ICreateProjectResponse | undefined> {
    try {
      return await this.apiClient.post('/api/projects', {
        name: name,
        nodes: nodes,
        edges: edges
      });
    } catch (error) {
      console.log(error);
    }
  };

  async updateProject(id: string, name: string, nodes: Node<ISavedNodeData>[], edges: Edge[]): Promise<ISavedProject | undefined> {
    try {
      return await this.apiClient.put(`/api/projects/${id}`, {
        name: name,
        nodes: nodes,
        edges: edges
      });
    } catch (error) {
      console.log(error);
    }
  };

  async deleteProject(id: string): Promise<IDeleteProjectResponse | undefined> {
    try {
      return await this.apiClient.delete(`/api/projects/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  async getArchive(id: string): Promise<BlobPart | undefined> {
    try {
      return await this.apiClient.getBlob(`/api/projects/${id}/terraform-archive`);
    } catch (error) {
      console.log(error);
    }
  };

  async getHCL(id: string): Promise<string | undefined> {
    try {
      return await this.apiClient.get(`/api/projects/${id}/terraform`);
    } catch (error) {
      console.log(error);
    }
  };
}

export default class ProjectService {
  projectApiClient: IProjectApiClient;

  constructor(projectApiClient: IProjectApiClient) {
    this.projectApiClient = projectApiClient;
  }

  async getProjects(): Promise<IGetProjectsResponse | undefined> {
    return this.projectApiClient.getProjects();
  }

  async createProject(name: string, nodes: Node<ISavedNodeData>[], edges: Edge[]): Promise<ICreateProjectResponse | undefined> {
    return this.projectApiClient.createProject(name, nodes, edges);
  }

  async updateProject(id: string, name: string, nodes: Node<ISavedNodeData>[], edges: Edge[]): Promise<ISavedProject | undefined> {
    return this.projectApiClient.updateProject(id, name, nodes, edges);
  }

  async deleteProject(id: string): Promise<IDeleteProjectResponse | undefined> {
    return this.projectApiClient.deleteProject(id);
  }

  async getArchive(id: string): Promise<BlobPart | undefined> {
    return this.projectApiClient.getArchive(id);
  }

  async getHCL(id: string): Promise<string | undefined> {
    return this.projectApiClient.getHCL(id);
  }
}