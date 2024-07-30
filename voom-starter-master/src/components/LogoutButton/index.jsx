import React from "react";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/authSlice.jsx";
const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logMeOut = async () => {
    await signOut(firebaseAuth);
    navigate("/login");
    dispatch(setUser(null));
  };
  return (
    <button
      className="
  btn"
      onClick={logMeOut}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
