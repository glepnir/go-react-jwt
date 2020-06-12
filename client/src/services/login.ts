import request from '../utils/request';
import ILoginResponseData from '../models/login';

async function fetchLogin(username: string, password: string) {
  const result = (await request(
    '/api/login',
    { username, password },
    'POST'
  )) as ILoginResponseData;
  return result;
}

export default fetchLogin;
