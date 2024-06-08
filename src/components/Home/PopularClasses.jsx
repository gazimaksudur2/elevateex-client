import { useEffect, useState } from 'react';
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import "./popularStyle.css"
import SubSection from '../../shared/SubSection';

const carousel = (slider) => {
    const z = 300
    function rotate() {
        const deg = 360 * slider.track.details.progress
        slider.container.style.transform = `translateZ(-${z}px) rotateY(${-deg}deg)`
    }
    slider.on("created", () => {
        const deg = 360 / slider.slides.length
        slider.slides.forEach((element, idx) => {
            element.style.transform = `rotateY(${deg * idx}deg) translateZ(${z}px)`
        })
        rotate()
    })
    slider.on("detailsChanged", rotate)
}

const PopularClasses = () => {
    const [course, setCourse] = useState();
    const subHeading = "Discover our diverse range of popular courses, covering programming, design, marketing, business, and data science. Each course is crafted by industry experts to enhance your skills and knowledge, suitable for all experience levels.";
    const heading = "Learn From our Courses";
    const [sliderRef] = useKeenSlider(
        {
            loop: true,
            selector: ".carousel__cell",
            renderMode: "custom",
            mode: "free-snap",
        },
        [carousel]
    )


    useEffect(() => {
        fetch('popular_course.json')
            .then(res => res.json())
            .then(data => {
                setCourse(data);
            })
    }, []);
    // console.log(course);

    return (
        <div className='w-[80%] mx-auto'>
            <SubSection heading={heading} subHeading={subHeading} />
            <div className='flex gap-10'>
                {
                    course && course.map(each => <>
                        <div className="card w-96 h-[25rem] bg-base-100 shadow-xl image-full rounded-lg hover:scale-105 duration-100">
                            <img className='object-cover w-full h-full rounded-xl' src={each?.course_url} alt="Shoes" />
                            <div className="card-body rounded-lg flex-col justify-between">
                                <div>
                                    <p className='bg-red-100 text-sm px-2 py-1 font-semibold text-red-600 rounded-full inline'>{each?.course_type}</p>
                                </div>
                                <div className='flex items-center justify-start gap-3'>
                                    <img className='w-16 h-16 rounded-full' src={each?.instructor_url} alt="" />
                                    <div>
                                        <h2 className="card-title">{each?.instructor}</h2>
                                        <p>{each?.course_title}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>)
                }
            </div>
                <div className="wrapper bg-base-300 my-10">
                    <div className="scene bg-red-400">
                        <div className="carousel keen-slider" ref={sliderRef}>
                            <div className="carousel__cell number-slide1 ">1</div>
                            <div className="carousel__cell number-slide2">2</div>
                            <div className="carousel__cell number-slide3">3</div>
                            <div className="carousel__cell number-slide4">4</div>
                            <div className="carousel__cell number-slide5">5</div>
                            <div className="carousel__cell number-slide6">6</div>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default PopularClasses;