import { CiStar } from 'react-icons/ci';
import { MdOutlineLibraryBooks } from 'react-icons/md';
import { SlCalender } from 'react-icons/sl';
import { Link } from 'react-router-dom';

const TeacherClass = ({ course }) => {
    console.log(course);
    return (
        <>
            <section className="bg-gray-100 lg:py-10 lg:flex lg:justify-center rounded-lg">
                <div
                    className="overflow-hidden bg-white lg:mx-8 lg:flex lg:max-w-6xl lg:w-full lg:shadow-md lg:rounded-xl">
                    <div className="h-full lg:w-1/2">
                        {/* <div className="h-64 bg-cover lg:h-full bg-admin_class"></div> */}
                        <img className='object-cover h-full' src={course?.course_banner} alt="" />
                    </div>

                    <div className="relative max-w-xl px-6 py-3 flex flex-col justify-evenly lg:max-w-5xl lg:w-1/2">
                        <div className='flex justify-between items-center'>
                            <h2 className="text-2xl font-semibold text-gray-800 md:text-3xl">
                                {course?.course_title}
                            </h2>
                            <div className=''>
                                <p className="bg-blue-200 text-blue-700 px-2 py-1 rounded-full cursor-pointer">Pending</p>
                                {/* <p className="bg-green-200 text-green-700 px-2 py-1 rounded-full cursor-pointer">Approved</p> */}
                                {/* <p className="bg-red-200 text-red-700 px-2 py-1 rounded-full cursor-pointer">Cancelled</p> */}
                            </div>
                        </div>

                        <p className="mt-4 text-gray-500">
                            {course?.course_description.slice(0, 100) + " ...."}
                        </p>

                        <div className="w-[80%] flex items-center justify-between">
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
                        <div className="flex items-center gap-x-3 mt-4">
                            <img className="object-cover w-10 h-10 rounded-full" src={course?.instructor_url} alt="" />
                            <div>
                                <h2 className="font-medium text-gray-800 ">{course?.instructor}</h2>
                                <p className="text-sm font-normal text-gray-600 ">{course?.instructor_email}</p>
                            </div>
                        </div>

                        <div className="flex justify-end w-full mt-2 sm:w-auto gap-4">
                            <button className="text-gray-500 transition-colors duration-200 bg-red-200 p-2 rounded-full hover:text-red-600 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>

                            <button className="text-gray-500 transition-colors duration-200 bg-yellow-200 p-2 rounded-full hover:text-yellow-600 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                            </button>
                            <Link to={`/teacherclass/${course?.id}`} className="inline-flex items-center justify-center px-6 py-2 text-sm text-white duration-300 bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                                See Details
                            </Link>
                        </div>
                        <div className='bg-red-500 absolute bottom-6 -left-8 p-3 rounded-full shadow-lg shadow-red-300'>
                            <h3 className='text-white font-bold'>$ {parseInt(course?.course_fee)}</h3>
                        </div>
                    </div>
                </div>
            </section>
            {/* <tr>
                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    <div className="inline-flex items-center gap-x-3">
                        <input type="checkbox" className="text-blue-500 border-gray-300 rounded" />

                            <div className="flex items-center gap-x-2">
                                <img className="object-cover w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" />
                                    <div>
                                        <h2 className="font-medium text-gray-800">Arthur Melo</h2>
                                        <p className="text-sm font-normal text-gray-600">@authurmelo</p>
                                    </div>
                            </div>
                    </div>
                </td>
                <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>

                        <h2 className="text-sm font-normal text-emerald-500">Active</h2>
                    </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">Design Director</td>
                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">authurmelo@example.com</td>
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                    <div className="flex items-center gap-x-2">
                        <p className="px-3 py-1 text-xs text-indigo-500 rounded-full bg-indigo-100/60">Design</p>
                        <p className="px-3 py-1 text-xs text-blue-500 rounded-full bg-blue-100/60">Product</p>
                        <p className="px-3 py-1 text-xs text-pink-500 rounded-full bg-pink-100/60">Marketing</p>
                    </div>
                </td>
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                    <div className="flex items-center gap-x-6">
                        <button className="text-gray-500 transition-colors duration-200 hover:text-red-500 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </button>

                        <button className="text-gray-500 transition-colors duration-200 hover:text-yellow-500 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                        </button>
                    </div>
                </td>
            </tr> */}
        </>
    );
};

export default TeacherClass;