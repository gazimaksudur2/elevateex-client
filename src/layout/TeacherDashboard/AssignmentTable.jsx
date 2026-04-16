import { IoMdAdd } from 'react-icons/io';
import SubmittedAssignment from './SubmittedAssignment';
import CreateAssignment from './CreateAssignment';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import ErrorState from '../../components/ui/ErrorState';
import LoadingState from '../../components/ui/LoadingState';
import { parseApiError, isNetworkError } from '../../utils/errorParser';

const AssignmentTable = ({ course }) => {
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

    const pushNew = (doc) => {
        setAssignments(prev => [...(prev ?? []), doc]);
    };

    return (
        <div className='p-3 w-full'>
            <div>
                <CreateAssignment course={course} pushNew={pushNew} />
                <section className="container px-4 mx-auto">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <div className="flex items-center gap-x-3">
                            <h2 className="text-lg font-medium text-gray-800">Assignments</h2>
                            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">
                                {assignments?.length ?? 0} Posted
                            </span>
                        </div>
                        <button
                            onClick={() => document.getElementById('my_modal_1').showModal()}
                            className='flex justify-center items-center gap-1 bg-green-600 px-3 py-2 rounded-badge text-white hover:bg-green-400 active:scale-95'
                        >
                            <IoMdAdd size={25} />
                            Create
                        </button>
                    </div>

                    {assignments === null && !error ? (
                        <div className="py-8">
                            <LoadingState size="sm" text="Loading assignments…" />
                        </div>
                    ) : error ? (
                        <div className="mt-4">
                            <ErrorState
                                type={error.network ? 'network' : 'generic'}
                                message={error.message}
                                onRetry={fetchAssignments}
                                compact
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col mt-6">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                    <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left text-gray-500">Assignment Title</th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">Description</th>
                                                    <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left text-gray-500">Status</th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">Assigned At</th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">Deadline</th>
                                                    <th scope="col" className="relative py-3.5 px-4" />
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {assignments?.length === 0 ? (
                                                    <tr>
                                                        <td colSpan={6} className="py-10 text-center text-sm text-gray-400">
                                                            No assignments created yet.
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    assignments?.map((assign, idx) => (
                                                        <SubmittedAssignment key={idx} assign={assign} />
                                                    ))
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
        </div>
    );
};

export default AssignmentTable;
