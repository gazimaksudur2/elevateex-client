import { useEffect, useState } from 'react';
import { HiOutlineClipboardList, HiOutlineSearch } from 'react-icons/hi';
import TeacherRequest from './TeacherRequest';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingState from '../../components/ui/LoadingState';
import ErrorState from '../../components/ui/ErrorState';
import { parseApiError, isNetworkError } from '../../utils/errorParser';

const TeacherRequests = () => {
  const [requests, setRequests] = useState(null);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const axiosSecure = useAxiosSecure();

  const fetchRequests = () => {
    setError(null);
    setRequests(null);
    axiosSecure.get('instructors')
      .then(res => setRequests(res.data))
      .catch(err => setError({ message: parseApiError(err), network: isNetworkError(err) }));
  };

  useEffect(() => { fetchRequests(); }, []);

  const handleRemove = email => {
    setRequests(prev => prev?.filter(each => each?.email !== email));
  };

  const filtered = requests?.filter(r =>
    !search ||
    `${r?.first_name} ${r?.last_name}`.toLowerCase().includes(search.toLowerCase()) ||
    r?.email?.toLowerCase().includes(search.toLowerCase())
  ) ?? [];

  if (requests === null && !error) return <LoadingState variant="skeleton" rows={5} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="dash-title">Instructor Requests</h1>
          <p className="text-sm text-surface-500 mt-0.5">Review and manage instructor applications</p>
        </div>
        <span className="badge-warning flex items-center gap-1.5 px-3 py-1.5">
          <HiOutlineClipboardList className="text-sm" />
          {requests?.length ?? 0} Pending
        </span>
      </div>

      <div className="relative max-w-sm">
        <HiOutlineSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search applicants…"
          className="input-field pl-10"
        />
      </div>

      {error ? (
        <ErrorState type={error.network ? 'network' : 'generic'} message={error.message} onRetry={fetchRequests} />
      ) : filtered.length === 0 ? (
        <div className="card-elevated p-10 text-center">
          <p className="text-sm text-surface-400">
            {search ? 'No applicants match your search.' : 'No pending instructor requests at this time.'}
          </p>
        </div>
      ) : (
        <div className="card-elevated overflow-hidden">
          <div className="table-container border-0 rounded-none">
            <table className="table-modern">
              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>Current Role</th>
                  <th>Category</th>
                  <th>Experience</th>
                  <th>Applied</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100">
                {filtered.map((request, idx) => (
                  <TeacherRequest key={idx} handleRemove={handleRemove} request={request} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherRequests;
