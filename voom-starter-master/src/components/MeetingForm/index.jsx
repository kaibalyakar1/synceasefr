import React, { useEffect, useState } from "react";
import "./Meetingform.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const MeetingForm = ({ mode, onClose, onUploadComplete, preload }) => {
  const { accessToken } = useSelector((state) => state.auth.userInfo) || {};
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({
    title: "",
    date: null,
    time: null,
  });

  useEffect(() => {
    if (preload) {
      // console.log("Preload data in MeetingForm:", preload); // Debugging line
      setData({
        title: preload.title || "", // Default to empty string if title is undefined
        date: preload.date || null,
        time: preload.time || null,
      });
    }
  }, [preload]);

  const submitMeeting = async () => {
    let apiPath = `${process.env.REACT_APP_API_BASE_URL}create-meeting`;
    if (mode === "edit" && preload._id) {
      apiPath = `${process.env.REACT_APP_API_BASE_URL}edit-meeting/${preload._id}`;
    }
    if (accessToken) {
      setLoader(true);
      try {
        const response = await axios.post(apiPath, data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setLoader(false);
        const { status, message } = response.data;

        if (status === "success") {
          onUploadComplete();
        } else {
          toast.error(message, { position: "top-right" });
        }
      } catch (err) {
        setLoader(false);
        toast.error("An error occurred", { position: "top-right" });
      }
    }
  };

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
            value={data.title || ""} // Ensure it's always a string
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
        </div>
        <div className="flex row">
          <div className="control-container">
            <label htmlFor="date">Date</label>
            <DatePicker
              selected={data.date}
              minDate={new Date()}
              onChange={(date) => setData({ ...data, date })}
              placeholderText="Select date"
              wrapperClassName="control"
              dateFormat="yyyy-MM-dd"
            />
          </div>
          <div className="control-container">
            <label htmlFor="time">Time</label>
            <DatePicker
              selected={data.time}
              onChange={(time) => setData({ ...data, time })}
              placeholderText="Select time"
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              wrapperClassName="control"
              dateFormat="h:mm aa"
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
            ? "Please Wait"
            : mode === "edit"
            ? "Edit Meeting"
            : "Create Meeting"}
        </button>
      </div>
    </div>
  );
};

export default MeetingForm;
