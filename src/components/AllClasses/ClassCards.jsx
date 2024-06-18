import { CiStar } from "react-icons/ci";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";
import { FaDollarSign } from "react-icons/fa";
import { TbUsersPlus } from "react-icons/tb";

const ClassCards = ({ course }) => {
    return (
        <Link to={`/course/${course?._id}`} state={{data: course}}>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure><img src={course?.course_banner} alt="Shoes" /></figure>
                <div className=" absolute badge badge-accent top-4 left-4">{course?.course_type}</div>
                <div className="card-body relative">
                    <div className="absolute w-full px-10 -top-3 left-0 flex items-center justify-between"> 
                        <div className="bg-primary rounded-badge px-3 py-1 text-white flex justify-center items-center gap-1">
                            <FaDollarSign/>
                            <p>{course?.course_fee}</p>
                        </div>
                        <div className="bg-secondary rounded-badge px-3 py-1 text-white flex justify-center items-center gap-1">
                            <TbUsersPlus/>
                            <p>{course?.total_enrollment}</p>
                        </div>
                    </div>
                    <div className='flex items-center justify-start gap-3'>
                        <img className='w-16 h-16 rounded-full' src={course?.instructor_url} alt="" />
                        <h2 className="text-xl font-medium">{course?.instructor}</h2>
                    </div>
                    <p className="text-[#151515db] pb-4 font-semibold">{course?.course_title}</p>
                    <div className="flex items-center justify-evenly">
                        <div className="flex items-center justify-start gap-2">
                            <MdOutlineLibraryBooks className="text-amber-600 font-bold" size={20}/>
                            <p className="text-[#151515ab] text-sm">{course?.total_lessons} lessons</p>
                        </div>
                        <div className="flex items-center justify-start gap-2">
                            <SlCalender className="text-amber-600 font-bold" size={17}/>
                            <p className="text-[#151515ab] text-sm">{course?.course_duration}</p>
                        </div>
                        <div className="flex items-center justify-start gap-2">
                            <CiStar className="text-amber-600 font-bold" size={20}/>
                            <p className="text-[#151515ab] text-sm">{course?.rating}</p>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-center items-center">
                    <div className="absolute -z-10 bg-white w-[80%] h-20 rounded-2xl -bottom-4 shadow-md"></div>
                </div>
            </div>
        </Link>
    );
};

export default ClassCards;