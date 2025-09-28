import React from "react";

const ToggleButton = ({isToggled, setIsToggled, setShowTextBox, setImgFile, setText}) => {

  const toggle = () => {
    setIsToggled((prev) => !prev);
    setShowTextBox(false);
    setImgFile(null);
    setText(null);
  };

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={toggle}
        className={`relative w-40 h-16 rounded-lg transition-colors duration-300 bg-gray-600`}
      >
        <span
          className={`absolute top-[5px] left-[6px] w-[75px] h-[54px] bg-lime-400 rounded shad-lgow-md transform transition-transform duration-300 ${
            isToggled ? "translate-x-[73px]" : ""
          }`}
        ></span>
        <p className="absolute top-4 left-5 text-lg font-medium"><span className={`mr-5 ${!isToggled ? "text-gray-800 font-semibold": "font-medium"}`}>Menu</span> <span className={`${isToggled ? "text-gray-800 font-semibold": "font-medium"}`}>Recipe</span></p>
      </button>
    </div>
  );
};

export default ToggleButton;
