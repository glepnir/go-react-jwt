import { UserState } from '../models/user';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const RESET_USER = 'RESET_USER';

interface LoginRequest {
  type: typeof LOGIN_REQUEST;
  authData: {
    username: string;
    password: string;
  };
}

interface LoginSuccess {
  type: typeof LOGIN_SUCCESS;
  payload: UserState;
}

interface LoginFailed {
  type: typeof LOGIN_FAILED;
}

interface LogOut {
  type: typeof RESET_USER;
}

export type UserAction = LoginRequest | LoginSuccess | LoginFailed | LogOut;

export const loginRequest = (
  username: string,
  password: string
): UserAction => ({
  type: LOGIN_REQUEST,
  authData: {
    username,
    password,
  },
});

export const loginSuccess = (user: UserState): UserAction => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailed = (): UserAction => ({
  type: LOGIN_FAILED,
});

export const logout = () => {
  return { type: RESET_USER };
};
