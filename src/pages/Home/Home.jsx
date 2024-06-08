import BannerBottom from "../../components/Home/BannerBottom";
import Collaborators from "../../components/Home/Collaborators";
import HomeSubSection from "../../components/Home/HomeSubSection";
import KeenSlider from "../../components/Home/KeenSlider";
import PopularClasses from "../../components/Home/PopularClasses";

const Home = () => {
    return (
        <div>
            {/* <BannerSlider/> */}
            <KeenSlider/>
            <HomeSubSection/>
            <BannerBottom/>
            <PopularClasses/>
            <Collaborators/>
            <p>Our Slogan is : Elevate your study Experience...</p>
        </div>
    );
};

export default Home;