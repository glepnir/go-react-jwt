import JwtDecode from 'jwt-decode';

interface TokenDecode {
  iss: string;
  exp: string;
  userinfo: {
    Name: string;
    Role: string;
  };
}

export interface UserState {
  isAuthencated: boolean;
  name?: string;
  role?: string;
}

// Get UserInfomation
export default {
  getUser(token: string): UserState {
    const decoded = JwtDecode<TokenDecode>(token);
    return {
      isAuthencated: true,
      name: decoded.userinfo.Name,
      role: decoded.userinfo.Role,
    };
  },
};
