import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../config/firebase-config";
import { setUser } from "../redux/authSlice.jsx"; // Import the setUser action

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (activeUser) => {
      if (!activeUser) {
        navigate("/login");
      } else {
        const { uid, displayName, email, photoURL, accessToken } = activeUser;
        dispatch(setUser({ uid, displayName, email, photoURL, accessToken }));
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  // No need to return a JSX element
};

export default useAuth;
