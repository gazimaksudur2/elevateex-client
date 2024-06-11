import { Link, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { CiHome } from 'react-icons/ci';

const TeacherDashboard = () => {
    const { user } = useAuth();
    return (
        <div className='flex'>
            <div className='flex flex-col justify-between'>
                <ul className="menu p-4 w-64 min-h-screen h-full bg-base-200 space-y-2 text-base-content flex flex-col justify-start items-center">
                    <Link to={'/'} className="py-4 flex justify-center items-center gap-3">
                        <img className="w-10 h-10 rounded" src="https://cdn-icons-png.flaticon.com/128/3048/3048425.png" alt="web Icon" />
                        <h2 className="text-gray-800 text-xl">Elevate<span className="text-2xl text-red-600">Ex</span></h2>
                    </Link>
                    <div className="pb-5 flex flex-col justify-center items-center gap-2">
                        <h4 className="text-lg font-roboto">Current Role</h4>
                        <div className="flex flex-col items-center justify-start gap-1">
                            {/* <p className="bg-green-300 px-2 py-1 rounded-full cursor-pointer">Admin</p> */}
                            <p className="bg-amber-300 px-2 py-1 rounded-full cursor-pointer">Teacher</p>
                            {/* <p className="bg-red-300 px-2 py-1 rounded-full cursor-pointer">Student</p> */}
                        </div>
                    </div>
                    <li className="w-full bg-gray-300 border-b-2 border-red-400 rounded-md"><Link to={'/teacherdash'}>My Profile</Link></li>
                    <li className="w-full bg-gray-300 border-b-2 border-red-400 rounded-md"><Link to={'/teacherdash/myclass'}>My Classes</Link></li>
                    <li className="w-full bg-gray-300 border-b-2 border-red-400 rounded-md"><Link to={'/teacherdash/addclass'}>Add Class</Link></li>
                    <Link to={'/'} className='w-[96%] mx-auto mb-5 btn btn-outline inline-flex justify-center items-center gap-2'>
                        <span className='text-xl'>Back to </span>
                        <CiHome className='font-bold text-3xl' />
                    </Link>
                </ul>

            </div>
            <div className='w-full'>
                <Outlet />
            </div>
        </div>
    );
};

export default TeacherDashboard;