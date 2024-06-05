import "./bannerStyle.css"

const Slides = ({slide}) => {
    return (
        <div className={`keen-slider__slide ${slide}`}>
            {slide.slice(12)}
        </div>
    );
};

export default Slides;