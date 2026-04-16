import { HiOutlineExclamationCircle, HiOutlineRefresh, HiOutlineWifi } from 'react-icons/hi';

/**
 * ErrorState – displays a user-friendly error with optional retry action.
 *
 * Usage:
 *   <ErrorState />                                   generic error
 *   <ErrorState message="Could not load courses." />
 *   <ErrorState type="network" onRetry={refetch} />
 *   <ErrorState type="auth" />
 */
const ErrorState = ({
  type = 'generic',
  message,
  onRetry,
  compact = false,
}) => {
  const configs = {
    generic: {
      icon: HiOutlineExclamationCircle,
      iconClass: 'text-danger-500',
      bgClass: 'bg-danger-50',
      title: 'Something went wrong',
      defaultMessage: 'An unexpected error occurred. Please try again.',
    },
    network: {
      icon: HiOutlineWifi,
      iconClass: 'text-warning-500',
      bgClass: 'bg-warning-50',
      title: 'No connection',
      defaultMessage: 'Unable to reach the server. Check your internet connection.',
    },
    auth: {
      icon: HiOutlineExclamationCircle,
      iconClass: 'text-brand-500',
      bgClass: 'bg-brand-50',
      title: 'Session expired',
      defaultMessage: 'Your session has expired. Please sign in again.',
    },
    empty: {
      icon: HiOutlineExclamationCircle,
      iconClass: 'text-surface-400',
      bgClass: 'bg-surface-50',
      title: 'Nothing here yet',
      defaultMessage: 'No data is available for this section.',
    },
  };

  const cfg = configs[type] || configs.generic;
  const displayMessage = message || cfg.defaultMessage;

  if (compact) {
    return (
      <div className={`flex items-start gap-3 p-4 rounded-xl ${cfg.bgClass} border border-current/10`}>
        <cfg.icon className={`${cfg.iconClass} text-xl shrink-0 mt-0.5`} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-surface-900">{cfg.title}</p>
          <p className="text-sm text-surface-500 mt-0.5">{displayMessage}</p>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="shrink-0 flex items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-700"
          >
            <HiOutlineRefresh className="text-sm" />
            Retry
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className={`w-16 h-16 ${cfg.bgClass} rounded-2xl flex items-center justify-center mb-4`}>
        <cfg.icon className={`${cfg.iconClass} text-2xl`} />
      </div>
      <h3 className="text-lg font-semibold text-surface-900 mb-1">{cfg.title}</h3>
      <p className="text-sm text-surface-500 max-w-sm">{displayMessage}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-secondary mt-6 text-sm py-2 px-5">
          <HiOutlineRefresh />
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;
