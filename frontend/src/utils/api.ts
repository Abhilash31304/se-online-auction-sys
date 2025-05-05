import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
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
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  async signup(userData: any) {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  },

  // Auctions
  async getAllAuctions() {
    const response = await api.get('/auctions');
    return response.data;
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
