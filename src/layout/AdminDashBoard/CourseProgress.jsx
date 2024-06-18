import { Rating } from "@mui/material";

const CourseProgress = ({ reviews }) => {
    return (
        <div className="relative w-[70%] my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="relative p-6 flex-auto">
                    <div className="space-y-4">
                        {
                            (!(reviews) || (reviews.length == 0)) && <h1 className="font-semibold text-xl text-center text-red-500">No Review Posted For this course till Now!!</h1>
                        }
                        {
                            reviews && reviews.map(review => (<>
                                <div key={review._id} className="py-4 px-4 border-b-2 border-gray-300 flex flex-col justify-between items-center gap-4 shadow">
                                    <div className="flex flex-row items-center justify-start gap-8">
                                        <img className="object-cover rounded-full w-14 h-14" src={review?.user_url} alt="" />
                                        <div className="text-center flex flex-col justify-center items-start">
                                            <Rating name="half-rating-read" value={review?.rating} precision={0.5} readOnly />
                                            <h1 className="font-semibold text-gray-800 ">{review?.user_name}</h1>
                                            {/* <span className="text-sm text-gray-500">{review?.clientEmail ? review.clientEmail : "Email didn't Provided!!"}</span> */}
                                        </div>
                                    </div>
                                    <p className="flex items-center justify-center text-center text-gray-500 lg:mx-14">
                                        {review?.description}
                                    </p>
                                    {/* <p className="flex items-center justify-center text-center text-gray-500 lg:mx-14">
                                                {review.roomId +"  "+id}
                                            </p> */}
                                </div>
                            </>))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseProgress;