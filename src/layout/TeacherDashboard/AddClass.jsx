import { useForm } from "react-hook-form";

const AddClass = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <div>
            <header className="bg-white w-[98%] mx-auto">
                <div className="container px-2 py-10 mx-auto">
                    <div className="items-center lg:flex lg:flex-row-reverse lg:justify-evenly">
                        <div className="w-full lg:w-1/2">
                            <div className="lg:max-w-lg">
                                <h1 className="text-3xl font-semibold text-gray-800 lg:text-4xl">Add a New <span className="text-blue-500">Course </span></h1>
                                <div className="flex flex-col mt-2 space-y-3 lg:space-y-0 lg:flex-row">
                                    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
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
                                            <input type="text" {...register("launcher")} className="input input-bordered" value={"Gazi Maksudur Rahman"} readOnly />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Course Launcher Email</span>
                                            </label>
                                            <input type="text" {...register("mail")} className="input input-bordered" value={"gazimaksudur2@gmail.com"} readOnly />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-sm">Course Banner Image</span>
                                            </label>
                                            <input type="file" {...register("banner_img")} className="file-input file-input-bordered w-full" />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-sm">Course Price</span>
                                            </label>
                                            <input type="text" {...register("price")} placeholder="Your Course Price" className="input input-bordered" required />
                                        </div>
                                        <label className="form-control">
                                            <div className="label">
                                                <span className="label-text">Course Description</span>
                                            </div>
                                            <textarea className="textarea textarea-bordered h-24" placeholder="Your Course Description" {...register("price")} required></textarea>
                                        </label>
                                        <div className="form-control mt-6 gap-3">
                                            {/* <button className="btn btn-primary">Login</button> */}
                                            <input type="submit" value={'Add Class'} className="w-full btn btn-primary" />
                                        </div>
                                    </form>
                                </div>
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