import { CiStar } from 'react-icons/ci';
import { MdOutlineLibraryBooks } from 'react-icons/md';
import { SlCalender } from 'react-icons/sl';
import { ScrollRestoration } from 'react-router-dom';

const AllTopics = ({course}) => {
    // console.log(course);
    return (
        <div>
            <ScrollRestoration />
            <header className="bg-white">
                <div className="flex flex-col items-start justify-start w-full px-10 py-8">
                    <div className="flex flex-col justify-evenly">
                        <div className='flex justify-between items-center'>
                            <h2 className="text-2xl font-semibold text-gray-800 md:text-3xl">
                                {course?.course_title}
                            </h2>
                        </div>

                        <p className="mt-4 text-gray-500">
                            {course?.course_description}
                        </p>

                        <div className='w-full mt-3 flex justify-between items-center pr-5'>
                            <div className="flex items-center gap-x-3 mt-4">
                                <img className="object-cover w-10 h-10 rounded-full" src={course?.instructor_url} alt="" />
                                <div>
                                    <h2 className="font-medium text-gray-800 ">{course?.instructor}</h2>
                                    <p className="text-sm font-normal text-gray-600 ">{course?.instructor_email}</p>
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
                </div>
            </header>
        </div >
    );
};

export default AllTopics;