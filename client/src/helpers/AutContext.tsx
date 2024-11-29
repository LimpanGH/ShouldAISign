import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  verifyAuth: () => boolean;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  verifyAuth: () => false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const jwtToken = 'token';

  useEffect(() => {
    // Initialize authentication state on mount
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

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, verifyAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
