import { MdDownloadDone, MdOutlineCancel } from "react-icons/md";
import { TbMessage } from "react-icons/tb";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { Tooltip } from 'react-tooltip';


const User = ({ user }) => {
    const [status, setStatus] = useState({
        role: user?.role,
        admin_status: user?.admin_status,
        admin_req_msg: user?.admin_req_msg,
    });
    const axiosSecure = useAxiosSecure();
    const handleApprove = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Approve!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.post('admin/approve', { email: user.email })
                    .then((res) => {
                        console.log(res);
                        Swal.fire({
                            title: "Request Approved!",
                            text: "Admin Privilege Provided!",
                            icon: "success"
                        });
                        setStatus({
                            admin_status: "approved",
                            role: "admin",
                        })
                    })
                    .catch(error => {
                        // console.log(error.message);
                        Swal.fire({
                            title: "Request Denied!",
                            text: error.message,
                            icon: "error"
                        });
                    })
            }
        });

    }
    const handleCancel = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Deny Request!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.post('admin/cancel', { email: user.email })
                    .then((res) => {
                        console.log(res);
                        Swal.fire({
                            title: "Request Cancelled!",
                            text: "Admin Privilege Denied!",
                            icon: "warning"
                        });
                        setStatus({
                            admin_status: "cancelled",
                            role: "admin",
                        })
                    })
                    .catch(error => {
                        // console.log(error.message);
                        Swal.fire({
                            title: "Request Denied!",
                            text: error.message,
                            icon: "error"
                        });
                    })
            }
        });
    }

    useEffect(() => {
        setStatus({
            admin_status: user?.admin_status,
            role: user?.role
        })
    }, []);
    return (
        <>
            <tr>
                <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                    <div className="flex items-center gap-x-2">
                        <img className="object-cover w-8 h-8 rounded-full" src={user?.img_url ? user?.img_url : user?.photoURL} alt="" />
                        <div>
                            <h2 className="text-sm font-medium text-gray-800 ">{user?.name}</h2>
                            <p className="text-xs font-normal text-gray-600 ">{user?.email}</p>
                        </div>
                    </div>
                </td>
                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    {/* <h2 className="text-sm font-normal">{user?.role}</h2> */}
                    {user?.role == "admin" &&
                        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60">
                            <p className="text-emerald-600 font-medium bg-emerald-200 px-2 py-1 rounded-full cursor-pointer">Admin</p>
                        </div>}
                    {user?.role == "instructor" &&
                        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-amber-500 bg-amber-100/60">
                            <p className="text-amber-600 font-medium bg-amber-200 px-2 py-1 rounded-full cursor-pointer">Teacher</p>
                        </div>}
                    {(user?.role == "student" || user?.role == "general") &&
                        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-red-500 bg-red-100/60">
                            <p className="text-red-600 font-medium bg-red-200 px-2 py-1 rounded-full cursor-pointer">Student</p>
                        </div>}
                </td>
                <td className="px-4 py-4 text-center text-sm font-medium text-gray-700 whitespace-nowrap">
                    <div className="inline-flex justify-center items-center">

                        <a
                            data-tooltip-id="my-tooltip-children-multiline"
                            data-tooltip-delay-hide={1000}
                        >

                            <TbMessage className="cursor-pointer" size={25} />
                        </a>
                        <Tooltip id="my-tooltip-children-multiline" >
                            <p className="max-w-72">{"No Message"}</p>
                        </Tooltip>
                    </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">{status?.admin_status}</td>
                <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">{user?.createdAt}</td>
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                    {
                        status?.admin_status == "pending" ? <>
                            <div className="flex items-center gap-x-6">
                                <div className="bg-green-300 p-1 rounded-full">
                                    <MdDownloadDone onClick={handleApprove} className="text-green-800 cursor-pointer" size={20} />
                                </div>
                                <div className="bg-red-300 p-1 rounded-full">
                                    <MdOutlineCancel onClick={handleCancel} className="text-red-800 cursor-pointer" size={20} />
                                </div>
                            </div>
                        </> : <p></p>
                    }
                </td>
            </tr>
        </>
    );
};

export default User;
// ?status?.admin_req_msg:'No Message'