import { useRef } from 'react';
import Swal from 'sweetalert2';

const CreateAssignment = () => {
    const ref = useRef();
    
    const adminApply = () => {
        // const letter = ref
        console.log(ref.current.value);
        Swal.fire({
            title: "Best of Luck!",
            text: "Application Submitted Successfully!",
            icon: "success"
        });
    }
    const defaultLetter = "I am writing to formally request admin privileges for my account. As I continue to contribute to our ElevateEx, having admin access would enable me to manage tasks more efficiently and assist with administrative responsibilities, ensuring smoother operations and timely updates.";
    return (
        <div>
            <div>
                <dialog id="my_modal_1" className="modal backdrop-blur">
                    <div className="modal-box bg-base-100">
                        <div className="w-full flex flex-col justify-center items-center">
                            <img className="w-40" src="https://img.freepik.com/free-vector/follow-me-social-business-theme-design_24877-50426.jpg?t=st=1717443448~exp=1717447048~hmac=e757907a06ab84e3244b1cdfc700081ea5fef85f5985f3f3026ba306bf2e14cf&w=740" alt="" />
                        </div>
                        <div className="flex flex-col justify-center items-start">
                            <p>To superAdmin,</p>
                            <h3 className=""><span className="font-semibold text-lg">Subject:</span> Request for the Admin role.</h3>
                        </div>
                        <h3 className="font-bold text-lg">Hello! Sir,</h3>
                        {/* <p className="py-4">Press ESC key or click the button below to close</p> */}
                        <div className="modal-action">
                            <form method="dialog" className="w-full flex flex-col justify-center items-center gap-3">
                                <textarea ref={ref} className="textarea textarea-secondary w-full h-44" defaultValue={defaultLetter}></textarea>
                                <div className="w-full flex justify-end items-center gap-3">
                                    <button className="btn btn-primary">Close</button>
                                    <button onClick={adminApply} className="btn btn-outline">Apply</button>
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