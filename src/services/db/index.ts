
import { initDatabase } from './database';
import { seedDatabase } from './seeds';
import { userService } from './userService';
import { bookingService } from './bookingService';
import { paymentService } from './paymentService';

// Initialize the database on application load
initDatabase();
seedDatabase();

// Export all database services
export {
  userService,
  bookingService,
  paymentService
};

// Export types for use throughout the application
export * from './models';
