import { Link } from "react-router-dom";
import { HiOutlineArrowRight, HiOutlineCurrencyDollar, HiOutlineUserGroup, HiOutlinePresentationChartLine } from "react-icons/hi";

const benefits = [
  { icon: HiOutlineUserGroup, text: "Reach thousands of eager students globally" },
  { icon: HiOutlineCurrencyDollar, text: "Earn revenue from your expertise and courses" },
  { icon: HiOutlinePresentationChartLine, text: "Access powerful analytics and teaching tools" },
];

const BecomeInstructor = () => {
  return (
    <section className="section-padding bg-surface-50">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80"
              alt="Instructor teaching"
              className="rounded-3xl shadow-soft-lg object-cover w-full h-[420px]"
            />
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-soft-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent-50 rounded-xl flex items-center justify-center">
                  <HiOutlinePresentationChartLine className="text-xl text-accent-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-surface-900">500+</p>
                  <p className="text-xs text-surface-500">Active Instructors</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <span className="badge-accent mb-4 inline-block">Teach on ElevateEx</span>
            <h2 className="heading-section mb-4">
              Share Your Expertise With the World
            </h2>
            <p className="text-body-lg mb-8">
              Become an instructor and create impactful courses that help students grow. Get powerful creation tools, marketing support, and earn from your knowledge.
            </p>

            <div className="space-y-4 mb-8">
              {benefits.map((b, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center shrink-0">
                    <b.icon className="text-brand-600" />
                  </div>
                  <p className="text-sm text-surface-700">{b.text}</p>
                </div>
              ))}
            </div>

            <Link to="/teach" className="btn-accent py-3 px-8">
              Start Teaching Today
              <HiOutlineArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeInstructor;
