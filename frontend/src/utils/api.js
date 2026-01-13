import axios from 'axios';

// Auto-detect API URL based on environment
const getApiBaseURL = () => {
  // If explicitly set in environment, use that
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // If running on mobile/remote device (not localhost), use the host's IP
  const hostname = window.location.hostname;
  if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
    // Extract the IP address from the current URL and use port 5000 for backend
    return `http://${hostname}:5000/api`;
  }
  
  // Default to localhost for local development
  return 'http://localhost:5000/api';
};

const apiBaseURL = getApiBaseURL();
console.log('API Base URL:', apiBaseURL); // Debug: shows which URL is being used

const api = axios.create({
  baseURL: apiBaseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
