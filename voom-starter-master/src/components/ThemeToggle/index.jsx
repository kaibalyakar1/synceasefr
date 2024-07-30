import React, { useEffect, useState } from "react";
import "./ThemeToggle.css";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { useMediaQuery } from "react-responsive";
import { setTheme } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
const index = () => {
  const dispatch = useDispatch();
  const themeStorageKey = "theme";
  const [isDark, setIsDark] = useState(
    JSON.parse(localStorage.getItem(themeStorageKey))
  );
  useMediaQuery(
    {
      query: "(prefers-color-scheme: dark)",
    },
    undefined,
    (preferDark) => {
      setIsDark(preferDark);
    }
  );
  useEffect(() => {
    if (isDark) {
      document.firstElementChild.setAttribute("data-theme", "dark");
      localStorage.setItem(themeStorageKey, true);
      dispatch(setTheme("dark"));
      return;
    } else {
      document.firstElementChild.setAttribute("data-theme", "light");
      localStorage.setItem(themeStorageKey, false);
      dispatch(setTheme("light"));
    }
  }, [isDark]);
  return (
    <Toggle
      checked={isDark}
      onChange={(event) => setIsDark(event.target.checked)}
      icons={false}
      className="theme-toggle"
    />
  );
};

export default index;
