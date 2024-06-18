import { Link } from "react-router-dom";

const BeInstructor = () => {
    return (
        <div>
            <section className="bg-white px-20">
                <div className="relative flex">
                    <div className="min-h-screen lg:w-1/3"></div>
                    <div className="hidden w-3/4 min-h-screen bg-gray-100 lg:block"></div>

                    <div
                        className="container flex flex-col justify-center w-full min-h-screen px-6 py-10 mx-auto lg:absolute lg:inset-x-0">
                        <h1 className="w-96 text-2xl font-semibold text-gray-800 capitalize lg:text-3xl">
                            Serve our <span className="text-blue-500">Community</span> as an Instructor
                        </h1>

                        <div className="mt-10 lg:mt-20 lg:flex lg:items-center">
                            <img className="object-cover object-center w-full lg:w-[32rem] rounded-lg h-96" src="https://kinforce.net/learen/wp-content/uploads/2022/08/young-successful-chemistry-teacher-in-casualwear-s-GWTLZWZ.jpg" alt="" />

                            <div className="mt-8 lg:px-10 lg:mt-0">
                                <h1 className="text-2xl font-semibold text-gray-800 lg:w-72">
                                    Help us improve our productivity
                                </h1>

                                <p className="max-w-lg mt-6 text-gray-500-400">
                                    “ Become an instructor with us to share your expertise, access comprehensive teaching resources, and unlock numerous professional growth opportunities while inspiring and engaging learners globally. ”
                                </p>

                                <Link to={'/teach'}>
                                    <button className="btn btn-outline w-40 bg-slate-300 border-0 mt-10 border-b-4 border-gray-800 ">Join Now</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BeInstructor;