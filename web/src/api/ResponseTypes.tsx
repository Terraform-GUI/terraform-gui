import {ISavedProject} from "../interfaces/ISavedProject";

export interface IRegisterResponse {
  success: boolean;
}

export interface ILoginResponse {
  token: string;
  refresh_token: string;
}

export interface IGithubLoginResponse {
  url: string;
}

export interface IConfirmUserMailResponse {
  success: boolean;
}

export interface IUpdateMailResponse {
  success: boolean;
}
export interface IDeleteAccountResponse {
  success: boolean;
}

export interface IForgotPasswordResponse {
  success: boolean;
}
export interface IResetPasswordResponse {
  success: boolean;
}
export interface IRefreshTokenResponse {
  success: boolean;
}

export interface IGetProjectsResponse {
  projects: ISavedProject[];
}

export interface IDeleteProjectResponse {
  success: boolean;
}

export interface ICreateProjectResponse {
  project: ISavedProject
}