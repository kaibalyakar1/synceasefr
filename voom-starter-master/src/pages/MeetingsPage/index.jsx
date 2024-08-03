import React, { useEffect, useState } from "react";
import "./MeetingPage.css";
import DashboardWrapper from "../../components/DashboardWrapper";
import axios from "axios";
import { useSelector } from "react-redux";
import MeetingCard from "../../components/MeetingCard";
import MeetingForm from "../../components/MeetingForm";
import Skeleton from "react-loading-skeleton";
import NoMeeting from "../../components/NoMeetingPlaceHolder";

const MeetingPage = () => {
  const [meetings, setMeetings] = useState([]);
  const [loader, setLoader] = useState(false);
  const [viewEditForm, setViewEditForm] = useState(false);
  const [preload, setPreload] = useState(null);
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

  const showEditButton = (meeting) => {
    const now = new Date();
    const meetingDateTime = new Date(`${meeting.date}T${meeting.time}`);

    // Return true if meeting is in the future or is currently happening
    return meetingDateTime > now;
  };

  return (
    <DashboardWrapper>
      {viewEditForm && (
        <div className="overlay form-overlay">
          <MeetingForm
            mode={"edit"}
            preload={preload}
            onClose={() => setViewEditForm(false)}
            onUploadComplete={() => {
              setViewEditForm(false);
              setPreload(null);
              getMeetings();
            }}
          />
        </div>
      )}
      <div className="meetings-page">
        {meetings.length > 0 ? (
          meetings.map((meeting, index) => (
            <MeetingCard
              key={index}
              {...meeting}
              onEditClick={(meetingData) => {
                // console.log("Editing meetingData:", meetingData); // Debugging line
                setPreload({
                  _id: meetingData._id, // Ensure this is included if needed for updating
                  title: meetingData.title,
                  date: new Date(meetingData.date),
                  time: new Date(meetingData.time),
                });
                setViewEditForm(true);
              }}
              showEditButton={true}
            />
          ))
        ) : loader && !meetings.length ? (
          <Skeleton
            height={100}
            borderRadius={10}
            count={5}
            style={{ marginBottom: 10 }}
          />
        ) : (
          <div>
            <NoMeeting />
          </div>
        )}
      </div>
    </DashboardWrapper>
  );
};

export default MeetingPage;
