import { PiEmpty } from 'react-icons/pi';

const EmptyEnrollment = () => {
    return (
        <div className='h-full flex flex-col items-center justify-center gap-4'>
            <PiEmpty className='text-3xl font-bold' size={40}/>
            <h2 className='text-[#151515bd] text-xl'>You are not Currently Enrolling any Classes</h2>
        </div>
    );
};

export default EmptyEnrollment;