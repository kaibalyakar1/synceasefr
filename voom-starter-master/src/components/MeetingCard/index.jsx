import React from "react";
import "./MeetingCard.css";
import moment from "moment";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import user1 from "../../assets/user-1.jpeg";
import user2 from "../../assets/user-2.jpeg";
import user3 from "../../assets/user-3.jpeg";
import user4 from "../../assets/user-4.jpeg";
import user5 from "../../assets/user-5.jpeg";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const MeetingCard = ({
  _id,
  title,
  date,
  time,
  meetingId,
  onEditClick,
  showEditButton,
}) => {
  const meetingDate = moment(date).format("dddd MMM DD, YYYY");
  const meetingLink = window.location.origin + "/join/" + meetingId;
  const today = moment().format("YYYY-MM-DD");
  const meetingDateTime = moment(date).set({
    hour: moment(time).hour(),
    minute: moment(time).minute(),
    second: 0,
    millisecond: 0,
  });
  const now = moment();
  return (
    <div className="meeting-card">
      <div className="top">
        <div>
          <h3 className="title">{title}</h3>
          <p className="muted">{moment(date).format("DD MMM YYYY")}</p>
          <h4 className="title">{moment(time).format("h:mm a")}</h4>
        </div>
        <div className="flex-center buttons-wrapper">
          <button
            className="flex-center icon-wrapper"
            onClick={() => {
              navigator.clipboard.writeText(`
              ${title}
              ${"Date: " + moment(date).format("dddd MMM DD, YYYY")}
              ${"Time: " + moment(time).format("h:mm a")}
              ${"Link: " + meetingLink}
              `);

              toast.success("Copied to clipboard", {
                position: "top-right",
              });
            }}
          >
            <HiOutlineClipboardCopy />
          </button>
          {showEditButton && (
            <button
              className="flex-center icon-wrapper"
              onClick={() =>
                onEditClick({
                  _id, // Add _id
                  title, // Add title
                  date: new Date(date),
                  time: new Date(time),
                })
              }
            >
              <FiEdit />
            </button>
          )}
        </div>
      </div>
      <div className="bottom">
        <div className="users-container">
          <div className="profile">
            <img src={user1} alt="" />
          </div>
          <div className="profile">
            <img src={user2} alt="" />
          </div>
          <div className="profile">
            <img src={user3} alt="" />
          </div>
          <div className="profile">
            <img src={user4} alt="" />
          </div>
          <div className="profile">
            <img src={user5} alt="" />
          </div>
        </div>
        <div className="action-button">
          {meetingDateTime.isAfter(now) ? (
            <Link to={meetingLink} className="btn primary" target="_blank">
              Join
            </Link>
          ) : meetingDateTime.isBefore(now) ? (
            <Link to={""} className="btn">
              Ended
            </Link>
          ) : (
            <Link to={""} className="btn">
              Upcoming
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetingCard;
