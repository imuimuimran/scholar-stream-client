import {
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState, useContext } from "react";
// import axios from "../api/axiosSecure";
import axios from "axios";
import { auth } from "../firebase/firebase.config";

export const AuthContext = createContext();

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getServerToken = async (firebaseUser) => {
    // const idToken = await firebaseUser.getIdToken();
    const idToken = await firebaseUser.getIdToken(true);

    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/auth/firebase`,
      {},
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    localStorage.setItem("access-token", res.data.token);
    setDbUser(res.data.user);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          setUser(currentUser);
          await getServerToken(currentUser);
        } else {
          setUser(null);
          setDbUser(null);
          localStorage.removeItem("access-token");
        }
      } catch (err) {
        console.error("Auth error:", err.message);

        // 🔥 FIX: prevent infinite loading
        setUser(null);
        setDbUser(null);
        localStorage.removeItem("access-token");
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const signup = async (email, password, name, photoURL) => {
    const result = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(result.user, {
      displayName: name,
      photoURL: photoURL,
    });

    // refresh firebase user
    await result.user.reload();

    return result;
  };

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
