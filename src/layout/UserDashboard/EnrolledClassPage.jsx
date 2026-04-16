import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {
  HiOutlineBookOpen,
  HiOutlineClock,
  HiOutlineStar,
  HiOutlineClipboardList,
  HiOutlinePencilAlt,
} from 'react-icons/hi';
import { Rating } from '@mui/material';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useUserInfo from '../../hooks/useUserInfo';
import LoadingState from '../../components/ui/LoadingState';
import ErrorState from '../../components/ui/ErrorState';
import ClassWork from './classes/ClassWork';
import { parseApiError, isNetworkError } from '../../utils/errorParser';
import { toast } from '../../utils/toast';

const TABS = [
  { key: 'overview', label: 'Overview', icon: HiOutlineBookOpen },
  { key: 'assignments', label: 'Assignments', icon: HiOutlineClipboardList },
];

const EnrolledClassPage = () => {
  const location = useLocation();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [reviewOpen, setReviewOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [userInfo] = useUserInfo();
  const reviewRef = useRef();
  const ratingRef = useRef();
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

  const submitReview = async () => {
    const toastId = toast.loading('Submitting review…');
    try {
      await axiosSecure.post('reviews', {
        description: reviewRef.current?.value,
        rating: parseFloat(ratingRef.current?.value || 5),
        user_name: userInfo?.displayName,
        user_url: userInfo?.photoURL,
        rated_at: new Date().toISOString().slice(0, 10),
        course_title: course?.course_title,
      });
      toast.update(toastId, { render: 'Review submitted!', type: 'success', isLoading: false, autoClose: 3000 });
      setReviewOpen(false);
    } catch (err) {
      toast.update(toastId, { render: parseApiError(err), type: 'error', isLoading: false, autoClose: 5000 });
    }
  };

  if (!course && !error) return <LoadingState text="Loading course…" />;
  if (error) return <ErrorState type={error.network ? 'network' : 'generic'} message={error.message} onRetry={fetchCourse} />;

  return (
    <div className="space-y-6">
      {/* Course header */}
      <div className="card-elevated overflow-hidden">
        <div className="h-48 md:h-56 bg-cover bg-center relative" style={{ backgroundImage: `url(${course?.course_banner})` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <span className="inline-flex items-center px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium mb-2">
              {course?.course_type}
            </span>
            <h1 className="text-xl md:text-2xl font-bold">{course?.course_title}</h1>
          </div>
        </div>
        <div className="p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={course?.instructor_url} alt="" className="w-10 h-10 rounded-xl object-cover" />
            <div>
              <p className="text-sm font-semibold text-surface-900">{course?.instructor}</p>
              <p className="text-xs text-surface-400">{course?.instructor_email}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 text-sm text-surface-500">
            <span className="flex items-center gap-1.5"><HiOutlineBookOpen />{course?.total_lessons} lessons</span>
            <span className="flex items-center gap-1.5"><HiOutlineClock />{course?.course_duration}</span>
            <span className="flex items-center gap-1.5"><HiOutlineStar className="text-amber-500" />{course?.rating}</span>
          </div>
          <button onClick={() => setReviewOpen(true)} className="btn-secondary text-sm py-2 px-4">
            <HiOutlinePencilAlt /> Write Review
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-surface-100 rounded-xl w-fit">
        {TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === key
                ? 'bg-white text-surface-900 shadow-sm'
                : 'text-surface-500 hover:text-surface-700'
            }`}
          >
            <Icon className="text-base" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'overview' && (
        <div className="card-elevated p-6 space-y-4">
          <h2 className="text-base font-semibold text-surface-900">About This Course</h2>
          <p className="text-sm text-surface-600 leading-relaxed">{course?.course_description}</p>
          <div className="grid sm:grid-cols-3 gap-4 pt-2">
            {[
              { label: 'Total Lessons', value: course?.total_lessons },
              { label: 'Duration', value: course?.course_duration },
              { label: 'Rating', value: `${course?.rating} / 5.0` },
            ].map(({ label, value }) => (
              <div key={label} className="bg-surface-50 rounded-xl p-4 text-center">
                <p className="text-lg font-bold text-surface-900">{value}</p>
                <p className="text-xs text-surface-400 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'assignments' && <ClassWork course={course} />}

      {/* Review modal */}
      {reviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setReviewOpen(false)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-surface-900 mb-4">Rate Your Experience</h3>
            <div className="flex items-center gap-4 mb-4">
              <p className="text-sm font-medium text-surface-600">Rating</p>
              <Rating ref={ratingRef} name="review-rating" defaultValue={4.5} precision={0.5} />
            </div>
            <textarea
              ref={reviewRef}
              className="input-field h-32 resize-none"
              placeholder="Share your thoughts about this course…"
              defaultValue={`The ${course?.course_title} course offers exceptional content and engaging instruction from ${course?.instructor}.`}
            />
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setReviewOpen(false)} className="btn-ghost text-sm py-2 px-4">Cancel</button>
              <button onClick={submitReview} className="btn-primary text-sm py-2.5 px-5">Submit Review</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnrolledClassPage;
