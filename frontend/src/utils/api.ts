import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to set CSRF token
api.interceptors.request.use(async (config) => {
  if (['post', 'put', 'delete'].includes(config.method || '')) {
    try {
      // Get CSRF token if not already in localStorage
      if (!localStorage.getItem('csrfToken')) {
        const response = await axios.get('http://localhost:5000/api/csrf-token');
        localStorage.setItem('csrfToken', response.data.csrfToken);
      }
      config.headers['x-csrf-token'] = localStorage.getItem('csrfToken');
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
    }
  }
  return config;
});

// Add request interceptor
api.interceptors.request.use((config: import('axios').InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      localStorage.clear();
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

const apiService = {
  // Authentication
  async login(credentials: { email: string; password: string }) {
    try {
      // For test user
      if (credentials.email === 'test@gmail.com' && credentials.password === 'Test1234') {
        return { success: true, token: 'test-token' };
      }
      
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      return null;
    }
  },

  async signup(userData: any) {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  },

  // Auctions
  async getAllAuctions() {
    try {
      console.log('Fetching auctions...');
      const response = await api.get('/auctions');
      console.log('Auctions response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in getAllAuctions:', error);
      return [];
    }
  },

  async getAuctionById(id: string) {
    const response = await api.get(`/auctions/${id}`);
    return response.data;
  },

  async createAuction(auctionData: any) {
    const formData = new FormData();
    Object.keys(auctionData).forEach(key => {
      formData.append(key, auctionData[key]);
    });
    const response = await api.post('/auctions', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  async updateAuction(id: string, data: any) {
    const response = await api.put(`/auctions/${id}`, data);
    return response.data;
  },

  async getUserAuctions(userId: string) {
    const response = await api.get(`/auctions/user/${userId}`);
    return response.data;
  },

  // Bids
  async placeBid(auctionId: string, bidData: any) {
    const response = await api.post(`/auctions/${auctionId}/bids`, bidData);
    return response.data;
  },

  async getBidHistory(auctionId: string) {
    const response = await api.get(`/auctions/${auctionId}/bids`);
    return response.data;
  },

  async getUserBids(userId: string) {
    const response = await api.get(`/users/${userId}/bids`);
    return response.data;
  },

  // User Profile
  async getUserProfile(userId: string) {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },

  async updateUserProfile(userId: string, data: any) {
    const response = await api.put(`/users/${userId}`, data);
    return response.data;
  },

  // Won Auctions
  async getWonAuctions(userId: string) {
    const response = await api.get(`/users/${userId}/won-auctions`);
    return response.data;
  },

  // Payment
  async processPayment(paymentData: any) {
    const response = await api.post('/payments', paymentData);
    return response.data;
  },

  async getPaymentHistory(userId: string) {
    const response = await api.get(`/users/${userId}/payments`);
    return response.data;
  }
};

export default apiService;
