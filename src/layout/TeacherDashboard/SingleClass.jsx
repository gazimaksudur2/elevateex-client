
import { CiStar } from 'react-icons/ci';
import { SlCalender } from 'react-icons/sl';
import { Link, ScrollRestoration, useLocation } from 'react-router-dom';
import SubSection from '../../shared/SubSection';
import AssignmentTable from './AssignmentTable';
import ClassProgress from './ClassProgress';
import { MdOutlineLibraryBooks } from 'react-icons/md';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { ClimbingBoxLoader } from 'react-spinners';
import EmptyEnrollment from '../UserDashboard/EmptyEnrollment';

const SingleClass = () => {
    const location = useLocation();
    const [course, setCourse] = useState(null);
    const axiosSecure = useAxiosSecure();
    const id = location.pathname.split('/')[location.pathname.split('/').length - 1];
    // console.log(id);
    useEffect(()=>{
        axiosSecure.get(`/allclasses?_id=${id}`)
        .then(res=>{
            setCourse(res.data[0]);
        })
        .catch(error=>{
            console.log(error);
        })
    },[]);
    // const course = {
    //     "id": 1,
    //     "course_banner": "https://kinforce.net/learen/wp-content/uploads/2022/08/young-woman-doing-web-meeting-using-mirrorless-cam-7CTA9CH.jpg",
    //     "instructor": "Jane Doe",
    //     "instructor_url": "https://kinforce.net/learen/wp-content/uploads/2022/08/small-business-owners-startup-and-e-commerce-conce-83S5W35.jpg",
    //     "instructor_email": "janedoe@gmail.com",
    //     "course_title": "Introduction to Python",
    //     "course_fee": "99.99",
    //     "course_type": "Programming",
    //     "course_duration": "4 weeks",
    //     "total_lessons": 20,
    //     "rating": 4.8,
    //     "course_status": "pending",
    //     "course_description": "Embark on a journey to learn Python basics and start coding with confidence in just 4 weeks. This comprehensive course covers everything from variables and data types to loops, functions, and object-oriented programming concepts. Gain hands-on experience with practical exercises and projects designed to reinforce your understanding of Python fundamentals. By the end of the course, you'll have the skills to write your own Python scripts and applications, setting a solid foundation for further exploration in the world of programming."
    // };
    if (course == null) {
        return <div className='w-full min-h-screen flex justify-center items-center'>
            <ClimbingBoxLoader color="#d65336" />
        </div>;
    } else if (course?.length == 0) {
        return <EmptyEnrollment info={"You didn't published any Class yet."} />;
    }
    return (
        <div>
            <ScrollRestoration />
            <header className="bg-white">
                <nav className="px-6 py-4 shadow">
                    <div className="lg:items-center lg:justify-between lg:flex">
                        <Link to={'/'} className="btn btn-ghost flex justify-center items-center gap-3">
                            <img className="w-10 h-10 rounded" src="https://cdn-icons-png.flaticon.com/128/3048/3048425.png" alt="web Icon" />
                            <h2 className="text-gray-800 text-xl">Elevate<span className="text-2xl text-red-600">Ex</span></h2>
                        </Link>
                        <div className="absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white shadow-md lg:bg-transparent lg:shadow-none lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center">
                            <Link to={'/teacherdash/myclass'} className="block px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100 lg:mx-2">Back to DashBoard</Link>
                            {/* <a href="#" className="block px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100 lg:mx-2">Home</a>
                            <a href="#" className="block px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100 lg:mx-2">About</a>
                            <a href="#" className="block px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100 lg:mx-2">Contact</a> */}
                        </div>
                    </div>
                </nav>

                <div className="flex flex-col items-start justify-start w-full px-10 py-8">
                    <div className="flex flex-col justify-evenly">
                        <div className='flex justify-between items-center'>
                            <h2 className="text-2xl font-semibold text-gray-800 md:text-3xl">
                                {course?.course_title}
                            </h2>
                            <div className=' flex justify-center items-center gap-6'>
                                <p className="bg-blue-200 text-blue-700 px-2 py-1 rounded-full cursor-pointer">{course?.course_status}</p>
                                {/* <p className="bg-green-200 text-green-700 px-2 py-1 rounded-full cursor-pointer">Approved</p> */}
                                {/* <p className="bg-red-200 text-red-700 px-2 py-1 rounded-full cursor-pointer">Cancelled</p> */}
                            </div>
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

                    {/* <h2 className="text-2xl mt-10 mb-4 font-semibold text-gray-800 md:text-3xl">
                        Overall Course <span className='text-blue-600'>Progress</span>
                    </h2> */}
                    <ClassProgress course={course}/>
                    <SubSection heading={"Take Patience with CourseWork"} subHeading={"Manage and submit your coursework with ease on our Assignment Page. Access all your assignments, review deadlines, and receive feedback to keep your learning on track."} />

                    <AssignmentTable course={course}/>
                </div>


                {/* <div className="w-full h-64 lg:w-1/2 lg:h-auto">
                        <div className="w-full h-full bg-cover bg-hero-img">
                            <div className="w-full h-full bg-black opacity-25"></div>
                        </div>
                    </div> */}
            </header>
        </div >
    );
};

export default SingleClass;