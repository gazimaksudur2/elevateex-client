import { Link } from "react-router-dom";
import { HiOutlineArrowRight, HiOutlinePlay, HiOutlineSparkles } from "react-icons/hi";
import CountUp from "react-countup";
import useUsers from "../../hooks/useUsers";
import useClass from "../../hooks/useClass";

const HeroSection = () => {
  const [users] = useUsers();
  const [classes] = useClass({ query: "?course_status=approved" });

  const stats = [
    { value: users?.length || 0, suffix: "+", label: "Active Learners" },
    { value: classes?.length || 0, suffix: "+", label: "Expert Courses" },
    { value: 95, suffix: "%", label: "Success Rate" },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-surface-50 via-white to-brand-50">
      <div className="absolute inset-0 bg-hero-pattern opacity-50" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-brand-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent-200/20 rounded-full blur-3xl" />

      <div className="section-container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-4rem)] py-16 lg:py-0">
          <div className="max-w-xl animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 border border-brand-200 rounded-full text-sm font-medium text-brand-700 mb-6">
              <HiOutlineSparkles className="text-brand-500" />
              <span>Trusted by 10,000+ learners worldwide</span>
            </div>

            <h1 className="text-display-lg md:text-display-xl lg:text-display-2xl font-display font-bold tracking-tight text-surface-900">
              Master New Skills,{" "}
              <span className="gradient-text">Elevate</span> Your Career
            </h1>

            <p className="mt-6 text-lg text-surface-500 leading-relaxed max-w-lg">
              Access world-class courses from industry experts. Learn at your own pace with interactive lessons, hands-on projects, and a supportive community.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              <Link to="/allclass" className="btn-primary py-3.5 px-8 text-base">
                Explore Courses
                <HiOutlineArrowRight className="text-lg" />
              </Link>
              <button className="btn-ghost py-3.5 px-6 text-base gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
                  <HiOutlinePlay className="text-brand-600 ml-0.5" />
                </div>
                Watch Demo
              </button>
            </div>

            <div className="flex items-center gap-8 mt-12 pt-8 border-t border-surface-200">
              {stats.map((stat, idx) => (
                <div key={idx}>
                  <div className="text-2xl md:text-3xl font-bold text-surface-900">
                    <CountUp end={stat.value} duration={2.5} enableScrollSpy suffix={stat.suffix} />
                  </div>
                  <p className="text-sm text-surface-500 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:block animate-fade-in animate-delay-200">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                alt="Students collaborating"
                className="rounded-3xl shadow-soft-lg object-cover w-full h-[520px]"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-soft-lg p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-success-50 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-success-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-surface-900">Certificate Earned</p>
                    <p className="text-xs text-surface-500">Advanced React Development</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-soft-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-brand-100 border-2 border-white flex items-center justify-center">
                        <span className="text-xs font-bold text-brand-600">{String.fromCharCode(64 + i)}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-surface-900">2.4k+</p>
                    <p className="text-xs text-surface-500">Online now</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
