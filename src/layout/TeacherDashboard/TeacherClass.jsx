import { HiOutlineBookOpen, HiOutlineClock, HiOutlineStar, HiOutlineEye } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const TeacherClass = ({ course }) => {
  const statusBadge = {
    approved: 'badge-success',
    pending: 'badge-warning',
    cancelled: 'badge-danger',
  };

  return (
    <div className="card-elevated overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-72 h-48 lg:h-auto shrink-0 overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={course?.course_banner}
            alt={course?.course_title}
          />
        </div>

        <div className="flex-1 p-5 flex flex-col justify-between gap-3">
          <div>
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="text-base font-semibold text-surface-900 line-clamp-1">{course?.course_title}</h3>
              <span className={`${statusBadge[course?.course_status] || 'badge-primary'} capitalize shrink-0`}>
                {course?.course_status}
              </span>
            </div>
            <p className="text-sm text-surface-500 line-clamp-2">{course?.course_description}</p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-5 text-xs text-surface-400">
              <span className="flex items-center gap-1"><HiOutlineBookOpen />{course?.total_lessons} lessons</span>
              <span className="flex items-center gap-1"><HiOutlineClock />{course?.course_duration}</span>
              <span className="flex items-center gap-1"><HiOutlineStar className="text-amber-500" />{course?.rating}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-brand-600">${parseInt(course?.course_fee)}</span>
              <Link
                to={`/teacherclass/${course?._id}`}
                className="btn-primary text-xs py-2 px-4"
              >
                <HiOutlineEye />
                Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherClass;
