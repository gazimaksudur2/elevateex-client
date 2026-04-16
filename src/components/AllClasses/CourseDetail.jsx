import { Link, ScrollRestoration, useLocation, useNavigate } from "react-router-dom";
import { HiOutlineAcademicCap, HiOutlineArrowLeft, HiOutlineStar, HiOutlineClock, HiOutlineBookOpen, HiOutlineUsers, HiOutlineCheckCircle } from "react-icons/hi";
import { FiDollarSign } from "react-icons/fi";
import useUserInfo from "../../hooks/useUserInfo";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Payment from "./payments";

const CourseDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userInfo] = useUserInfo();
  const axiosSecure = useAxiosSecure();
  const course = location.state?.data;

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-surface-500 mb-4">Course data not available</p>
          <Link to="/allclass" className="btn-primary">Browse Courses</Link>
        </div>
      </div>
    );
  }

  const handleEnroll = () => {
    const data = {
      student_id: userInfo?._id,
      course_id: location.pathname.split("/").pop(),
    };
    axiosSecure
      .post("enroll", data)
      .then(() => {
        toast.success("Enrolled successfully! Welcome to the course.");
        navigate("/userdash/enrolled");
      })
      .catch(() => {
        toast.error("Enrollment failed. Please try again.");
        navigate("/allclass");
      });
  };

  const highlights = [
    "Full lifetime access",
    "Certificate of completion",
    "Downloadable resources",
    "Access on mobile and desktop",
  ];

  return (
    <div className="min-h-screen bg-white">
      <ScrollRestoration />

      <nav className="sticky top-0 z-50 glass border-b border-surface-200">
        <div className="section-container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
              <HiOutlineAcademicCap className="text-white text-sm" />
            </div>
            <span className="text-lg font-bold text-surface-900">ElevateEx</span>
          </Link>
          <Link to="/allclass" className="btn-ghost text-sm py-2 px-4">
            <HiOutlineArrowLeft /> Back to Courses
          </Link>
        </div>
      </nav>

      <div className="bg-gradient-to-br from-surface-900 to-surface-800 text-white py-16">
        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <span className="badge-accent mb-4 inline-block">{course.course_type}</span>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
                {course.course_title}
              </h1>
              <p className="text-surface-300 text-lg leading-relaxed mb-6">
                {course.course_description}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-surface-300">
                <span className="flex items-center gap-1.5">
                  <HiOutlineStar className="text-warning-500" />
                  {course.rating || "New"} rating
                </span>
                <span className="flex items-center gap-1.5">
                  <HiOutlineUsers />
                  {course.total_enrollment || 0} enrolled
                </span>
                <span className="flex items-center gap-1.5">
                  <HiOutlineBookOpen />
                  {course.total_lessons || 0} lessons
                </span>
                <span className="flex items-center gap-1.5">
                  <HiOutlineClock />
                  {course.course_duration || "Self-paced"}
                </span>
              </div>

              <div className="flex items-center gap-3 mt-8">
                <img
                  src={course.instructor_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(course.instructor)}`}
                  alt={course.instructor}
                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-white/20"
                />
                <div>
                  <p className="font-semibold">{course.instructor}</p>
                  <p className="text-sm text-surface-400">{course.instructor_email}</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-soft-lg p-6 text-surface-900 lg:sticky lg:top-24">
                <img
                  src={course.course_banner || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80"}
                  alt={course.course_title}
                  className="w-full h-44 object-cover rounded-xl mb-5"
                />

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold flex items-center">
                    <FiDollarSign className="text-xl" />
                    {course.course_fee || "Free"}
                  </span>
                </div>

                <button onClick={handleEnroll} className="btn-primary w-full py-3.5 text-base mb-3">
                  Enroll Now
                </button>

                <p className="text-xs text-center text-surface-400 mb-5">30-day money-back guarantee</p>

                <div className="space-y-3">
                  <p className="text-sm font-semibold text-surface-900">This course includes:</p>
                  {highlights.map((h, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-surface-600">
                      <HiOutlineCheckCircle className="text-success-500 shrink-0" />
                      {h}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-container py-12">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold text-surface-900 mb-6">Payment Details</h2>
          <div className="card-elevated p-6">
            <Payment course={course} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
