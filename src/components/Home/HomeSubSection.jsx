import { useEffect, useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';

const HomeSubSection = () => {
    const [info, setInfo] = useState();

    useEffect(()=>{
        fetch('homeSection.json')
        .then(res=>res.json())
        .then(data=>{
            setInfo(data);
        })
    },[]);
    // console.log(info);

    return (
        info && <div className='pt-20 w-[70%] mx-auto text-center flex flex-col justify-center items-center gap-2'>
            <h1 className="text-5xl font-bold font-roboto">
                {"Let's"}  <span className='text-red-500'><Typewriter
                    words={[info?.title]}
                    loop={5}
                    cursor
                    cursorStyle='_'
                    typeSpeed={90}
                    deleteSpeed={50}
                    delaySpeed={1300}
                /></span>
            </h1>
            <p className='text-[#151515bc]'>{info?.description}</p>
        </div>
    );
};

export default HomeSubSection;