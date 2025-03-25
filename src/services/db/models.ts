
// Define all database model types for the application

// User model
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string; // In a real app, this would be a hash
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

// Booking status enum
export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed'
}

// Payment method enum
export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  MTN_MOBILE_MONEY = 'mtn_mobile',
  TELECEL_CASH = 'telecel_cash',
  BANK_TRANSFER = 'bank_transfer',
  PAYSTACK = 'paystack'
}

// Payment status enum
export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded'
}

// Booking model
export interface Booking {
  id: string;
  userId: string;
  itemId: string;
  itemType: 'car' | 'hotel' | 'tour';
  startDate: string;
  endDate: string;
  totalAmount: number;
  status: BookingStatus;
  guestCount?: number;
  specialRequests?: string;
  createdAt: string;
  updatedAt: string;
}

// Payment model
export interface Payment {
  id: string;
  bookingId: string;
  userId: string;
  amount: number;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  paymentDetails?: {
    cardLastFour?: string;
    mobileNumber?: string;
    bankReference?: string;
  };
  createdAt: string;
  updatedAt: string;
}
