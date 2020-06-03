import { combineReducers } from 'redux';
import { RECEIVE_USER, RESET_USER, UserAction } from './action';

const initUser = {};

function user(state = initUser, action: UserAction) {
  switch (action.type) {
    case RECEIVE_USER:
      return {};
    case RESET_USER:
      return {};
    default:
      return state;
  }
}

export default combineReducers({
  user,
});
