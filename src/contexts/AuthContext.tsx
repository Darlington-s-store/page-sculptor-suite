
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { userService } from '@/services/db';
import { User as DbUser } from '@/services/db/models';

// Frontend User type (without password)
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
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

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check for existing user session on load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);
  
  const login = async (email: string, password: string) => {
    return new Promise<void>((resolve, reject) => {
      // Simulate API call delay
      setTimeout(() => {
        // Find user in database
        const authenticatedUser = userService.authenticateUser(email, password);
        
        if (authenticatedUser) {
          // Remove password from user object
          const { password, ...userWithoutPassword } = authenticatedUser;
          
          // Set user in state and localStorage
          setUser(userWithoutPassword);
          setIsAuthenticated(true);
          localStorage.setItem('user', JSON.stringify(userWithoutPassword));
          
          resolve();
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };
  
  const register = async (firstName: string, lastName: string, email: string, password: string) => {
    return new Promise<void>((resolve, reject) => {
      // Simulate API call delay
      setTimeout(() => {
        // Check if user already exists
        const existingUser = userService.getUserByEmail(email);
        
        if (existingUser) {
          reject(new Error('User already exists'));
          return;
        }
        
        // Create new user
        const newUser = userService.createUser({
          firstName,
          lastName,
          email,
          password,
          phone: '' // Default empty phone
        });
        
        // Remove password from user object
        const { password: _, ...userWithoutPassword } = newUser;
        
        // Set user in state and localStorage
        setUser(userWithoutPassword);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        
        resolve();
      }, 1000);
    });
  };
  
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
  };
  
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
