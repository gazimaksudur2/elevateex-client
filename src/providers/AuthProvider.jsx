import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import app from './firebase.config';

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const createUser = (email, password)=>{
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const logIn = (email, password)=>{
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleLogin = ()=>{
        return signInWithPopup(auth, googleProvider);
    }

    const githubLogin = ()=>{
        return signInWithPopup(auth, githubProvider);
    }
    const updateUser = (name, photo)=>{
        return updateProfile(user, name, photo);
    }

    const logOut = ()=>{
        return signOut(auth);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, curUser=>{
            setUser(curUser);
            setLoading(false);
            console.log('current user is : ', curUser);
        })

        return ()=> unsubscribe();
    },[]);

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