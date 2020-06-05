import { combineReducers } from 'redux';
import { RECEIVE_USER, UserAction } from './action';
import { UserState } from '../types/global';

const initialUser: UserState = { name: '', role: '' };

function user(state = initialUser, action: UserAction): UserState {
  switch (action.type) {
    case RECEIVE_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  user,
});

export type RootState = ReturnType<typeof rootReducer>;
