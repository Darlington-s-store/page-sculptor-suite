
import { db, TABLES } from './database';
import { Payment, PaymentStatus, PaymentMethod } from './models';

export const paymentService = {
  // Get all payments
  getAllPayments: (): Payment[] => {
    return db.findAll<Payment>(TABLES.PAYMENTS);
  },
  
  // Get payment by ID
  getPaymentById: (id: string): Payment | null => {
    return db.findById<Payment>(TABLES.PAYMENTS, id);
  },
  
  // Get payments by user ID
  getPaymentsByUserId: (userId: string): Payment[] => {
    return db.findBy<Payment>(TABLES.PAYMENTS, 'userId', userId);
  },
  
  // Get payments by booking ID
  getPaymentsByBookingId: (bookingId: string): Payment[] => {
    return db.findBy<Payment>(TABLES.PAYMENTS, 'bookingId', bookingId);
  },
  
  // Create a new payment
  createPayment: (paymentData: Omit<Payment, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Payment => {
    const newPayment: Payment = {
      ...paymentData,
      id: `payment_${Date.now()}`,
      status: PaymentStatus.PENDING,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    return db.create<Payment>(TABLES.PAYMENTS, newPayment);
  },
  
  // Update payment
  updatePayment: (id: string, paymentData: Partial<Payment>): Payment | null => {
    // Update the updatedAt timestamp
    const updatedPaymentData = {
      ...paymentData,
      updatedAt: new Date().toISOString()
    };
    
    return db.update<Payment>(TABLES.PAYMENTS, id, updatedPaymentData);
  },
  
  // Update payment status
  updatePaymentStatus: (id: string, status: PaymentStatus): Payment | null => {
    return paymentService.updatePayment(id, { status });
  },
  
  // Process payment - simulates payment processing
  processPayment: (
    bookingId: string, 
    userId: string, 
    amount: number, 
    paymentMethod: PaymentMethod, 
    paymentDetails: any
  ): Promise<Payment> => {
    return new Promise((resolve, reject) => {
      // Simulate async payment processing
      setTimeout(() => {
        try {
          // Create a new pending payment
          const payment = paymentService.createPayment({
            bookingId,
            userId,
            amount,
            paymentMethod,
            paymentDetails
          });
          
          // 90% chance of success for simulation purposes
          const isSuccessful = Math.random() < 0.9;
          
          if (isSuccessful) {
            // Simulate a successful payment
            const updatedPayment = paymentService.updatePayment(payment.id, {
              status: PaymentStatus.PAID,
              transactionId: `txn_${Date.now()}`
            });
            
            resolve(updatedPayment as Payment);
          } else {
            // Simulate a failed payment
            const updatedPayment = paymentService.updatePayment(payment.id, {
              status: PaymentStatus.FAILED
            });
            
            reject(new Error('Payment failed'));
          }
        } catch (error) {
          reject(error);
        }
      }, 1500); // Simulate network delay
    });
  }
};
