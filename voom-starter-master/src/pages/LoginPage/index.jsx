import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/index.jsx";
import useTime from "../../hooks/useTime.jsx";
import user1 from "../../assets/user-1.jpeg";
import user2 from "../../assets/user-2.jpeg";
import user3 from "../../assets/user-3.jpeg";
import user4 from "../../assets/user-4.jpeg";
import user5 from "../../assets/user-5.jpeg";
import { FcGoogle } from "react-icons/fc";
import NavigationButton from "../../components/NavigationButtons/index.jsx";
import "./LoginPage.css";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseAuth } from "../../config/firebase-config.jsx";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/authSlice.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const index = () => {
  const { time, date } = useTime();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (activeUser) => {
      if (activeUser) navigate("/");
    });
  });

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { uid, displayName, email, photoURL, accessToken },
    } = await signInWithPopup(firebaseAuth, provider);
    if (accessToken) {
      dispatch(setUser({ uid, displayName, email, photoURL, accessToken }));
      await axios
        .post(process.env.REACT_APP_API_BASE_URL + "login", null, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          const { status } = res.data;
          if (status === "success") return navigate("/");

          toast.error(message, {
            position: "top-right",
          });
        })
        .catch((err) => console.log(err));
      navigate("/");
    }
  };
  // console.log("check", process.env.REACT_APP_API_BASE_URL);
  return (
    <>
      <div className="login-page">
        <Navbar />
        <div className="flex login-form">
          <div className="column">
            <NavigationButton />
          </div>
          <div className="column flex-center login-form-details">
            <div className="top">
              <h1 className="time g-text">{time}</h1>
              <p className="muted">{date}</p>
            </div>
            <div className="middle">
              <h2>Collaborate with teams</h2>
              <div className="flex users-container">
                <div className="profile">
                  <img src={user1} alt="" />
                </div>
                <div className="profile">
                  <img src={user2} alt="" />
                </div>
                <div className="profile">
                  <img src={user3} alt="" />
                </div>

                <div className="profile">
                  <img src={user4} alt="" />
                </div>
                <div className="profile">
                  <img src={user5} alt="" />
                </div>
              </div>
            </div>
            <div className="bottom">
              <button
                className="flex-center btn primary"
                onClick={loginWithGoogle}
              >
                <FcGoogle /> Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
