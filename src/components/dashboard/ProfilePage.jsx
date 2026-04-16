import {
  HiOutlineMail,
  HiOutlineCalendar,
  HiOutlineShieldCheck,
  HiOutlineAcademicCap,
  HiOutlineBadgeCheck,
} from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import useUserInfo from '../../hooks/useUserInfo';
import LoadingState from '../ui/LoadingState';

const ROLE_LABELS = {
  admin: { label: 'Administrator', icon: HiOutlineShieldCheck, bg: 'bg-success-50 text-success-700' },
  instructor: { label: 'Instructor', icon: HiOutlineAcademicCap, bg: 'bg-accent-50 text-accent-700' },
  student: { label: 'Student', icon: HiOutlineBadgeCheck, bg: 'bg-brand-50 text-brand-700' },
  general: { label: 'Student', icon: HiOutlineBadgeCheck, bg: 'bg-brand-50 text-brand-700' },
};

const ProfilePage = () => {
  const { user } = useAuth();
  const [userInfo, isLoading] = useUserInfo();

  if (isLoading) return <LoadingState text="Loading profile…" />;

  const role = ROLE_LABELS[userInfo?.role] || ROLE_LABELS.student;
  const RoleIcon = role.icon;
  const joined = userInfo?.createdAt || 'N/A';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Hero card */}
      <div className="card-elevated overflow-hidden">
        <div className="h-32 bg-gradient-to-br from-brand-600 via-brand-500 to-accent-500 relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnYtNGgydjRoNHYyaC00djRoLTJ2LTR6bTAtMzBoLTJ2LTRoMlY0aDJ2NGg0djJoLTR2NGgtMlY0em0tNiA2MHYtNGgydjRoNHYyaC00djRoLTJ2LTRIMjJ2LTJoNHptMC0zMGgtMnYtNGgydi00aDJ2NGg0djJoLTR2NGgtMnYtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
        </div>

        <div className="px-6 pb-6 relative">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12">
            <img
              src={user?.photoURL || userInfo?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'U')}&size=128&bold=true&background=4f46e5&color=fff`}
              alt=""
              className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg"
            />
            <div className="flex-1 pb-1">
              <h1 className="text-xl font-bold text-surface-900">{user?.displayName || userInfo?.displayName}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full ${role.bg}`}>
                  <RoleIcon className="text-sm" />
                  {role.label}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Personal Info */}
        <div className="card-elevated p-6">
          <h2 className="text-base font-semibold text-surface-900 mb-4">Personal Information</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-brand-50 rounded-lg flex items-center justify-center shrink-0">
                <HiOutlineMail className="text-brand-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-surface-400 font-medium">Email Address</p>
                <p className="text-sm text-surface-900 truncate">{user?.email || userInfo?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-accent-50 rounded-lg flex items-center justify-center shrink-0">
                <HiOutlineCalendar className="text-accent-600" />
              </div>
              <div>
                <p className="text-xs text-surface-400 font-medium">Member Since</p>
                <p className="text-sm text-surface-900">{joined}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-success-50 rounded-lg flex items-center justify-center shrink-0">
                <HiOutlineShieldCheck className="text-success-600" />
              </div>
              <div>
                <p className="text-xs text-surface-400 font-medium">Account Status</p>
                <p className="text-sm text-surface-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-success-500" />
                  Active
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links / Social */}
        <div className="card-elevated p-6">
          <h2 className="text-base font-semibold text-surface-900 mb-4">Social Profiles</h2>
          <div className="space-y-3">
            {[
              { icon: FaGithub, label: 'GitHub', href: 'https://github.com', color: 'bg-surface-100 text-surface-700' },
              { icon: FaLinkedin, label: 'LinkedIn', href: 'https://linkedin.com', color: 'bg-blue-50 text-blue-600' },
              { icon: FaGlobe, label: 'Portfolio', href: '#', color: 'bg-brand-50 text-brand-600' },
            ].map(({ icon: Icon, label, href, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-50 transition-colors group"
              >
                <div className={`w-9 h-9 ${color} rounded-lg flex items-center justify-center shrink-0`}>
                  <Icon className="text-lg" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-surface-900 group-hover:text-brand-600 transition-colors">{label}</p>
                  <p className="text-xs text-surface-400 truncate">{href}</p>
                </div>
              </a>
            ))}
          </div>
          <p className="text-xs text-surface-400 mt-4 text-center">Profile editing coming soon</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
