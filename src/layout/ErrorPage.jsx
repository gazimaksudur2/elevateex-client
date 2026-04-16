import { Link, useRouteError } from "react-router-dom";
import { HiOutlineAcademicCap, HiOutlineHome, HiOutlineArrowLeft } from "react-icons/hi";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-50 px-4">
      <div className="text-center max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 mb-8">
          <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center">
            <HiOutlineAcademicCap className="text-white text-lg" />
          </div>
          <span className="text-xl font-bold text-surface-900">ElevateEx</span>
        </Link>

        <div className="text-8xl font-display font-bold gradient-text mb-4">
          {error?.status || "404"}
        </div>
        <h1 className="text-2xl font-bold text-surface-900 mb-2">
          {error?.status === 404 ? "Page Not Found" : "Something Went Wrong"}
        </h1>
        <p className="text-surface-500 mb-8">
          {error?.statusText || error?.message || "The page you're looking for doesn't exist or has been moved."}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link to="/" className="btn-primary">
            <HiOutlineHome />
            Go Home
          </Link>
          <button onClick={() => window.history.back()} className="btn-secondary">
            <HiOutlineArrowLeft />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
