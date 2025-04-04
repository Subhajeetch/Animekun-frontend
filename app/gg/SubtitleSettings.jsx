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
                <div className='flex flex-col w-full overflow-y-auto h-full'>
                    <div
                        onClick={() => {
                            setCurrentSelection("textSize");
                            setShowControls(true);
                            setManualShow(true);
                        }}
                        className='hover:bg-backgroundHover transition-all
             px-2 py-1 rounded-lg cursor-pointer flex justify-between text-foreground
             text-[13px] font-semibold mx-1'
                    >
                        <span>Text Size:</span>{" "}
                        <span>{subtitleSettings.textSize || "16px"}</span>
                    </div>
                    <div
                        onClick={() => {
                            setCurrentSelection("textOpacity");
                            setShowControls(true);
                            setManualShow(true);
                        }}
                        className='text-foreground hover:bg-backgroundHover transition-all
            text-[13px] font-semibold px-2 py-1 rounded-lg cursor-pointer flex justify-between mx-1'
                    >
                        <span> Text Opacity:</span>{" "}
                        <span> {subtitleSettings.textOpacity || "100%"}</span>
                    </div>
                    <div
                        onClick={() => {
                            setCurrentSelection("textColor");
                            setShowControls(true);
                            setManualShow(true);
                        }}
                        className='text-foreground hover:bg-backgroundHover transition-all
            text-[13px] font-semibold px-2 py-1 rounded-lg cursor-pointer mx-1 flex justify-between'
                    >
                        <span>Text Color:</span>{" "}
                        <span>{subtitleSettings.textColor || "White"}</span>
                    </div>
                    <div
                        onClick={() => {
                            setCurrentSelection("bgColor");
                            setShowControls(true);
                            setManualShow(true);
                        }}
                        className='text-foreground hover:bg-backgroundHover transition-all
            text-[13px] font-semibold px-2 py-1 rounded-lg cursor-pointer flex justify-between mx-1'
                    >
                        <span> Background Color:</span>{" "}
                        <span>{subtitleSettings.bgColor || "Black"}</span>
                    </div>
                    <div
                        onClick={() => {
                            setCurrentSelection("bgOpacity");
                            setShowControls(true);
                            setManualShow(true);
                        }}
                        className='text-foreground hover:bg-backgroundHover transition-all
            text-[13px] font-semibold px-2 py-1 mx-1 rounded-lg cursor-pointer flex justify-between'
                    >
                        <span> Background Opacity: </span>{" "}
                        <span>{subtitleSettings.bgOpacity || "10%"}</span>
                    </div>
                    <div
                        onClick={() => {
                            setCurrentSelection("position");
                            setShowControls(true);
                            setManualShow(true);
                        }}
                        className='text-foreground hover:bg-backgroundHover transition-all
            text-[13px] font-semibold px-2 py-1 mx-1 rounded-lg cursor-pointer flex justify-between'
                    >
                        <span>Bottom Position: </span>{" "}
                        <span>{subtitleSettings.position || "20%"}</span>
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
                <div className='flex flex-col w-full bg-backgroundtwo h-full'>
                    <div
                        onClick={() => {
                            setCurrentSelection(null);
                            setShowControls(true);
                            setManualShow(true);
                        }}
                        className='text-white cursor-pointer px-3 py-1 bg-background transition-all mb-2 text-[13px] font-semibold flex items-center gap-1'
                    >
                        <CircleArrowLeft size={15} /> <span>Back</span>
                    </div>
                    <div className='h-full overflow-y-auto'>
                        {options.map(option => (
                            <div
                                key={option}
                                onClick={() => {
                                    updateSubtitleSetting(
                                        currentSelection,
                                        option
                                    );
                                    setShowControls(true);
                                    setManualShow(true);
                                }}
                                className={`flex items-center justify-between text-white px-2 mx-2
                py-1
      hover:bg-backgroundHover transition-all text-[13px] rounded-lg cursor-pointer ${
          subtitleSettings[currentSelection] === option && "bg-backgroundHover"
      }`}
                            >
                                <span>{option}</span>
                                {subtitleSettings[currentSelection] ===
                                    option && <Check size={16} />}
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
    };

    return <div className='subtitle-settings h-full'>{renderContent()}</div>;
};

export default SubtitleSettings;
