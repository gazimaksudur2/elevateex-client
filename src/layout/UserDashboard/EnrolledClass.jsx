import { Link } from "react-router-dom";

const EnrolledClass = ({ course }) => {
    return (
        <div>
            <div className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md">
                <img className="object-cover w-full h-64" src={course?.course_banner} alt="Article" />

                <div className="p-6">
                    <div>
                    <div className='flex justify-between items-center'>
                            <h2 className="text-xl font-semibold text-gray-800 md:text-3xl">
                                {course?.course_title}
                            </h2>
                            <div className=''>
                                <p className="bg-emerald-200 text-emerald-700 px-2 py-1 rounded-full cursor-pointer">{course?.course_type}</p>
                                {/* <p className="bg-green-200 text-green-700 px-2 py-1 rounded-full cursor-pointer">Approved</p> */}
                                {/* <p className="bg-red-200 text-red-700 px-2 py-1 rounded-full cursor-pointer">Cancelled</p> */}
                            </div>
                        </div>

                        <p className="mt-4 text-gray-500">
                            {course?.course_description.slice(0, 200) + " ...."}
                        </p>
                    </div>

                    <div className="mt-4">
                        <div className="flex items-center">
                            <Link to={`/userdash/classes/${course?._id}`}>
                                <button className="btn btn-outline">Continue Course</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnrolledClass;