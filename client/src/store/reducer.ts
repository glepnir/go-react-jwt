import { combineReducers } from 'redux';
import TokenStorage from '@utils/storage';
import UserModel, { UserState } from '@models/user';
import { connectRouter } from 'connected-react-router';
import history from '@utils/history';
import { LOGIN_SUCCESS, UserAction, LOGIN_FAILED } from './action';

const initialUser = (): UserState => {
  const token = TokenStorage.getToken();
  if (token === null) {
    return { isAuthenticated: false };
  }
  return UserModel.getUser(token);
};

function user(state = initialUser(), action: UserAction): UserState {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, ...action.payload };
    case LOGIN_FAILED:
      TokenStorage.clear();
      return { isAuthenticated: false };
    default:
      return state;
  }
}

const router = connectRouter(history);

export const rootReducer = combineReducers({
  router,
  user,
});

export type RootState = ReturnType<typeof rootReducer>;
