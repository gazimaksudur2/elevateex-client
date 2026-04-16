import { useEffect, useState } from 'react';
import Assignment from './Assignment';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingState from '../../../components/ui/LoadingState';
import ErrorState from '../../../components/ui/ErrorState';
import { parseApiError, isNetworkError } from '../../../utils/errorParser';

const ClassWork = ({ course }) => {
  const [assignments, setAssignments] = useState(null);
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure();

  const fetchAssignments = () => {
    setError(null);
    setAssignments(null);
    axiosSecure
      .get(`assignments?course_title=${course?.course_title}&instructor=${course?.instructor}`)
      .then(res => setAssignments(res.data))
      .catch(err => setError({ message: parseApiError(err), network: isNetworkError(err) }));
  };

  useEffect(() => {
    if (course?.course_title) fetchAssignments();
  }, [course]);

  if (assignments === null && !error) return <LoadingState variant="skeleton" rows={3} />;
  if (error) return <ErrorState type={error.network ? 'network' : 'generic'} message={error.message} onRetry={fetchAssignments} compact />;

  if (assignments?.length === 0) {
    return (
      <div className="card-elevated p-8 text-center">
        <p className="text-sm text-surface-500">No assignments posted for this course yet.</p>
      </div>
    );
  }

  return (
    <div className="card-elevated overflow-hidden">
      <div className="px-5 py-4 border-b border-surface-100 flex items-center justify-between">
        <h2 className="text-base font-semibold text-surface-900">Assignments</h2>
        <span className="badge-primary">{assignments?.length} Total</span>
      </div>
      <div className="table-container border-0 rounded-none">
        <table className="table-modern">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Assigned</th>
              <th>Deadline</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-100">
            {assignments.map((assign, idx) => (
              <Assignment key={idx} assign={assign} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassWork;
