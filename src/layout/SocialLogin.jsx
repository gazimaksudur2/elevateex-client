import { FcGoogle } from 'react-icons/fc';
import { VscGithub } from 'react-icons/vsc';
import useAuth from '../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SocialLogin = () => {
    const { googleLogin, githubLogin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleGoogle = ()=>{
        googleLogin()
        .then(res=>{
            Swal.fire({
                title: "Great!",
                text: "Logged in Successful!",
                icon: "success"
              });
            console.log(res);
            navigate('/');
        })
        .catch(error=>{
            Swal.fire({
                title: "Unfortunately!",
                text: "Error Occurred!",
                icon: "error"
              });
            console.log(error.message);
        })
    }

    const handleGithub = ()=>{
        githubLogin()
        .then(res=>{
            Swal.fire({
                title: "Great!",
                text: "Logged in Successful!",
                icon: "success"
              });
            console.log(res);
            navigate('/');
        })
        .catch(error=>{
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
                <FcGoogle className='text-2xl'/>
                <p>Google</p>
            </div>
            <div onClick={handleGithub} className='btn inline-flex justify-center items-center gap-2'>
                <VscGithub className='text-2xl'/>
                <p>Github</p>
            </div>
        </div>
    );
};

export default SocialLogin;