import request from '../utils/request';

function fetchLogin(username: string, password: string) {
  request('/api/login', { username, password }, 'POST');
}

export default fetchLogin;
