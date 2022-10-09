import {IApiClient} from './ApiClient';
import {IResource} from "../interfaces/IResource";

export interface IResourceApiClient {
  getResources: () => Promise<IResource[] | undefined>;
}

export class ResourceApiClient implements IResourceApiClient {
  apiClient: IApiClient;

  constructor(resourceApiClient: IApiClient) {
    this.apiClient = resourceApiClient;
  }

  async getResources(): Promise<IResource[] | undefined> {
    try {
      return await this.apiClient.get('/resources/aws');
    } catch (error) {
      console.log(error);
    }
  };
}

export default class ResourceService {
  resourceApiClient: IResourceApiClient;

  constructor(resourceApiClient: IResourceApiClient) {
    this.resourceApiClient = resourceApiClient;
  }

  async getResources(): Promise<IResource[] | undefined> {
    return this.resourceApiClient.getResources();
  }
}