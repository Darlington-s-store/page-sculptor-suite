
import { db, TABLES } from './database';
import { Booking, BookingStatus } from './models';

export const bookingService = {
  // Get all bookings
  getAllBookings: (): Booking[] => {
    return db.findAll<Booking>(TABLES.BOOKINGS);
  },
  
  // Get booking by ID
  getBookingById: (id: string): Booking | null => {
    return db.findById<Booking>(TABLES.BOOKINGS, id);
  },
  
  // Get bookings by user ID
  getBookingsByUserId: (userId: string): Booking[] => {
    return db.findBy<Booking>(TABLES.BOOKINGS, 'userId', userId);
  },
  
  // Create a new booking
  createBooking: (bookingData: Omit<Booking, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Booking => {
    const newBooking: Booking = {
      ...bookingData,
      id: `booking_${Date.now()}`,
      status: BookingStatus.PENDING,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    return db.create<Booking>(TABLES.BOOKINGS, newBooking);
  },
  
  // Update booking
  updateBooking: (id: string, bookingData: Partial<Booking>): Booking | null => {
    // Update the updatedAt timestamp
    const updatedBookingData = {
      ...bookingData,
      updatedAt: new Date().toISOString()
    };
    
    return db.update<Booking>(TABLES.BOOKINGS, id, updatedBookingData);
  },
  
  // Update booking status
  updateBookingStatus: (id: string, status: BookingStatus): Booking | null => {
    return bookingService.updateBooking(id, { status });
  },
  
  // Cancel booking
  cancelBooking: (id: string): Booking | null => {
    return bookingService.updateBookingStatus(id, BookingStatus.CANCELLED);
  },
  
  // Confirm booking
  confirmBooking: (id: string): Booking | null => {
    return bookingService.updateBookingStatus(id, BookingStatus.CONFIRMED);
  },
  
  // Complete booking
  completeBooking: (id: string): Booking | null => {
    return bookingService.updateBookingStatus(id, BookingStatus.COMPLETED);
  }
};
