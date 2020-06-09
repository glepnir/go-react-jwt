import { combineReducers } from 'redux';
import { LOGIN_SUCCESS, UserAction, LOGIN_FAILED } from './action';
import { UserState } from '../types/global';
import storageUtils from '../utils/storage';

const initialUser = (): UserState => {
  const token = storageUtils.getToken();
  if (token === undefined) {
    return { isAuthencated: false };
  }
  return storageUtils.getUser(token);
};

function user(state = initialUser(), action: UserAction): UserState {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, ...action.payload };
    case LOGIN_FAILED:
      storageUtils.removeToken();
      return { isAuthencated: false };
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  user,
});

export type RootState = ReturnType<typeof rootReducer>;
