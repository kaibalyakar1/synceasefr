import React, { useEffect, useState } from "react";
import moment from "moment";

const useTime = () => {
  const [time, setTime] = useState(moment().format("LT"));
  const [date, setDate] = useState(moment().format("dddd MMM  DD, YYYY"));
  useEffect(() => {
    setInterval(() => {
      setTime(moment().format("LT"));
      setDate(moment().format("dddd MMM  DD, YYYY"));
    }, 1000);
  });
  return { time, date };
};

export default useTime;
