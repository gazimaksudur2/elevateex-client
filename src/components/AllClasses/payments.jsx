import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";

const Payment = ({ course }) => {
  const { register, handleSubmit } = useForm();
  const { user } = useAuth();

  const onSubmit = (data) => {
    // Payment integration placeholder
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-surface-900 mb-4">Confirm Enrollment</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-surface-700 mb-1.5">Course</label>
          <input
            type="text"
            value={course?.course_title || ""}
            className="input-field bg-surface-50"
            {...register("course_title")}
            readOnly
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">Your Name</label>
            <input
              type="text"
              value={user?.displayName || ""}
              className="input-field bg-surface-50"
              {...register("launcher")}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">Email</label>
            <input
              type="text"
              value={user?.email || ""}
              className="input-field bg-surface-50"
              {...register("mail")}
              readOnly
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">Course Fee</label>
            <input
              type="text"
              value={`$${course?.course_fee || 0}`}
              className="input-field bg-surface-50"
              {...register("fee")}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">Category</label>
            <input
              type="text"
              value={course?.course_type || "General"}
              className="input-field bg-surface-50"
              {...register("type")}
              readOnly
            />
          </div>
        </div>

        <div className="p-4 bg-brand-50 rounded-xl border border-brand-200">
          <p className="text-sm text-brand-800 font-medium">
            Payment gateway integration coming soon. Click "Enroll Now" above to join this course.
          </p>
        </div>
      </form>
    </div>
  );
};

export default Payment;
