import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Slide, toast } from "react-toastify";
import { useRef } from "react";
import Swal from "sweetalert2";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const ref = useRef();

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
    const adminApply = () => {
        // const letter = ref
        console.log(ref.current.value);
        Swal.fire({
            title: "Best of Luck!",
            text: "Application Submitted Successfully!",
            icon: "success"
        });
    }
    const defaultLetter = "I am writing to formally request admin privileges for my account. As I continue to contribute to our ElevateEx, having admin access would enable me to manage tasks more efficiently and assist with administrative responsibilities, ensuring smoother operations and timely updates."
    const adminReqModal = <div>
        <dialog id="my_modal_1" className="modal backdrop-blur">
            <div className="modal-box bg-base-100">
                <div className="w-full flex flex-col justify-center items-center">
                    <img className="w-40" src="https://img.freepik.com/free-vector/follow-me-social-business-theme-design_24877-50426.jpg?t=st=1717443448~exp=1717447048~hmac=e757907a06ab84e3244b1cdfc700081ea5fef85f5985f3f3026ba306bf2e14cf&w=740" alt="" />
                </div>
                <div className="flex flex-col justify-center items-start">
                    <p>To superAdmin,</p>
                    <h3 className=""><span className="font-semibold text-lg">Subject:</span> Request for the Admin role.</h3>
                </div>
                <h3 className="font-bold text-lg">Hello! Sir,</h3>
                {/* <p className="py-4">Press ESC key or click the button below to close</p> */}
                <div className="modal-action">
                    <form method="dialog" className="w-full flex flex-col justify-center items-center gap-3">
                        <textarea ref={ref} className="textarea textarea-secondary w-full h-44" defaultValue={defaultLetter}></textarea>
                        <div className="w-full flex justify-end items-center gap-3">
                            <button className="btn btn-primary">Close</button>
                            <button onClick={adminApply} className="btn btn-outline">Apply</button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    </div>
    // console.log(user);

    const sidebar = <>
        <div className="z-50 drawer-side">
            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="relative menu p-4 w-80 space-y-2 min-h-full bg-base-200 text-base-content flex flex-col justify-start items-center">
                <div className="flex justify-center items-center"><a><img className="w-20 h-20 rounded-lg" src={user?.photoURL} alt="userProfile" /></a></div>
                <h2><a>{user?.displayName}</a></h2>
                <h2 className="pb-6"><a>{user?.email}</a></h2>
                <div className="pb-5 flex justify-center items-center gap-4">
                    <h4 className="text-lg font-roboto">Current Role</h4>
                    <p className="text-green-600 font-medium bg-green-200 px-2 py-1 rounded-full cursor-pointer">super admin</p>
                    {/* <div className="flex items-center justify-start gap-1">
                        <p className="text-[#151515bc] font-medium bg-amber-300 px-2 py-1 rounded-full cursor-pointer">admin</p>
                        <p className="text-[#151515bc] font-medium bg-red-300 px-2 py-1 rounded-full cursor-pointer">general user</p>
                    </div> */}
                </div>
                <li className="w-full bg-gray-300 border-b-2 border-red-400 rounded-md"><Link to={'/userdash'}>User Dashboard</Link></li>
                <li className="w-full bg-gray-300 border-b-2 border-red-400 rounded-md"><a onClick={() => document.getElementById('my_modal_1').showModal()}>Admin Request</a></li>
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
        <div className="w-full">
            {adminReqModal}
            <div className="w-full">
                <div className="w-[95%] mx-auto mt-6 px-4 py-2 navbar rounded-md bg-base-200">
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
                    <div className="navbar-end pt-1">
                        <div className="p-2 flex justify-center items-center">
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
            </div>
        </div>
    );
};

export default Navbar;