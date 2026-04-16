import HeroSection from "../../components/Home/HeroSection";
import TrustedBy from "../../components/Home/TrustedBy";
import FeaturedCourses from "../../components/Home/FeaturedCourses";
import WhyElevateEx from "../../components/Home/WhyElevateEx";
import Testimonials from "../../components/Home/Testimonials";
import BecomeInstructor from "../../components/Home/BecomeInstructor";
import CTASection from "../../components/Home/CTASection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <TrustedBy />
      <FeaturedCourses />
      <WhyElevateEx />
      <BecomeInstructor />
      <Testimonials />
      <CTASection />
    </div>
  );
};

export default Home;
