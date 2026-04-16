import { HiOutlineStar, HiOutlineUser } from 'react-icons/hi';

const CourseProgress = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="card-elevated p-8 text-center">
        <p className="text-sm text-surface-400">No reviews have been posted for this course yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-surface-900">Student Reviews</h3>
        <span className="badge-primary">{reviews.length} Reviews</span>
      </div>

      <div className="grid gap-4">
        {reviews.map((review) => (
          <div key={review._id} className="card-elevated p-5">
            <div className="flex items-start gap-4">
              <img
                className="w-10 h-10 rounded-xl object-cover shrink-0"
                src={review?.user_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(review?.user_name || 'U')}`}
                alt=""
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold text-surface-900">{review?.user_name}</p>
                  <span className="text-xs text-surface-400">{review?.rated_at}</span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <HiOutlineStar
                      key={i}
                      className={`text-sm ${i < Math.round(review?.rating || 0) ? 'text-amber-500 fill-amber-500' : 'text-surface-300'}`}
                    />
                  ))}
                  <span className="text-xs text-surface-400 ml-1">{review?.rating}</span>
                </div>
                <p className="text-sm text-surface-600 leading-relaxed">{review?.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseProgress;
