
// API service to connect to the PHP backend

// Base API URL - change this to your PHP API server's address
const API_BASE_URL = 'http://localhost/travel-api/api';

// User API endpoints
export const userApi = {
  register: async (userData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/create.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      return await response.json();
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
  
  login: async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/login.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      return await response.json();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  getAllUsers: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/read.php`);
      return await response.json();
    } catch (error) {
      console.error('Get all users error:', error);
      throw error;
    }
  },
  
  getUserById: async (userId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/read_one.php?id=${userId}`);
      return await response.json();
    } catch (error) {
      console.error('Get user error:', error);
      throw error;
    }
  },
  
  updateUser: async (userData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/update.php`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      return await response.json();
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  },
  
  deleteUser: async (userId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/delete.php`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: userId }),
      });
      
      return await response.json();
    } catch (error) {
      console.error('Delete user error:', error);
      throw error;
    }
  },
};

// Booking API endpoints
export const bookingApi = {
  createBooking: async (bookingData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/create.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
      
      return await response.json();
    } catch (error) {
      console.error('Booking creation error:', error);
      throw error;
    }
  },
  
  getUserBookings: async (userId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/read_by_user.php?userId=${userId}`);
      
      return await response.json();
    } catch (error) {
      console.error('Get user bookings error:', error);
      throw error;
    }
  },
  
  getAllBookings: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/read.php`);
      return await response.json();
    } catch (error) {
      console.error('Get all bookings error:', error);
      throw error;
    }
  },
  
  getBookingById: async (bookingId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/read_one.php?id=${bookingId}`);
      return await response.json();
    } catch (error) {
      console.error('Get booking error:', error);
      throw error;
    }
  },
  
  updateBookingStatus: async (bookingId: string, status: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/update.php`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: bookingId, status }),
      });
      
      return await response.json();
    } catch (error) {
      console.error('Update booking status error:', error);
      throw error;
    }
  },
  
  deleteBooking: async (bookingId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/delete.php`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: bookingId }),
      });
      
      return await response.json();
    } catch (error) {
      console.error('Delete booking error:', error);
      throw error;
    }
  },
};

// Payment API endpoints
export const paymentApi = {
  createPayment: async (paymentData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/payments/create.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });
      
      return await response.json();
    } catch (error) {
      console.error('Payment creation error:', error);
      throw error;
    }
  },
  
  getPaymentsByBookingId: async (bookingId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/payments/read_by_booking.php?bookingId=${bookingId}`);
      
      return await response.json();
    } catch (error) {
      console.error('Get payments by booking error:', error);
      throw error;
    }
  },
  
  getAllPayments: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/payments/read.php`);
      return await response.json();
    } catch (error) {
      console.error('Get all payments error:', error);
      throw error;
    }
  },
  
  getPaymentById: async (paymentId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/payments/read_one.php?id=${paymentId}`);
      return await response.json();
    } catch (error) {
      console.error('Get payment error:', error);
      throw error;
    }
  },
  
  updatePayment: async (paymentData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/payments/update.php`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });
      
      return await response.json();
    } catch (error) {
      console.error('Update payment error:', error);
      throw error;
    }
  },
  
  deletePayment: async (paymentId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/payments/delete.php`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: paymentId }),
      });
      
      return await response.json();
    } catch (error) {
      console.error('Delete payment error:', error);
      throw error;
    }
  },
};

// Customer service API
export const customerServiceApi = {
  submitContactForm: async (contactData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/support/contact.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });
      
      return await response.json();
    } catch (error) {
      console.error('Contact form submission error:', error);
      throw error;
    }
  },
  
  getTickets: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/support/tickets.php`);
      return await response.json();
    } catch (error) {
      console.error('Get tickets error:', error);
      throw error;
    }
  },
  
  updateTicket: async (ticketData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/support/update_ticket.php`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketData),
      });
      
      return await response.json();
    } catch (error) {
      console.error('Update ticket error:', error);
      throw error;
    }
  },
};
