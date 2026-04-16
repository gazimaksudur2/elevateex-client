import { useEffect, useState } from 'react';
import useUserInfo from '../../../hooks/useUserInfo';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { parseApiError } from '../../../utils/errorParser';
import { toast } from '../../../utils/toast';

const Assignment = ({ assign }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userInfo] = useUserInfo();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    setSubmitted(assign?.submittedBy?.includes(userInfo?.email));
  }, [assign, userInfo?.email]);

  const handleAction = async (action) => {
    const isSubmit = action === 'submit';
    setLoading(true);
    const toastId = toast.loading(isSubmit ? 'Submitting…' : 'Withdrawing…');
    try {
      await axiosSecure.patch(`assignments/${action}?_id=${assign?._id}`, { email: userInfo.email });
      toast.update(toastId, {
        render: isSubmit ? 'Assignment submitted!' : 'Submission withdrawn.',
        type: isSubmit ? 'success' : 'warning',
        isLoading: false,
        autoClose: 3000,
      });
      setSubmitted(isSubmit);
    } catch (err) {
      toast.update(toastId, {
        render: parseApiError(err),
        type: 'error',
        isLoading: false,
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr>
      <td className="font-medium text-surface-900">{assign?.title}</td>
      <td>
        <p className="text-xs text-surface-500 max-w-[200px] truncate">{assign?.description}</p>
      </td>
      <td>
        {assign?.status === 'active' ? (
          <span className="badge-success">Active</span>
        ) : (
          <span className="badge-danger">Expired</span>
        )}
      </td>
      <td className="text-surface-500">{assign?.assignedAt}</td>
      <td className="text-surface-500">{assign?.deadline}</td>
      <td>
        {submitted ? (
          <button
            onClick={() => handleAction('unsubmit')}
            disabled={loading}
            className="text-xs font-medium px-3 py-1.5 rounded-lg bg-danger-50 text-danger-600 hover:bg-danger-100 transition-colors disabled:opacity-50"
          >
            Withdraw
          </button>
        ) : (
          <button
            onClick={() => handleAction('submit')}
            disabled={loading}
            className="text-xs font-medium px-3 py-1.5 rounded-lg bg-success-50 text-success-700 hover:bg-success-100 transition-colors disabled:opacity-50"
          >
            Submit
          </button>
        )}
      </td>
    </tr>
  );
};

export default Assignment;
