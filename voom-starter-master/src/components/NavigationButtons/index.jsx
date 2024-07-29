import React from "react";
import "./NavigationButtons.css";
import { navButtonsRoutes } from "../../data";
import { Link } from "react-router-dom";
const index = () => {
  return (
    <div className="navigation-buttons">
      {navButtonsRoutes.map((route, index) => (
        <Link
          key={index}
          to={route.route}
          className="card"
          target={route.target}
        >
          <div className="flex-center icon" style={{ background: route.color }}>
            {route.icon}
          </div>
          <p>{route.name}</p>
        </Link>
      ))}
    </div>
  );
};

export default index;
