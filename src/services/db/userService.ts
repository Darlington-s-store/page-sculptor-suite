
import { db, TABLES } from './database';
import { User } from './models';

export const userService = {
  // Get all users
  getAllUsers: (): User[] => {
    return db.findAll<User>(TABLES.USERS);
  },
  
  // Get user by ID
  getUserById: (id: string): User | null => {
    return db.findById<User>(TABLES.USERS, id);
  },
  
  // Get user by email
  getUserByEmail: (email: string): User | null => {
    const users = db.findBy<User>(TABLES.USERS, 'email', email);
    return users.length > 0 ? users[0] : null;
  },
  
  // Create a new user
  createUser: (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User => {
    const newUser: User = {
      ...userData,
      id: `user_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    return db.create<User>(TABLES.USERS, newUser);
  },
  
  // Update user
  updateUser: (id: string, userData: Partial<User>): User | null => {
    // Update the updatedAt timestamp
    const updatedUserData = {
      ...userData,
      updatedAt: new Date().toISOString()
    };
    
    return db.update<User>(TABLES.USERS, id, updatedUserData);
  },
  
  // Authenticate user
  authenticateUser: (email: string, password: string): User | null => {
    const user = userService.getUserByEmail(email);
    
    if (user && user.password === password) {
      // In a real app, you would use proper password comparison
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword as User;
    }
    
    return null;
  }
};
