import { useState, useEffect } from "react";
import { HiOutlineStar, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <HiOutlineStar
        key={star}
        className={`w-4 h-4 ${star <= rating ? "text-warning-500 fill-warning-500" : "text-surface-300"}`}
      />
    ))}
  </div>
);

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("reviews")
      .then((res) => setReviews(res.data?.slice(-6) || []))
      .catch(() => {});
  }, []);

  const visibleReviews = reviews.length > 0 ? reviews : [];

  const next = () => setCurrentIndex((i) => (i + 1) % Math.max(visibleReviews.length, 1));
  const prev = () => setCurrentIndex((i) => (i - 1 + visibleReviews.length) % Math.max(visibleReviews.length, 1));

  if (visibleReviews.length === 0) return null;

  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="badge-primary mb-3 inline-block">Testimonials</span>
            <h2 className="heading-section">What Our Learners Say</h2>
            <p className="mt-3 text-body-lg max-w-xl">
              Real stories from real students who transformed their careers.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={prev} className="w-10 h-10 rounded-xl border border-surface-300 flex items-center justify-center hover:bg-surface-50 transition-colors">
              <HiChevronLeft className="text-lg text-surface-600" />
            </button>
            <button onClick={next} className="w-10 h-10 rounded-xl border border-surface-300 flex items-center justify-center hover:bg-surface-50 transition-colors">
              <HiChevronRight className="text-lg text-surface-600" />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleReviews.slice(0, 3).map((review, idx) => {
            const adjustedIdx = (currentIndex + idx) % visibleReviews.length;
            const r = visibleReviews[adjustedIdx];
            return (
              <div key={idx} className="card-elevated p-6">
                <StarRating rating={r.rating || 5} />
                <p className="mt-4 text-surface-600 leading-relaxed text-sm line-clamp-4">
                  "{r.description || "Great learning experience!"}"
                </p>
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-surface-100">
                  <img
                    src={r.user_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(r.user_name || "U")}`}
                    alt={r.user_name}
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-surface-900">{r.user_name || "Anonymous"}</p>
                    <p className="text-xs text-surface-500">{r.course_title || "ElevateEx Student"}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
