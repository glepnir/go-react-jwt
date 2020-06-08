export interface UserState {
  name?: string;
  role?: string;
}

export interface LoginResponseData {
  code: string;
  token: string;
  msg: string;
}
