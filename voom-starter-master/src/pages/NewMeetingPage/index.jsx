import React from "react";
import "./NewMeetingPage.css";
import DashboardWrapper from "../../components/DashboardWrapper";
import MeetingForm from "../../components/MeetingForm/index.jsx";
const NewMeetingPage = () => {
  return (
    <DashboardWrapper>
      <div className="new-meeting-page">
        <MeetingForm />
      </div>
    </DashboardWrapper>
  );
};

export default NewMeetingPage;
