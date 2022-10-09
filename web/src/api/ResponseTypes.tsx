export interface IRegisterResponse {
  success: boolean;
}

export interface ILoginResponse {
  token: string;
  refresh_token: string;
}

export interface IConfirmUserMailResponse {
  success: boolean;
}

export interface IUpdateMailResponse {
  success: boolean;
}