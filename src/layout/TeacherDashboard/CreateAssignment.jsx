import useAxiosSecure from '../../hooks/useAxiosSecure';
import useUserInfo from '../../hooks/useUserInfo';
import { parseApiError } from '../../utils/errorParser';
import { toast } from '../../utils/toast';

const CreateAssignment = ({ course, pushNew, open, onClose }) => {
  const axiosSecure = useAxiosSecure();
  const [userInfo] = useUserInfo();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const title = formData.get('assignment_title');
    const deadline = formData.get('deadline');
    const description = formData.get('assignment_description');

    if (!title || !deadline || !description) {
      toast.warning('Please fill in all fields.');
      return;
    }

    const assignDoc = {
      title,
      description,
      deadline,
      user_email: userInfo.email,
      course_title: course?.course_title,
      assignedAt: new Date().toISOString().slice(0, 10),
      instructor: course?.instructor,
      status: 'active',
      submittedBy: [],
      submissionCount: 0,
    };

    const toastId = toast.loading('Creating assignment…');
    try {
      await axiosSecure.post('assignments', assignDoc);
      toast.update(toastId, { render: 'Assignment created!', type: 'success', isLoading: false, autoClose: 3000 });
      pushNew(assignDoc);
      form.reset();
      onClose();
    } catch (err) {
      toast.update(toastId, { render: parseApiError(err), type: 'error', isLoading: false, autoClose: 5000 });
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6" onClick={e => e.stopPropagation()}>
        <h3 className="text-lg font-semibold text-surface-900 mb-4">Create Assignment</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">Title</label>
            <input type="text" name="assignment_title" placeholder="Assignment title" className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">Deadline</label>
            <input type="date" name="deadline" className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">Description</label>
            <textarea name="assignment_description" placeholder="Describe the assignment…" className="input-field h-24 resize-none" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-ghost text-sm py-2 px-4">Cancel</button>
            <button type="submit" className="btn-primary text-sm py-2.5 px-5">Create Assignment</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAssignment;
