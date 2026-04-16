import { HiOutlineClock, HiOutlineBookOpen, HiOutlineStar, HiOutlineUsers } from "react-icons/hi";
import { FiDollarSign } from "react-icons/fi";
import { Link } from "react-router-dom";

const ClassCards = ({ course }) => {
  return (
    <Link to={`/course/${course?._id}`} state={{ data: course }}>
      <div className="card-interactive group overflow-hidden h-full">
        <div className="relative overflow-hidden">
          <img
            src={course?.course_banner || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80"}
            alt={course?.course_title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute top-3 left-3">
            <span className="badge-accent px-3 py-1">{course?.course_type || "General"}</span>
          </div>
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-surface-900 text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm">
              <FiDollarSign className="text-xs" />
              {course?.course_fee || "Free"}
            </span>
          </div>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={course?.instructor_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(course?.instructor || "I")}&background=dbeafe&color=1d4ed8`}
              alt={course?.instructor}
              className="w-8 h-8 rounded-lg object-cover ring-1 ring-surface-200"
            />
            <span className="text-sm text-surface-500 truncate">{course?.instructor}</span>
          </div>

          <h3 className="text-base font-semibold text-surface-900 line-clamp-2 group-hover:text-brand-600 transition-colors mb-auto">
            {course?.course_title}
          </h3>

          <div className="flex items-center justify-between gap-2 text-xs text-surface-400 pt-4 mt-4 border-t border-surface-100">
            <span className="flex items-center gap-1">
              <HiOutlineBookOpen className="text-sm" />
              {course?.total_lessons || 0} lessons
            </span>
            <span className="flex items-center gap-1">
              <HiOutlineClock className="text-sm" />
              {course?.course_duration || "Self-paced"}
            </span>
            <span className="flex items-center gap-1">
              <HiOutlineStar className="text-sm text-warning-500" />
              {course?.rating || "New"}
            </span>
            <span className="flex items-center gap-1">
              <HiOutlineUsers className="text-sm" />
              {course?.total_enrollment || 0}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ClassCards;
