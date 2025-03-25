
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
};

// Payment API endpoints - add as needed
export const paymentApi = {
  // Add payment API methods here
};
