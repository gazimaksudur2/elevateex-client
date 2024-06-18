import { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import ReviewSlide from "./ReviewSlide";
import useAxiosSecure from '../../hooks/useAxiosSecure';

const StudentFeedbacks = () => {
    const [reviews, setReviews] = useState();
    const axiosSecure = useAxiosSecure();

    useEffect(()=>{
        axiosSecure.get(`reviews`)
        .then(res=>{
            setReviews(res.data);
        })
        .catch(error=>{
            console.log(error);
        })
    },[]);


    // useEffect(() => {
    //     fetch('reviews.json')
    //         .then(res => res.json())
    //         .then(data => {
    //             setReviews(data);
    //         })
    // }, []);
    // console.log(reviews);
    return (
        <div>
            <div>
                <Swiper
                    pagination={{
                        type: 'progressbar',
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper h-[110vh] bg-base-300"
                >

                    {
                        reviews && reviews.slice(reviews?.length-5,reviews?.length).map(review => (<>
                            <SwiperSlide>
                                <ReviewSlide review={review}/>
                            </SwiperSlide>
                        </>))
                    }
                </Swiper>
            </div>
        </div >
    );
};

export default StudentFeedbacks;