import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import app from './firebase.config';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { parseApiError } from '../utils/errorParser';
import { toast } from '../utils/toast';
import LoadingState from '../components/ui/LoadingState';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);
  const axiosPublic = useAxiosPublic();
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  // ── Auth methods ─────────────────────────────────────────────────────────
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const githubLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };

  const updateUser = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, { displayName: name, photoURL: photo });
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // ── Auth state observer ──────────────────────────────────────────────────
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (curUser) => {
      setUser(curUser);

      if (curUser) {
        try {
          const res = await axiosPublic.post('/jwt', { email: curUser.email });
          if (res?.data?.token) {
            localStorage.setItem('access-token', res.data.token);
          }
        } catch (err) {
          // JWT issue – keep the user logged in on Firebase but show a warning
          toast.warning(
            'Could not verify your session with the server. Some features may be limited.',
            { toastId: 'jwt-warn', autoClose: 6000 },
          );
        }
      } else {
        localStorage.removeItem('access-token');
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <LoadingState fullScreen size="lg" text="Preparing your experience…" />;
  }

  const authInfo = {
    user,
    loading,
    createUser,
    logIn,
    googleLogin,
    githubLogin,
    updateUser,
    logOut,
    parseAuthError: (err) => parseApiError(err),
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
