import { HiOutlineBookOpen, HiOutlineSearch } from 'react-icons/hi';
import { useState } from 'react';
import useClass from '../../hooks/useClass';
import EmptyEnrollment from '../UserDashboard/EmptyEnrollment';
import AdminClass from './AdminClass';
import LoadingState from '../../components/ui/LoadingState';
import ErrorState from '../../components/ui/ErrorState';
import { parseApiError, isNetworkError } from '../../utils/errorParser';

const AdminClasses = () => {
  const [classes, isLoading, error, refetch] = useClass({ query: '' });
  const [search, setSearch] = useState('');

  if (isLoading) return <LoadingState variant="skeleton" rows={5} />;

  if (error) {
    return (
      <ErrorState
        type={isNetworkError(error) ? 'network' : 'generic'}
        message={parseApiError(error)}
        onRetry={refetch}
      />
    );
  }

  if (!classes?.length) {
    return <EmptyEnrollment info="No courses have been submitted yet." />;
  }

  const filtered = classes.filter(c =>
    !search ||
    c?.course_title?.toLowerCase().includes(search.toLowerCase()) ||
    c?.instructor?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="dash-title">All Courses</h1>
          <p className="text-sm text-surface-500 mt-0.5">Review, approve, or reject course submissions</p>
        </div>
        <span className="badge-primary flex items-center gap-1.5 px-3 py-1.5">
          <HiOutlineBookOpen className="text-sm" />
          {classes.length} Total
        </span>
      </div>

      <div className="relative max-w-sm">
        <HiOutlineSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search courses or instructors…"
          className="input-field pl-10"
        />
      </div>

      <div className="card-elevated overflow-hidden">
        <div className="table-container border-0 rounded-none">
          <table className="table-modern">
            <thead>
              <tr>
                <th>Course</th>
                <th>Instructor</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-sm text-surface-400">
                    No courses match your search.
                  </td>
                </tr>
              ) : (
                filtered.map((course, idx) => <AdminClass key={idx} course={course} />)
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminClasses;
