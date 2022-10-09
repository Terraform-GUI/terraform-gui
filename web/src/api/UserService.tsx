import { IApiClient } from '../api/ApiClient';
import { 
  IRegisterResponse, 
  ILoginResponse,
  IConfirmUserMailResponse,
  IUpdateMailResponse,
  IDeleteAccountResponse,
  IForgotPasswordResponse,
  IResetPasswordResponse,
} from './ResponseTypes'

export interface IUserApiClient {
  register: (email: string, password: string, confirm: string) => Promise<IRegisterResponse | undefined>;
  login: (email: string, password: string) => Promise<ILoginResponse | undefined>;
  confirmUserMail: (token: string) => Promise<IConfirmUserMailResponse | undefined>;
  updateMail: (email: string) => Promise<IUpdateMailResponse | undefined>;
  deleteAccount: () => Promise<IDeleteAccountResponse | undefined>;
  forgotPassword: (email: string) => Promise<IForgotPasswordResponse | undefined>;
  resetPassword: (token: string, password: string, confirm: string) => Promise<IResetPasswordResponse | undefined>;
}

export class UserApiClient implements IUserApiClient {
  apiClient: IApiClient;

  constructor(apiClient: IApiClient) {
    this.apiClient = apiClient;
  }

  async register(email: string, password: string, confirm: string): Promise<IRegisterResponse | undefined> {
    try {
      const response:IRegisterResponse = await this.apiClient.post('/register', {
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
      const response:ILoginResponse = await this.apiClient.post('/api/login', {
        "username" : email,
        "password" : password
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  async confirmUserMail(token: string): Promise<IConfirmUserMailResponse | undefined> {
    try {
      const response:IConfirmUserMailResponse = await this.apiClient.post('/users/confirm', {
        "token" : token,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updateMail(email: string): Promise<IUpdateMailResponse | undefined> {
    try {
      const response:IUpdateMailResponse = await this.apiClient.patch('/api/users/email', {
        "email" : email,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAccount(): Promise<IDeleteAccountResponse | undefined> {
    try {
      const response:IDeleteAccountResponse = await this.apiClient.delete('/api/users/delete');
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async forgotPassword(email: string): Promise<IForgotPasswordResponse | undefined> {
    try {
      const response:IForgotPasswordResponse = await this.apiClient.post('password/forget', {
        "email" : email,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async resetPassword(token: string, password: string, confirm: string): Promise<IResetPasswordResponse | undefined> {
    try {
      const response:IResetPasswordResponse = await this.apiClient.post('password/reset', {
        "token" : token,
        "password" : {
          "password" : password,
          "confirm" : confirm,
        },
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

  async confirmUserMail(token: string): Promise<IConfirmUserMailResponse | undefined> {
    return this.userApiClient.confirmUserMail(token);
  }

  async updateMail(email: string): Promise<IUpdateMailResponse | undefined> {
    return this.userApiClient.updateMail(email);
  }

  async deleteAccount(): Promise<IDeleteAccountResponse | undefined> {
    return this.userApiClient.deleteAccount();
  }

  async forgotPassword(email: string): Promise<IForgotPasswordResponse | undefined> {
    return this.userApiClient.forgotPassword(email);
  }

  async resetPassword(token: string, password: string, confirm: string): Promise<IResetPasswordResponse | undefined> {
    return this.userApiClient.resetPassword(token, password, confirm);
  }
}