import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import app from './firebase.config';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { ClimbingBoxLoader } from 'react-spinners';

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth(app);
    const axiosPublic = useAxiosPublic();
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const createUser = (email, password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const logIn = (email, password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleLogin = ()=>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const githubLogin = ()=>{
        setLoading(true);
        return signInWithPopup(auth, githubProvider);
    }
    const updateUser = (name, photo)=>{
        setLoading(true);
        return updateProfile(auth.currentUser, { displayName: name, photoURL: photo });
    }

    const logOut = ()=>{
        setLoading(true);
        return signOut(auth);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, curUser=>{
            setUser(curUser);
            if(curUser){
                const userInfo = {email: curUser?.email};
                axiosPublic.post('/jwt', userInfo)
                .then(res=>{
                    if(res?.data?.token){
                        localStorage.setItem('access-token',res.data.token);
                        setLoading(false);
                    }
                })
            }else{
                localStorage.removeItem('access-token');
                setLoading(false);
            }
            // console.log('current user is : ', curUser);
        })

        return ()=> unsubscribe();
    },[]);

    if(loading){
        return (<div className='min-h-screen flex items-center justify-center'>
             <ClimbingBoxLoader className='text-7xl scale-150' color="#d65336" />
        </div>)
    }

    const authInfo = {
        user, 
        loading,
        createUser,
        logIn,
        googleLogin,
        githubLogin,
        updateUser,
        logOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;