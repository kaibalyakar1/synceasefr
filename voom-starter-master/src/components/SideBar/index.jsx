import React from "react";
import { BiLogoDiscourse } from "react-icons/bi";
import "./SideBar.css";
import { sidebar } from "../../data.jsx";
import { Link, useLocation } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const SideBar = ({ show, onClose }) => {
  const { pathname } = useLocation();

  return (
    <>
      {show && <div className="overlay sidebar-overlay" onClick={onClose} />}
      <aside className={`flex sidebar ${show ? "show" : ""}`}>
        <div className="flex sidebar-wrapper">
          <div className="flex-center top">
            <div className="flex-center logo">
              <div className="flex-center primary">
                <BiLogoDiscourse />
                <span className="g-text">SyncEase</span>
              </div>
              <div
                className="flex-center icon-wrapper cancel-btn"
                onClick={onClose}
              >
                <FaTimes />
              </div>
            </div>
          </div>
          <div className="middle">
            {sidebar.map((i, index) => (
              <Link
                to={i.route}
                key={index}
                className={`flex-center tab ${
                  i.activeRoutes.includes(pathname) ? "active" : ""
                }`}
              >
                {i.name} {i.icon}
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
