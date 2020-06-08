import request from '../utils/request';
import { LoginResponseData } from '../types/global';

async function fetchLogin(username: string, password: string) {
  const result = (await request(
    '/api/login',
    { username, password },
    'POST'
  )) as LoginResponseData;
  return result;
}

export default fetchLogin;
