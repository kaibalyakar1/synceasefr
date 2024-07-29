import React from "react";
import useAuth from "../hooks/useAuth.jsx";

const AppWrapper = ({ children }) => {
  useAuth();
  return <>{children}</>;
};

export default AppWrapper;
