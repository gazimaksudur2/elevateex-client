import { CiStar } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import { Link, ScrollRestoration, useLocation } from "react-router-dom";
import SubSection from "../../shared/SubSection";
import AssignmentTable from "./AssignmentTable";
import ClassProgress from "./ClassProgress";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingState from "../../components/ui/LoadingState";
import ErrorState from "../../components/ui/ErrorState";
import { parseApiError, isNetworkError } from "../../utils/errorParser";

const SingleClass = () => {
	const location = useLocation();
	const [course, setCourse] = useState(null);
	const [error, setError] = useState(null);
	const axiosSecure = useAxiosSecure();
	const id = location.pathname.split("/").pop();

	const fetchCourse = () => {
		setError(null);
		setCourse(null);
		axiosSecure
			.get(`/allclasses?_id=${id}`)
			.then((res) => {
				const data = res.data[0];
				if (!data) {
					setError({ message: "Course not found. It may have been removed.", network: false });
				} else {
					setCourse(data);
				}
			})
			.catch((err) =>
				setError({ message: parseApiError(err), network: isNetworkError(err) }),
			);
	};

	useEffect(() => {
		if (id) fetchCourse();
	}, [id]);

	if (course === null && !error) {
		return <LoadingState fullScreen text="Loading course details…" />;
	}

	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center p-10">
				<ErrorState
					type={error.network ? "network" : "generic"}
					message={error.message}
					onRetry={fetchCourse}
				/>
			</div>
		);
	}

	return (
		<div>
			<ScrollRestoration />
			<header className="bg-white">
				<nav className="px-6 py-4 shadow">
					<div className="lg:items-center lg:justify-between lg:flex">
						<Link
							to="/"
							className="btn btn-ghost flex justify-center items-center gap-3"
						>
							<img
								className="w-10 h-10 rounded"
								src="https://cdn-icons-png.flaticon.com/128/3048/3048425.png"
								alt="web Icon"
							/>
							<h2 className="text-gray-800 text-xl">
								Elevate<span className="text-2xl text-red-600">Ex</span>
							</h2>
						</Link>
						<div className="absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white shadow-md lg:bg-transparent lg:shadow-none lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center">
							<Link
								to="/teacherdash/myclass"
								className="block px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100 lg:mx-2"
							>
								Back to Dashboard
							</Link>
						</div>
					</div>
				</nav>

				<div className="flex flex-col items-start justify-start w-full px-10 py-8">
					<div className="flex flex-col justify-evenly w-full">
						<div className="flex justify-between items-center">
							<h2 className="text-2xl font-semibold text-gray-800 md:text-3xl">
								{course?.course_title}
							</h2>
							<p className="bg-blue-200 text-blue-700 px-2 py-1 rounded-full cursor-pointer text-sm">
								{course?.course_status}
							</p>
						</div>

						<p className="mt-4 text-gray-500">{course?.course_description}</p>

						<div className="w-full mt-3 flex justify-between items-center pr-5">
							<div className="flex items-center gap-x-3 mt-4">
								<img
									className="object-cover w-10 h-10 rounded-full"
									src={course?.instructor_url}
									alt=""
								/>
								<div>
									<h2 className="font-medium text-gray-800">{course?.instructor}</h2>
									<p className="text-sm font-normal text-gray-600">{course?.instructor_email}</p>
								</div>
							</div>
							<div className="flex items-center justify-between gap-3">
								<div className="flex items-center justify-start gap-2">
									<MdOutlineLibraryBooks className="text-amber-600 font-bold" size={26} />
									<p className="text-[#151515db] font-medium">{course?.total_lessons} lessons</p>
								</div>
								<div className="flex items-center justify-start gap-2">
									<SlCalender className="text-amber-600 font-bold" size={23} />
									<p className="text-[#151515db] font-medium">{course?.course_duration}</p>
								</div>
								<div className="flex items-center justify-start gap-2">
									<CiStar className="text-amber-600 font-bold" size={26} />
									<p className="text-[#151515db] font-medium">{course?.rating}</p>
								</div>
							</div>
						</div>
					</div>

					<ClassProgress course={course} />
					<SubSection
						heading="Take Patience with CourseWork"
						subHeading="Manage and submit your coursework with ease. Access all your assignments, review deadlines, and receive feedback to keep your learning on track."
					/>
					<AssignmentTable course={course} />
				</div>
			</header>
		</div>
	);
};

export default SingleClass;
