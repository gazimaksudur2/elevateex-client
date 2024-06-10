import { useForm } from "react-hook-form";

const TeachHere = () => {
    const immersive = "Let's open an immersive door to";
    const career = "one's career.";
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <div>
            <header className="bg-white w-[92%] mx-auto">
                <div className="container px-6 py-16 mx-auto">
                    <div className="items-center lg:flex lg:flex-row-reverse lg:justify-evenly">
                        <div className="w-full lg:w-1/2">
                            <div className="lg:max-w-lg">
                                <h1 className="text-3xl font-semibold text-gray-800 lg:text-4xl">Instructor Application <span className="text-blue-500">Form</span></h1>

                                <p className="mt-3 text-gray-600 ">{immersive} <span className="font-medium text-blue-500">Build</span> {career}</p>
                                <div className="flex flex-col mt-2 space-y-3 lg:space-y-0 lg:flex-row">
                                    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                                        <div className="flex justify-center items-center gap-4">
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">First Name</span>
                                                </label>
                                                <input type="text" placeholder="Your First Name" className="input input-bordered"  {...register("first_name")} required />
                                            </div>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Last Name</span>
                                                </label>
                                                <input type="text" {...register("last_name")} placeholder="Your Last Name" className="input input-bordered" required />
                                            </div>
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-sm">Email</span>
                                            </label>
                                            <input type="email" {...register("example")} placeholder="email" className="input input-bordered" required />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-sm">Profile Image</span>
                                            </label>
                                            <input type="file" {...register("example")} className="file-input file-input-bordered w-full" />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-sm">Your Course Category</span>
                                            </label>
                                            <select {...register("category")} className="select select-bordered w-full">
                                                <option selected disabled>Select a Category</option>
                                                <option>Web Development</option>
                                                <option>Marketing</option>
                                                <option>Business</option>
                                                <option>Data Science</option>
                                                <option>Design</option>
                                                <option>Programming</option>
                                            </select>
                                            {/* <select defaultValue={"Category Name"} {...register('category', { required: true })}
                                                className="select select-bordered w-full">
                                                <option disabled value="default">Select a category</option>
                                                <option value="salad">Salad</option>
                                                <option value="pizza">Pizza</option>
                                                <option value="soup">Soup</option>
                                                <option value="dessert">Dessert</option>
                                                <option value="drinks">Drinks</option>
                                            </select> */}
                                        </div>
                                        <div className="form-control py-2">
                                            <label className="label">
                                                <span className="label-text text-sm">Your Expertise Level</span>
                                            </label>
                                            <div className="ml-2 flex justify-start items-center gap-5">
                                                <div className="flex justify-center items-center gap-2">
                                                    <input {...register("example")} type="radio" name="radio-2" className="radio radio-primary" />
                                                    <h2 className="inline">beginner</h2>
                                                </div>
                                                <div className="flex justify-center items-center gap-2">
                                                    <input {...register("example")} type="radio" name="radio-2" className="radio radio-primary" />
                                                    <h2 className="inline">mid-level</h2>
                                                </div>
                                                <div className="flex justify-center items-center gap-2">
                                                    <input {...register("example")} type="radio" name="radio-2" className="radio radio-primary" />
                                                    <h2 className="inline">Experienced</h2>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-control mt-6 gap-3">
                                            {/* <button className="btn btn-primary">Login</button> */}
                                            <input type="submit" value={'Submit For Review'} className="w-full btn btn-primary" />
                                            <input type="submit" value={'Request to Another'} className="w-full btn btn-primary" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/3">
                            <img className="w-full h-full max-w-sm" src="https://img.freepik.com/free-vector/mathematics-concept-illustration_114360-3972.jpg?t=st=1717933152~exp=1717936752~hmac=9c1ba993cc23dda057b8f303938b8e5749f7867ba883a8b62799f4ee324c6dbd&w=740" alt="email illustration vector art" />
                            <div className="space-y-2">
                                <h2 className="text-2xl font-semibold font-roboto text-[#151515db]">Your <span className="text-blue-600">Journey</span> Begins Here</h2>
                                <p className="text-[#151515bc]">Applying for our Community is a straightforward journey that starts with your dream to teach and motivate the mass learner to transform or shape a generation.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default TeachHere;