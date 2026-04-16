/**
 * Central error parser – turns any thrown value (Firebase error, Axios error,
 * plain Error, or unknown) into a single human-readable string.
 */

// ── Firebase auth error codes ────────────────────────────────────────────────
const FIREBASE_MESSAGES = {
  'auth/user-not-found': 'No account found with this email address.',
  'auth/wrong-password': 'Incorrect password. Please try again.',
  'auth/invalid-credential': 'Invalid email or password. Please check your credentials.',
  'auth/invalid-login-credentials': 'Invalid email or password. Please check your credentials.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/email-already-in-use': 'An account with this email already exists. Try signing in instead.',
  'auth/weak-password': 'Password is too weak. Use at least 6 characters.',
  'auth/user-disabled': 'This account has been disabled. Please contact support.',
  'auth/too-many-requests': 'Too many failed attempts. Please wait a moment before trying again.',
  'auth/network-request-failed': 'Network error. Please check your internet connection.',
  'auth/popup-closed-by-user': 'Sign-in popup was closed. Please try again.',
  'auth/popup-blocked': 'Sign-in popup was blocked by your browser. Please allow popups.',
  'auth/cancelled-popup-request': 'Another sign-in is already in progress.',
  'auth/account-exists-with-different-credential': 'An account already exists with a different sign-in method.',
  'auth/operation-not-allowed': 'This sign-in method is not enabled. Please contact support.',
  'auth/requires-recent-login': 'Please sign in again to complete this action.',
  'auth/credential-already-in-use': 'This account is already linked to another user.',
  'auth/provider-already-linked': 'This provider is already linked to your account.',
  'auth/expired-action-code': 'This link has expired. Please request a new one.',
  'auth/invalid-action-code': 'This link is invalid or has already been used.',
};

// ── HTTP status → message ─────────────────────────────────────────────────────
const HTTP_STATUS_MESSAGES = {
  400: 'Invalid request. Please check your input and try again.',
  401: 'Your session has expired. Please sign in again.',
  403: 'You do not have permission to perform this action.',
  404: 'The requested resource was not found.',
  409: 'A conflict occurred. The resource may already exist.',
  422: 'The provided data is invalid. Please correct and retry.',
  429: 'Too many requests. Please slow down and try again shortly.',
  500: 'A server error occurred. Please try again in a moment.',
  502: 'Service is temporarily unavailable. Please try again later.',
  503: 'The server is under maintenance. Please try again later.',
  504: 'The server took too long to respond. Please try again.',
};

// ── Context-specific overrides ────────────────────────────────────────────────
// Pass a `context` string to get a more targeted message for a particular action.
const CONTEXT_MESSAGES = {
  login: {
    401: 'Incorrect email or password. Please try again.',
    404: 'No account found with this email address.',
  },
  register: {
    409: 'An account with this email already exists.',
  },
  enroll: {
    409: 'You are already enrolled in this course.',
    400: 'This course is not currently accepting enrollments.',
  },
  submit_assignment: {
    409: 'You have already submitted this assignment.',
    400: 'The submission deadline has passed.',
  },
  'instructor_apply': {
    409: 'You have already submitted an instructor application.',
  },
};

/**
 * parseApiError(error, context?)
 *
 * @param {unknown} error  - The caught error object
 * @param {string}  context - Optional context key from CONTEXT_MESSAGES
 * @returns {string} Human-readable error message
 */
// Firebase REST API raw message strings → friendly text
const FIREBASE_RAW_MESSAGES = {
  INVALID_LOGIN_CREDENTIALS: 'Invalid email or password. Please check your credentials.',
  EMAIL_NOT_FOUND: 'No account found with this email address.',
  INVALID_PASSWORD: 'Incorrect password. Please try again.',
  USER_DISABLED: 'This account has been disabled. Please contact support.',
  TOO_MANY_ATTEMPTS_TRY_LATER: 'Too many failed attempts. Please wait before trying again.',
  WEAK_PASSWORD: 'Password is too weak. Use at least 6 characters.',
  EMAIL_EXISTS: 'An account with this email already exists.',
};

export const parseApiError = (error, context = '') => {
  if (!error) return 'An unexpected error occurred. Please try again.';

  // ── Firebase ──────────────────────────────────────────────────────────────
  if (error?.code && typeof error.code === 'string' && error.code.startsWith('auth/')) {
    return FIREBASE_MESSAGES[error.code] || `Authentication error: ${error.message || error.code}`;
  }

  // Firebase SDK sometimes puts the raw REST message in error.message (e.g. "INVALID_LOGIN_CREDENTIALS")
  if (error?.message && FIREBASE_RAW_MESSAGES[error.message]) {
    return FIREBASE_RAW_MESSAGES[error.message];
  }

  // ── Axios / HTTP ──────────────────────────────────────────────────────────
  if (error?.response) {
    const status = error.response.status;
    const serverMessage =
      error.response.data?.message ||
      (Array.isArray(error.response.data?.errors) && error.response.data.errors[0]?.message) ||
      null;

    // Context-specific override first
    if (context && CONTEXT_MESSAGES[context]?.[status]) {
      return CONTEXT_MESSAGES[context][status];
    }

    // Use server's own message if it looks human-friendly (not a stack trace)
    if (serverMessage && serverMessage.length < 200 && !serverMessage.includes('\n')) {
      return serverMessage;
    }

    return HTTP_STATUS_MESSAGES[status] || `Request failed (${status}). Please try again.`;
  }

  // ── Network / no response ─────────────────────────────────────────────────
  if (error?.request || error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED') {
    return 'Network error. Please check your internet connection and try again.';
  }

  if (error?.code === 'ECONNREFUSED') {
    return 'Cannot connect to the server. Please try again later.';
  }

  // ── Plain Error ───────────────────────────────────────────────────────────
  if (error instanceof Error) {
    if (error.message && error.message.length < 200) return error.message;
    return 'An unexpected error occurred. Please try again.';
  }

  // ── String ────────────────────────────────────────────────────────────────
  if (typeof error === 'string') return error;

  return 'An unexpected error occurred. Please try again.';
};

/**
 * isAuthError – returns true if the error requires re-authentication
 */
export const isAuthError = (error) => {
  const status = error?.response?.status;
  return status === 401 || status === 403;
};

/**
 * isNetworkError – returns true if the error is a connectivity issue
 */
export const isNetworkError = (error) => {
  return !error?.response && (!!error?.request || error?.code === 'ERR_NETWORK');
};

export default parseApiError;
