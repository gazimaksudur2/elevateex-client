import { HiOutlineCheck, HiOutlineX } from 'react-icons/hi';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { parseApiError } from '../../utils/errorParser';
import { toast } from '../../utils/toast';
import { useEffect, useState } from 'react';

const ROLE_BADGES = {
  admin: 'badge-success',
  instructor: 'badge-warning',
  student: 'badge-primary',
  general: 'badge-primary',
};

const User = ({ user }) => {
  const [status, setStatus] = useState({ role: user?.role, admin_status: user?.admin_status });
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    setStatus({ admin_status: user?.admin_status, role: user?.role });
  }, [user]);

  const handleAction = async (action) => {
    const isApprove = action === 'approve';
    const toastId = toast.loading(isApprove ? 'Granting admin access…' : 'Denying request…');
    try {
      await axiosSecure.post(`admin/${action}`, { email: user.email });
      toast.update(toastId, {
        render: isApprove ? 'Admin access granted!' : 'Admin request denied.',
        type: isApprove ? 'success' : 'warning',
        isLoading: false,
        autoClose: 3000,
      });
      setStatus({ admin_status: isApprove ? 'approved' : 'cancelled', role: isApprove ? 'admin' : status.role });
    } catch (err) {
      toast.update(toastId, { render: parseApiError(err), type: 'error', isLoading: false, autoClose: 5000 });
    }
  };

  const roleLabel = status.role === 'general' ? 'Student' : status.role;

  return (
    <tr>
      <td>
        <div className="flex items-center gap-3">
          <img
            className="w-8 h-8 rounded-lg object-cover"
            src={user?.img_url || user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || user?.name || 'U')}&size=32`}
            alt=""
          />
          <div className="min-w-0">
            <p className="text-sm font-medium text-surface-900 truncate">{user?.displayName || user?.name}</p>
            <p className="text-xs text-surface-400 truncate">{user?.email}</p>
          </div>
        </div>
      </td>
      <td>
        <span className={`${ROLE_BADGES[status.role] || 'badge-primary'} capitalize`}>
          {roleLabel}
        </span>
      </td>
      <td className="text-surface-500">
        {status.admin_status === 'pending' && <span className="badge-warning">Pending</span>}
        {status.admin_status === 'approved' && <span className="badge-success">Approved</span>}
        {status.admin_status === 'cancelled' && <span className="badge-danger">Denied</span>}
        {status.admin_status === 'not_attempted' && <span className="text-xs text-surface-400">—</span>}
      </td>
      <td className="text-surface-500">{user?.createdAt || '—'}</td>
      <td>
        {status.admin_status === 'pending' ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleAction('approve')}
              title="Approve admin request"
              className="w-7 h-7 rounded-lg bg-success-50 text-success-600 hover:bg-success-100 flex items-center justify-center transition-colors"
            >
              <HiOutlineCheck className="text-sm" />
            </button>
            <button
              onClick={() => handleAction('cancel')}
              title="Deny admin request"
              className="w-7 h-7 rounded-lg bg-danger-50 text-danger-600 hover:bg-danger-100 flex items-center justify-center transition-colors"
            >
              <HiOutlineX className="text-sm" />
            </button>
          </div>
        ) : null}
      </td>
    </tr>
  );
};

export default User;
