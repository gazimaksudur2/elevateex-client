import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <img src="https://app.10minuteschool.com/assets/login/routine.svg" alt="login image" />
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <Link to={'/'}>
                            <button className='btn btn-outline'>Go to Home</button>
                        </Link>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder={'Enter Your Email'} {...register("email")} className="input input-bordered"/>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder='Enter Password here' {...register("password")} className="input input-bordered"/>
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                                {errors.exampleRequired && <span>This field is required</span>}
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type='submit' value={'Login'}/>
                            </div>
                            <p className='w-full text-center'>New in this Website? <Link className='text-red-400' to={'/register'}>Register Now</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;