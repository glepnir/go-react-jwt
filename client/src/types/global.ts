export interface UserState {
  isAuthencated: boolean;
  name?: string;
  role?: string;
}

export interface LoginResponseData {
  code: string;
  token: string;
  msg: string;
}
