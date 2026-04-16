import { MdDownloadDone, MdOutlineCancel } from "react-icons/md";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { parseApiError } from "../../utils/errorParser";
import { toast } from "../../utils/toast";

const TeacherRequest = ({ request, handleRemove }) => {
    const axiosSecure = useAxiosSecure();

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
        const result = await confirmAction("Approve this instructor?", "Yes, Approve!");
        if (!result.isConfirmed) return;

        const toastId = toast.loading("Approving request…");
        try {
            await axiosSecure.post('instructors/approve', { email: request.email });
            toast.update(toastId, {
                render: "Instructor approved successfully!",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });
            handleRemove(request.email);
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
        const result = await confirmAction("Deny this instructor request?", "Yes, Deny!");
        if (!result.isConfirmed) return;

        const toastId = toast.loading("Denying request…");
        try {
            await axiosSecure.post('instructors/cancel', { email: request.email });
            toast.update(toastId, {
                render: "Instructor request denied.",
                type: "warning",
                isLoading: false,
                autoClose: 3000,
            });
            handleRemove(request.email);
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
            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                <div className="flex items-center gap-x-2">
                    <img className="object-cover w-8 h-8 rounded-full" src={request?.photoURL} alt="" />
                    <div>
                        <h2 className="text-sm font-medium text-gray-800">{request?.first_name + " " + request?.last_name}</h2>
                        <p className="text-xs font-normal text-gray-600">{request?.email}</p>
                    </div>
                </div>
            </td>
            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60">
                    <h2 className="text-sm font-normal">{request?.cur_role}</h2>
                </div>
            </td>
            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{request?.category}</td>
            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{request?.experience}</td>
            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{request?.requestedAt}</td>
            <td className="px-4 py-4 text-sm whitespace-nowrap">
                <div className="flex items-center gap-x-6">
                    <button
                        onClick={handleApprove}
                        title="Approve instructor"
                        className="bg-green-300 p-1 rounded-full hover:bg-green-400 transition-colors"
                    >
                        <MdDownloadDone className="text-green-800" size={20} />
                    </button>
                    <button
                        onClick={handleCancel}
                        title="Deny instructor request"
                        className="bg-red-300 p-1 rounded-full hover:bg-red-400 transition-colors"
                    >
                        <MdOutlineCancel className="text-red-800" size={20} />
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default TeacherRequest;
