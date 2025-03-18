import axios from 'axios';
import { getToken, removeToken } from '../utils/localStorage';

// Define the base URL explicitly
const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
console.log('API base URL:', baseURL);

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log('API Request:', {
      method: config.method,
      url: config.url,
      headers: config.headers,
      data: config.data
    });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('API Error:', {
      status: error.response?.status,
      url: error.config?.url,
      data: error.response?.data,
      message: error.message
    });

    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      removeToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;