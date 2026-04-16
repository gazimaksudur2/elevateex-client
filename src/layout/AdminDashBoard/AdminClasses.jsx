import useClass from "../../hooks/useClass";
import EmptyEnrollment from "../UserDashboard/EmptyEnrollment";
import AdminClass from "./AdminClass";
import LoadingState from "../../components/ui/LoadingState";
import ErrorState from "../../components/ui/ErrorState";
import { parseApiError, isNetworkError } from "../../utils/errorParser";

const AdminClasses = () => {
    const [classes, isLoading, error, refetch] = useClass({ query: '' });

    if (isLoading) {
        return <LoadingState fullScreen text="Loading all courses…" />;
    }

    if (error) {
        return (
            <div className="p-10">
                <ErrorState
                    type={isNetworkError(error) ? 'network' : 'generic'}
                    message={parseApiError(error)}
                    onRetry={refetch}
                />
            </div>
        );
    }

    if (classes.length === 0) {
        return <EmptyEnrollment info="No courses have been submitted yet." />;
    }

    return (
        <div className='p-6'>
            <section className="container px-4 mx-auto">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-x-3">
                            <h2 className="text-lg font-medium text-gray-800">All Released Courses</h2>
                            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">
                                {classes?.length} Total
                            </span>
                        </div>
                    </div>
                </div>
                <div className="container px-4 mx-auto">
                    <div className="flex flex-col mt-6">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">Course Heading</th>
                                                <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left text-gray-500">Course Launcher</th>
                                                <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left text-gray-500">Status</th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">View Progress</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {classes.map((course, idx) => (
                                                <AdminClass key={idx} course={course} />
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdminClasses;
