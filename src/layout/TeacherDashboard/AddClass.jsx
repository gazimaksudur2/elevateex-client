import { useForm } from "react-hook-form";
import useUserInfo from "../../hooks/useUserInfo";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AddClass = () => {
    const [userInfo] = useUserInfo();
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const img_hosting_key = import.meta.env.VITE_image_hosting_key;
    const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;
    const onSubmit = async(data) =>{
        let banner_img = null;
        if(data.banner_img.length){
            const res = await axiosPublic.post(img_hosting_api, {image: data.banner_img[0]}, {
                headers: {
                    "content-type": 'multipart/form-data'
                }
            });
            banner_img = res.data.data.display_url;
        }
        
        // console.log(new Date().toISOString().slice(0,10));
        const course = {
            course_title: data.course_title,
            course_fee: data.fee,
            course_banner: banner_img,
            course_type: data.type,
            course_duration: data.duration,
            course_description: data.description,
            course_status: "pending",
            total_enrollment: 0,
            total_lessons: data.lesson,
            rating: 4.8,
            instructor: userInfo.displayName,
            instructor_email: userInfo.email,
            instructor_url: userInfo.photoURL,
            enrolled_by: [],
            createdAt: new Date().toISOString().slice(0,10),
        }
        // console.log(course);
        axiosSecure.post('/allclasses', course)
        .then(()=>{
            Swal.fire({
                title: "Great job!",
                text: "Course info sent to admin for Reviewing!",
                icon: "success"
              });
        })
        .catch(error=>{
            // console.log(error.message);
            Swal.fire({
                title: "Unfortunately!",
                text: error.message,
                icon: "warning"
              });
        })
        reset();
    };

    return (
        <div>
            <header className="bg-white ">
                <div className="container px-2 py-10 mx-auto">
                    <div className="items-center lg:flex lg:flex-row-reverse lg:justify-evenly">
                        <div className="w-full lg:w-[60%]">
                            <div className="">
                                <h1 className="text-3xl font-semibold text-gray-800 lg:text-4xl">Add a New <span className="text-blue-500">Course </span></h1>
                                <form className="card-body justify-start" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Course Title</span>
                                        </label>
                                        <input type="text" placeholder="Your Course Title" className="input input-bordered"  {...register("course_title")} required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Course Launcher</span>
                                        </label>
                                        <input type="text" {...register("launcher")} className="input input-bordered" value={userInfo?.displayName} readOnly />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Course Launcher Email</span>
                                        </label>
                                        <input type="text" {...register("mail")} className="input input-bordered" value={userInfo?.email} readOnly />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-sm">Course Banner Image</span>
                                        </label>
                                        <input type="file" {...register("banner_img")} className="file-input file-input-bordered w-full" required/>
                                    </div>
                                    <div className="flex justify-between items-center gap-3">
                                        <div className="form-control w-[48%]">
                                            <label className="label">
                                                <span className="label-text text-sm">Course Fee</span>
                                            </label>
                                            <input type="text" {...register("fee")} placeholder="Your Course Fee" className="input input-bordered" required />
                                        </div>
                                        <div className="form-control w-[48%]">
                                            <label className="label">
                                                <span className="label-text text-sm">Course Type</span>
                                            </label>
                                            <input type="text" {...register("type")} placeholder="Your Course Type  eg. programming" className="input input-bordered" required />
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center gap-3">
                                        <div className="form-control w-[48%]">
                                            <label className="label">
                                                <span className="label-text text-sm">Course Duration</span>
                                            </label>
                                            <input type="text" {...register("duration")} placeholder="Your Course Duration eg. 8 weeks" className="input input-bordered" required />
                                        </div>
                                        <div className="form-control w-[48%]">
                                            <label className="label">
                                                <span className="label-text text-sm">Course Lesson Count</span>
                                            </label>
                                            <input type="text" {...register("lesson")} placeholder="Your Course Lesson Count" className="input input-bordered" required />
                                        </div>
                                    </div>
                                    <label className="form-control">
                                        <div className="label">
                                            <span className="label-text">Course Description</span>
                                        </div>
                                        <textarea className="textarea textarea-bordered h-24" placeholder="Your Course Description" {...register("description")} required></textarea>
                                    </label>
                                    <div className="form-control mt-6 gap-3">
                                        {/* <button className="btn btn-primary">Login</button> */}
                                        <input type="submit" value={'Add Class'} className="w-full btn btn-primary" />
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/3">
                            <img className="w-full h-full max-w-sm" src="https://img.freepik.com/free-vector/online-certification-illustration_23-2148575636.jpg?t=st=1718101519~exp=1718105119~hmac=4eabc0f5fd5e6087cb2b49b33534a1569b73160bd66269da953bfaf6b7326614&w=740" alt="email illustration vector art" />
                            <div className="space-y-2">
                                <h2 className="text-2xl font-semibold font-roboto text-[#151515db]">Launch <span className="text-blue-600">Another</span> Door of Opportunity</h2>
                                <p className="text-[#151515bc]">Empower countless learners, expand your reach, and shape the future of education by launching more courses.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default AddClass;