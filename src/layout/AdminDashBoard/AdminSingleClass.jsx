import { Link, useLocation } from 'react-router-dom';
import {
  HiOutlineBookOpen,
  HiOutlineClock,
  HiOutlineStar,
  HiOutlineArrowLeft,
} from 'react-icons/hi';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import CourseProgress from './CourseProgress';
import LoadingState from '../../components/ui/LoadingState';
import ErrorState from '../../components/ui/ErrorState';
import { parseApiError, isNetworkError } from '../../utils/errorParser';

const AdminSingleClass = () => {
  const location = useLocation();
  const [course, setCourse] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure();
  const id = location.pathname.split('/').pop();

  const fetchCourse = () => {
    setError(null);
    setCourse(null);
    axiosSecure.get(`/allclasses?_id=${id}`)
      .then(res => {
        if (!res.data[0]) setError({ message: 'Course not found.', network: false });
        else setCourse(res.data[0]);
      })
      .catch(err => setError({ message: parseApiError(err), network: isNetworkError(err) }));
  };

  useEffect(() => { if (id) fetchCourse(); }, [id]);

  useEffect(() => {
    if (!course?.course_title) return;
    axiosSecure.get(`/reviews?course_title=${course.course_title}`)
      .then(res => setReviews(res.data))
      .catch(() => setReviews([]));
  }, [course]);

  if (!course && !error) return <div className="min-h-screen flex items-center justify-center"><LoadingState text="Loading course…" /></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center p-10"><ErrorState type={error.network ? 'network' : 'generic'} message={error.message} onRetry={fetchCourse} /></div>;

  const statusBadge = { approved: 'badge-success', pending: 'badge-warning', cancelled: 'badge-danger' };

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Top nav */}
      <nav className="bg-white border-b border-surface-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
        <Link to="/admindash/adminclasses" className="flex items-center gap-2 text-sm font-medium text-surface-600 hover:text-surface-900 transition-colors">
          <HiOutlineArrowLeft />
          Back to Courses
        </Link>
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">E</span>
          </div>
          <span className="text-base font-bold text-surface-900">ElevateEx</span>
        </Link>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        {/* Course detail card */}
        <div className="card-elevated p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-xl font-bold text-surface-900">{course.course_title}</h1>
              <p className="text-sm text-surface-500 leading-relaxed">{course.course_description}</p>
            </div>
            <span className={`${statusBadge[course.course_status] || 'badge-primary'} capitalize shrink-0`}>
              {course.course_status}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-surface-100">
            <div className="flex items-center gap-3">
              <img src={course.instructor_url} alt="" className="w-9 h-9 rounded-lg object-cover" />
              <div>
                <p className="text-sm font-medium text-surface-900">{course.instructor}</p>
                <p className="text-xs text-surface-400">{course.instructor_email}</p>
              </div>
            </div>
            <div className="flex items-center gap-5 text-sm text-surface-500">
              <span className="flex items-center gap-1.5"><HiOutlineBookOpen />{course.total_lessons} lessons</span>
              <span className="flex items-center gap-1.5"><HiOutlineClock />{course.course_duration}</span>
              <span className="flex items-center gap-1.5"><HiOutlineStar className="text-amber-500" />{course.rating}</span>
            </div>
          </div>
        </div>

        {/* Reviews */}
        {reviews === null ? (
          <LoadingState size="sm" text="Loading reviews…" />
        ) : (
          <CourseProgress reviews={reviews} />
        )}
      </div>
    </div>
  );
};

export default AdminSingleClass;
