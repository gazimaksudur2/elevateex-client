import { PiEmpty } from 'react-icons/pi';

const EmptyEnrollment = ({info}) => {
    return (
        <div className='h-full flex flex-col items-center justify-center gap-4'>
            <PiEmpty className='text-3xl font-bold' size={40}/>
            <h2 className='text-[#151515bd] text-xl'>{info}</h2>
        </div>
    );
};

export default EmptyEnrollment;