import Axios, { AxiosInstance } from 'axios';

export interface IApiClient {
  post<TRequest, TResponse>(
    path: string,
    object: TRequest,
  ): Promise<TResponse>;
  put<TRequest, TResponse>(path: string, object: TRequest): Promise<TResponse>;
  get<TResponse>(path: string): Promise<TResponse>;
  delete<TResponse>(path: string): Promise<TResponse>;
}

export default class ApiClient implements IApiClient {
  private client: AxiosInstance;

  protected createAxiosClient(accessToken?: string): AxiosInstance {
    return Axios.create({
      baseURL: 'localhost:8080',
      responseType: 'json' as const,
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken && {
          Authorization: `Token ${accessToken}`,
        }),
      },
      timeout: 10 * 1000,
    });
  }

  constructor(accessToken?: string) {
    this.client = this.createAxiosClient(accessToken);
  }

  async post<TRequest, TResponse>(
    path: string,
    payload: TRequest,
  ): Promise<TResponse> {
    try {
      const response = await this.client.post<TResponse>(path, payload);
      return response.data;
    } catch (error) {
      console.log(error);
    }
    return {} as TResponse;
  }

  async put<TRequest, TResponse>(
    path: string,
    payload: TRequest
  ): Promise<TResponse> {
    try {
      const response = await this.client.put<TResponse>(path, payload);
      return response.data;
    } catch (error) {
      console.log(error);
    }
    return {} as TResponse;
  }

  async get<TResponse>(path: string): Promise<TResponse> {
    try {
      const response = await this.client.get<TResponse>(path);
      return response.data;
    } catch (error) {
      console.log(error);
    }
    return {} as TResponse;
  }

  async delete<TResponse>(path: string): Promise<TResponse> {
    try {
      const response = await this.client.delete<TResponse>(path);
      return response.data;
    } catch (error) {
      console.log(error);
    }
    return {} as TResponse;
  }
}