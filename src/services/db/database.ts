
// This file simulates a database with localStorage as storage
// In a real application, this would be replaced with actual MySQL queries via an API

// Define table names
export const TABLES = {
  USERS: 'users',
  CARS: 'cars',
  HOTELS: 'hotels',
  TOURS: 'tours',
  BOOKINGS: 'bookings',
  PAYMENTS: 'payments',
};

// Initialize database tables if they don't exist
export const initDatabase = () => {
  // Check if tables exist in localStorage, if not create them
  Object.values(TABLES).forEach(tableName => {
    if (!localStorage.getItem(tableName)) {
      localStorage.setItem(tableName, JSON.stringify([]));
    }
  });
  
  console.log('Database initialized');
};

// Generic database operations
export const db = {
  // Find all records in a table
  findAll: <T>(tableName: string): T[] => {
    const data = localStorage.getItem(tableName);
    return data ? JSON.parse(data) : [];
  },
  
  // Find a record by id
  findById: <T>(tableName: string, id: string): T | null => {
    const data = db.findAll<T>(tableName);
    return data.find((item: any) => item.id === id) || null;
  },
  
  // Find records by a specific field and value
  findBy: <T>(tableName: string, field: string, value: any): T[] => {
    const data = db.findAll<T>(tableName);
    return data.filter((item: any) => item[field] === value);
  },
  
  // Create a new record
  create: <T>(tableName: string, data: T): T => {
    const records = db.findAll<T>(tableName);
    const newRecords = [...records, data];
    localStorage.setItem(tableName, JSON.stringify(newRecords));
    return data;
  },
  
  // Update an existing record
  update: <T>(tableName: string, id: string, data: Partial<T>): T | null => {
    const records = db.findAll<T>(tableName);
    const index = records.findIndex((item: any) => item.id === id);
    
    if (index !== -1) {
      const updatedItem = { ...records[index], ...data };
      records[index] = updatedItem;
      localStorage.setItem(tableName, JSON.stringify(records));
      return updatedItem as T;
    }
    
    return null;
  },
  
  // Delete a record
  delete: (tableName: string, id: string): boolean => {
    const records = db.findAll(tableName);
    const filteredRecords = records.filter((item: any) => item.id !== id);
    
    if (filteredRecords.length !== records.length) {
      localStorage.setItem(tableName, JSON.stringify(filteredRecords));
      return true;
    }
    
    return false;
  },
};
