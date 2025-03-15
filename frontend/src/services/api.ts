import axios from 'axios';
import { auth } from './supabase';

// Create an axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add auth token to requests
api.interceptors.request.use(
  async (config) => {
    const { data } = await auth.getSession();
    if (data?.session?.access_token) {
      config.headers.Authorization = `Bearer ${data.session.access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// User API calls
export const userApi = {
  register: async (userData: any) => {
    try {
      const response = await api.post('/users/register', userData);
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data || error.message };
    }
  },

  login: async (credentials: { email: string; password: string }) => {
    try {
      const response = await api.post('/users/login', credentials);
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data || error.message };
    }
  },

  getProfile: async () => {
    try {
      const response = await api.get('/users/profile');
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data || error.message };
    }
  },

  updateProfile: async (profileData: any) => {
    try {
      const response = await api.put('/users/profile', profileData);
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data || error.message };
    }
  },

  resetPassword: async (email: string) => {
    try {
      const response = await api.post('/users/reset-password', { email });
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data || error.message };
    }
  },
};

// Loan API calls
export const loanApi = {
  apply: async (loanData: any) => {
    try {
      const response = await api.post('/loans/apply', loanData);
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data || error.message };
    }
  },

  getAll: async () => {
    try {
      const response = await api.get('/loans');
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data || error.message };
    }
  },

  getById: async (id: string) => {
    try {
      const response = await api.get(`/loans/${id}`);
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data || error.message };
    }
  },

  updateStatus: async (id: string, statusData: any) => {
    try {
      const response = await api.put(`/loans/${id}`, statusData);
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data || error.message };
    }
  },

  uploadDocument: async (loanId: string, documentData: FormData) => {
    try {
      const response = await api.post(
        `/loans/${loanId}/documents`,
        documentData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data || error.message };
    }
  },

  getDocuments: async (loanId: string) => {
    try {
      const response = await api.get(`/loans/${loanId}/documents`);
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data || error.message };
    }
  },
};

export default { userApi, loanApi }; 