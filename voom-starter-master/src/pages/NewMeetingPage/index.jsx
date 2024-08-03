import React from "react";
import "./NewMeetingPage.css";
import DashboardWrapper from "../../components/DashboardWrapper";
import MeetingForm from "../../components/MeetingForm/index.jsx";
import { useNavigate } from "react-router-dom";
const NewMeetingPage = () => {
  const navigate = useNavigate();
  return (
    <DashboardWrapper>
      <div className="new-meeting-page">
        <MeetingForm
          onClose={() => navigate(-1)}
          onUploadComplete={() => navigate(-1)}
        />
      </div>
    </DashboardWrapper>
  );
};

export default NewMeetingPage;
