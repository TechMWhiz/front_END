// In api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // Enable cookies for authentication
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config);
    // Remove Bearer token and use cookie-based authentication
    // const token = localStorage.getItem('auth_token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response);
    return response;
  },
  (error) => {
    console.error('Response interceptor error:', error);
    if (error.response?.status === 401) {
      // Only handle 401 for non-login requests and avoid redirect loops
      if (!error.config?.url?.includes('/login') && !error.config?.url?.includes('/faculty') && !error.config?.url?.includes('/events') && !error.config?.url?.includes('/announcements')) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_role');
        localStorage.removeItem('user_name');
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export const auth = {
  login: (email: string, password: string, userType: string) => 
    api.post('/login', { email, password, user_type: userType }),
  // Add other auth methods as needed
};

export default api;