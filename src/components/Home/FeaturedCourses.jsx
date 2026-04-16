import { Link } from "react-router-dom";
import { HiOutlineArrowRight, HiOutlineClock, HiOutlineBookOpen, HiOutlineStar } from "react-icons/hi";
import { FiDollarSign } from "react-icons/fi";
import useClass from "../../hooks/useClass";

const CourseCard = ({ course }) => (
  <Link to={`/course/${course?._id}`} state={{ data: course }}>
    <div className="card-interactive group overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={course?.course_banner || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80"}
          alt={course?.course_title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="badge-accent text-xs px-3 py-1">{course?.course_type}</span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-surface-900 text-xs font-bold px-2.5 py-1 rounded-lg">
            <FiDollarSign className="text-xs" />
            {course?.course_fee || "Free"}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={course?.instructor_url || "https://ui-avatars.com/api/?name=I"}
            alt={course?.instructor}
            className="w-8 h-8 rounded-lg object-cover"
          />
          <span className="text-sm text-surface-500">{course?.instructor}</span>
        </div>

        <h3 className="text-base font-semibold text-surface-900 line-clamp-2 group-hover:text-brand-600 transition-colors mb-3">
          {course?.course_title}
        </h3>

        <div className="flex items-center gap-4 text-xs text-surface-400 pt-3 border-t border-surface-100">
          <span className="flex items-center gap-1">
            <HiOutlineBookOpen />
            {course?.total_lessons} lessons
          </span>
          <span className="flex items-center gap-1">
            <HiOutlineClock />
            {course?.course_duration}
          </span>
          <span className="flex items-center gap-1">
            <HiOutlineStar className="text-warning-500" />
            {course?.rating || "New"}
          </span>
        </div>
      </div>
    </div>
  </Link>
);

const FeaturedCourses = () => {
  const [classes] = useClass({ query: "?course_status=approved" });
  const featured = classes?.slice(0, 6) || [];

  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="badge-primary mb-3 inline-block">Popular Courses</span>
            <h2 className="heading-section">Explore Top-Rated Courses</h2>
            <p className="mt-3 text-body-lg max-w-xl">
              Handpicked courses from world-class instructors to accelerate your learning journey.
            </p>
          </div>
          <Link to="/allclass" className="btn-secondary shrink-0">
            View All Courses
            <HiOutlineArrowRight />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((course, idx) => (
            <div key={course?._id || idx} className="animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
              <CourseCard course={course} />
            </div>
          ))}
        </div>

        {featured.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-surface-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <HiOutlineBookOpen className="text-2xl text-surface-400" />
            </div>
            <p className="text-surface-500">No courses available yet. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCourses;
