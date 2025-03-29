
// API service to connect to the PHP backend

// Define a configurable API URL
// This can be adjusted based on where your PHP API is hosted
export const API_CONFIG = {
  // Default URL - update this to match your PHP server location
  baseUrl: 'http://localhost/travel-api/api',
  // Timeout in milliseconds
  timeout: 10000,
  // Whether to use fallback local data when API is unavailable
  useFallback: true
};

// Helper function to get the auth token
const getToken = () => localStorage.getItem('token');

// Timeout promise for fetch requests
const timeoutPromise = (ms: number) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request timed out after ${ms}ms`));
    }, ms);
  });
};

// Generic API request function with auth header and improved error handling
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
    
    // Use Promise.race to implement timeout
    const response = await Promise.race([
      fetch(`${API_CONFIG.baseUrl}${endpoint}`, {
        ...options,
        headers,
      }),
      timeoutPromise(API_CONFIG.timeout)
    ]);
    
    // Handle unauthorized responses
    if (response.status === 401) {
      console.error('Authentication error: Unauthorized');
      // Could trigger logout here
    }
    
    // Handle other error statuses
    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage;
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || `Server error: ${response.status}`;
      } catch (e) {
        errorMessage = `Server error: ${response.status}`;
      }
      throw new Error(errorMessage);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API request error (${endpoint}):`, error);
    
    // Rethrow the error to be handled by the caller
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
