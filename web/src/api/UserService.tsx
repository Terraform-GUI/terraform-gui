import { IApiClient } from '../api/ApiClient';
import { IRegisterResponse, ILoginResponse } from './ResponseTypes'

export interface IUserApiClient {
  register: (email: string, password: string, confirm: string) => Promise<IRegisterResponse | undefined>;
  login: (email: string, password: string) => Promise<ILoginResponse | undefined>;
}

export class UserApiClient implements IUserApiClient {
  userApiClient: IApiClient;

  constructor(userApiClient: IApiClient) {
    this.userApiClient = userApiClient;
  }

  async register(email: string, password: string, confirm: string): Promise<IRegisterResponse | undefined> {
    try {
      const response:IRegisterResponse = await this.userApiClient.post('/register', {
        "email" : email,
        "password" : {
            "password" : password,
            "confirm" : confirm,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  
  async login(email: string, password: string): Promise<ILoginResponse | undefined> {
    try {
      const response:ILoginResponse = await this.userApiClient.post('/api/login', {
        "email" : email,
        "password" : password
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
};

export default class UserService {
  userApiClient: IUserApiClient;

  constructor(userApiClient: IUserApiClient) {
    this.userApiClient = userApiClient;
  }

  async register(email: string, password: string, confirm: string): Promise<IRegisterResponse | undefined> {
    return this.userApiClient.register(email, password, confirm);
  }

  async login(email: string, password: string): Promise<ILoginResponse | undefined> {
    return this.userApiClient.login(email, password);
  }
}