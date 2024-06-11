import { useEffect, useRef } from 'react';
import CountUp from 'react-countup';
import { HiOutlineBuildingLibrary } from 'react-icons/hi2';
import { MdAddCircleOutline } from 'react-icons/md';
import { PiUsersThree } from 'react-icons/pi';
import SubSection from '../../shared/SubSection';

const ClassProgress = () => {
    const countUpRef = useRef(null);

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
    return (
        <div>
            <SubSection heading={"Overall Course Progress"} subHeading={"Track your learning journey with our Course Progress Page. Stay updated on completed lessons, upcoming topics, and your overall progress to ensure you reach your educational goals efficiently."}/>
                    <div className='relative w-full h-80 overflow-hidden'>
                        <div className='absolute w-full h-80 bg-black z-10 opacity-40'></div>
                        <img className='absolute object-cover w-full z-0' src="https://img.freepik.com/premium-photo/successful-learning-with-modern-technology-focus_670382-155217.jpg?w=1060" alt="large Image" />
                        <div className='absolute z-20 h-full w-full text-white flex justify-evenly items-center'>
                            <div className='backdrop-blur-md w-60 h-40 rounded-lg border-2 border-gray-500 flex justify-center items-center gap-4'>
                                <PiUsersThree className='text-3xl font-bold' size={50} />
                                <div className='flex flex-col justify-center items-start'>
                                    <CountUp
                                        className='text-3xl font-bold'
                                        start={0}
                                        end={140}
                                        duration={2.75}
                                        separator=" "
                                        decimal=","
                                        ref={countUpRef}
                                        enableScrollSpy={true}
                                    />
                                    <p className='text-lg'>Users</p>
                                </div>
                            </div>
                            <div className='backdrop-blur-md w-60 h-40 rounded-lg border-2 border-gray-500 flex justify-center items-center gap-4'>
                                <HiOutlineBuildingLibrary className='text-3xl font-bold' size={50} />
                                <div className='flex flex-col justify-center items-start'>
                                    <CountUp
                                        className='text-3xl font-bold'
                                        start={0}
                                        end={12}
                                        duration={2.75}
                                        separator=" "
                                        decimal=","
                                        ref={countUpRef}
                                        enableScrollSpy={true}
                                    />
                                    <p className='text-lg'>Courses</p>
                                </div>
                            </div>
                            <div className='backdrop-blur-md w-60 h-40 rounded-lg border-2 border-gray-500 flex justify-center items-center gap-4'>
                                <MdAddCircleOutline className='text-3xl font-bold' size={50} />
                                <div className='flex flex-col justify-center items-start'>
                                    <CountUp
                                        className='text-3xl font-bold'
                                        start={0}
                                        end={70}
                                        duration={2.75}
                                        separator=" "
                                        decimal=","
                                        ref={countUpRef}
                                        enableScrollSpy={true}
                                    />
                                    <p className='text-lg'>Enrollments</p>
                                </div>
                            </div>
                        </div>
                    </div>
        </div>
    );
};

export default ClassProgress;