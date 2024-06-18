import { useEffect, useState } from 'react';
// import EmptyEnrollment from './EmptyEnrollment';
import EnrolledClass from './EnrolledClass';
import useAuth from '../../hooks/useAuth';
import useUserInfo from '../../hooks/useUserInfo';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { ClimbingBoxLoader } from 'react-spinners';


const MyEnrollments = () => {
    const [courses, setCourses] = useState([]);
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [userInfo] = useUserInfo();

    useEffect(() => {
        axiosSecure.get(`/enroll?_id=${userInfo?._id}`)
            .then(res => {
                // console.log(res.data, userInfo);
                setCourses(res.data);
            })
            .catch(error => {
                console.log(error);
            })
        // console.log( courses );
        // console.log( classes );
        
    }, []);

    // if (courses.length == 0) {
    //     return <EmptyEnrollment info={"You are not Currently Enrolling any Classes"} />;
    // }
    if (courses.length == 0) {
        return <div className='w-full min-h-screen flex justify-center items-center'>
            <ClimbingBoxLoader color="#d65336" />
        </div>;
    }
    // console.log(courses);
    return (
        <div className='h-full'>
            <div className='flex h-full'>
                <div className='w-full flex flex-col'>
                    <div className='p-10'>
                        <h1 className='p-4 border-b-2 border-gray-400 text-2xl font-semibold text-[#151515d0]'>Welcome Back, <span className='font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500'>{user?.displayName}</span></h1>
                        <div className="p-4 flex flex-col items-start justify-start gap-4">
                            <div className="flex flex-col items-start">
                                <div className="py-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
                                    {
                                        courses.map((course, idx) => (<EnrolledClass key={idx} course={course[0]} />))
                                    }
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