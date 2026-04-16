import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EmptyEnrollment from '../UserDashboard/EmptyEnrollment';
import TeacherClass from './TeacherClass';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useUserInfo from '../../hooks/useUserInfo';
import LoadingState from '../../components/ui/LoadingState';
import ErrorState from '../../components/ui/ErrorState';
import { parseApiError, isNetworkError } from '../../utils/errorParser';
import { HiOutlineBookOpen, HiOutlinePlusCircle } from 'react-icons/hi';

const TeacherClasses = () => {
  const [userInfo] = useUserInfo();
  const [myCourse, setMyCourse] = useState(null);
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure();

  const fetchCourses = () => {
    setError(null);
    setMyCourse(null);
    axiosSecure
      .get(`allclasses?instructor_email=${userInfo?.email}`)
      .then(res => setMyCourse(res.data))
      .catch(err => setError({ message: parseApiError(err), network: isNetworkError(err) }));
  };

  useEffect(() => {
    if (userInfo?.email) fetchCourses();
  }, [userInfo?.email]);

  if (myCourse === null && !error) return <LoadingState variant="cards" rows={3} />;
  if (error) return <ErrorState type={error.network ? 'network' : 'generic'} message={error.message} onRetry={fetchCourses} />;
  if (myCourse?.length === 0) {
    return (
      <EmptyEnrollment
        info="You haven't published any courses yet. Start sharing your expertise."
        actionLabel="Create Course"
        actionTo="/teacherdash/addclass"
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="dash-title">My Courses</h1>
          <p className="text-sm text-surface-500 mt-0.5">Manage and track your published courses</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="badge-primary flex items-center gap-1.5 px-3 py-1.5">
            <HiOutlineBookOpen className="text-sm" />
            {myCourse.length} Courses
          </span>
          <Link to="/teacherdash/addclass" className="btn-primary text-sm py-2 px-4">
            <HiOutlinePlusCircle />
            New Course
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        {myCourse.map((course, idx) => (
          <TeacherClass key={idx} course={course} />
        ))}
      </div>
    </div>
  );
};

export default TeacherClasses;
