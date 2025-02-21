"use client"; // Add this at the top
import {
  XIcon,
  WhatsAppIcon,
  BlueSkyIcon
} from "@/Sections/Universal/icons.jsx";
import { toast } from "sonner";
import {
  Share,
  MessageCircle,
  Send,
  Twitter,
  MessageSquare,
  CheckCheck,
  Files
} from "lucide-react";
import { useState } from "react";

const ShareComponent = () => {
  const [isCopied, setIsCopied] = useState(false);
  const shareText = encodeURIComponent(
    "Watch your favourite anime for free without ads!! - Animekun\nhttps://animekun.top/home"
  );

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Share Animekun",
          text: "Watch your favourite anime for free without ads!! - Animekun",
          url: "https://animekun.top/home"
        });
      } catch (err) {
        console.log("Sharing cancelled");
      }
    } else {
      console.warn("Web Share API not supported, using fallback");
      fallbackCopy("https://animekun.top/home");

      toast.warning("Sharing not supported. Copied to clipboard!");
    }
  };

  const handleCopy = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText("https://animekun.top/home")
        .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        })
        .catch(err => console.error("Failed to copy: ", err));
    } else {
      console.warn("Clipboard API not supported, using fallback");
      fallbackCopy("https://animekun.top/home");
    }
  };

  const fallbackCopy = text => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const platforms = [
    {
      name: "WhatsApp",
      icon: <WhatsAppIcon size={18} />,
      color: "bg-green-500 hover:bg-green-600",
      url: `https://api.whatsapp.com/send?text=${shareText}`
    },
    {
      name: "Telegram",
      icon: <Send className="w-5 h-5" />,
      color: "bg-blue-500 hover:bg-blue-600",
      url: `https://t.me/share/url?url=${encodeURIComponent(
        "https://animekun.top/home"
      )}&text=${encodeURIComponent(
        "Watch your favourite anime for free without ads!! - Animekun"
      )}`
    },
    {
      name: "X",
      icon: <XIcon size={18} />,
      color: "bg-[#203d39] hover:bg-[#183b36]",
      url: `https://twitter.com/intent/tweet?text=${shareText}`
    },
    {
      name: "Bluesky",
      icon: <BlueSkyIcon size={18} />,
      color: "bg-blue-400 hover:bg-blue-500",
      url: `https://bsky.app/intent/compose?text=${shareText}`
    }
  ];

  return (
    <div className="flex flex-col gap-4 mt-10 bg-black py-2 w-full max-w-fit">
      <h3 className="text-lg font-semibold text-foreground">
        Share our website with your cool friends
      </h3>

      <div className="flex gap-3">
        {/* Native Share Button */}
        <button
          onClick={handleNativeShare}
          className="flex items-center justify-center p-2 px-2.5 text-white
          rounded-full bg-[#1d3028]"
        >
          <Share className="w-5 h-5" />
        </button>

        {/* Platform Buttons */}
        {platforms.map(platform => (
          <button
            key={platform.name}
            onClick={() =>
              platform.url
                ? window.open(platform.url, "_blank")
                : platform.action?.()
            }
            className={`flex items-center justify-center p-2 px-2.5
            ${platform.color} rounded-full`}
            title={`Share via ${platform.name}`}
          >
            {platform.icon}
          </button>
        ))}

        <button
          onClick={handleCopy}
          className="flex items-center justify-center p-2 px-2.5 text-white
          rounded-full bg-[#555555]"
        >
          {isCopied ? (
            <CheckCheck className="w-5 h-5" />
          ) : (
            <Files
              className="w-5
         h-5"
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default ShareComponent;
