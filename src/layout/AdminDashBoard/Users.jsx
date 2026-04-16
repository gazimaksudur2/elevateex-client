import { useEffect, useState } from 'react';
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
        !search || u?.displayName?.toLowerCase().includes(search.toLowerCase()) || u?.email?.toLowerCase().includes(search.toLowerCase())
    ) ?? [];

    if (users === null && !error) {
        return <LoadingState fullScreen text="Loading users…" />;
    }

    return (
        <div className='p-6'>
            <section className="container px-4 mx-auto">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-x-3">
                            <h2 className="text-lg font-medium text-gray-800">Platform Users</h2>
                            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">
                                {users?.length ?? 0} Total
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 mb-4 md:flex md:items-center md:justify-between">
                    <div className="relative flex items-center mt-4 md:mt-0">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mx-3 text-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search by name or email"
                            className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                </div>

                {error ? (
                    <ErrorState
                        type={error.network ? 'network' : 'generic'}
                        message={error.message}
                        onRetry={fetchUsers}
                        compact
                    />
                ) : (
                    <div className="flex flex-col">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="text-left px-4 py-3.5 text-sm font-normal rtl:text-right text-gray-500">User</th>
                                                <th scope="col" className="text-center px-4 py-3.5 text-sm font-normal text-gray-500">Role</th>
                                                <th scope="col" className="text-left px-4 py-3.5 text-sm font-normal text-gray-500">Admin Request Msg</th>
                                                <th scope="col" className="text-left px-4 py-3.5 text-sm font-normal text-gray-500">Admin Status</th>
                                                <th scope="col" className="text-left px-4 py-3.5 text-sm font-normal text-gray-500">Created At</th>
                                                <th scope="col" className="text-left px-4 py-3.5 text-sm font-normal text-gray-500">
                                                    Accept / Cancel <span className='text-red-400 text-lg'>Admin</span> Request
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filtered.length === 0 ? (
                                                <tr>
                                                    <td colSpan={6} className="py-10 text-center text-sm text-gray-400">
                                                        No users match your search.
                                                    </td>
                                                </tr>
                                            ) : (
                                                filtered.map((usr, idx) => <User key={idx} user={usr} />)
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Users;
