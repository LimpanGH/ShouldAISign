import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  userId: string;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  verifyAuth: () => boolean;
  getUserId: () => string | null;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  verifyAuth: () => false,
  getUserId: () => null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const jwtToken = 'token';

  useEffect(() => {
    const token = localStorage.getItem(jwtToken);
    setIsAuthenticated(!!token);
  }, []);

  const login = (token: string) => {
    localStorage.setItem(jwtToken, token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem(jwtToken);
    setIsAuthenticated(false);
  };

  const verifyAuth = useCallback(() => {
    const token = localStorage.getItem(jwtToken);
    return !!token;
  }, []);

  const getUserId = useCallback(() => {
    const token = localStorage.getItem(jwtToken);
    if (!token) return null;

    try {
      const decoded: DecodedToken = jwtDecode(token);
      return decoded.userId;
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, verifyAuth, getUserId }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
