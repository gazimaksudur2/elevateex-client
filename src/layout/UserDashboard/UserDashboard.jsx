import { Link, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const UserDashboard = () => {
    const { user } = useAuth();
    return (
        <div className='flex'>
            {/* <h2>This is from general user dashboard.</h2> */}
            <div>
                <ul className="menu p-4 w-64 space-y-2 min-h-screen h-full bg-base-200 text-base-content flex flex-col justify-start items-center">
                    {/* <div className="flex justify-center items-center"><a><img className="w-20 h-20 rounded-lg" src={user?.photoURL} alt="userProfile" /></a></div>
                    <h2><a>{user?.displayName}</a></h2>
                    <h2 className="pb-6"><a>{user?.email}</a></h2> */}
                    <Link to={'/'} className="py-4 flex justify-center items-center gap-3">
                        <img className="w-10 h-10 rounded" src="https://cdn-icons-png.flaticon.com/128/3048/3048425.png" alt="web Icon" />
                        <h2 className="text-gray-800 text-xl">Elevate<span className="text-2xl text-red-600">Ex</span></h2>
                    </Link>
                    <div className="pb-5 flex flex-col justify-center items-center gap-2">
                        <h4 className="text-lg font-roboto">Current Role</h4>
                        <div className="flex flex-col items-center justify-start gap-1">
                            {/* <p className="bg-green-300 px-2 py-1 rounded-full cursor-pointer">Admin</p>
                            <p className="bg-amber-300 px-2 py-1 rounded-full cursor-pointer">Teacher</p> */}
                            <p className="bg-red-300 px-2 py-1 rounded-full cursor-pointer">Student</p>
                        </div>
                    </div>
                    {/* <li className="w-full bg-gray-300 border-b-2 border-red-400 rounded-md"><Link to={'/userdash'}>User Dashboard</Link></li> */}
                    <li className="w-full bg-gray-300 border-b-2 border-red-400 rounded-md"><Link to={'/userdash'}>My Profile</Link></li>
                    <li className="w-full bg-gray-300 border-b-2 border-red-400 rounded-md"><Link to={'/userdash/enrolled'}>My Enrolled Class</Link></li>
                    <li className="w-full bg-gray-300 border-b-2 border-red-400 rounded-md"><a>Our Successes</a></li>
                    <li className="w-full bg-gray-300 border-b-2 border-red-400 rounded-md"><a>Contacts</a></li>
                    <li className="w-full bg-gray-300 border-b-2 border-red-400 rounded-md"><a>About</a></li>
                    <li className="w-full bg-gray-300 border-b-2 border-red-400 rounded-md"><a>User Guide</a></li>
                </ul>
            </div>
            <div className='w-full'>
                <Outlet />
            </div>
        </div>
    );
};

export default UserDashboard;