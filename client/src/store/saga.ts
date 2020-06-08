import { all, takeLatest, call, put } from 'redux-saga/effects';
import { useHistory } from 'react-router-dom';
import { message } from 'antd';
import fetchLogin from '../services/login';
import storageUtils from '../utils/storage';
import { LoginResponseData } from '../types/global';
import { loginSuccess, loginFailed, LOGIN_REQUEST } from './action';

function* LoginRequestSaga(username: string, password: string) {
  try {
    const history = useHistory();
    const result: LoginResponseData = yield call(
      fetchLogin,
      username,
      password
    );
    if (result.code === '1') {
      message.success(result.msg);
      storageUtils.saveToken(result.token);
      const user = storageUtils.getUser(result.token);
      yield put(loginSuccess(user));
      yield history.push('/home');
    } else {
      yield put(loginFailed(result.msg));
    }
  } catch (err) {
    yield put(loginFailed(err));
  }
}

function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, LoginRequestSaga);
}

export default function* rootSaga() {
  yield all([watchLogin()]);
}
