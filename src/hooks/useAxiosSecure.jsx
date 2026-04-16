import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';
import { isAuthError, isNetworkError } from '../utils/errorParser';
import { toast } from '../utils/toast';

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://elevate-dusky-nine.vercel.app',
  timeout: 15000,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  // ── Request interceptor ──────────────────────────────────────────────────
  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('access-token');
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  // ── Response interceptor ─────────────────────────────────────────────────
  axiosSecure.interceptors.response.use(
    (response) => response,
    async (error) => {
      // Network / timeout – inform but don't logout
      if (isNetworkError(error) || error.code === 'ECONNABORTED') {
        toast.error('Network error. Please check your connection and try again.', {
          toastId: 'network-error',
        });
        return Promise.reject(error);
      }

      const status = error?.response?.status;

      if (status === 401) {
        toast.error('Your session has expired. Please sign in again.', { toastId: 'session-expired' });
        await logOut();
        navigate('/login', { replace: true });
        return Promise.reject(error);
      }

      if (status === 403) {
        toast.error('You do not have permission to perform this action.', {
          toastId: 'forbidden',
        });
        navigate('/login', { replace: true });
        return Promise.reject(error);
      }

      // Pass through so individual callers can handle with context
      return Promise.reject(error);
    },
  );

  return axiosSecure;
};

export default useAxiosSecure;
