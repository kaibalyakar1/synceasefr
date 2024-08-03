import React, { useEffect, useState } from "react";
import "./JointPage.css";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
const JointPage = () => {
  const params = useParams();
  //   console.log(params);
  const { uid, displayName, accessToken } =
    useSelector((state) => state.auth.userInfo) || {};
  const [enableMeeting, setEnableMeeting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const meetingValidation = async () => {
      if (params.id) {
        await axios
          .get(
            process.env.REACT_APP_API_BASE_URL +
              "get-single-meeting/" +
              params.id,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((res) => {
            const { status, message } = res.data;

            if (status === "success") {
              if (message) {
                const { date } = message;
                const meetingDate = moment(date).format("YYYY-MM-DD");
                if (meetingDate == moment().format("YYYY-MM-DD")) {
                  setEnableMeeting(true);
                } else if (
                  moment(meetingDate).isBefore(moment().format("YYYY-MM-DD"))
                ) {
                  toast.info(",Meeting date is passed", {
                    position: "top-right",
                  });
                  navigate("/");
                } else if (
                  moment(meetingDate).isAfter(moment().format("YYYY-MM-DD"))
                ) {
                  toast.info("The meeting is startinng on " + meetingDate, {
                    position: "top-right",
                  });
                  navigate("/");
                }
              }
              return setEnableMeeting(true);
            }
          })
          .catch((err) => console.log(err));
      }
      toast.error(res.data.message, {
        position: "top-right",
      });
    };
    if (accessToken) {
      meetingValidation();
    }
  }, [accessToken]);

  let myMeeting = async (element) => {
    // generate Kit Token

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      parseInt(process.env.REACT_APP_ZEGOCLOUD_APP_ID),
      process.env.REACT_APP_ZEGOCLOUD_SERVER_SECRET,
      params.id,
      uid ? uid : "",
      displayName ? displayName : ""
    );

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    if (zp) {
      zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: "Personal link",
            url: window.location.origin + "/join/" + params.id,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
        },
      });
    }
  };
  return enableMeeting ? (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  ) : (
    ""
  );
};

export default JointPage;
