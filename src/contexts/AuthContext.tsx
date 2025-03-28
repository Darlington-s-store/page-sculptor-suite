import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { userService } from '@/services/db';

// Frontend User type
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuthStatus: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// API URL - change if needed
const API_URL = 'http://localhost/travel-api/api';

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  
  // Check for existing user session on load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as User;
        setUser(parsedUser);
        setToken(storedToken);
        setIsAuthenticated(true);
        setIsAdmin(parsedUser.role === 'admin');
        
        // Verify token validity with backend
        checkAuthStatus().catch(() => {
          // If backend check fails, maintain session but set offline flag
          setIsOffline(true);
        });
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }, []);
  
  const checkAuthStatus = async (): Promise<boolean> => {
    if (!token) return false;
    
    try {
      const response = await fetch(`${API_URL}/users/auth_check.php`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Auth check failed');
      }
      
      const data = await response.json();
      return true;
    } catch (error) {
      console.error('Auth check error:', error);
      
      // If we can't reach the server but have stored credentials, 
      // we'll use the fallback local storage data
      if (user && token) {
        setIsOffline(true);
        return true;
      }
      
      // Otherwise clear auth state
      logout();
      return false;
    }
  };
  
  const login = async (email: string, password: string) => {
    try {
      // Try to use the real API
      const response = await fetch(`${API_URL}/users/login.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
      
      const data = await response.json();
      
      // Set auth state
      setUser(data.user);
      setToken(data.token);
      setIsAuthenticated(true);
      setIsAdmin(data.user.role === 'admin');
      
      // Store in localStorage
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      
      setIsOffline(false);
    } catch (error) {
      console.error('API login error:', error);
      
      // Fallback to local login in case API is unavailable
      try {
        // Find user in database
        const authenticatedUser = userService.authenticateUser(email, password);
        
        if (authenticatedUser) {
          // Use local authentication as fallback
          const userWithRole = {
            ...authenticatedUser,
            role: email === 'admin@travelgo.com' ? 'admin' : 'user'
          };
          
          // Remove password from user object
          const { password, ...userWithoutPassword } = userWithRole;
          
          // Set user in state and localStorage
          setUser(userWithoutPassword as User);
          setIsAuthenticated(true);
          setIsAdmin(userWithoutPassword.role === 'admin');
          localStorage.setItem('user', JSON.stringify(userWithoutPassword));
          
          // Generate a fake token for offline mode
          const fakeToken = btoa(`${email}:${Date.now()}`);
          setToken(fakeToken);
          localStorage.setItem('token', fakeToken);
          
          setIsOffline(true);
        } else {
          throw new Error('Invalid credentials');
        }
      } catch (fallbackError) {
        console.error('Fallback login error:', fallbackError);
        throw new Error('Login failed. Please check your credentials or network connection.');
      }
    }
  };
  
  const register = async (firstName: string, lastName: string, email: string, password: string) => {
    try {
      // Try to use the real API
      const response = await fetch(`${API_URL}/users/create.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          phone: '',
          role: 'user'
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }
      
      const data = await response.json();
      
      // Set auth state
      setUser(data.user);
      setToken(data.token);
      setIsAuthenticated(true);
      setIsAdmin(data.user.role === 'admin');
      
      // Store in localStorage
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      
      setIsOffline(false);
    } catch (error) {
      console.error('API registration error:', error);
      
      // Fallback to local registration in case API is unavailable
      try {
        // Check if user already exists
        const existingUser = userService.getUserByEmail(email);
        
        if (existingUser) {
          throw new Error('User already exists');
        }
        
        // Create new user
        const newUser = userService.createUser({
          firstName,
          lastName,
          email,
          password,
          phone: '',
          role: 'user'
        });
        
        // Remove password from user object
        const { password: _, ...userWithoutPassword } = newUser;
        
        // Set user in state and localStorage
        setUser({...userWithoutPassword, role: 'user'} as User);
        setIsAuthenticated(true);
        setIsAdmin(false);
        localStorage.setItem('user', JSON.stringify({...userWithoutPassword, role: 'user'}));
        
        // Generate a fake token for offline mode
        const fakeToken = btoa(`${email}:${Date.now()}`);
        setToken(fakeToken);
        localStorage.setItem('token', fakeToken);
        
        setIsOffline(true);
      } catch (fallbackError) {
        console.error('Fallback registration error:', fallbackError);
        throw new Error('Registration failed. Please check your network connection.');
      }
    }
  };
  
  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
  };
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isAdmin,
      token,
      login, 
      register, 
      logout,
      checkAuthStatus
    }}>
      {children}
    </AuthContext.Provider>
  );
};
