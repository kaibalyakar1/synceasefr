import React from "react";
import "./CurrentTimeCard.css";
import { useSelector } from "react-redux";
import useTime from "../../../hooks/useTime.jsx";
const CurrentTimeCard = () => {
  const { displayName } = useSelector((state) => state.auth.userInfo) || {};
  const { time, date } = useTime();
  return (
    <div className="current-time-card">
      <h1>
        Hi,{" "}
        <span className="g-text">
          {displayName ? displayName.split(" ")[0] : ""}
        </span>
        <div className="card">
          <div className="time">{time}</div>
          <p>{date}</p>
        </div>
      </h1>
    </div>
  );
};

export default CurrentTimeCard;
