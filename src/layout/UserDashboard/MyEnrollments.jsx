import { useEffect, useState } from 'react';
import EmptyEnrollment from './EmptyEnrollment';
import EnrolledClass from './EnrolledClass';


const MyEnrollments = () => {
    const [classes, setClasses] = useState([]);

    useEffect(()=>{
        fetch('/courses.json')
        .then(res=>res.json())
        .then(data=>{
            setClasses(data);
        })
    },[]);
    if (classes.length == 0) {
        return <EmptyEnrollment info={"You are not Currently Enrolling any Classes"}/>;
    }
    return (
        <div className='h-full'>
            <div className='flex h-full'>
                <div className='w-full flex flex-col'>
                    <div className='p-10'>
                        <h1 className='p-4 border-b-2 border-gray-400 text-2xl font-semibold text-[#151515d0]'>Welcome Back, <span className='font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500'>Gazi Maksudur Rahman</span></h1>
                        <div className="p-4 flex flex-col items-start justify-start gap-4">
                            <div className="flex flex-col items-start">
                                <div className="py-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
                                    {
                                        classes.map((course, idx) => (<EnrolledClass key={idx} course={course} />))
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