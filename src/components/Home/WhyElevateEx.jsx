import { HiOutlineLightningBolt, HiOutlineUserGroup, HiOutlineBadgeCheck, HiOutlineChartBar, HiOutlineGlobe, HiOutlineShieldCheck } from "react-icons/hi";

const features = [
  {
    icon: HiOutlineLightningBolt,
    title: "Learn at Your Pace",
    description: "Self-paced courses with lifetime access. Learn whenever, wherever suits you best.",
    color: "brand",
  },
  {
    icon: HiOutlineUserGroup,
    title: "Expert Instructors",
    description: "Learn from industry professionals with years of real-world experience.",
    color: "accent",
  },
  {
    icon: HiOutlineBadgeCheck,
    title: "Verified Certificates",
    description: "Earn shareable certificates to showcase your achievements on LinkedIn and beyond.",
    color: "success",
  },
  {
    icon: HiOutlineChartBar,
    title: "Track Your Progress",
    description: "Visual dashboards to monitor your learning journey and set milestones.",
    color: "brand",
  },
  {
    icon: HiOutlineGlobe,
    title: "Global Community",
    description: "Connect with thousands of learners and mentors from around the world.",
    color: "accent",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "Money-Back Guarantee",
    description: "Not satisfied? Get a full refund within 30 days. No questions asked.",
    color: "success",
  },
];

const colorMap = {
  brand: { bg: "bg-brand-50", icon: "text-brand-600", ring: "ring-brand-100" },
  accent: { bg: "bg-accent-50", icon: "text-accent-600", ring: "ring-accent-100" },
  success: { bg: "bg-success-50", icon: "text-success-500", ring: "ring-green-100" },
};

const WhyElevateEx = () => {
  return (
    <section className="section-padding bg-surface-50">
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="badge-primary mb-3 inline-block">Why ElevateEx</span>
          <h2 className="heading-section">Everything You Need to Succeed</h2>
          <p className="mt-4 text-body-lg">
            A complete learning ecosystem designed for the modern professional.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, idx) => {
            const c = colorMap[f.color];
            return (
              <div
                key={idx}
                className="card-elevated p-6 group hover:border-brand-200"
              >
                <div className={`w-12 h-12 ${c.bg} rounded-xl flex items-center justify-center mb-4 ring-4 ${c.ring} group-hover:scale-110 transition-transform`}>
                  <f.icon className={`text-xl ${c.icon}`} />
                </div>
                <h3 className="text-lg font-semibold text-surface-900 mb-2">{f.title}</h3>
                <p className="text-sm text-surface-500 leading-relaxed">{f.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyElevateEx;
