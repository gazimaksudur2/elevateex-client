import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { CiHome } from 'react-icons/ci';
import SocialLogin from './SocialLogin';

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
        <div className='min-h-screen py-10 bg-base-200'>
            <div className="flex justify-center items-center gap-3">
                <img className="w-10 h-10 rounded" src="https://cdn-icons-png.flaticon.com/128/3048/3048425.png" alt="web Icon" />
                <h2 className="text-gray-800 text-xl">Elevate<span className="text-2xl text-red-600">Ex</span></h2>
            </div>
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row-reverse gap-[10%]">
                    <div className="w-[50%] text-center space-y-2 lg:text-left">
                        <Link to={'/'} className='mb-5 btn btn-outline inline-flex justify-start items-center gap-2'>
                            <span className='text-xl'>Back to </span>
                            <CiHome className='font-bold text-3xl' />
                        </Link>
                        <img src="https://app.10minuteschool.com/assets/login/routine.svg" alt="login image" />
                        <h1 className="text-5xl font-bold">Empower Your Learning</h1>
                        <p>Discover a new way to learn with <span className='text-lg'>Elevate<span className='text-xl text-red-600'>Ex</span></span>, where every step brings you closer to your academic goals. Empower yourself with the tools and resources you need to succeed, all in one place.</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <h2 className='text-2xl text-center font-mulish'>Sign In</h2>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder={'Enter Your Email'} {...register("email")} className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder='Enter Password here' {...register("password")} className="input input-bordered" />
                                <label className="label">
                                    <label className="label cursor-pointer gap-3 flex-row-reverse">
                                        <span className="label-text">Remember me</span>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                                {errors.exampleRequired && <span>This field is required</span>}
                            </div>
                            <div className="form-control mt-2">
                                <input className="btn bg-red-600 text-white hover:bg-red-500" type='submit' value={'Sign in'} />
                            </div>
                            <div className="divider">OR Sign in with</div>
                            <SocialLogin />
                            <p className='w-full text-center'>New in this Website? <Link className='text-red-400' to={'/register'}>Register Now</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;