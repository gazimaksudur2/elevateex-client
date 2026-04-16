import { useForm } from 'react-hook-form';
import { HiOutlinePhotograph, HiOutlineAcademicCap } from 'react-icons/hi';
import useUserInfo from '../../hooks/useUserInfo';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { uploadImage } from '../../utils/imgbb';
import { parseApiError } from '../../utils/errorParser';
import { toast } from '../../utils/toast';

const AddClass = () => {
  const [userInfo] = useUserInfo();
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const toastId = toast.loading('Submitting your course…');
    try {
      const banner_img = await uploadImage(data.banner_img[0]);

      const course = {
        course_title: data.course_title,
        course_fee: data.fee,
        course_banner: banner_img,
        course_type: data.type,
        course_duration: data.duration,
        course_description: data.description,
        course_status: 'pending',
        total_enrollment: 0,
        total_lessons: data.lesson,
        rating: 4.8,
        instructor: userInfo?.displayName,
        instructor_email: userInfo?.email,
        instructor_url: userInfo?.photoURL,
        enrolled_by: [],
        createdAt: new Date().toISOString().slice(0, 10),
      };

      await axiosSecure.post('/allclasses', course);
      toast.update(toastId, { render: 'Course submitted for review!', type: 'success', isLoading: false, autoClose: 4000 });
      reset();
    } catch (error) {
      toast.update(toastId, { render: parseApiError(error), type: 'error', isLoading: false, autoClose: 5000 });
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="dash-title flex items-center gap-2">
          <HiOutlineAcademicCap className="text-brand-600" />
          Create New Course
        </h1>
        <p className="text-sm text-surface-500 mt-1">Fill in the details below to submit your course for admin review.</p>
      </div>

      <div className="card-elevated p-6 md:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">Course Title</label>
            <input type="text" placeholder="e.g. Introduction to Python" className="input-field" {...register('course_title', { required: true })} />
          </div>

          {/* Instructor info (readonly) */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1.5">Instructor</label>
              <input type="text" className="input-field bg-surface-50" value={userInfo?.displayName ?? ''} readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1.5">Email</label>
              <input type="text" className="input-field bg-surface-50" value={userInfo?.email ?? ''} readOnly />
            </div>
          </div>

          {/* Banner upload */}
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">Banner Image</label>
            <div className="flex items-center gap-3">
              <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-surface-300 rounded-xl cursor-pointer hover:border-brand-400 transition-colors">
                <HiOutlinePhotograph className="text-surface-400 text-xl" />
                <span className="text-sm text-surface-500">Choose an image</span>
                <input type="file" accept="image/*" className="hidden" {...register('banner_img', { required: true })} />
              </label>
            </div>
          </div>

          {/* Fee & Type */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1.5">Course Fee ($)</label>
              <input type="number" min="0" step="0.01" placeholder="49.99" className="input-field" {...register('fee', { required: true })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1.5">Category</label>
              <input type="text" placeholder="e.g. Programming" className="input-field" {...register('type', { required: true })} />
            </div>
          </div>

          {/* Duration & Lessons */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1.5">Duration</label>
              <input type="text" placeholder="e.g. 8 weeks" className="input-field" {...register('duration', { required: true })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1.5">Total Lessons</label>
              <input type="number" min="1" placeholder="24" className="input-field" {...register('lesson', { required: true })} />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">Description</label>
            <textarea className="input-field h-28 resize-none" placeholder="Describe what students will learn…" {...register('description', { required: true })} />
          </div>

          {/* Submit */}
          <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-3">
            {isSubmitting ? 'Uploading & Submitting…' : 'Submit for Review'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddClass;
