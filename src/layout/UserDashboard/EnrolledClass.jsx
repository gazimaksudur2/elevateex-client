import { Link } from 'react-router-dom';
import { HiOutlineBookOpen, HiOutlineClock, HiOutlinePlay } from 'react-icons/hi';

const EnrolledClass = ({ course }) => {
  return (
    <div className="card-elevated overflow-hidden group">
      <div className="relative h-44 overflow-hidden">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          src={course?.course_banner}
          alt={course?.course_title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span className="absolute top-3 right-3 badge-primary text-xs">
          {course?.course_type}
        </span>
      </div>

      <div className="p-5 space-y-3">
        <h3 className="text-base font-semibold text-surface-900 line-clamp-2 leading-snug">
          {course?.course_title}
        </h3>
        <p className="text-sm text-surface-500 line-clamp-2">
          {course?.course_description}
        </p>

        <div className="flex items-center gap-4 text-xs text-surface-400">
          <span className="flex items-center gap-1">
            <HiOutlineBookOpen className="text-sm" />
            {course?.total_lessons} lessons
          </span>
          <span className="flex items-center gap-1">
            <HiOutlineClock className="text-sm" />
            {course?.course_duration}
          </span>
        </div>

        <Link
          to={`/userdash/classes/${course?._id}`}
          className="btn-primary w-full py-2.5 text-sm mt-2"
        >
          <HiOutlinePlay className="text-base" />
          Continue Learning
        </Link>
      </div>
    </div>
  );
};

export default EnrolledClass;
