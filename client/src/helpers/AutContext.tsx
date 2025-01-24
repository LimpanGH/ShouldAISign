import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { jwtDecode } from 'jwt-decode';
import { set } from 'react-hook-form';

interface DecodedToken {
  userId: string;
  name: string;
}

interface User {
  userId: string;
  name: string;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  verifyAuth: () => boolean;
  getUserId: () => string | null;
  user: User | null;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  verifyAuth: () => false,
  getUserId: () => null,
  user: null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const jwtToken = 'token';

  useEffect(() => {
    const token = localStorage.getItem(jwtToken);
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        // console.log('Decoded Token during initialization:', decoded); // Log here

        setIsAuthenticated(true);
        setUser({ userId: decoded.userId, name: decoded.name });
      } catch (error) {
        console.error('Failed to decode token during initailization:', error);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = (token: string) => {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      // console.log('Decoded Token:', decoded); // Log decoded token

      localStorage.setItem(jwtToken, token);
      setIsAuthenticated(true);
      setUser({ userId: decoded.userId, name: decoded.name });
    } catch (error) {
      console.error('Failed to decode token:', error);
    }
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
      value={{ isAuthenticated, login, logout, verifyAuth, getUserId, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
