import { useState, useEffect } from 'react';
import EmptyEnrollment from './EmptyEnrollment';
import EnrolledClass from './EnrolledClass';
import useAuth from '../../hooks/useAuth';
import useUserInfo from '../../hooks/useUserInfo';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingState from '../../components/ui/LoadingState';
import ErrorState from '../../components/ui/ErrorState';
import { parseApiError, isNetworkError } from '../../utils/errorParser';
import { HiOutlineBookOpen } from 'react-icons/hi';

const MyEnrollments = () => {
  const [courses, setCourses] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [userInfo] = useUserInfo();

  const fetchEnrollments = () => {
    setError(null);
    setCourses(null);
    axiosSecure
      .get(`/enroll?_id=${userInfo?._id}`)
      .then((res) => setCourses(res.data))
      .catch((err) => setError({ message: parseApiError(err), network: isNetworkError(err) }));
  };

  useEffect(() => {
    if (userInfo?._id) fetchEnrollments();
  }, [userInfo?._id]);

  if (courses === null && !error) {
    return <LoadingState variant="cards" rows={4} />;
  }

  if (error) {
    return (
      <ErrorState
        type={error.network ? 'network' : 'generic'}
        message={error.message}
        onRetry={fetchEnrollments}
      />
    );
  }

  if (courses?.length === 0) {
    return (
      <EmptyEnrollment
        info="You haven't enrolled in any courses yet. Browse our catalog to get started."
        actionLabel="Browse Courses"
        actionTo="/allclass"
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="dash-title">My Courses</h1>
          <p className="text-sm text-surface-500 mt-0.5">
            Welcome back, <span className="font-medium text-surface-900">{user?.displayName}</span>
          </p>
        </div>
        <span className="badge-primary flex items-center gap-1.5 px-3 py-1.5">
          <HiOutlineBookOpen className="text-sm" />
          {courses.length} Enrolled
        </span>
      </div>

      {/* Course grid */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.map((course, idx) => (
          <EnrolledClass key={idx} course={course[0]} />
        ))}
      </div>
    </div>
  );
};

export default MyEnrollments;
