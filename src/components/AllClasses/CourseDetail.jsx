import { Link, useLocation } from 'react-router-dom';

const CourseDetail = () => {
    const location = useLocation();

    console.log(location.state.data);
    return (
        <div>
            <header className="bg-white">
                <nav className="px-6 py-4 shadow">
                    <div className="lg:items-center lg:justify-between lg:flex">
                        <Link to={'/'} className="btn btn-ghost flex justify-center items-center gap-3">
                            <img className="w-10 h-10 rounded" src="https://cdn-icons-png.flaticon.com/128/3048/3048425.png" alt="web Icon" />
                            <h2 className="text-gray-800 text-xl">Elevate<span className="text-2xl text-red-600">Ex</span></h2>
                        </Link>
                        <div className="absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white shadow-md lg:bg-transparent lg:shadow-none lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center">
                            <a href="#" className="block px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100 lg:mx-2">Home</a>
                            <a href="#" className="block px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100 lg:mx-2">About</a>
                            <a href="#" className="block px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100 lg:mx-2">Contact</a>
                        </div>
                    </div>
                </nav>

                <div className="lg:flex lg:mt-10">
                    <div className="flex items-center justify-center w-full px-6 py-8 lg:h-[32rem] lg:w-1/2">
                        <div className="max-w-xl">
                            <h2 className="text-3xl font-semibold text-gray-800 lg:text-4xl">Build Your New <span className="text-blue-600">Idea</span></h2>

                            <p className="mt-4 text-sm text-gray-500 lg:text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis commodi cum cupiditate ducimus, fugit harum id necessitatibus odio quam quasi, quibusdam rem tempora voluptates.</p>

                            <div className="flex flex-col mt-6 space-y-3 lg:space-y-0 lg:flex-row">
                                <a href="#" className="block px-5 py-2 text-sm font-medium tracking-wider text-center text-white transition-colors duration-300 transform bg-gray-900 rounded-md hover:bg-gray-700">Get Started</a>
                                <a href="#" className="block px-5 py-2 text-sm font-medium tracking-wider text-center text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md lg:mx-4 hover:bg-gray-300">Learn More</a>
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-64 lg:w-1/2 lg:h-auto">
                        <div className="w-full h-full bg-cover bg-hero-img">
                            <div className="w-full h-full bg-black opacity-25"></div>
                        </div>
                    </div>
                </div>
            </header>
        </div >
    );
};

export default CourseDetail;