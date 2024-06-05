import { Typewriter } from "react-simple-typewriter";
import BannerSlider from "../../components/Home/BannerSlider";

const Home = () => {
    return (
        <div>
            <BannerSlider/>
            <h1 className="text-5xl font-bold font-roboto">
                {"Let's"}  <span className='text-red-500'><Typewriter
                    words={['Elevate Your Study Experience!']}
                    loop={5}
                    cursor
                    cursorStyle='_'
                    typeSpeed={90}
                    deleteSpeed={50}
                    delaySpeed={1300}
                /></span>
            </h1>
            <p>Our Slogan is : Elevate your study Experience...</p>
        </div>
    );
};

export default Home;