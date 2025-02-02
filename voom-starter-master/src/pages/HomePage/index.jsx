import React from "react";
import "./HomePage.css";
import DashboardWrapper from "../../components/DashboardWrapper";
import CurrentTimeCard from "./CurrentTimeCard/index.jsx";
import NavigationButtons from "../../components/NavigationButtons/index.jsx";
import MeetingList from "./MeetingList/index.jsx";
const index = () => {
  return (
    <DashboardWrapper>
      <div className="homepage">
        <div className="column left">
          <CurrentTimeCard />
          <NavigationButtons />
        </div>
        <div className="column right"></div>
        <MeetingList />
      </div>
    </DashboardWrapper>
  );
};

export default index;
