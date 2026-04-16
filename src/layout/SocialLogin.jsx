import { FcGoogle } from "react-icons/fc";
import { VscGithub } from "react-icons/vsc";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { parseApiError } from "../utils/errorParser";
import { toast } from "../utils/toast";

const SocialLogin = () => {
  const { googleLogin, githubLogin } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleSocialAuth = async (authFn, provider) => {
    try {
      const res = await authFn();
      const existing = await axiosPublic.get(`/users?email=${res.user.email}`);
      if (existing.data.length === 0) {
        await axiosPublic.post("/users", {
          displayName: res.user.displayName,
          photoURL: res.user.photoURL,
          email: res.user.email,
          provider,
          role: "student",
          admin_status: "not_attempted",
          instructor_status: "not_attempted",
          isActive: true,
          createdAt: new Date().toISOString().slice(0, 10),
        });
      }
      toast.success(`Welcome, ${res.user.displayName}!`);
      navigate("/");
    } catch (error) {
      toast.error(parseApiError(error, "login"));
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        onClick={() => handleSocialAuth(googleLogin, "google")}
        type="button"
        className="flex items-center justify-center gap-2.5 px-4 py-3 text-sm font-medium text-surface-700 bg-white border border-surface-300 rounded-xl hover:bg-surface-50 transition-colors"
      >
        <FcGoogle className="text-lg" />
        Google
      </button>
      <button
        onClick={() => handleSocialAuth(githubLogin, "github")}
        type="button"
        className="flex items-center justify-center gap-2.5 px-4 py-3 text-sm font-medium text-surface-700 bg-white border border-surface-300 rounded-xl hover:bg-surface-50 transition-colors"
      >
        <VscGithub className="text-lg" />
        GitHub
      </button>
    </div>
  );
};

export default SocialLogin;
