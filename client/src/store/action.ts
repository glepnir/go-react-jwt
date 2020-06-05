import storageUtils from '../utils/storage';
import { UserState } from '../types/global';

export const RECEIVE_USER = 'receive_user';
export const RESET_USER = 'reset_user';

interface ReceiveUser {
  type: typeof RECEIVE_USER;
  payload: UserState;
}

interface LogOut {
  type: typeof RESET_USER;
}

export type UserAction = ReceiveUser | LogOut;

export const receiveUser = (user: UserState): UserAction => ({
  type: RECEIVE_USER,
  payload: user,
});

export const logout = () => {
  storageUtils.removeToken();
  return { type: RESET_USER };
};
