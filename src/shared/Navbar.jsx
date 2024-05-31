import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    const navLinks = <>
        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'/allclass'}>All Classes</NavLink></li>
        <li><NavLink to={'/teach'}>Teach Here</NavLink></li>
        <li><NavLink to={'/'}>Contacts</NavLink></li>
    </>
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
                    <Link to={'login'}>
                        <h4 className="btn btn-primary">Sign In</h4>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;