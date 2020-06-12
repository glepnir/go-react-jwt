import { combineReducers } from 'redux';
import { LOGIN_SUCCESS, UserAction, LOGIN_FAILED } from './action';
import UserModel, { UserState } from '../models/user';
import TokenStorage from '../utils/storage';

const initialUser = (): UserState => {
  const token = TokenStorage.getToken();
  if (token === null) {
    return { isAuthencated: false };
  }
  return UserModel.getUser(token);
};

function user(state = initialUser(), action: UserAction): UserState {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, ...action.payload };
    case LOGIN_FAILED:
      TokenStorage.clear();
      return { isAuthencated: false };
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  user,
});

export type RootState = ReturnType<typeof rootReducer>;
