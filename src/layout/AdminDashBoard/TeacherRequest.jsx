import { HiOutlineCheck, HiOutlineX } from 'react-icons/hi';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { parseApiError } from '../../utils/errorParser';
import { toast } from '../../utils/toast';

const TeacherRequest = ({ request, handleRemove }) => {
  const axiosSecure = useAxiosSecure();

  const handleAction = async (action) => {
    const isApprove = action === 'approve';
    const toastId = toast.loading(isApprove ? 'Approving…' : 'Denying…');
    try {
      await axiosSecure.post(`instructors/${action}`, { email: request.email });
      toast.update(toastId, {
        render: isApprove ? 'Instructor approved!' : 'Request denied.',
        type: isApprove ? 'success' : 'warning',
        isLoading: false,
        autoClose: 3000,
      });
      handleRemove(request.email);
    } catch (err) {
      toast.update(toastId, { render: parseApiError(err), type: 'error', isLoading: false, autoClose: 5000 });
    }
  };

  return (
    <tr>
      <td>
        <div className="flex items-center gap-3">
          <img className="w-8 h-8 rounded-lg object-cover" src={request?.photoURL} alt="" />
          <div className="min-w-0">
            <p className="text-sm font-medium text-surface-900 truncate">{request?.first_name} {request?.last_name}</p>
            <p className="text-xs text-surface-400 truncate">{request?.email}</p>
          </div>
        </div>
      </td>
      <td>
        <span className="badge-primary capitalize">{request?.cur_role}</span>
      </td>
      <td className="text-surface-600">{request?.category}</td>
      <td className="text-surface-600">{request?.experience}</td>
      <td className="text-surface-500">{request?.requestedAt}</td>
      <td>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleAction('approve')}
            title="Approve"
            className="w-7 h-7 rounded-lg bg-success-50 text-success-600 hover:bg-success-100 flex items-center justify-center transition-colors"
          >
            <HiOutlineCheck className="text-sm" />
          </button>
          <button
            onClick={() => handleAction('cancel')}
            title="Deny"
            className="w-7 h-7 rounded-lg bg-danger-50 text-danger-600 hover:bg-danger-100 flex items-center justify-center transition-colors"
          >
            <HiOutlineX className="text-sm" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TeacherRequest;
