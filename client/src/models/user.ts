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
  isAuthenticated: boolean;
  name?: string;
  role?: string;
}

// Get UserInformation
export default {
  getUser(token: string): UserState {
    const decoded = JwtDecode<TokenDecode>(token);
    return {
      isAuthenticated: true,
      name: decoded.userinfo.Name,
      role: decoded.userinfo.Role,
    };
  },
};
