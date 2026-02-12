import {
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { createContext, useEffect, useState, useContext } from "react";
import axios from "../api/axiosSecure";
import { auth } from "../firebase/firebase.config";

export const AuthContext = createContext();

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getServerToken = async (firebaseUser) => {
    const idToken = await firebaseUser.getIdToken();

    const res = await axios.post(
      "/api/auth/firebase",
      {},
      {
        headers: { Authorization: `Bearer ${idToken}` },
      }
    );

    localStorage.setItem("access-token", res.data.token);
    setDbUser(res.data.user);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await getServerToken(currentUser);
      } else {
        setUser(null);
        setDbUser(null);
        localStorage.removeItem("access-token");
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const signup = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

  const googleLogin = () => signInWithPopup(auth, provider);

  const logout = () => {
    localStorage.removeItem("access-token");
    return signOut(auth);
  };

  const authInfo = {
    user,
    dbUser,
    role: dbUser?.role,
    loading,
    login,
    signup,
    googleLogin,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
