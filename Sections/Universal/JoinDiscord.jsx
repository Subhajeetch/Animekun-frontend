"use client";
import { HandHeart, X } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

const JoinDiscordBanner = ({ hmm }) => {
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
                Help us to improve by joining our Discord Community & share your experience with us.
            </p>
            <div className="flex items-center gap-3">
                <Link href="https://discord.gg/nB8jW7rAZS" target="_blank">
                    <button
                        className="bg-foreground text-background px-3 py-2 rounded-xl
        hover:bg-[#dfdfdf] flex gap-1 font-[600] text-[14px] items-center
        md:text-[16px]"
                    >
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                            width="22px" height="22px" viewBox="0 0 512.000000 512.000000"
                            preserveAspectRatio="xMidYMid meet">

                            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                fill="#514cf5" stroke="none">
                                <path d="M1800 4134 c-194 -28 -399 -93 -584 -186 -118 -59 -292 -167 -324
-200 -12 -14 -51 -87 -86 -164 -280 -613 -440 -1272 -472 -1939 l-6 -141 61
-76 c219 -273 559 -446 969 -493 73 -9 137 -13 142 -10 24 15 251 308 244 315
-5 4 -34 15 -64 25 -88 28 -208 88 -309 155 -92 60 -245 201 -271 249 l-12 24
33 -20 c312 -190 643 -311 1038 -380 115 -19 194 -26 368 -30 361 -9 633 31
938 136 241 84 413 162 558 253 26 17 50 28 53 25 12 -12 -173 -189 -257 -247
-94 -64 -254 -145 -352 -178 -31 -10 -60 -21 -62 -24 -9 -8 237 -308 253 -308
38 1 263 32 317 44 193 45 371 122 530 230 95 65 241 203 289 274 l30 43 -13
202 c-33 530 -130 996 -313 1496 -63 174 -196 479 -226 521 -45 63 -346 234
-532 303 -124 46 -320 93 -444 107 l-99 12 -29 -30 -29 -29 108 -38 c213 -74
457 -187 602 -278 86 -54 232 -159 227 -164 -2 -2 -53 20 -112 50 -466 233
-1042 351 -1552 318 -528 -35 -914 -131 -1304 -324 -60 -30 -108 -51 -108 -47
0 8 126 99 219 159 155 99 424 222 651 296 63 21 117 40 119 42 2 1 -4 12 -14
23 -21 23 -40 24 -175 4z m200 -1443 c111 -43 202 -133 237 -236 23 -69 20
-210 -6 -295 -60 -194 -218 -311 -403 -298 -227 17 -399 252 -361 497 26 168
140 303 291 347 63 18 173 11 242 -15z m1390 4 c151 -52 262 -223 262 -403 0
-178 -89 -325 -242 -399 -48 -24 -67 -27 -150 -28 -82 0 -103 4 -153 27 -163
76 -266 279 -237 466 42 264 283 420 520 337z"/>
                            </g>
                        </svg>

                        <span className="flex gap-1">Join <span className="hidden md:block">Discord</span></span>
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

export default JoinDiscordBanner;



