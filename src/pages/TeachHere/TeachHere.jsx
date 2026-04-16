import { useForm } from "react-hook-form";
import { HiOutlineBriefcase, HiOutlineAcademicCap, HiOutlineCheckCircle, HiOutlineCurrencyDollar, HiOutlineUserGroup, HiOutlinePresentationChartLine } from "react-icons/hi";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserInfo from "../../hooks/useUserInfo";
import { parseApiError } from "../../utils/errorParser";
import { toast } from "../../utils/toast";

const benefits = [
  { icon: HiOutlineUserGroup, title: "Global Reach", desc: "Teach thousands of students from 150+ countries" },
  { icon: HiOutlineCurrencyDollar, title: "Earn Revenue", desc: "Competitive revenue sharing on every enrollment" },
  { icon: HiOutlinePresentationChartLine, title: "Analytics", desc: "Track student progress and course performance" },
  { icon: HiOutlineAcademicCap, title: "Support", desc: "Dedicated instructor support and resources" },
];

const categories = ["Web Development", "Marketing", "Business", "Data Science", "Design", "Programming", "AI & Machine Learning", "Mobile Development"];
const experienceLevels = ["Beginner", "Mid-Level", "Experienced", "Expert"];

const TeachHere = () => {
  const [userInfo] = useUserInfo();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const instructor = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        photoURL: userInfo?.photoURL,
        role: userInfo?.role,
        category: data.category,
        experience: data.experience,
        requestedAt: new Date().toISOString().slice(0, 10),
      };
      await axiosSecure.post("/instructors", instructor);
      toast.success("Application submitted! We'll review it shortly.");
      reset();
    } catch (error) {
      toast.error(parseApiError(error, "instructor_apply"));
    }
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-accent-500 to-brand-700 text-white py-20">
        <div className="section-container text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white/90 mb-6">
            <HiOutlineBriefcase />
            Join 500+ expert instructors
          </span>
          <h1 className="text-display-sm md:text-display-lg font-display font-bold mb-4">
            Share Your Knowledge,<br />Inspire the World
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Apply to become an ElevateEx instructor and help shape the next generation of professionals.
          </p>
        </div>
      </section>

      <section className="section-padding bg-surface-50">
        <div className="section-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {benefits.map((b, idx) => (
              <div key={idx} className="card-elevated p-6 text-center">
                <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <b.icon className="text-xl text-brand-600" />
                </div>
                <h3 className="text-base font-semibold text-surface-900 mb-1">{b.title}</h3>
                <p className="text-sm text-surface-500">{b.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-3">
              <div className="card-elevated p-8">
                <h2 className="text-2xl font-bold text-surface-900 mb-2">Instructor Application</h2>
                <p className="text-surface-500 mb-8">Fill out the form below to start your teaching journey.</p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-1.5">First Name</label>
                      <input
                        type="text"
                        placeholder="John"
                        {...register("first_name", { required: "First name is required" })}
                        className="input-field"
                      />
                      {errors.first_name && <p className="text-xs text-danger-500 mt-1">{errors.first_name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-1.5">Last Name</label>
                      <input
                        type="text"
                        placeholder="Doe"
                        {...register("last_name", { required: "Last name is required" })}
                        className="input-field"
                      />
                      {errors.last_name && <p className="text-xs text-danger-500 mt-1">{errors.last_name.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-1.5">Email</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      {...register("email", { required: "Email is required" })}
                      className="input-field"
                    />
                    {errors.email && <p className="text-xs text-danger-500 mt-1">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-1.5">Course Category</label>
                    <select
                      {...register("category", { required: "Category is required" })}
                      className="input-field"
                      defaultValue=""
                    >
                      <option value="" disabled>Select your specialty</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    {errors.category && <p className="text-xs text-danger-500 mt-1">{errors.category.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-1.5">Experience Level</label>
                    <select
                      {...register("experience", { required: "Experience level is required" })}
                      className="input-field"
                      defaultValue=""
                    >
                      <option value="" disabled>Select your experience level</option>
                      {experienceLevels.map((level) => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                    {errors.experience && <p className="text-xs text-danger-500 mt-1">{errors.experience.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full py-3.5 text-base disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="card-elevated p-6">
                <h3 className="text-lg font-semibold text-surface-900 mb-4">How It Works</h3>
                <div className="space-y-4">
                  {[
                    { step: "1", title: "Apply", desc: "Submit your application with your expertise details" },
                    { step: "2", title: "Review", desc: "Our team reviews your application within 48 hours" },
                    { step: "3", title: "Create", desc: "Start building courses with our powerful tools" },
                    { step: "4", title: "Earn", desc: "Get paid for every student who enrolls in your courses" },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="w-8 h-8 bg-brand-50 rounded-lg flex items-center justify-center shrink-0">
                        <span className="text-sm font-bold text-brand-600">{item.step}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-surface-900">{item.title}</p>
                        <p className="text-sm text-surface-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-elevated p-6 bg-brand-50 border-brand-200">
                <HiOutlineCheckCircle className="text-2xl text-brand-600 mb-3" />
                <h3 className="text-lg font-semibold text-surface-900 mb-2">Instructor Benefits</h3>
                <ul className="space-y-2 text-sm text-surface-600">
                  <li className="flex items-center gap-2"><HiOutlineCheckCircle className="text-success-500 shrink-0" /> Revenue sharing on enrollments</li>
                  <li className="flex items-center gap-2"><HiOutlineCheckCircle className="text-success-500 shrink-0" /> Course creation tools and support</li>
                  <li className="flex items-center gap-2"><HiOutlineCheckCircle className="text-success-500 shrink-0" /> Marketing and promotion assistance</li>
                  <li className="flex items-center gap-2"><HiOutlineCheckCircle className="text-success-500 shrink-0" /> Dedicated instructor dashboard</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeachHere;
