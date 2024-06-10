import { CiEdit } from "react-icons/ci";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { VscGithubInverted } from "react-icons/vsc";

const TeacherProfile = () => {
    return (
        <div className='h-full'>
            <div className='flex h-full'>
                <div className='w-1/4 bg-gradient-to-r from-red-400 to-orange-400 flex flex-col justify-center items-center'>
                    <div className="avatar">
                        <div className="w-24 rounded-xl">
                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                    <div className='mt-4 flex flex-col justify-center items-center'>
                        <h2 className='text-[#151515bd] font-medium text-lg'>Gazi Maksudur Rahman</h2>
                        <p className='text-[#151515ab]'>Student</p>
                    </div>
                </div>
                <div className='w-full flex flex-col'>
                    <div className='p-10'>
                        <div className="p-4 border-b-2 border-gray-400 flex items-center gap-3">
                            <h1 className='text-2xl font-semibold text-[#151515d0]'>Personal Information</h1>
                            <CiEdit size={25}/>
                        </div>
                        <div className="p-4 flex items-center justify-start">
                            <div className="w-1/2 flex flex-col items-start">
                                <h2 className="text-[#151515db] font-roboto font-medium text-xl">Email</h2>
                                <p className="text-[#151515a0] font-mulish">gazimaksudur2@gmail.com</p>
                            </div>
                            <div className="w-1/2 flex flex-col items-start">
                                <h2 className="text-[#151515db] font-roboto font-medium text-xl">Phone No.</h2>
                                <p className="text-[#151515a0] font-mulish">+880 1903-219313</p>
                            </div>
                        </div>
                        <div className="p-4 border-b-2 border-gray-400 flex items-center gap-3">
                            <h1 className='text-2xl font-semibold text-[#151515d0]'>Social Connectivity</h1>
                            <CiEdit size={25}/>
                        </div>
                        <div className="p-4 flex items-center justify-start gap-4">
                            <a href={'https://facebook.com'} target="blank"><FaFacebook size={30} /></a>
                            <a href={'https://linkedin.com'} target="blank"><FaLinkedin size={30} /></a>
                            <a href={'https://github.com'} target="blank"><VscGithubInverted size={30} /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherProfile;