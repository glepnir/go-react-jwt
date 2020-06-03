import JwtDecode from 'jwt-decode';
import { ThunkAction } from 'redux-thunk';
import storageUtils from '../utils/storage';
import request from '../utils/request';

export const RECEIVE_USER = 'receive_user';
export const RESET_USER = 'reset_user';
export const SHOW_ERROR_MSG = 'show_error_msg';
export const SHOW_SUCCESS_MSG = 'show_success_msg';

export interface LoginFormData {
  username?: string;
  password?: string;
}

export interface LoginResponseData {
  code: string;
  token: string;
  msg: string;
}

interface UserState {
  name: string;
  role: string;
}

interface TokenDecode {
  iss: string;
  exp: string;
  userinfo: {
    name: string;
    role: string;
  };
}

const receiveUser = (user: UserState) => ({
  type: RECEIVE_USER,
  payload: user,
});

const showErrorMsg = (msg: string) => ({
  type: SHOW_ERROR_MSG,
  payload: msg,
});

const showSuccessMsg = (msg: string) => ({
  type: SHOW_SUCCESS_MSG,
  payload: msg,
});

const logout = () => {
  storageUtils.removeUser();
  return { type: RESET_USER };
};

export const login = (
  data: LoginFormData
): ThunkAction<void, UserState, null, UserAction> => {
  return async (dispatch) => {
    const result = (await request(
      '/api/login',
      data,
      'POST'
    )) as LoginResponseData;
    if (result.code === '1') {
      storageUtils.saveToken(result.token);
      const decoded = JwtDecode<TokenDecode>(result.token);
      const user: UserState = {
        name: decoded.userinfo.name,
        role: decoded.userinfo.role,
      };
      dispatch(showSuccessMsg(result.msg));
      dispatch(receiveUser(user));
    } else {
      dispatch(showErrorMsg(result.msg));
    }
  };
};

export type UserAction =
  | ReturnType<typeof receiveUser>
  | ReturnType<typeof logout>;
