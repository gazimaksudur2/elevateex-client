import useAxiosSecure from '../../hooks/useAxiosSecure';
import useUserInfo from '../../hooks/useUserInfo';
import { parseApiError } from '../../utils/errorParser';
import { toast } from '../../utils/toast';

const CreateAssignment = ({ course, pushNew }) => {
    const axiosSecure = useAxiosSecure();
    const [userInfo] = useUserInfo();

    const assign = async (e) => {
        const form = e.target.form;
        const formData = new FormData(form);
        const title = formData.get("assignment_title");
        const deadline = formData.get("deadline");
        const description = formData.get("assignment_description");

        if (!title || !deadline || !description) {
            toast.warning("Please fill in all fields before submitting.");
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
            status: "active",
            submittedBy: [],
            submissionCount: 0,
        };

        const toastId = toast.loading("Creating assignment…");
        try {
            await axiosSecure.post('assignments', assignDoc);
            toast.update(toastId, {
                render: "Assignment created successfully!",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });
            pushNew(assignDoc);
            form.reset();
            document.getElementById('my_modal_1')?.close();
        } catch (error) {
            toast.update(toastId, {
                render: parseApiError(error),
                type: "error",
                isLoading: false,
                autoClose: 5000,
            });
        }
    };

    return (
        <div>
            <dialog id="my_modal_1" className="modal backdrop-blur">
                <div className="modal-box bg-base-100">
                    <div className="w-full flex flex-col justify-center items-center">
                        <img
                            className="w-40"
                            src="https://img.freepik.com/free-vector/giant-check-list_23-2148087771.jpg?t=st=1718700953~exp=1718704553~hmac=d6b697604e991b19c13121ee9d1e95f2a707a20c24f040322b3689ebf5942913&w=740"
                            alt=""
                        />
                    </div>
                    <div className="modal-action">
                        <form method="dialog" className="w-full flex flex-col justify-center gap-3">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Assignment Title</span>
                                </label>
                                <input
                                    type="text"
                                    name="assignment_title"
                                    placeholder="Assignment Title"
                                    className="input input-bordered"
                                />
                            </div>
                            <div className="w-full">
                                <label className="pb-1 label-text block">Submission Deadline</label>
                                <input type="date" className="w-full input input-bordered" name="deadline" />
                            </div>
                            <label className="form-control">
                                <div className="label">
                                    <span className="label-text">Description</span>
                                </div>
                                <textarea
                                    className="textarea textarea-bordered h-24"
                                    name="assignment_description"
                                    placeholder="Describe the assignment requirements…"
                                />
                            </label>
                            <div className="w-full flex justify-end items-center gap-3">
                                <button type="submit" className="btn btn-primary">Cancel</button>
                                <input onClick={assign} className="btn btn-outline" type="submit" value="Add Assignment" />
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default CreateAssignment;
