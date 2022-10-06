import { IApiClient } from '../api/ApiClient';

export interface IUserApiClient {
  register: (email: string, password: string, confirm: string) => Promise<object>;
  login: (email: string, password: string) => Promise<object>;
}

export class UserApiClient implements IUserApiClient {
  userApiClient: IApiClient;

  constructor(userApiClient: IApiClient) {
    this.userApiClient = userApiClient;
  }

  async register(email: string, password: string, confirm: string): Promise<object> {
    try {
      const response:object = await this.userApiClient.post('/register', {
        "email" : email,
        "password" : {
            "password" : password,
            "confirm" : confirm,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      return {error};
    }
  };
  
  async login(email: string, password: string): Promise<object> {
    try {
      const response:object = await this.userApiClient.post('/api/login', {
        "email" : email,
        "password" : password
      });
      return response;
    } catch (error) {
      console.log(error);
      return {error};
    }
  }
};

export default class UserService {
  userApiClient: IUserApiClient;

  constructor(userApiClient: IUserApiClient) {
    this.userApiClient = userApiClient;
  }

  async register(email: string, password: string, confirm: string): Promise<object> {
    return this.userApiClient.register(email, password, confirm);
  }

  async login(email: string, password: string): Promise<object> {
    return this.userApiClient.login(email, password);
  }
}