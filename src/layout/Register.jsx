import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';

const Register = () => {
    const img_hosting_key = import.meta.env.VITE_image_hosting_key;
    const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;
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
                        <h1 className="text-5xl font-bold font-roboto">
                            Let  <span className='text-red-500'><Typewriter
                                words={['Elevate', 'Your', 'Study', 'Experience!']}
                                loop={5}
                                cursor
                                cursorStyle='_'
                                typeSpeed={90}
                                deleteSpeed={50}
                                delaySpeed={1300}
                            /></span>
                        </h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <Link to={'/'}>
                            <button className='btn btn-outline'>Go to Home</button>
                        </Link>
                        <div>
                            <p>Log in with other Accounts</p>
                            <div>
                            </div>
                        </div>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <h2 className='text-xl text-center font-semibold'>Sign Up Now</h2>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Your Name</span>
                                </label>
                                <input type="text" name="name" placeholder={'Enter Your Name'} {...register("name")} className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Your Email</span>
                                </label>
                                <input type="email" name="email" placeholder={'Enter Your Email'} {...register("email")} className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder='Enter Password here' {...register("password")} className="input input-bordered" />
                                {errors.exampleRequired && <span>This field is required</span>}
                            </div>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Upload Your Profile Image</span>
                                </div>
                                <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
                            </label>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type='submit' value={'SignUp'} />
                            </div>
                            <p className='w-full text-center'>Already have an Account? <Link className='text-red-400' to={'/login'}>Sign in</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;