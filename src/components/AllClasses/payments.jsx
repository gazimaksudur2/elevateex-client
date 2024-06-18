// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import CheckOutForm from "./CheckOutForm";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";

// TODO: add publishable key
// const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = ({course}) => {
    const { register, handleSubmit } = useForm();
    const { user } = useAuth();
    const onSubmit = data => console.log(data);
    return (
        <div>
            <div>
                <h2 className="text-center font-medium font-mulish text-lg">Payment Details</h2>
                <form className="card-body justify-start" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Course Title</span>
                        </label>
                        <input type="text" value={course?.course_title} className="input input-bordered"  {...register("course_title")} readOnly />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Your Official Name</span>
                        </label>
                        <input type="text" {...register("launcher")} className="input input-bordered" value={user?.displayName} readOnly />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Your Study Email</span>
                        </label>
                        <input type="text" {...register("mail")} className="input input-bordered" value={user?.email} readOnly />
                    </div>
                    <div className="flex justify-between items-center gap-3">
                        <div className="form-control w-[48%]">
                            <label className="label">
                                <span className="label-text text-sm">Course Fee</span>
                            </label>
                            <input type="text" {...register("fee")} value={"$"+course?.course_fee} className="input input-bordered" readOnly />
                        </div>
                        <div className="form-control w-[48%]">
                            <label className="label">
                                <span className="label-text text-sm">Course Type</span>
                            </label>
                            <input type="text" {...register("type")}  value={course?.course_type} className="input input-bordered" readOnly />
                        </div>
                    </div>
                </form>
                {/* <Elements stripe={stripePromise}>
                    <CheckOutForm></CheckOutForm>
                </Elements> */}
            </div>
        </div>
    );
};

export default Payment;