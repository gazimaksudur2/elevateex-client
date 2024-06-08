import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import "./bannerStyle.css"
import Slides from "./Slides";

const BannerSlider = () => {
    const [sliderRef] = useKeenSlider(
        {
            loop: true,
        },
        [
            (slider) => {
                let timeout
                // let mouseOver = false
                function clearNextTimeout() {
                    clearTimeout(timeout)
                }
                function nextTimeout() {
                    clearTimeout(timeout)
                    // if (mouseOver) return
                    timeout = setTimeout(() => {
                        slider.next()
                    }, 1800)
                }
                // slider.on("created", () => {
                //     slider.container.addEventListener("mouseover", () => {
                //         mouseOver = true
                //         clearNextTimeout()
                //     })
                //     slider.container.addEventListener("mouseout", () => {
                //         mouseOver = false
                //         nextTimeout()
                //     })
                //     nextTimeout()
                // })
                slider.on("dragStarted", clearNextTimeout)
                slider.on("animationEnded", nextTimeout)
                slider.on("updated", nextTimeout)
            },
        ]
    );
    const slide_pointer = [ 'number-slide1',
        'number-slide2',
        'number-slide3',
        'number-slide4',
        'number-slide5',
        'number-slide6'];
    return (
        <>
            <div className="min-h-[20vh]">
                <div ref={sliderRef} className="keen-slider">
                    {/* <div className="keen-slider__slide number-slide1">1</div>
                    <div className="keen-slider__slide number-slide2">2</div>
                    <div className="keen-slider__slide number-slide3">3</div>
                    <div className="keen-slider__slide number-slide4">4</div>
                    <div className="keen-slider__slide number-slide5">5</div>
                    <div className="keen-slider__slide number-slide6">6</div> */}
                    {
                        slide_pointer.map((slide, idx)=><Slides key={idx} slide={slide}/>)
                    }
                </div>
            </div>
        </>
    );
};

export default BannerSlider;
