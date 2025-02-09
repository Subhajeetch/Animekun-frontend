"use client";
import React, { useState } from "react";
import { Volume2 } from "lucide-react";

const ReadAloud = text => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const readAloud = () => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text.text);
      speech.lang = "en-US";
      speech.rate = 1;
      speech.pitch = 1;

      speech.onstart = () => setIsSpeaking(true);
      speech.onend = () => setIsSpeaking(false);

      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support text-to-speech.");
    }
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <button
      className={`p-2 rounded-md hover:bg-backgroundHover ${
        isSpeaking ? "bg-backgroundHover" : "bg-backgroundtwo"
      } `}
      onClick={isSpeaking ? stopSpeech : readAloud}
    >
      <span className="sr-only">Read Aloud The News</span>
      <Volume2 />
    </button>
  );
};

export default ReadAloud;
