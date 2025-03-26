
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
};
