import { MdDownloadDone, MdOutlineCancel } from "react-icons/md";
import { TbMessage } from "react-icons/tb";

const User = ({ user }) => {
    return (
        <>
            <tr>
                <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                    <div className="flex items-center gap-x-2">
                        <img className="object-cover w-8 h-8 rounded-full" src={user?.img_url} alt="" />
                        <div>
                            <h2 className="text-sm font-medium text-gray-800 ">{user?.name}</h2>
                            <p className="text-xs font-normal text-gray-600 ">{user?.email}</p>
                        </div>
                    </div>
                </td>
                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60">
                        <h2 className="text-sm font-normal">{user?.role}</h2>
                    </div>
                </td>
                <td className="px-4 py-4 text-center text-sm font-medium text-gray-700 whitespace-nowrap">
                    <div className="inline-flex justify-center items-center">
                        <TbMessage className="cursor-pointer" size={25} />
                    </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">{user?.admin_status}</td>
                <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">{user?.createdAt}</td>
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                    <div className="flex items-center gap-x-6">
                        <div className="bg-green-300 p-1 rounded-full">
                            <MdDownloadDone className="text-green-800 cursor-pointer" size={20} />
                        </div>
                        <div className="bg-red-300 p-1 rounded-full">
                            <MdOutlineCancel className="text-red-800 cursor-pointer" size={20} />
                        </div>
                    </div>
                </td>
            </tr>
        </>
    );
};

export default User;