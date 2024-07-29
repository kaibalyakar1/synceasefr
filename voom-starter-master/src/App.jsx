import HomePage from "./pages/HomePage/index.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import "./index.css";
import LoginPage from "./pages/LoginPage/index.jsx";
import AppWrapper from "./config/AppWrapper.jsx";
export default function App() {
  return (
    <BrowserRouter>
      <AppWrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </AppWrapper>
    </BrowserRouter>
  );
}
