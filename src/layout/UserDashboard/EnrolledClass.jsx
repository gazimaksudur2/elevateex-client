import { Link } from "react-router-dom";

const EnrolledClassName = ({ course }) => {
    return (
        <div>
            <div className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md">
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
            </div>
        </div>
    );
};

export default EnrolledClassName;