import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  HiOutlineAcademicCap,
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineBookOpen,
  HiOutlinePlusCircle,
  HiOutlineClipboardList,
  HiOutlineUsers,
  HiOutlineShieldCheck,
  HiOutlineLogout,
  HiOutlineMenu,
  HiOutlineX,
} from 'react-icons/hi';
import useAuth from '../hooks/useAuth';
import useUserInfo from '../hooks/useUserInfo';
import { useState } from 'react';

const ROLE_CONFIG = {
  student: {
    label: 'Student',
    color: 'bg-brand-50 text-brand-700',
    links: [
      { to: '/userdash', label: 'My Profile', icon: HiOutlineUser, end: true },
      { to: '/userdash/enrolled', label: 'My Courses', icon: HiOutlineBookOpen },
    ],
  },
  instructor: {
    label: 'Instructor',
    color: 'bg-accent-50 text-accent-700',
    links: [
      { to: '/teacherdash', label: 'My Profile', icon: HiOutlineUser, end: true },
      { to: '/teacherdash/myclass', label: 'My Courses', icon: HiOutlineBookOpen },
      { to: '/teacherdash/addclass', label: 'Add Course', icon: HiOutlinePlusCircle },
    ],
  },
  admin: {
    label: 'Admin',
    color: 'bg-success-50 text-success-700',
    links: [
      { to: '/admindash', label: 'Dashboard', icon: HiOutlineShieldCheck, end: true },
      { to: '/admindash/teacherreq', label: 'Instructor Requests', icon: HiOutlineClipboardList },
      { to: '/admindash/allusers', label: 'All Users', icon: HiOutlineUsers },
      { to: '/admindash/adminclasses', label: 'All Courses', icon: HiOutlineBookOpen },
    ],
  },
};

const DashboardLayout = ({ role = 'student' }) => {
  const { user, logOut } = useAuth();
  const [userInfo] = useUserInfo();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const config = ROLE_CONFIG[role] || ROLE_CONFIG.student;

  const handleLogout = async () => {
    await logOut();
    navigate('/', { replace: true });
  };

  const SidebarContent = () => (
    <>
      {/* Brand */}
      <div className="sidebar-brand">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center">
            <HiOutlineAcademicCap className="text-white text-lg" />
          </div>
          <span className="text-lg font-bold text-surface-900">ElevateEx</span>
        </Link>
      </div>

      {/* User info */}
      <div className="px-6 py-4 border-b border-surface-100">
        <div className="flex items-center gap-3">
          <img
            src={user?.photoURL || userInfo?.photoURL || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user?.displayName || 'U')}
            alt=""
            className="w-10 h-10 rounded-xl object-cover border-2 border-surface-200"
          />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-surface-900 truncate">{user?.displayName || userInfo?.displayName}</p>
            <span className={`inline-flex items-center px-2 py-0.5 text-[11px] font-semibold rounded-full ${config.color}`}>
              {config.label}
            </span>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="sidebar-nav">
        <p className="px-3 mb-2 text-[11px] font-semibold text-surface-400 uppercase tracking-wider">Menu</p>
        {config.links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
            }
          >
            <Icon className="text-lg" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer space-y-1">
        <Link to="/" className="sidebar-link" onClick={() => setSidebarOpen(false)}>
          <HiOutlineHome className="text-lg" />
          Back to Home
        </Link>
        <button onClick={handleLogout} className="sidebar-link w-full text-danger-500 hover:text-danger-600 hover:bg-danger-50">
          <HiOutlineLogout className="text-lg" />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-surface-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — desktop always visible, mobile slides in */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          sidebar transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Mobile close button */}
        <button
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-surface-100 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <HiOutlineX className="text-xl text-surface-500" />
        </button>
        <SidebarContent />
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="dash-header">
          <button
            className="p-2 -ml-2 rounded-lg hover:bg-surface-100 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <HiOutlineMenu className="text-xl text-surface-700" />
          </button>

          <div className="hidden lg:block" />

          <div className="flex items-center gap-3">
            <p className="text-sm text-surface-500 hidden sm:block">
              {user?.email}
            </p>
            <img
              src={user?.photoURL || userInfo?.photoURL || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user?.displayName || 'U')}
              alt=""
              className="w-8 h-8 rounded-lg object-cover"
            />
          </div>
        </header>

        {/* Page content */}
        <main className="dash-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
