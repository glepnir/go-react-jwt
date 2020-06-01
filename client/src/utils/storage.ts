import store from 'store';

const USER_KEY = 'user_key';

export default {
  // Save User
  saveUser(user: any) {
    store.set(USER_KEY, user);
  },
  // Get User
  getUser() {
    return store.get(USER_KEY) || {};
  },
  // Remove User
  removeUser() {
    store.remove(USER_KEY);
  },
};
