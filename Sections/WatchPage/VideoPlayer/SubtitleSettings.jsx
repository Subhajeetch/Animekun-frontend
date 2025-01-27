"use client";

import React, { useState, useEffect } from "react";
import { CircleArrowLeft, Check, CircleArrowRight } from "lucide-react";

// Helper Functions for Local Storage
const saveSubtitleSettings = settings => {
  localStorage.setItem("subtitleSettings", JSON.stringify(settings));
};

const loadSubtitleSettings = () => {
  const settings = localStorage.getItem("subtitleSettings");
  return settings ? JSON.parse(settings) : {};
};

const SubtitleSettings = ({
  setShowControls,
  setManualShow,
  handleSubtitleSettingsChange
}) => {
  // State for Subtitle Settings
  const [subtitleSettings, setSubtitleSettings] = useState(() =>
    loadSubtitleSettings()
  );
  const [currentSelection, setCurrentSelection] = useState(null); // To track which option is selected

  // Options
  const textSizes = [
    "8px",
    "10px",
    "12px",
    "16px",
    "20px",
    "24px",
    "30px",
    "35px",
    "40px",
    "44px",
    "48px"
  ];
  const textOpacities = ["30%", "50%", "70%", "90%", "100%"];
  const textColors = [
    "Red",
    "White",
    "Yellow",
    "Green",
    "Orange",
    "Pink",
    "Black"
  ];
  const bgColors = [
    "Red",
    "White",
    "Yellow",
    "Green",
    "Orange",
    "Pink",
    "Black"
  ];
  const bgOpacities = ["10%", "30%", "50%", "60%", "75%", "90%", "100%"];
  const positions = [
    "10%",
    "20%",
    "30%",
    "40%",
    "50%",
    "60%",
    "70%",
    "80%",
    "90%",
    "100%"
  ];

  // Function to convert color and opacity to RGBA
  const toRgba = (color, opacity) => {
    const colorMap = {
      red: "255, 0, 0",
      white: "255, 255, 255",
      yellow: "255, 255, 0",
      green: "0, 255, 0",
      orange: "255, 165, 0",
      pink: "255, 192, 203",
      black: "0, 0, 0"
    };
    const rgbaValue = `rgba(${
      colorMap[color.toLowerCase()] || "255, 255, 255"
    }, ${parseFloat(opacity) / 100})`;
    return rgbaValue;
  };

  // Update Settings Function
  const updateSubtitleSetting = (key, value) => {
    let updatedSettings = { ...subtitleSettings, [key]: value };

    // Handle RGBA conversion for textColor and bgColor
    if (key === "textOpacity" && subtitleSettings.textColor) {
      updatedSettings.textColorRgba = toRgba(
        subtitleSettings.textColor,
        value.replace("%", "")
      );
    }

    if (key === "bgOpacity" && subtitleSettings.bgColor) {
      updatedSettings.bgColorRgba = toRgba(
        subtitleSettings.bgColor,
        value.replace("%", "")
      );
    }

    if (key === "positions") {
      updatedSettings.positions = value.replace("%", "px");
    }

    setSubtitleSettings(updatedSettings);
    saveSubtitleSettings(updatedSettings);

    // Notify parent component
    if (handleSubtitleSettingsChange)
      handleSubtitleSettingsChange(updatedSettings);

    // Return to main menu
    setCurrentSelection(null);
  };

  // Load Settings on Component Mount
  useEffect(() => {
    const savedSettings = loadSubtitleSettings();
    setSubtitleSettings(savedSettings);
    if (handleSubtitleSettingsChange)
      handleSubtitleSettingsChange(savedSettings);
  }, []);

  // Render Main Menu or Specific Options
  const renderContent = () => {
    if (currentSelection === null) {
      // Main Menu
      return (
        <div
          className="flex flex-col mb-2 w-[190px] pr-2 mx-2 max-h-[116px]
        overflow-auto md:max-h-[156px]"
        >
          <div
            onClick={() => {
              setCurrentSelection("textSize");
              setShowControls(true);
              setManualShow(true);
            }}
            className="hover:bg-backgroundHover transition-all
             px-3 py-1 rounded-lg cursor-pointer flex text-foreground
             text-[10px]"
          >
            Text Size: {subtitleSettings.textSize || "Default"}
          </div>
          <div
            onClick={() => {
              setCurrentSelection("textOpacity");
              setShowControls(true);
              setManualShow(true);
            }}
            className="text-foreground hover:bg-backgroundHover transition-all
            text-[10px] px-3 py-1 rounded-lg cursor-pointer"
          >
            Text Opacity: {subtitleSettings.textOpacity || "Default"}
          </div>
          <div
            onClick={() => {
              setCurrentSelection("textColor");
              setShowControls(true);
              setManualShow(true);
            }}
            className="text-foreground hover:bg-backgroundHover transition-all
            text-[10px] px-3 py-1 rounded-lg cursor-pointer"
          >
            Text Color: {subtitleSettings.textColor || "Default"}
          </div>
          <div
            onClick={() => {
              setCurrentSelection("bgColor");
              setShowControls(true);
              setManualShow(true);
            }}
            className="text-foreground hover:bg-backgroundHover transition-all
            text-[10px] px-3 py-1 rounded-lg cursor-pointer"
          >
            Background Color: {subtitleSettings.bgColor || "Default"}
          </div>
          <div
            onClick={() => {
              setCurrentSelection("bgOpacity");
              setShowControls(true);
              setManualShow(true);
            }}
            className="text-foreground hover:bg-backgroundHover transition-all
            text-[10px] px-3 py-1 rounded-lg cursor-pointer"
          >
            Background Opacity: {subtitleSettings.bgOpacity || "Default"}
          </div>
          <div
            onClick={() => {
              setCurrentSelection("position");
              setShowControls(true);
              setManualShow(true);
            }}
            className="text-foreground hover:bg-backgroundHover transition-all
            text-[10px] px-3 py-1 rounded-lg cursor-pointer"
          >
            Position: {subtitleSettings.position || "Default"}
          </div>
        </div>
      );
    } else {
      // Options View
      const options =
        currentSelection === "textSize"
          ? textSizes
          : currentSelection === "textOpacity"
          ? textOpacities
          : currentSelection === "textColor"
          ? textColors
          : currentSelection === "bgColor"
          ? bgColors
          : currentSelection === "bgOpacity"
          ? bgOpacities
          : positions;

      return (
        <div className="flex flex-col w-[184px] mx-2 bg-backgroundtwo">
          <div
            onClick={() => {
              setCurrentSelection(null);
              setShowControls(true);
              setManualShow(true);
            }}
            className="text-white cursor-pointer px-3 py-1 bg-background transition-all mb-2 text-[10px] flex gap-1"
          >
            <CircleArrowLeft size={13} /> Back
          </div>
          <div className="max-h-[86px] md:max-h-[125px] overflow-auto">
            {options.map(option => (
              <div
                key={option}
                onClick={() => {
                  updateSubtitleSetting(currentSelection, option);
                  setShowControls(true);
                  setManualShow(true);
                }}
                className={`flex items-center justify-between text-white px-3
                py-1
      hover:bg-backgroundHover transition-all text-[8px] rounded-lg cursor-pointer ${
        subtitleSettings[currentSelection] === option && "bg-backgroundHover"
      }`}
              >
                <span>{option}</span>
                {subtitleSettings[currentSelection] === option && (
                  <Check size={13} />
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  return <div className="subtitle-settings">{renderContent()}</div>;
};

export default SubtitleSettings;
