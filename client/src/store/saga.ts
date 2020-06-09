import { fork, all, take, call, put, cancel } from 'redux-saga/effects';
import { message } from 'antd';
import fetchLogin from '../services/login';
import storageUtils from '../utils/storage';
import { LoginResponseData } from '../types/global';
import {
  loginFailed,
  loginSuccess,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
} from './action';

function* LoginRequestSaga(username: string, password: string) {
  try {
    const result: LoginResponseData = yield call(
      fetchLogin,
      username,
      password
    );
    if (result.code === '1') {
      storageUtils.saveToken(result.token);
      message.success(result.msg);
      const user = storageUtils.getUser(result.token);
      yield put(loginSuccess(user));
    } else {
      message.error(result.msg);
      yield put(loginFailed());
    }
  } catch (err) {
    message.error(err);
    yield put(loginFailed());
  }
}

function* watchLogin() {
  while (true) {
    const { authData } = yield take(LOGIN_REQUEST);
    const task = yield fork(
      LoginRequestSaga,
      authData.username,
      authData.password
    );
    const action = yield take([LOGIN_SUCCESS, LOGIN_FAILED]);
    if (action.type === LOGIN_SUCCESS) {
      yield cancel(task);
    }
  }
}

export default function* rootSaga() {
  yield all([watchLogin()]);
}
