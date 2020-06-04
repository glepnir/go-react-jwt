import store from 'store';
import JwtDecode from 'jwt-decode';
import { UserState } from '../types/global';

const USER_KEY = 'user_key';

interface TokenDecode {
  iss: string;
  exp: string;
  userinfo: {
    name: string;
    role: string;
  };
}

export default {
  // Save JWToken
  saveToken(token: string) {
    store.set(USER_KEY, token);
  },
  // Get JWToken
  getToken() {
    return store.get(USER_KEY) || {};
  },
  // Remove JWToken
  removeToken() {
    store.remove(USER_KEY);
  },
  // Get UserInfomation
  getUser(token: string): UserState {
    const decoded = JwtDecode<TokenDecode>(token);
    return {
      name: decoded.userinfo.name,
      role: decoded.userinfo.role,
    };
  },
};
