/**
 * LoadingState – consistent skeleton/spinner for page sections.
 *
 * Usage:
 *   <LoadingState />                         full-screen spinner
 *   <LoadingState size="sm" text="Loading courses..." />
 *   <LoadingState variant="skeleton" rows={4} />
 */
const LoadingState = ({
  size = 'md',
  text = 'Loading…',
  variant = 'spinner',
  rows = 3,
  fullScreen = false,
}) => {
  const sizeMap = { sm: 'w-6 h-6 border-2', md: 'w-10 h-10 border-4', lg: 'w-14 h-14 border-4' };
  const wrapper = fullScreen
    ? 'min-h-screen flex items-center justify-center'
    : 'flex items-center justify-center py-16';

  if (variant === 'skeleton') {
    return (
      <div className="space-y-4 w-full animate-pulse">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex gap-4 items-center">
            <div className="skeleton w-12 h-12 rounded-xl shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="skeleton h-4 rounded w-3/4" />
              <div className="skeleton h-3 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'cards') {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full animate-pulse">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="card-elevated overflow-hidden">
            <div className="skeleton h-44 rounded-none" />
            <div className="p-5 space-y-3">
              <div className="skeleton h-4 rounded w-4/5" />
              <div className="skeleton h-4 rounded w-3/5" />
              <div className="skeleton h-3 rounded w-2/3 mt-2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={wrapper}>
      <div className="flex flex-col items-center gap-3">
        <div
          className={`${sizeMap[size]} border-brand-200 border-t-brand-600 rounded-full animate-spin`}
        />
        {text && <p className="text-sm text-surface-500 font-medium">{text}</p>}
      </div>
    </div>
  );
};

export default LoadingState;
