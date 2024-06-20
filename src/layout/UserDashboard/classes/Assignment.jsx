import { useState } from "react";
import Swal from "sweetalert2";

const Assignment = ({ assign }) => {
    const [status, setStatus] = useState({
        submitted: false,
    })

    const handleSubmit = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Submit!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Request Submited!",
                    text: "Your Submission perfectly submitted for the corresponding Course!",
                    icon: "success"
                });
                setStatus({
                    submitted: true,
                });
            }
        });
    }
    const handleUnsubmit = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Unsubmit it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Unsubmitted your Submission!",
                    text: "Submit it again for this assignment within the announced timeframe!",
                    icon: "warning"
                });
                setStatus({
                    submitted: false,
                });
            }
        });
    }
    // console.log(assign);
    return (
        <>
            <tr>
                <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                    <div>
                        <h2 className="font-medium text-gray-800 ">{assign?.title}</h2>
                    </div>
                </td>
                <td className="px-4 py-4 ">
                    <div className="">
                        <p className="text-gray-500 text-xs w-72">{assign?.description}</p>
                    </div>
                </td>
                <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                    {
                        assign?.status === 'active' ? <div className="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60">
                            Active
                        </div> :
                            <div className="inline px-3 py-1 text-sm font-normal rounded-full text-red-500 gap-x-2 bg-red-100/60">
                                TimeOut
                            </div>
                    }
                </td>
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                    {
                        assign?.assignedAt
                    }
                </td>

                <td className="px-4 py-4 text-sm whitespace-nowrap">
                    {
                        assign?.deadline
                    }
                </td>

                <td className="px-4 py-4 text-sm whitespace-nowrap">
                    {
                        status.submitted===false?<button onClick={handleSubmit} className="btn btn-sm btn-success text-white">Submit it</button>:
                        <button onClick={handleUnsubmit} className="btn btn-sm btn-error text-white">Unsubmit it</button>
                    }
                </td>
            </tr>
            {/* <tr>
                <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                    <div>
                        <h2 className="font-medium text-gray-800 ">{assign?.title}</h2>
                    </div>
                </td>
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                    <div>
                        <p className="text-gray-500">Brings all your news into one place</p>
                    </div>
                </td>
                <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                    <div className="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60">
                        submitted
                    </div>
                </td>
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                    20-05-2024
                </td>

                <td className="px-4 py-4 text-sm whitespace-nowrap">
                    12-06-2024
                </td>

                <td className="px-4 py-4 text-sm whitespace-nowrap">
                    <button onClick={() => document.getElementById('my_modal_1').showModal()} className="btn btn-info">
                        Submit
                    </button>
                </td>
            </tr> */}
        </>
    );
};

export default Assignment;