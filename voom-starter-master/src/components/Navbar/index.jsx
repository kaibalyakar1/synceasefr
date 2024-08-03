import React, { useState } from "react";
import "./Navbar.css";
import { LuSearch } from "react-icons/lu";
import profilePlaceholder from "../../assets/profile-placeholder.png";
import { TiThMenu } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "../LogoutButton/index.jsx";
import ThemeToggle from "../ThemeToggle/index.jsx";
const Navbar = ({ onMenuClick }) => {
  const [showProfileBar, setShowProfileBar] = useState(false);
  const { displayName, photoURL, email } =
    useSelector((state) => state.auth.userInfo) || {};

  return (
    <>
      <nav className="flex-center navbar">
        <div className="column">
          <div className="flex-center search-container">
            <div className="flex-center icon-wrapper">
              <LuSearch />
            </div>
            <input type="text" placeholder="Search for meetings" />
          </div>
        </div>
        <div className="flex-center column">
          <div
            className="profile"
            onClick={() => setShowProfileBar(!showProfileBar)}
          >
            {photoURL ? (
              <img src={photoURL} alt="profile" />
            ) : (
              <img src={profilePlaceholder} alt="profile" />
            )}
          </div>
          <div
            className="flex-center icon-wrapper menu-btn"
            onClick={onMenuClick}
          >
            <TiThMenu />
          </div>
        </div>
      </nav>
      {showProfileBar ? (
        <div
          className="overlay profile-bar-overlay"
          onClick={() => setShowProfileBar(!showProfileBar)}
        />
      ) : null}
      <div className={`nav-profile-bar ${showProfileBar ? "active" : ""}`}>
        <div className="flex-center user-container">
          <div className="profile">
            {photoURL ? (
              <img src={photoURL} />
            ) : (
              <img src={profilePlaceholder} />
            )}
            {/* console.log(photoURL); */}
          </div>
          <div className="details">
            <h4 className="name">{displayName}</h4>
            <p className="muted email">{email}</p>
          </div>
        </div>
        <div className="flex-center theme-row">
          <p className="muted">Dark Theme</p>
          <ThemeToggle />
        </div>
        <div className="flex-center buttons-wrapper">
          {!email ? (
            <>
              <Link to={"#"} className="btn">
                SignIn
              </Link>
              <Link to={"#"} className="btn primary">
                SignUp
              </Link>
            </>
          ) : (
            <LogoutButton />
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
