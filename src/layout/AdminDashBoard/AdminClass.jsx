import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineEye, HiOutlineCheck, HiOutlineX } from 'react-icons/hi';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { parseApiError } from '../../utils/errorParser';
import { toast } from '../../utils/toast';

const AdminClass = ({ course }) => {
  const [status, setStatus] = useState(course?.course_status);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleAction = async (action) => {
    const isApprove = action === 'approve';
    const toastId = toast.loading(isApprove ? 'Approving…' : 'Rejecting…');
    try {
      await axiosSecure.post(`allclasses/${action}`, { _id: course?._id });
      toast.update(toastId, {
        render: isApprove ? 'Course approved!' : 'Course rejected.',
        type: isApprove ? 'success' : 'warning',
        isLoading: false,
        autoClose: 3000,
      });
      setStatus(isApprove ? 'approved' : 'cancelled');
    } catch (err) {
      toast.update(toastId, { render: parseApiError(err), type: 'error', isLoading: false, autoClose: 5000 });
    }
  };

  return (
    <tr>
      <td>
        <div className="max-w-xs">
          <p className="text-sm font-medium text-surface-900 truncate">{course?.course_title}</p>
          <p className="text-xs text-surface-400 line-clamp-1">{course?.course_description?.slice(0, 100)}</p>
        </div>
      </td>
      <td>
        <div className="flex items-center gap-2.5">
          <img className="w-8 h-8 rounded-lg object-cover" src={course?.instructor_url} alt="" />
          <div className="min-w-0">
            <p className="text-sm font-medium text-surface-900 truncate">{course?.instructor}</p>
            <p className="text-xs text-surface-400 truncate">{course?.instructor_email}</p>
          </div>
        </div>
      </td>
      <td>
        {status === 'approved' && <span className="badge-success">Approved</span>}
        {status === 'pending' && <span className="badge-warning">Pending</span>}
        {status === 'cancelled' && <span className="badge-danger">Rejected</span>}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {status === 'pending' && (
            <>
              <button onClick={() => handleAction('approve')} title="Approve" className="w-7 h-7 rounded-lg bg-success-50 text-success-600 hover:bg-success-100 flex items-center justify-center transition-colors">
                <HiOutlineCheck className="text-sm" />
              </button>
              <button onClick={() => handleAction('cancel')} title="Reject" className="w-7 h-7 rounded-lg bg-danger-50 text-danger-600 hover:bg-danger-100 flex items-center justify-center transition-colors">
                <HiOutlineX className="text-sm" />
              </button>
            </>
          )}
          <button
            onClick={() => navigate(`/class/${course?._id}`)}
            disabled={status !== 'approved'}
            className="w-7 h-7 rounded-lg bg-brand-50 text-brand-600 hover:bg-brand-100 flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            title="View progress"
          >
            <HiOutlineEye className="text-sm" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AdminClass;
