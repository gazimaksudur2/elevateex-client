import BannerBottom from "../../components/Home/BannerBottom";
import BeInstructor from "../../components/Home/BeInstructor";
import Collaborators from "../../components/Home/Collaborators";
import HomeSubSection from "../../components/Home/HomeSubSection";
import KeenSlider from "../../components/Home/KeenSlider";
import PopularClasses from "../../components/Home/PopularClasses";
import Statistics from "../../components/Home/Statistics";
import StudentFeedbacks from "../../components/Home/StudentFeedbacks";

const Home = () => {
    return (
        <div>
            {/* <BannerSlider/> */}
            <KeenSlider/>
            <HomeSubSection/>
            <BannerBottom/>
            <PopularClasses/>
            <StudentFeedbacks/>
            <Statistics/>
            <BeInstructor/>
            <Collaborators/>
        </div>
    );
};

export default Home;