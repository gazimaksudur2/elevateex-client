import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineAcademicCap, HiOutlineMail, HiOutlineLockClosed, HiOutlineUser, HiOutlinePhotograph } from "react-icons/hi";
import SocialLogin from "./SocialLogin";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { parseApiError } from "../utils/errorParser";
import { toast } from "../utils/toast";

const Register = () => {
  const { createUser, updateUser } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const img_hosting_key = import.meta.env.VITE_image_hosting_key;
  const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let profile_img = null;
      if (data.image?.length) {
        const res = await axiosPublic.post(
          img_hosting_api,
          { image: data.image[0] },
          { headers: { "content-type": "multipart/form-data" } }
        );
        profile_img = res.data.data.display_url;
      }

      const user = {
        displayName: data.name,
        photoURL: profile_img,
        email: data.email,
        provider: null,
        role: "student",
        req_status: "No",
        admin_status: "not_attempted",
        instructor_status: "not_attempted",
        isActive: true,
        createdAt: new Date().toISOString().slice(0, 10),
      };

      await axiosPublic.post("/users", user);
      await createUser(data.email, data.password);
      await updateUser(data.name, profile_img);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (error) {
      toast.error(parseApiError(error, "register"));
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-accent-500 to-brand-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="relative flex flex-col justify-center p-16 text-white">
          <Link to="/" className="flex items-center gap-2.5 mb-12">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <HiOutlineAcademicCap className="text-white text-xl" />
            </div>
            <span className="text-2xl font-bold">ElevateEx</span>
          </Link>
          <h2 className="text-4xl font-display font-bold leading-tight mb-4">
            Unlock Your Full Potential
          </h2>
          <p className="text-lg text-white/70 max-w-md">
            Join a global community of learners. Build skills that matter, earn recognized credentials, and transform your career.
          </p>
          <div className="mt-12 space-y-4">
            {[
              "Access 500+ expert-led courses",
              "Earn verified certificates",
              "Learn at your own pace",
            ].map((text, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white/80">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center">
                <HiOutlineAcademicCap className="text-white text-lg" />
              </div>
              <span className="text-xl font-bold text-surface-900">ElevateEx</span>
            </Link>
          </div>

          <h1 className="text-2xl font-bold text-surface-900 mb-1">Create your account</h1>
          <p className="text-surface-500 mb-8">Start your learning journey today</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1.5">Full Name</label>
              <div className="relative">
                <HiOutlineUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" />
                <input
                  type="text"
                  placeholder="John Doe"
                  {...register("name", { required: "Name is required" })}
                  className="input-field pl-10"
                />
              </div>
              {errors.name && <p className="text-xs text-danger-500 mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1.5">Email</label>
              <div className="relative">
                <HiOutlineMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email", { required: "Email is required" })}
                  className="input-field pl-10"
                />
              </div>
              {errors.email && <p className="text-xs text-danger-500 mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1.5">Password</label>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" />
                <input
                  type="password"
                  placeholder="Min 6 characters"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                    maxLength: { value: 12, message: "Maximum 12 characters" },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])/,
                      message: "Must include uppercase, lowercase, and special character",
                    },
                  })}
                  className="input-field pl-10"
                />
              </div>
              {errors.password && <p className="text-xs text-danger-500 mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1.5">Profile Photo</label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  {...register("image")}
                  className="block w-full text-sm text-surface-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 cursor-pointer border border-surface-300 rounded-xl"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full py-3 text-base disabled:opacity-50 mt-2"
            >
              {isSubmitting ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-surface-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-sm text-surface-400">Or sign up with</span>
            </div>
          </div>

          <SocialLogin />

          <p className="mt-8 text-center text-sm text-surface-500">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
