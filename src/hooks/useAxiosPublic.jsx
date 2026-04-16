import axios from 'axios';
import { isNetworkError } from '../utils/errorParser';
import { toast } from '../utils/toast';

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
});

// ── Response interceptor for public requests ─────────────────────────────────
axiosPublic.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isNetworkError(error) || error.code === 'ECONNABORTED') {
      toast.error('Network error. Please check your connection and try again.', {
        toastId: 'network-error-public',
      });
    }
    return Promise.reject(error);
  },
);

const useAxiosPublic = () => axiosPublic;

export default useAxiosPublic;
