import React, { useState } from "react";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { useNavigate } from "react-router";

function Header({ toggleTheme }) {
  const [themeMode, setThemeMode] = useState(false);
  const navigate = useNavigate();

  const changeMode = () => {
    setThemeMode(!themeMode);
  };
  return (
    <div className="relative z-10 flex justify-between items-center bg-white dark:bg-dark-blue  py-6 px-4 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.1)] md:text-lg md:px-8 md:py-8 lg:text-xl lg:px-16">
      <h1
        onClick={() => {
          navigate("/");
        }}
        className="font-bold select-none cursor-pointer dark:text-very-light-gray"
      >
        Where in the world?
      </h1>
      {themeMode ? (
        <div
          onClick={() => {
            toggleTheme();
            changeMode();
          }}
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <IoSunnyOutline className="dark:text-white" />
          <span className="font-medium dark:text-very-light-gray">
            Light Mode
          </span>
        </div>
      ) : (
        <div
          onClick={() => {
            toggleTheme();
            changeMode();
          }}
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <IoMoonOutline className="dark:text-white" />
          <span className="font-medium dark:text-very-light-gray">
            Dark Mode
          </span>
        </div>
      )}
    </div>
  );
}

export default Header;
