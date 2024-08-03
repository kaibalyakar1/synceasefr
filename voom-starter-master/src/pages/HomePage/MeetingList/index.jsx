import React, { useEffect, useState } from "react";
import "./MeetingList.css";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import MeetingCard from "../../../components/MeetingCard";
import { useSelector } from "react-redux";
import axios from "axios";
import NoMeeting from "../../../components/NoMeetingPlaceHolder";
const MeetingList = () => {
  const [meetings, setMeetings] = useState([]);
  const [loader, setLoader] = useState(false);

  const { accessToken } = useSelector((state) => state.auth.userInfo) || {};

  const getMeetings = async () => {
    setLoader(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}my-meetings`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // console.log("API Response:", response.data);

      const { status, data } = response.data;

      if (status === "success" && Array.isArray(data)) {
        setMeetings(data);
      } else {
        console.error(
          "Unexpected response status or structure:",
          response.data
        );
      }
    } catch (error) {
      console.error("Error fetching meetings:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      getMeetings();
    }
  }, [accessToken]);
  return (
    <div className="meetings-list">
      <h2 className="main-title"></h2>
      {loader ? (
        <Skeleton
          count={5}
          height={100}
          borderRadius={10}
          style={{ marginBottom: 10 }}
        />
      ) : (
        ""
      )}

      {meetings &&
        meetings.map((meeting, index) =>
          index < 3 ? <MeetingCard {...meeting} key={index} /> : ""
        )}

      {meetings && meetings.length > 3 ? (
        <Link to={"/meetings"} className="btn primary">
          View All
        </Link>
      ) : (
        ""
      )}
      {meetings && meetings.length === 0 ? <NoMeeting /> : ""}
    </div>
  );
};

export default MeetingList;
