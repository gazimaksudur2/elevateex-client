import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { parseApiError } from "../../utils/errorParser";
import { toast } from "../../utils/toast";

const AdminClass = ({ course }) => {
    const [status, setStatus] = useState({ course_status: course?.course_status });
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const confirmAction = (title, confirmText) =>
        Swal.fire({
            title,
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: confirmText,
        });

    const handleApprove = async () => {
        const result = await confirmAction("Approve this course?", "Yes, Approve!");
        if (!result.isConfirmed) return;

        const toastId = toast.loading("Approving course…");
        try {
            await axiosSecure.post('allclasses/approve', { _id: course?._id });
            toast.update(toastId, {
                render: "Course approved and published!",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });
            setStatus({ course_status: 'approved' });
        } catch (error) {
            toast.update(toastId, {
                render: parseApiError(error),
                type: "error",
                isLoading: false,
                autoClose: 5000,
            });
        }
    };

    const handleCancel = async () => {
        const result = await confirmAction("Reject this course?", "Yes, Reject!");
        if (!result.isConfirmed) return;

        const toastId = toast.loading("Rejecting course…");
        try {
            await axiosSecure.post('allclasses/cancel', { _id: course?._id });
            toast.update(toastId, {
                render: "Course has been rejected.",
                type: "warning",
                isLoading: false,
                autoClose: 3000,
            });
            setStatus({ course_status: 'cancelled' });
        } catch (error) {
            toast.update(toastId, {
                render: parseApiError(error),
                type: "error",
                isLoading: false,
                autoClose: 5000,
            });
        }
    };

    return (
        <tr>
            <td className="px-4 py-4 text-gray-800">
                <h2 className='font-medium'>{course?.course_title}</h2>
                <p className='text-xs'>{course?.course_description?.slice(0, 150) + "…"}</p>
            </td>
            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                <div className="inline-flex items-center gap-x-3">
                    <div className="flex items-center gap-x-2">
                        <img className="object-cover w-10 h-10 rounded-full" src={course?.instructor_url} alt="instructor" />
                        <div>
                            <h2 className="font-medium text-gray-800">{course?.instructor}</h2>
                            <p className="text-sm font-normal text-gray-600">{course?.instructor_email}</p>
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                {status.course_status === "approved" ? (
                    <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60">
                        <h2 className="text-sm font-normal text-emerald-500">Approved</h2>
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </div>
                ) : status?.course_status === "pending" ? (
                    <div className="space-x-2">
                        <button onClick={handleApprove} className="btn btn-sm btn-success text-white">Approve</button>
                        <button onClick={handleCancel} className="btn btn-sm btn-error text-white">Reject</button>
                    </div>
                ) : (
                    <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-red-100/60">
                        <h2 className="text-sm font-normal text-red-500">Rejected</h2>
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                    </div>
                )}
            </td>
            <td className='px-4 py-4 text-sm text-gray-500 whitespace-nowrap'>
                {status.course_status !== 'approved' ? (
                    <button className="btn btn-disabled btn-sm" disabled>See Progress</button>
                ) : (
                    <button
                        onClick={() => navigate(`/class/${course?._id}`)}
                        className='inline-flex items-center justify-center px-6 py-2 text-sm text-white duration-300 bg-gray-800 rounded-lg hover:bg-gray-700'
                    >
                        See Progress
                    </button>
                )}
            </td>
        </tr>
    );
};

export default AdminClass;
