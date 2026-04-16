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
  // `loading` is ONLY for the initial Firebase SDK auth-state resolution.
  // Individual operations (login, register) track their own loading via
  // react-hook-form's `isSubmitting` or local state — NOT this flag.
  // If we set loading=true inside logIn() and Firebase throws, onAuthStateChanged
  // is never called, so setLoading(false) would never run → infinite spinner.
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);
  const axiosPublic = useAxiosPublic();
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  // ── Auth methods — DO NOT call setLoading(true) here ────────────────────
  // These return Promises; callers handle their own loading/error UI.
  const createUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const logIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const googleLogin = () => signInWithPopup(auth, googleProvider);

  const githubLogin = () => signInWithPopup(auth, githubProvider);

  const updateUser = (name, photo) =>
    updateProfile(auth.currentUser, { displayName: name, photoURL: photo });

  // logOut triggers onAuthStateChanged (user → null), so setLoading is safe here.
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // ── Auth state observer (single source of truth for `loading`) ───────────
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (curUser) => {
      setUser(curUser);

      if (curUser) {
        try {
          const res = await axiosPublic.post('/jwt', { email: curUser.email });
          if (res?.data?.token) {
            localStorage.setItem('access-token', res.data.token);
          }
        } catch {
          toast.warning(
            'Could not verify your session with the server. Some features may be limited.',
            { toastId: 'jwt-warn', autoClose: 6000 },
          );
        }
      } else {
        localStorage.removeItem('access-token');
      }

      // Always resolve loading regardless of success or error above
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
