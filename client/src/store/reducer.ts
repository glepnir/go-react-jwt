import { combineReducers } from 'redux';
import { RECEIVE_USER, RESET_USER, UserAction } from './action';
import { UserState } from '../types/global';

const initialUser: UserState = { name: '', role: '' };

function user(state = initialUser, action: UserAction) {
  switch (action.type) {
    case RECEIVE_USER:
      return action.payload;
    case RESET_USER:
      return {};
    default:
      return state;
  }
}

export default combineReducers({
  user,
});
