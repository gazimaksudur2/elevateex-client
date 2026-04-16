import { HiOutlinePlusCircle } from 'react-icons/hi';
import SubmittedAssignment from './SubmittedAssignment';
import CreateAssignment from './CreateAssignment';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingState from '../../components/ui/LoadingState';
import ErrorState from '../../components/ui/ErrorState';
import { parseApiError, isNetworkError } from '../../utils/errorParser';

const AssignmentTable = ({ course }) => {
  const [assignments, setAssignments] = useState(null);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
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

  const pushNew = (doc) => setAssignments(prev => [...(prev ?? []), doc]);

  return (
    <div className="space-y-4">
      <CreateAssignment
        course={course}
        pushNew={pushNew}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      <div className="card-elevated overflow-hidden">
        <div className="px-5 py-4 border-b border-surface-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-surface-900">Assignments</h3>
            <span className="badge-primary">{assignments?.length ?? 0} Posted</span>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="btn-primary text-xs py-2 px-4"
          >
            <HiOutlinePlusCircle />
            Create
          </button>
        </div>

        {assignments === null && !error ? (
          <div className="py-6"><LoadingState size="sm" text="Loading assignments…" /></div>
        ) : error ? (
          <div className="p-5"><ErrorState type={error.network ? 'network' : 'generic'} message={error.message} onRetry={fetchAssignments} compact /></div>
        ) : assignments?.length === 0 ? (
          <div className="p-8 text-center text-sm text-surface-400">No assignments created yet.</div>
        ) : (
          <div className="table-container border-0 rounded-none">
            <table className="table-modern">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Assigned</th>
                  <th>Deadline</th>
                  <th>Submissions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100">
                {assignments.map((assign, idx) => (
                  <SubmittedAssignment key={idx} assign={assign} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignmentTable;
