import { useEffect, useState } from 'react';
import TeacherRequest from './TeacherRequest';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingState from '../../components/ui/LoadingState';
import ErrorState from '../../components/ui/ErrorState';
import { parseApiError, isNetworkError } from '../../utils/errorParser';

const TeacherRequests = () => {
    const [requests, setRequests] = useState(null);
    const [error, setError] = useState(null);
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

    if (requests === null && !error) {
        return <LoadingState fullScreen text="Loading instructor requests…" />;
    }

    return (
        <div className='p-6'>
            <section className="container px-4 mx-auto">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="flex items-center gap-x-3">
                        <h2 className="text-lg font-medium text-gray-800">Teacher Requests</h2>
                        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">
                            {requests?.length ?? 0} Pending
                        </span>
                    </div>
                </div>

                <div className="mt-6 md:flex md:items-center md:justify-between">
                    <div className="relative flex items-center mt-4 md:mt-0">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mx-3 text-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </span>
                        <input type="text" placeholder="Search" className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </div>
                </div>

                {error ? (
                    <div className="mt-6">
                        <ErrorState
                            type={error.network ? 'network' : 'generic'}
                            message={error.message}
                            onRetry={fetchRequests}
                            compact
                        />
                    </div>
                ) : requests?.length === 0 ? (
                    <div className="mt-6">
                        <ErrorState type="empty" message="No pending instructor requests at this time." />
                    </div>
                ) : (
                    <div className="flex flex-col mt-6">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left text-gray-500">Instructor Candidates</th>
                                                <th scope="col" className="px-2 py-3.5 text-sm font-normal text-left text-gray-500">Current Role</th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">Course Category</th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">Experience Level</th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">Attempted At</th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">Approve / Cancel</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {requests.map((request, idx) => (
                                                <TeacherRequest key={idx} handleRemove={handleRemove} request={request} />
                                            ))}
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

export default TeacherRequests;
