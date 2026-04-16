import { useState } from "react";
import { useEffect } from "react";
import EmptyEnrollment from "./EmptyEnrollment";
import EnrolledClass from "./EnrolledClass";
import useAuth from "../../hooks/useAuth";
import useUserInfo from "../../hooks/useUserInfo";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingState from "../../components/ui/LoadingState";
import ErrorState from "../../components/ui/ErrorState";
import { parseApiError, isNetworkError } from "../../utils/errorParser";

const MyEnrollments = () => {
	const [courses, setCourses] = useState(null);
	const [error, setError] = useState(null);
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();
	const [userInfo] = useUserInfo();

	const fetchEnrollments = () => {
		setError(null);
		setCourses(null);
		axiosSecure
			.get(`/enroll?_id=${userInfo?._id}`)
			.then((res) => setCourses(res.data))
			.catch((err) => setError({ message: parseApiError(err), network: isNetworkError(err) }));
	};

	useEffect(() => {
		if (userInfo?._id) fetchEnrollments();
	}, [userInfo?._id]);

	if (courses === null && !error) {
		return <LoadingState fullScreen text="Loading your enrollments…" />;
	}

	if (error) {
		return (
			<div className="p-10">
				<ErrorState
					type={error.network ? "network" : "generic"}
					message={error.message}
					onRetry={fetchEnrollments}
				/>
			</div>
		);
	}

	if (courses?.length === 0) {
		return <EmptyEnrollment info="You are not currently enrolled in any courses." />;
	}

	return (
		<div className="h-full">
			<div className="flex h-full">
				<div className="w-full flex flex-col">
					<div className="p-10">
						<h1 className="p-4 border-b-2 border-gray-400 text-2xl font-semibold text-[#151515d0]">
							Welcome Back,{" "}
							<span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
								{user?.displayName}
							</span>
						</h1>
						<div className="p-4 flex flex-col items-start justify-start gap-4">
							<div className="flex flex-col items-start">
								<div className="py-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
									{courses.map((course, idx) => (
										<EnrolledClass key={idx} course={course[0]} />
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MyEnrollments;
