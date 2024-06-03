import { FcGoogle } from 'react-icons/fc';
import { VscGithub } from 'react-icons/vsc';
import useAuth from '../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosPublic from '../hooks/useAxiosPublic';

const SocialLogin = () => {
    const { googleLogin, githubLogin } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();

    const handleGoogle = () => {
        googleLogin()
            .then(async (res) => {
                const msg = "Logged in Successful!";
                const existing = await axiosPublic.get(`/users?email=${res.user.email}`);
                // console.log(existing.data);
                // console.log(res.user);
                // console.log(user);
                if (existing.data.length==0) {
                    const user = {
                        displayName: res.user.displayName,
                        photoURL: res.user.photoURL,
                        email: res.user.email,
                        provider: 'google',
                        password: null,
                        role: 'general',
                        req_status: 'No'
                    }
                    axiosPublic.post('/users', user);
                }
                Swal.fire({
                    title: `Hello! ${res.user.displayName}`,
                    text: msg,
                    icon: "success"
                });
                navigate('/');
            })
            .catch(error => {
                Swal.fire({
                    title: "Unfortunately!",
                    text: "Error Occurred!",
                    icon: "error"
                });
                console.log(error.message);
            })
    }

    const handleGithub = () => {
        githubLogin()
            .then(async(res) => {
                Swal.fire({
                    title: `Hello! ${res.user.displayName}`,
                    text: "Logged in user Successful!",
                    icon: "success"
                });
                const existing = await axiosPublic.get(`/users?displayName=${res.user.displayName}&photoURL=${res.user.photoURL}`);
                // console.log(existing.data);
                // console.log(res.user);
                // console.log(user);
                if (existing.data.length==0) {
                    const user = {
                        displayName: res.user.displayName,
                        photoURL: res.user.photoURL,
                        email: res.user.email,
                        provider: 'github',
                        password: null,
                        role: 'general',
                        req_status: 'No'
                    }
                    axiosPublic.post('/users', user);
                }
                navigate('/');
            })
            .catch(error => {
                Swal.fire({
                    title: "Unfortunately!",
                    text: "Error Occurred!",
                    icon: "error"
                });
                console.log(error.message);
            })
    }
    return (
        <div className='pb-2 text-lg grid grid-cols-2 gap-4 justify-items-center align-middle'>
            <div onClick={handleGoogle} className='btn inline-flex justify-center items-center gap-2'>
                <FcGoogle className='text-2xl' />
                <p>Google</p>
            </div>
            <div onClick={handleGithub} className='btn inline-flex justify-center items-center gap-2'>
                <VscGithub className='text-2xl' />
                <p>Github</p>
            </div>
        </div>
    );
};

export default SocialLogin;