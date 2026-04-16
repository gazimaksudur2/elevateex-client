import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import { useState, useRef } from "react";
import useUserInfo from "../hooks/useUserInfo";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { HiOutlineMenuAlt3, HiX, HiOutlineBell, HiOutlineAcademicCap } from "react-icons/hi";
import { FiChevronDown, FiLogOut, FiUser, FiGrid, FiShield } from "react-icons/fi";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [userInfo] = useUserInfo();
  const axiosSecure = useAxiosSecure();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const adminMsgRef = useRef();

  const handleLogOut = () => {
    logOut()
      .then(() => toast.success("Signed out successfully"))
      .catch(() => toast.error("Sign out interrupted"));
    setProfileOpen(false);
  };

  const handleAdminApply = () => {
    axiosSecure
      .patch(`users?email=${userInfo?.email}`, {
        admin_status: "pending",
        admin_req_msg: adminMsgRef.current?.value,
      })
      .then(() => {
        toast.success("Admin request submitted");
        setAdminModalOpen(false);
      })
      .catch((err) => toast.error(err.message));
  };

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/allclass", label: "Courses" },
    { to: "/teach", label: "Teach" },
  ];

  const getDashboardPath = () => {
    if (userInfo?.role === "admin") return "/admindash";
    if (userInfo?.role === "instructor") return "/teacherdash";
    return "/userdash";
  };

  const getRoleBadge = () => {
    const roleMap = {
      admin: { label: "Admin", cls: "badge-primary" },
      instructor: { label: "Instructor", cls: "badge-accent" },
      student: { label: "Student", cls: "badge-success" },
    };
    const r = roleMap[userInfo?.role] || roleMap.student;
    return <span className={r.cls}>{r.label}</span>;
  };

  return (
    <>
      <nav className="sticky top-0 z-50 glass border-b border-surface-200">
        <div className="section-container">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center group-hover:bg-brand-700 transition-colors">
                <HiOutlineAcademicCap className="text-white text-lg" />
              </div>
              <span className="text-xl font-bold text-surface-900">
                Elevate<span className="text-brand-600">Ex</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? "text-brand-700 bg-brand-50"
                        : "text-surface-600 hover:text-surface-900 hover:bg-surface-100"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <button className="hidden md:flex relative p-2 text-surface-500 hover:text-surface-700 hover:bg-surface-100 rounded-lg transition-colors">
                    <HiOutlineBell className="text-xl" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-500 rounded-full"></span>
                  </button>

                  <div className="relative">
                    <button
                      onClick={() => setProfileOpen(!profileOpen)}
                      className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-surface-100 transition-colors"
                    >
                      <img
                        src={user?.photoURL || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.displayName || "U")}
                        alt="avatar"
                        className="w-8 h-8 rounded-lg object-cover ring-2 ring-surface-200"
                      />
                      <FiChevronDown className={`hidden md:block text-surface-400 text-sm transition-transform ${profileOpen ? "rotate-180" : ""}`} />
                    </button>

                    {profileOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                        <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-soft-lg border border-surface-200 z-50 animate-slide-down overflow-hidden">
                          <div className="p-4 bg-surface-50 border-b border-surface-200">
                            <div className="flex items-center gap-3">
                              <img
                                src={user?.photoURL || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.displayName || "U")}
                                alt="avatar"
                                className="w-11 h-11 rounded-xl object-cover"
                              />
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-surface-900 truncate">{user?.displayName}</p>
                                <p className="text-xs text-surface-500 truncate">{user?.email}</p>
                                <div className="mt-1">{getRoleBadge()}</div>
                              </div>
                            </div>
                          </div>
                          <div className="p-2">
                            <Link
                              to={getDashboardPath()}
                              onClick={() => setProfileOpen(false)}
                              className="flex items-center gap-3 px-3 py-2.5 text-sm text-surface-700 hover:bg-surface-50 rounded-xl transition-colors"
                            >
                              <FiGrid className="text-surface-400" />
                              Dashboard
                            </Link>
                            <Link
                              to={getDashboardPath()}
                              onClick={() => setProfileOpen(false)}
                              className="flex items-center gap-3 px-3 py-2.5 text-sm text-surface-700 hover:bg-surface-50 rounded-xl transition-colors"
                            >
                              <FiUser className="text-surface-400" />
                              Profile
                            </Link>
                            {userInfo?.role !== "admin" && (
                              <button
                                onClick={() => { setAdminModalOpen(true); setProfileOpen(false); }}
                                className="flex items-center gap-3 px-3 py-2.5 text-sm text-surface-700 hover:bg-surface-50 rounded-xl transition-colors w-full text-left"
                              >
                                <FiShield className="text-surface-400" />
                                Request Admin Role
                              </button>
                            )}
                          </div>
                          <div className="p-2 border-t border-surface-200">
                            <button
                              onClick={handleLogOut}
                              className="flex items-center gap-3 px-3 py-2.5 text-sm text-danger-500 hover:bg-danger-50 rounded-xl transition-colors w-full"
                            >
                              <FiLogOut />
                              Sign Out
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login" className="btn-ghost text-sm py-2 px-4">Sign In</Link>
                  <Link to="/register" className="btn-primary text-sm py-2 px-4">Get Started</Link>
                </div>
              )}

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-surface-600 hover:bg-surface-100 rounded-lg"
              >
                {mobileOpen ? <HiX className="text-xl" /> : <HiOutlineMenuAlt3 className="text-xl" />}
              </button>
            </div>
          </div>

          {mobileOpen && (
            <div className="md:hidden py-4 border-t border-surface-200 animate-slide-down">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 text-sm font-medium rounded-lg mb-1 ${
                      isActive ? "text-brand-700 bg-brand-50" : "text-surface-600 hover:bg-surface-100"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </nav>

      {adminModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setAdminModalOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-soft-lg max-w-md w-full p-6 animate-scale-in">
            <h3 className="text-lg font-bold text-surface-900 mb-1">Request Admin Role</h3>
            <p className="text-sm text-surface-500 mb-4">Write a brief message explaining why you would like admin access.</p>
            <textarea
              ref={adminMsgRef}
              rows={5}
              className="input-field resize-none"
              defaultValue="I am writing to formally request admin privileges for my account. Having admin access would enable me to manage tasks more efficiently and assist with administrative responsibilities."
            />
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setAdminModalOpen(false)} className="btn-ghost text-sm py-2 px-4">Cancel</button>
              <button onClick={handleAdminApply} className="btn-primary text-sm py-2 px-4">Submit Request</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
