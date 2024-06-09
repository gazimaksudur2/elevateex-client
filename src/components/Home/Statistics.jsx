import { useEffect, useRef } from 'react';
import CountUp from 'react-countup';
import { HiOutlineBuildingLibrary } from "react-icons/hi2";
import { MdAddCircleOutline } from "react-icons/md";
import { PiUsersThree } from 'react-icons/pi';

const Statistics = () => {
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
        <div className='relative w-full h-80 overflow-hidden'>
            <img className='absolute -z-10 object-cover' src="https://demo.web3canvas.com/themeforest/unisco/images/slider-3.jpg" alt="large Image" />
            <div className='h-full w-[70%] mx-auto text-white flex justify-between items-center'>
                <div className='backdrop-blur-md w-60 h-40 rounded-lg border-2 border-gray-500 flex justify-center items-center gap-4'>
                    <PiUsersThree className='text-3xl font-bold' size={50} />
                    <div className='flex flex-col justify-center items-start'>
                        {/* <h2>140</h2> */}
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
    );
};

export default Statistics;

// decimal={4}
// prefix="EUR "
// suffix=" left"
// onEnd={() => console.log('Ended! 👏')}
// onStart={() => console.log('Started! 💨')}