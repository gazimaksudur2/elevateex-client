import { HiOutlineBookOpen } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const EmptyEnrollment = ({ info, actionLabel, actionTo }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-20 h-20 bg-surface-100 rounded-2xl flex items-center justify-center mb-5">
        <HiOutlineBookOpen className="text-3xl text-surface-400" />
      </div>
      <h3 className="text-lg font-semibold text-surface-900 mb-1">Nothing here yet</h3>
      <p className="text-sm text-surface-500 max-w-sm mb-6">{info}</p>
      {actionLabel && actionTo && (
        <Link to={actionTo} className="btn-primary text-sm py-2.5 px-6">
          {actionLabel}
        </Link>
      )}
    </div>
  );
};

export default EmptyEnrollment;
