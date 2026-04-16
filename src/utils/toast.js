/**
 * Thin wrapper around react-toastify for consistent, app-wide notifications.
 * Import { toast } from '@/utils/toast' everywhere instead of react-toastify directly.
 */
import { toast as _toast } from 'react-toastify';

const BASE_OPTIONS = {
  position: 'top-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const toast = {
  success: (msg, opts) =>
    _toast.success(msg, { ...BASE_OPTIONS, autoClose: 3000, ...opts }),

  error: (msg, opts) =>
    _toast.error(msg, { ...BASE_OPTIONS, autoClose: 5000, ...opts }),

  warning: (msg, opts) =>
    _toast.warning(msg, { ...BASE_OPTIONS, autoClose: 4500, ...opts }),

  info: (msg, opts) =>
    _toast.info(msg, { ...BASE_OPTIONS, ...opts }),

  loading: (msg, opts) =>
    _toast.loading(msg, { ...BASE_OPTIONS, autoClose: false, closeOnClick: false, ...opts }),

  dismiss: (id) => _toast.dismiss(id),

  update: (id, opts) => _toast.update(id, { ...BASE_OPTIONS, ...opts }),

  promise: (promise, msgs, opts) =>
    _toast.promise(promise, msgs, { ...BASE_OPTIONS, ...opts }),
};

export default toast;
