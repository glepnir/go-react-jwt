import storageUtils from '../utils/storage';
import { UserState } from '../types/global';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const RESET_USER = 'RESET_USER';

interface LoginSuccess {
  type: typeof LOGIN_SUCCESS;
  payload: UserState;
}

interface LoginFailed {
  type: typeof LOGIN_FAILED;
  payload: string;
}

interface LogOut {
  type: typeof RESET_USER;
}

export type UserAction = LoginSuccess | LoginFailed | LogOut;

export const loginSuccess = (user: UserState): UserAction => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailed = (error: string): UserAction => ({
  type: LOGIN_FAILED,
  payload: error,
});

export const logout = () => {
  storageUtils.removeToken();
  return { type: RESET_USER };
};
