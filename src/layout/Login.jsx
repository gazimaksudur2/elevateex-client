import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineAcademicCap, HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import SocialLogin from "./SocialLogin";
import useAuth from "../hooks/useAuth";
import { parseApiError } from "../utils/errorParser";
import { toast } from "../utils/toast";

const Login = () => {
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await logIn(data.email, data.password);
      toast.success(`Welcome back, ${res?.user?.displayName || "there"}!`);
      navigate("/");
    } catch (error) {
      toast.error(parseApiError(error, "login"));
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-brand-600 to-brand-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" />
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl" />
        <div className="relative flex flex-col justify-center p-16 text-white">
          <Link to="/" className="flex items-center gap-2.5 mb-12">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <HiOutlineAcademicCap className="text-white text-xl" />
            </div>
            <span className="text-2xl font-bold">ElevateEx</span>
          </Link>
          <h2 className="text-4xl font-display font-bold leading-tight mb-4">
            Empower Your Learning Journey
          </h2>
          <p className="text-lg text-white/70 max-w-md">
            Access hundreds of expert-led courses, track your progress, and earn certificates to advance your career.
          </p>
          <div className="flex items-center gap-6 mt-12">
            <div className="text-center">
              <p className="text-3xl font-bold">10K+</p>
              <p className="text-sm text-white/60">Students</p>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <p className="text-3xl font-bold">500+</p>
              <p className="text-sm text-white/60">Courses</p>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <p className="text-3xl font-bold">95%</p>
              <p className="text-sm text-white/60">Satisfaction</p>
            </div>
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

          <h1 className="text-2xl font-bold text-surface-900 mb-1">Welcome back</h1>
          <p className="text-surface-500 mb-8">Sign in to continue your learning journey</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                  placeholder="Enter your password"
                  {...register("password", { required: "Password is required" })}
                  className="input-field pl-10"
                />
              </div>
              {errors.password && <p className="text-xs text-danger-500 mt-1">{errors.password.message}</p>}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-surface-300 text-brand-600 focus:ring-brand-500" />
                <span className="text-sm text-surface-600">Remember me</span>
              </label>
              <a href="#" className="text-sm font-medium text-brand-600 hover:text-brand-700">Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full py-3 text-base disabled:opacity-50"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-surface-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-sm text-surface-400">Or continue with</span>
            </div>
          </div>

          <SocialLogin />

          <p className="mt-8 text-center text-sm text-surface-500">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-brand-600 hover:text-brand-700">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
