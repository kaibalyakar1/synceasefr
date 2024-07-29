import React, { useState } from "react";
import SideBar from "../SideBar/index.jsx";
import Navbar from "../Navbar/index.jsx";
import "./DashboardWrapper.css";

const DashboardWrapper = ({ children }) => {
  const [showSideBar, setShowSideBar] = useState(false);

  return (
    <div>
      <SideBar
        show={showSideBar}
        onClose={() => setShowSideBar(!showSideBar)}
      />
      <main className="dashboard-content">
        <Navbar onMenuClick={() => setShowSideBar(!showSideBar)} />

        {children}
      </main>
    </div>
  );
};

export default DashboardWrapper;
