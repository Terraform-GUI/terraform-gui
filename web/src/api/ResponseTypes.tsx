export interface IRegisterResponse {
  success: boolean;
}

export interface ILoginResponse {
  token: string;
  refresh_token: string;
}