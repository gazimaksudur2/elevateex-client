import { useEffect, useState } from "react";
import EmptyEnrollment from "../UserDashboard/EmptyEnrollment";
import TeacherClass from "./TeacherClass";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserInfo from "../../hooks/useUserInfo";
import LoadingState from "../../components/ui/LoadingState";
import ErrorState from "../../components/ui/ErrorState";
import { parseApiError, isNetworkError } from "../../utils/errorParser";

const TeacherClasses = () => {
	const [userInfo] = useUserInfo();
	const [myCourse, setMyCourse] = useState(null);
	const [error, setError] = useState(null);
	const axiosSecure = useAxiosSecure();

	const fetchCourses = () => {
		setError(null);
		setMyCourse(null);
		axiosSecure
			.get(`allclasses?instructor_email=${userInfo?.email}`)
			.then((res) => setMyCourse(res.data))
			.catch((err) =>
				setError({ message: parseApiError(err), network: isNetworkError(err) }),
			);
	};

	useEffect(() => {
		if (userInfo?.email) fetchCourses();
	}, [userInfo?.email]);

	if (myCourse === null && !error) {
		return <LoadingState fullScreen text="Loading your courses…" />;
	}

	if (error) {
		return (
			<div className="p-10">
				<ErrorState
					type={error.network ? "network" : "generic"}
					message={error.message}
					onRetry={fetchCourses}
				/>
			</div>
		);
	}

	if (myCourse?.length === 0) {
		return <EmptyEnrollment info="You haven't published any courses yet." />;
	}

	return (
		<div className="p-6">
			<section className="container px-4 mx-auto">
				<div className="sm:flex sm:items-center sm:justify-between">
					<div className="flex items-center gap-x-3">
						<h2 className="text-lg font-medium text-gray-800">Your Released Courses</h2>
						<span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">
							{myCourse?.length} Currently
						</span>
					</div>
				</div>

				<div className="p-10">
					<h1 className="p-4 border-b-2 border-gray-400 text-2xl font-semibold text-[#151515d0]">
						Manage Your Courses
					</h1>
					<div className="p-4 flex flex-col items-start justify-start gap-4">
						<div className="flex flex-col items-start w-full">
							<div className="py-6 grid grid-cols-1 gap-10 w-full">
								{myCourse.map((course, idx) => (
									<TeacherClass key={idx} course={course} />
								))}
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default TeacherClasses;
