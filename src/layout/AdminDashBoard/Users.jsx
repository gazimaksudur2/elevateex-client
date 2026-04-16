import { useEffect, useState } from 'react';
import { HiOutlineUsers, HiOutlineSearch } from 'react-icons/hi';
import User from './User';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingState from '../../components/ui/LoadingState';
import ErrorState from '../../components/ui/ErrorState';
import { parseApiError, isNetworkError } from '../../utils/errorParser';

const Users = () => {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const axiosSecure = useAxiosSecure();

  const fetchUsers = () => {
    setError(null);
    setUsers(null);
    axiosSecure.get('users')
      .then(res => setUsers(res.data))
      .catch(err => setError({ message: parseApiError(err), network: isNetworkError(err) }));
  };

  useEffect(() => { fetchUsers(); }, []);

  const filtered = users?.filter(u =>
    !search ||
    u?.displayName?.toLowerCase().includes(search.toLowerCase()) ||
    u?.name?.toLowerCase().includes(search.toLowerCase()) ||
    u?.email?.toLowerCase().includes(search.toLowerCase())
  ) ?? [];

  if (users === null && !error) return <LoadingState variant="skeleton" rows={6} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="dash-title">All Users</h1>
          <p className="text-sm text-surface-500 mt-0.5">Manage platform users and admin requests</p>
        </div>
        <span className="badge-primary flex items-center gap-1.5 px-3 py-1.5">
          <HiOutlineUsers className="text-sm" />
          {users?.length ?? 0} Total
        </span>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <HiOutlineSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or email…"
          className="input-field pl-10"
        />
      </div>

      {error ? (
        <ErrorState type={error.network ? 'network' : 'generic'} message={error.message} onRetry={fetchUsers} />
      ) : (
        <div className="card-elevated overflow-hidden">
          <div className="table-container border-0 rounded-none">
            <table className="table-modern">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Admin Status</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-sm text-surface-400">
                      {search ? 'No users match your search.' : 'No users found.'}
                    </td>
                  </tr>
                ) : (
                  filtered.map((usr, idx) => <User key={idx} user={usr} />)
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
