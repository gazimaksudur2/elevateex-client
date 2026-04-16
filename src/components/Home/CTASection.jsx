import { Link } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";

const CTASection = () => {
  return (
    <section className="section-padding bg-surface-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-600/20 to-accent-500/10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-3xl" />

      <div className="section-container relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-display-sm md:text-display-md font-display font-bold text-white mb-6">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-lg text-surface-300 mb-8 max-w-xl mx-auto">
            Join thousands of students already learning on ElevateEx. Start with free courses or unlock premium content today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/register" className="btn-primary bg-white text-brand-700 hover:bg-surface-100 py-3.5 px-8 text-base shadow-lg">
              Get Started Free
              <HiOutlineArrowRight />
            </Link>
            <Link to="/allclass" className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold text-white border border-surface-600 rounded-xl hover:bg-white/10 transition-all">
              Browse Courses
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
