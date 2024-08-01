import React, { useState } from "react";
import "./Meetingform.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const MeetingForm = ({ mode, onClose }) => {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({
    title: "",
    date: "",
    time: "",
  });
  const submitMeeting = async () => {};
  return (
    <div className="create-meeting-form">
      <div className="top">
        <h1 className="title">
          {mode === "edit" ? "Edit Meeting" : "Create New Meeting"}
        </h1>
      </div>
      <div className="middle">
        <div className="control-container">
          <label htmlFor="title">Meeting Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter meeting title"
            className="control"
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
        </div>
        <div className="flex row">
          <div className="control-container">
            <label htmlFor="">Date</label>
            <DatePicker
              selected={data.date}
              minDate={new Date()}
              onChange={(date) => setData({ ...data, date: date })}
              placeholderText="Select date"
              wrapperClassName="control"
            />
          </div>
          <div className="control-container">
            <label htmlFor="">Time</label>
            <DatePicker
              selected={data.time}
              onChange={(timeValue) => setData({ ...data, time: timeValue })}
              placeholderText="Select time"
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              wrapperClassName="control"
              date={"h:mm aa"}
            />
          </div>
        </div>
      </div>
      <div className="flex-center bottom">
        <button className="btn" onClick={onClose}>
          Cancel
        </button>
        <button className="btn primary" onClick={submitMeeting}>
          {loader
            ? "pleaseWait"
            : mode === "edit"
            ? "Edit Meeting"
            : "Create meeting"}
        </button>
      </div>
    </div>
  );
};

export default MeetingForm;
