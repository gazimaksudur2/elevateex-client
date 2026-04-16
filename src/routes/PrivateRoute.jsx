import { ClimbingBoxLoader } from "react-spinners";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
	const { user, loading } = useAuth();
	const location = useLocation();

	if (loading) {
		return <div className="min-h-screen flex items-center justify-center">
			<ClimbingBoxLoader className="text-7xl scale-150" color="#344feb" />
		</div>;
	} else if (user) {
		return children;
	}
	return <Navigate to={"login"} state={{ from: location }}></Navigate>;
};

export default PrivateRoute;
