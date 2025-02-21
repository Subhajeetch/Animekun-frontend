"use client";
import { HandHeart, X } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

const DonationBanner = ({ hmm }) => {
  const STORAGE_KEY = "donation_banner_dismissed";
  const HOURS_TO_HIDE = 12;

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const lastDismissed = localStorage.getItem(STORAGE_KEY);
    if (lastDismissed) {
      const elapsedTime =
        (Date.now() - parseInt(lastDismissed)) / (1000 * 60 * 60);
      if (elapsedTime >= HOURS_TO_HIDE) {
        setIsVisible(true);
      }
    } else {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    setIsVisible(false);
  };

  if (!isVisible) return null;

  //console.log(hmm);

  return (
    <div
      className={`w-full max-w-2xl bg-background p-3 flex justify-between items-center
    rounded-xl gap-3 border border-[#ffffff73] ${hmm ? "mt-[30px]" : "mb-3"}`}
    >
      <p className="text-[#acacac] text-[12px] md:text-[16px]">
        We don’t earn by any means. If you like our work & want to help us
        improve and grow, you can support us.
      </p>
      <div className="flex items-center gap-3">
        <Link href="https://buymeacoffee.com/animekun">
          <button
            className="bg-foreground text-background px-3 py-2 rounded-xl
        hover:bg-[#dfdfdf] flex gap-1 font-[600] text-[14px] items-center
        md:text-[16px]"
          >
            <HandHeart className="h-[20px]" />
            <span>Donate</span>
          </button>
        </Link>
        <button
          onClick={handleClose}
          className="text-gray-600 cursor-pointer hover:text-foreground text-xl"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default DonationBanner;
