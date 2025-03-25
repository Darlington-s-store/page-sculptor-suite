
import { db, TABLES } from './database';
import { User, Booking, Payment, BookingStatus, PaymentMethod, PaymentStatus } from './models';
import { cars } from '@/data/carsData';
import { hotels } from '@/data/hotelData';
import { tours } from '@/data/tourData';

// Seed database with initial data
export const seedDatabase = () => {
  console.log('Seeding database...');
  
  // Seed users if empty
  const users = db.findAll<User>(TABLES.USERS);
  if (users.length === 0) {
    const seedUsers: User[] = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123', // In a real app, this would be hashed
        phone: '555-123-4567',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        password: 'password123',
        phone: '555-987-6543',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    
    seedUsers.forEach(user => db.create(TABLES.USERS, user));
    console.log('Seeded users');
  }
  
  // Seed cars if empty
  const existingCars = db.findAll(TABLES.CARS);
  if (existingCars.length === 0 && cars) {
    cars.forEach(car => db.create(TABLES.CARS, car));
    console.log('Seeded cars');
  }
  
  // Seed hotels if empty
  const existingHotels = db.findAll(TABLES.HOTELS);
  if (existingHotels.length === 0 && hotels) {
    hotels.forEach(hotel => db.create(TABLES.HOTELS, hotel));
    console.log('Seeded hotels');
  }
  
  // Seed tours if empty
  const existingTours = db.findAll(TABLES.TOURS);
  if (existingTours.length === 0 && tours) {
    tours.forEach(tour => db.create(TABLES.TOURS, tour));
    console.log('Seeded tours');
  }
  
  // Sample bookings and payments (only if none exist)
  const bookings = db.findAll<Booking>(TABLES.BOOKINGS);
  if (bookings.length === 0) {
    // Create a sample booking
    const sampleBooking: Booking = {
      id: '1',
      userId: '1',
      itemId: 'car-1',
      itemType: 'car',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days later
      totalAmount: 135,
      status: BookingStatus.CONFIRMED,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    db.create(TABLES.BOOKINGS, sampleBooking);
    
    // Create a sample payment for this booking
    const samplePayment: Payment = {
      id: '1',
      bookingId: '1',
      userId: '1',
      amount: 135,
      paymentMethod: PaymentMethod.CREDIT_CARD,
      status: PaymentStatus.PAID,
      transactionId: 'txn_123456789',
      paymentDetails: {
        cardLastFour: '4242'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    db.create(TABLES.PAYMENTS, samplePayment);
    console.log('Seeded sample booking and payment');
  }
  
  console.log('Database seeding complete');
};
