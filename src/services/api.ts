
// API service to connect to the PHP backend

// Base API URL - change this to your PHP API server's address
const API_BASE_URL = 'http://localhost/travel-api/api';

// Helper function to get the auth token
const getToken = () => localStorage.getItem('token');

// Generic API request function with auth header
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  try {
    const token = getToken();
    const headers = {
      ...options.headers,
      'Content-Type': 'application/json',
    };
    
    // Add auth token if available
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
    
    // Handle unauthorized responses
    if (response.status === 401) {
      // Could trigger a logout action here
      console.error('Authentication error: Unauthorized');
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API request error (${endpoint}):`, error);
    throw error;
  }
};

// User API endpoints
export const userApi = {
  register: async (userData: any) => {
    return apiRequest('/users/create.php', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
  
  login: async (email: string, password: string) => {
    return apiRequest('/users/login.php', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  getAllUsers: async () => {
    return apiRequest('/users/read.php');
  },
  
  getUserById: async (userId: string) => {
    return apiRequest(`/users/read_one.php?id=${userId}`);
  },
  
  updateUser: async (userData: any) => {
    return apiRequest('/users/update.php', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },
  
  deleteUser: async (userId: string) => {
    return apiRequest('/users/delete.php', {
      method: 'DELETE',
      body: JSON.stringify({ id: userId }),
    });
  },
  
  checkAuth: async () => {
    return apiRequest('/users/auth_check.php');
  }
};

// Booking API endpoints
export const bookingApi = {
  createBooking: async (bookingData: any) => {
    return apiRequest('/bookings/create.php', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  },
  
  getUserBookings: async (userId: string) => {
    return apiRequest(`/bookings/read_by_user.php?userId=${userId}`);
  },
  
  getAllBookings: async () => {
    return apiRequest('/bookings/read.php');
  },
  
  getBookingById: async (bookingId: string) => {
    return apiRequest(`/bookings/read_one.php?id=${bookingId}`);
  },
  
  updateBookingStatus: async (bookingId: string, status: string) => {
    return apiRequest('/bookings/update.php', {
      method: 'PUT',
      body: JSON.stringify({ id: bookingId, status }),
    });
  },
  
  deleteBooking: async (bookingId: string) => {
    return apiRequest('/bookings/delete.php', {
      method: 'DELETE',
      body: JSON.stringify({ id: bookingId }),
    });
  },
};

// Payment API endpoints
export const paymentApi = {
  createPayment: async (paymentData: any) => {
    return apiRequest('/payments/create.php', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  },
  
  getPaymentsByBookingId: async (bookingId: string) => {
    return apiRequest(`/payments/read_by_booking.php?bookingId=${bookingId}`);
  },
  
  getAllPayments: async () => {
    return apiRequest('/payments/read.php');
  },
  
  getPaymentById: async (paymentId: string) => {
    return apiRequest(`/payments/read_one.php?id=${paymentId}`);
  },
  
  updatePayment: async (paymentData: any) => {
    return apiRequest('/payments/update.php', {
      method: 'PUT',
      body: JSON.stringify(paymentData),
    });
  },
  
  deletePayment: async (paymentId: string) => {
    return apiRequest('/payments/delete.php', {
      method: 'DELETE',
      body: JSON.stringify({ id: paymentId }),
    });
  },
};

// Admin API endpoints
export const adminApi = {
  getDashboardData: async () => {
    return apiRequest('/admin/dashboard_data.php');
  }
};

// Customer service API
export const customerServiceApi = {
  submitContactForm: async (contactData: any) => {
    return apiRequest('/support/contact.php', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  },
  
  getTickets: async () => {
    return apiRequest('/support/tickets.php');
  },
  
  updateTicket: async (ticketData: any) => {
    return apiRequest('/support/update_ticket.php', {
      method: 'PUT',
      body: JSON.stringify(ticketData),
    });
  },
};
