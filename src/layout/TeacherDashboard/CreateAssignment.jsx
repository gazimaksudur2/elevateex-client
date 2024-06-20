import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useUserInfo from '../../hooks/useUserInfo';

const CreateAssignment = ({course, pushNew}) => {
    const axiosSecure = useAxiosSecure();
    const [userInfo] = useUserInfo();

    const assign = e => {
        // const letter = ref
        // e.preventDefault();
        // console.log(e.target.form);
        const form = new FormData(e.target.form);
        // console.log(form);
        const title = form.get("assignment_title");
        const deadline = form.get("deadline");
        const description = form.get("assignment_description");
        if (title === '' || deadline === "" || description === "") {
            Swal.fire({
                title: "Try Again!",
                text: "Fill up all the fields!",
                icon: "warning"
            });
        } else {
            const assignDoc = {
                title: title,
                description: description,
                deadline,
                user_email: userInfo.email,
                course_title: course?.course_title,
                assignedAt: new Date().toISOString().slice(0,10),
                instructor: course?.instructor,
                status: "active",
                submittedBy: [],
            }
            axiosSecure.post(`assignments`, assignDoc )
                .then(() => {
                    Swal.fire({
                        title: "Okay!",
                        text: "Assignment Added Successfully!",
                        icon: "success"
                    });
                    pushNew(assignDoc);
                })
                .catch(error => {
                    // console.log(error.message);
                    Swal.fire({
                        title: "Error Occured!",
                        text: error.message,
                        icon: "error"
                    });
                })
            
        }
        e.target.form.reset();
    }

    return (
        <div>
            <div>
                <dialog id="my_modal_1" className="modal backdrop-blur">
                    <div className="modal-box bg-base-100">
                        <div className="w-full flex flex-col justify-center items-center">
                            <img className="w-40" src="https://img.freepik.com/free-vector/giant-check-list_23-2148087771.jpg?t=st=1718700953~exp=1718704553~hmac=d6b697604e991b19c13121ee9d1e95f2a707a20c24f040322b3689ebf5942913&w=740" alt="" />
                        </div>
                        {/* <p className="py-4">Press ESC key or click the button below to close</p> */}
                        <div className="modal-action">
                            <form method="dialog" className="w-full flex flex-col justify-center gap-3">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Assignment Title</span>
                                    </label>
                                    <input type="text" name='assignment_title' placeholder="Your Assignment Title" className="input input-bordered" />
                                </div>
                                <div className="w-full">
                                    <label className="pb-1 label-text block">Submission Deadline</label>

                                    <input type="date" className="w-full input input-bordered" name="deadline" />
                                </div>
                                <label className="form-control">
                                    <div className="label">
                                        <span className="label-text">Assignment Description</span>
                                    </div>
                                    <textarea className="textarea textarea-bordered h-24" name='assignment_description' placeholder="Your Assignment Description" ></textarea>
                                </label>

                                <div className="w-full flex justify-end items-center gap-3">
                                    <button className="btn btn-primary">Cancel</button>
                                    {/* <button onClick={assign} className="btn btn-outline">Add Assignment</button> */}
                                    <input onClick={assign} className="btn btn-outline" type='submit' value={"Add Assignment"} />
                                </div>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default CreateAssignment;