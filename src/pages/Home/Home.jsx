import Collaborators from "../../components/Home/Collaborators";
import HomeSubSection from "../../components/Home/HomeSubSection";
import KeenSlider from "../../components/Home/KeenSlider";

const Home = () => {
    return (
        <div>
            {/* <BannerSlider/> */}
            <KeenSlider/>
            <HomeSubSection/>
            <Collaborators/>
            <p>Our Slogan is : Elevate your study Experience...</p>
        </div>
    );
};

export default Home;