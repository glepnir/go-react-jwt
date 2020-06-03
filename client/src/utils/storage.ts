import store from 'store';

const USER_KEY = 'user_key';

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
  removeUser() {
    store.remove(USER_KEY);
  },
};
