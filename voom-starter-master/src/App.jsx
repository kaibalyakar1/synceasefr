import HomePage from "./pages/HomePage/index.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import "./index.css";
import LoginPage from "./pages/LoginPage/index.jsx";
import NewMeetingPage from "./pages/NewMeetingPage/index.jsx";
import MeetingPage from "./pages/MeetingsPage/index.jsx";
import AppWrapper from "./config/AppWrapper.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
import { useSelector } from "react-redux";
import ProfilePage from "./pages/ProfilePage/index.jsx";
import JointPage from "./pages/JointPage/index.jsx";
export default function App() {
  const theme = useSelector((state) => state.auth.theme);
  return (
    <SkeletonTheme
      baseColor={`${theme === "light" ? "#FFFFFF" : "#121316"}`}
      highlightColor={`${theme === "light" ? "#f5f5f5" : "#2b2b2b"}`}
    >
      <BrowserRouter>
        <AppWrapper>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/new-meeting" element={<NewMeetingPage />} />
            <Route path="/meetings" element={<MeetingPage />} />
            <Route path="*" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/join/:id" element={<JointPage />} />
          </Routes>
        </AppWrapper>
        <ToastContainer />
      </BrowserRouter>
    </SkeletonTheme>
  );
}
