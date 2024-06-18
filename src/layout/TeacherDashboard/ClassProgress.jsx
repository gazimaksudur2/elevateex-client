import { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';
import { MdAddCircleOutline, MdAssignment } from 'react-icons/md';
import { PiUsersThree } from 'react-icons/pi';
import SubSection from '../../shared/SubSection';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ClassProgress = ({course}) => {
    const countUpRef = useRef(null);
    const axiosSecure = useAxiosSecure();
    const [enrolled, setEnrolled] = useState([]);
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.start();
                    }
                });
            },
            {
                threshold: 0.1, // Adjust this value as needed
            }
        );

        if (countUpRef.current) {
            observer.observe(countUpRef.current);
        }

        return () => {
            if (countUpRef.current) {
                observer.unobserve(countUpRef.current);
            }
        };
    }, []);

    useEffect(()=>{
        axiosSecure.get(`/enroll?course_id=${course?._id}`)
            .then(res => {
                // console.log(res.data, userInfo);
                setEnrolled(res.data);
            })
            .catch(error => {
                console.log(error);
            })
        axiosSecure.get(`/assignments?course_title=${course?.course_title}`)
            .then(res => {
                // console.log(res.data, userInfo);
                setAssignments(res.data);
            })
            .catch(error => {
                console.log(error);
            })
        // console.log( courses );
        // console.log( classes );
    },[course]);
    // console.log(course);
    return (
        <div>
            <SubSection heading={"Overall Course Progress"} subHeading={"Track your learning journey with our Course Progress Page. Stay updated on completed lessons, upcoming topics, and your overall progress to ensure you reach your educational goals efficiently."}/>
                    <div className='relative w-full h-80 overflow-hidden'>
                        <div className='absolute w-full h-80 bg-black z-10 opacity-40'></div>
                        <img className='absolute object-cover w-full z-0' src="https://img.freepik.com/premium-photo/successful-learning-with-modern-technology-focus_670382-155217.jpg?w=1060" alt="large Image" />
                        <div className='absolute z-20 h-full w-full text-white flex justify-evenly items-center'>
                            <div className='pl-5 backdrop-blur-md w-60 h-40 rounded-lg border-2 border-gray-500 flex justify-center items-center gap-4'>
                                <PiUsersThree className='text-3xl font-bold' size={50} />
                                <div className='flex flex-col justify-center items-start'>
                                    <CountUp
                                        className='text-3xl font-bold'
                                        start={0}
                                        end={enrolled?.length}
                                        duration={2.75}
                                        separator=" "
                                        decimal=","
                                        ref={countUpRef}
                                        enableScrollSpy={true}
                                    />
                                    <p className='text-lg'>Total Enrolled</p>
                                </div>
                            </div>
                            <div className='pl-5 backdrop-blur-md w-60 h-40 rounded-lg border-2 border-gray-500 flex justify-center items-center gap-4'>
                                <MdAssignment className='text-3xl font-bold' size={50} />
                                <div className='flex flex-col justify-center items-start'>
                                    <CountUp
                                        className='text-3xl font-bold'
                                        start={0}
                                        end={assignments?.length}
                                        duration={2.75}
                                        separator=" "
                                        decimal=","
                                        ref={countUpRef}
                                        enableScrollSpy={true}
                                    />
                                    <p className='text-lg'>Total Assignments</p>
                                </div>
                            </div>
                            <div className='pl-5 backdrop-blur-md w-60 h-40 rounded-lg border-2 border-gray-500 flex justify-center items-center gap-4'>
                                <MdAddCircleOutline className='text-3xl font-bold' size={50} />
                                <div className='flex flex-col justify-center items-start'>
                                    <CountUp
                                        className='text-3xl font-bold'
                                        start={0}
                                        end={10}
                                        duration={2.75}
                                        separator=" "
                                        decimal=","
                                        ref={countUpRef}
                                        enableScrollSpy={true}
                                    />
                                    <p className='text-xs'>Per Day Assignment Submits</p>
                                </div>
                            </div>
                        </div>
                    </div>
        </div>
    );
};

export default ClassProgress;