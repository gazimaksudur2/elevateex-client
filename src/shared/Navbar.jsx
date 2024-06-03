import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Slide, toast } from "react-toastify";

const Navbar = () => {
    const { user, logOut } = useAuth();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                // console.log('user logged out successfully!!');
                toast.success('User Logged out Successfully!', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Slide,
                });
            })
            .catch(error => {
                console.log(error.message);
                toast.error('Logout Interrupted!', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Slide,
                });
            })
    }
    const navLinks = <>
        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'/allclass'}>All Classes</NavLink></li>
        <li><NavLink to={'/teach'}>Teach Here</NavLink></li>
        <li><NavLink to={'/'}>Contacts</NavLink></li>
    </>;

    const sidebar = <>
        <div className="drawer-side">
            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="relative menu p-4 w-80 space-y-2 min-h-full bg-base-200 text-base-content flex flex-col justify-start items-center">
                <div className="flex justify-center items-center"><a><img className="w-20 h-16 rounded-lg" src={user?.photoURL} alt="userProfile" /></a></div>
                <h2><a>{user?.displayName}</a></h2>
                <h2 className="pb-6"><a>{user?.email}</a></h2>
                <div className="pb-5 flex flex-col justify-center items-center gap-2">
                    <h4 className="text-lg font-roboto">Current Role</h4>
                    <div className="flex items-center justify-start gap-1">
                        <p className="bg-green-300 px-2 py-1 rounded-full cursor-pointer">super admin</p>
                        <p className="bg-amber-300 px-2 py-1 rounded-full cursor-pointer">admin</p>
                        <p className="bg-red-300 px-2 py-1 rounded-full cursor-pointer">general user</p>
                    </div>
                </div>
                <li className="w-full bg-gray-300 border-b-2 border-red-400 rounded-md"><Link to={'/userdashboard'}>User Dashboard</Link></li>
                <li className="w-full bg-gray-300 border-b-2 border-red-400 rounded-md"><a>Admin Request</a></li>
                <li className="w-full bg-gray-300 border-b-2 border-red-400 rounded-md"><a>Teachers</a></li>
                <li className="w-full bg-gray-300 border-b-2 border-red-400 rounded-md"><a>Our Successes</a></li>
                <li className="w-full bg-gray-300 border-b-2 border-red-400 rounded-md"><a>Contacts</a></li>
                <li className="w-full bg-gray-300 border-b-2 border-red-400 rounded-md"><a>About</a></li>
                <li className="w-full bg-gray-300 border-b-2 border-red-400 rounded-md"><a>User Guide</a></li>
                <li className="w-full absolute p-3 bottom-2"><button onClick={handleLogOut} className="btn btn-secondary">Log Out</button></li>
            </ul>
        </div>
    </>;
    return (
        <div>
            <div className="w-[95%] mx-auto mt-5 navbar bg-base-100 rounded-md">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navLinks}
                        </ul>
                    </div>
                    <Link to={'/'} className="btn btn-ghost flex justify-center items-center gap-3">
                        <img className="w-10 h-10 rounded" src="https://cdn-icons-png.flaticon.com/128/3048/3048425.png" alt="web Icon" />
                        <h2 className="text-gray-800 text-xl">Elevate<span className="text-2xl text-red-600">Ex</span></h2>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    {user ? <div>
                        <div className="drawer drawer-end">
                            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                            <div className="drawer-content">
                                {/* Page content here */}
                                <label htmlFor="my-drawer-4" className="drawer-button ">
                                    <div className="avatar">
                                        <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src={user?.photoURL} />
                                        </div>
                                    </div>
                                </label>
                            </div>
                            {sidebar}
                        </div>

                    </div> : <Link to={'login'}>
                        <h4 className="btn btn-primary">Sign In</h4>
                    </Link>}
                </div>
            </div>
        </div>
    );
};

export default Navbar;