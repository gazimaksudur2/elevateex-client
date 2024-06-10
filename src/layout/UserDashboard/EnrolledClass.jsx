import { Link } from "react-router-dom";

const EnrolledClassName = ({ course }) => {
    return (
        <div>
            <section className="bg-gray-100 lg:py-12 lg:flex lg:justify-center rounded-lg">
                <div
                    className="overflow-hidden bg-white lg:mx-8 lg:flex lg:max-w-6xl lg:w-full lg:shadow-md lg:rounded-xl">
                    <div className="lg:w-1/2">
                        <div className="h-64 bg-cover lg:h-full bg-admin_class"></div>
                    </div>

                    <div className="max-w-xl px-6 py-12 lg:max-w-5xl lg:w-1/2">
                        <h2 className="text-2xl font-semibold text-gray-800 md:text-3xl">
                            Build Your New <span className="text-blue-500">Idea</span>
                        </h2>

                        <p className="mt-4 text-gray-500">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                            Quidem modi reprehenderit vitae exercitationem aliquid dolores ullam temporibus enim expedita aperiam
                            mollitia iure consectetur dicta tenetur, porro consequuntur saepe accusantium consequatur.
                        </p>

                        <div className="inline-flex w-full mt-6 sm:w-auto">
                            <a href="#" className="inline-flex items-center justify-center w-full px-6 py-2 text-sm text-white duration-300 bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                                Start Now
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            {/* <div className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md">
                <img className="object-cover w-full h-64" src="https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="Article" />

                <div className="p-6">
                    <div>
                        <span className="text-xs font-medium text-blue-600 uppercase">Product</span>
                        <a href="#" className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform hover:text-gray-600 hover:underline" role="link">I Built A Successful Blog In One Year</a>
                        <p className="mt-2 text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie parturient et sem ipsum volutpat vel. Natoque sem et aliquam mauris egestas quam volutpat viverra. In pretium nec senectus erat. Et malesuada lobortis.</p>
                    </div>

                    <div className="mt-4">
                        <div className="flex items-center">
                            <Link to={`/userdash/classes/${course?.id}`} state={{from: course}}>
                                <button className="btn btn-outline">Continue Course</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default EnrolledClassName;