import React from "react";
import "./NoMeetingPlaceHolder.css";
import { Link } from "react-router-dom";
const NoMeeting = () => {
  return (
    <div className="no-meeting-placeholder">
      <p>You don't have any meetings found</p>
      <Link to={"/new-meeting"} className="btn primary">
        Create New Meeting
      </Link>
    </div>
  );
};

export default NoMeeting;
