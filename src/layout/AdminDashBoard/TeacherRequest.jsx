import { MdDownloadDone, MdOutlineCancel } from "react-icons/md";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const TeacherRequest = ({ request, handleRemove }) => {
    const axiosSecure = useAxiosSecure();
    const handleApprove = () =>{
        axiosSecure.post('instructors/approve',{email: request.email})
        .then((res)=>{
            console.log(res);
            Swal.fire({
                title: "Request Approved!",
                text: "Instructor Permission Provided!",
                icon: "success"
              });
              handleRemove(request.email);
        })
        .catch(error=>{
            // console.log(error.message);
            Swal.fire({
                title: "Request Denied!",
                text: error.message,
                icon: "error"
              });
        })
    }
    const handleCancel = ()=>{
        axiosSecure.post('instructors/cancel',{email: request.email})
        .then((res)=>{
            console.log(res);
            Swal.fire({
                title: "Request Cancelled!",
                text: "Instructor Permission Denied!",
                icon: "warning"
              });
              handleRemove(request.email);
        })
        .catch(error=>{
            // console.log(error.message);
            Swal.fire({
                title: "Request Denied!",
                text: error.message,
                icon: "error"
              });
        })
    }
    return (
        <>
            <tr>
                <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                    <div className="flex items-center gap-x-2">
                        <img className="object-cover w-8 h-8 rounded-full" src={request?.photoURL} alt="" />
                        <div>
                            <h2 className="text-sm font-medium text-gray-800 ">{request?.first_name+" "+request?.last_name}</h2>
                            <p className="text-xs font-normal text-gray-600 ">{request?.email}</p>
                        </div>
                    </div>
                </td>
                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60">
                        <h2 className="text-sm font-normal">{request?.cur_role}</h2>
                    </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">{request?.category}</td>
                <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">{request?.experience}</td>
                <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">{request?.requestedAt}</td>
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                    <div className="flex items-center gap-x-6">
                        <div className="bg-green-300 p-1 rounded-full">
                            <MdDownloadDone onClick={handleApprove} className="text-green-800 cursor-pointer" size={20} />
                        </div>
                        <div className="bg-red-300 p-1 rounded-full">
                            <MdOutlineCancel onClick={handleCancel} className="text-red-800 cursor-pointer" size={20} />
                        </div>
                    </div>
                </td>
            </tr>
            {/* <tr>
                <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                    <div>
                        <h2 className="font-medium text-gray-800 ">Catalog</h2>
                    </div>
                </td>
                <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                    <div className="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60">
                        Customer
                    </div>
                </td>
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                    <div>
                        <p className="text-gray-500">Brings all your news into one place</p>
                    </div>
                </td>
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                    20-05-2024
                </td>

                <td className="px-4 py-4 text-sm whitespace-nowrap">
                    12-06-2024
                </td>

                <td className="px-4 py-4 text-sm whitespace-nowrap">
                    <button className="btn btn-info">
                        Submit
                    </button>
                </td>
            </tr> */}
        </>
    );
}

export default TeacherRequest;