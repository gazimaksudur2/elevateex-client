// import { Link, useLocation } from 'react-router-dom';

// const CourseDetail = () => {
//     const location = useLocation();

//     console.log(location.state.data);
//     return (
//         <div>
//             <header className="bg-white">
//                 <nav className="px-6 py-4 shadow">
//                     <div className="lg:items-center lg:justify-between lg:flex">
//                         <Link to={'/'} className="btn btn-ghost flex justify-center items-center gap-3">
//                             <img className="w-10 h-10 rounded" src="https://cdn-icons-png.flaticon.com/128/3048/3048425.png" alt="web Icon" />
//                             <h2 className="text-gray-800 text-xl">Elevate<span className="text-2xl text-red-600">Ex</span></h2>
//                         </Link>
//                         <div className="absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white shadow-md lg:bg-transparent lg:shadow-none lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center">
//                             <a href="#" className="block px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100 lg:mx-2">Home</a>
//                             <a href="#" className="block px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100 lg:mx-2">About</a>
//                             <a href="#" className="block px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100 lg:mx-2">Contact</a>
//                         </div>
//                     </div>
//                 </nav>

//                 <div className="lg:flex lg:mt-10">
//                     <div className="flex items-center justify-center w-full px-6 py-8 lg:h-[32rem] lg:w-1/2">
//                         <div className="max-w-xl">
//                             <h2 className="text-3xl font-semibold text-gray-800 lg:text-4xl">Build Your New <span className="text-blue-600">Idea</span></h2>

//                             <p className="mt-4 text-sm text-gray-500 lg:text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis commodi cum cupiditate ducimus, fugit harum id necessitatibus odio quam quasi, quibusdam rem tempora voluptates.</p>

//                             <div className="flex flex-col mt-6 space-y-3 lg:space-y-0 lg:flex-row">
//                                 <a href="#" className="block px-5 py-2 text-sm font-medium tracking-wider text-center text-white transition-colors duration-300 transform bg-gray-900 rounded-md hover:bg-gray-700">Get Started</a>
//                                 <a href="#" className="block px-5 py-2 text-sm font-medium tracking-wider text-center text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md lg:mx-4 hover:bg-gray-300">Learn More</a>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="w-full h-64 lg:w-1/2 lg:h-auto">
//                         <div className="w-full h-full bg-cover bg-hero-img">
//                             <div className="w-full h-full bg-black opacity-25"></div>
//                         </div>
//                     </div>
//                 </div>
//             </header>
//         </div >
//     );
// };

// export default CourseDetail;
import { CiStar } from 'react-icons/ci';
import { SlCalender } from 'react-icons/sl';
import { Link, ScrollRestoration, useLocation, useNavigate } from 'react-router-dom';
import SubSection from '../../shared/SubSection';
import { MdOutlineLibraryBooks } from 'react-icons/md';
import Payment from './payments';
import useUserInfo from '../../hooks/useUserInfo';
// import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const CourseDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [userInfo] = useUserInfo();
    const axiosSecure = useAxiosSecure();
    // const mutation = useMutation({
    //     mutationFn: (data) => {
    //       return axiosSecure.post('/enroll', data)
    //     },
    //   });

    const course = location.state.data;
    // console.log(location.state.data);
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

    const handleEnroll = ()=>{
        const data = {
            student_id: userInfo?._id,
            course_id: location.pathname.split('/')[location.pathname.split('/').length-1],
        };
        // console.log(data);
        // mutation.mutate(data);
        axiosSecure.post('enroll', data)
        .then(res=>{
            console.log(res);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "You Enrolled this course Successfully!!!",
                showConfirmButton: false,
                timer: 1500,
                footer: "Be ready for the Journey"
              });
              navigate('/allclass');
        })
        .catch(error=>{
            console.log(error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Your are not eligible for this course!!!",
                showConfirmButton: false,
                timer: 1500
              });
              navigate('/allclass');
        })
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
                            <Link to={'/allclass'} className="block px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100 lg:mx-2">Back to All Classes</Link>
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
                                <p className="bg-blue-200 text-blue-700 px-2 py-1 rounded-full cursor-pointer">{course?.course_type}</p>
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

                    <div className='w-full flex flex-col justify-center items-center'>
                        <h2 className="text-2xl mt-10 mb-4 text-center font-semibold text-gray-800 md:text-3xl">
                            Enrollments are <span className='text-blue-600'>Ongoing</span>
                        </h2>
                        <div className='w-[40%] border-4 border-accent bg-gradient-to-tr from-primary to-secondary text-white bg-opacity-35 px-4 py-4 rounded-lg text-lg flex justify-between items-center'>
                            <h3 className='font-semibold font-mulish'>Already Enrolled: {course?.total_enrollment}</h3>
                            <h3 className='font-semibold font-mulish'>Course Fee: ${course?.course_fee} Only</h3>
                        </div>
                    </div>
                    {/* <ClassProgress /> */}
                    <SubSection heading={"Make payment to be a member of this course"} subHeading={"Every lesson you tackle brings you closer to mastering new skills and achieving your goals. Remember, every challenge you overcome is a step towards your success. Stay curious, stay determined, and let your passion drive you to new heights."} />

                    {/* <AssignmentTable /> */}

                </div>
                <div className='w-[50%] mx-auto py-4'>
                    <Payment course={course}/>
                </div>
                <div className='w-full flex items-center justify-center pb-10'>
                    <button onClick={handleEnroll} className='btn btn-primary'>Enroll it</button>
                </div>
            </header>
        </div >
    );
};

export default CourseDetail;