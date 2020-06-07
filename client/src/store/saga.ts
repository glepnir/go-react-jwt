import { take, call, put, fork, cancel } from 'redux-saga/effects';
import fetchLogin from '../services/login';
import storageUtils from '../utils/storage';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  loginSuccess,
  loginFailed,
} from './action';

interface LoginResponseData {
  code: string;
  token: string;
  msg: string;
}

function* LoginRequestSaga(username: string, password: string) {
  try {
    const result = (yield call(
      fetchLogin,
      username,
      password
    )) as LoginResponseData;
    if (result.code === '1') {
      storageUtils.saveToken(result.token);
      const user = storageUtils.getUser(result.token);
      yield put(loginSuccess(user));
    } else {
      yield put(loginFailed(result.msg));
    }
  } catch (err) {
    yield put(loginFailed(err));
  }
}

function* LoginWatcher() {
  while (true) {
    const { username, password } = yield take(LOGIN_REQUEST);
    const task = yield fork(LoginRequestSaga, username, password);
    const action = yield take([LOGIN_SUCCESS, LOGIN_FAILED]);
    if (action.type === LOGIN_SUCCESS) {
      yield cancel(task);
    }
  }
}

export default LoginWatcher;
