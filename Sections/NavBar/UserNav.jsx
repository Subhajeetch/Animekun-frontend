import Link from "next/link";
import axios from "axios";
import {
    ChevronRight,
    CircleFadingPlus,
    MessagesSquare,
    UserRoundPen,
    Settings,
    LogOut
} from "lucide-react";
import "./some.css";

import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";
import useAuthStore from "@/AuthStore/userStore.js";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function UserNav() {
    const { user, logout } = useAuthStore();
    const [isLogoutLoading, setIsLogoutLoading] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        try {
            setIsLogoutLoading(true);
            logout();
            router.push("/home");
        } catch (e) {
            console.log(e.message);
        } finally {
            setIsLogoutLoading(false);
        }
    };

    const hmm = () => {
        alert(
            "This feature will be available soon. You can join our discord for updates!"
        );
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button className='rounded-full'>
                    <img
                        src={
                            user?.profilePicture ||
                            "https://i.imgur.com/Frqsihe.jpeg"
                        }
                        alt={`${user.userName}'s Profile`}
                        className='h-[36px] w-[36px] rounded-full outline-2 outline outline-foreground border-2 border-transparent'
                    />
                </button>
            </PopoverTrigger>
            <PopoverContent className='w-80 mr-2 bg-[#343434]'>
                <div className='flex gap-2 bg-backgroundtwo p-4 rounded-2xl justify-center items-center'>
                    <div>
                        <img
                            src={
                                user?.profilePicture ||
                                "https://i.imgur.com/Frqsihe.jpeg"
                            }
                            alt='Profile'
                            className='h-[58px] w-[58px] rounded-full'
                        />
                    </div>

                    <div
                        className='flex flex-col justify-center flex-1
                    '
                    >
                        <p className='font-bold text-[16px] leading-[0.9] line-clamp-1'>
                            {user.displayName}
                        </p>
                        <p className='font-[500] text-discriptionForeground text-[13px] line-clamp-1'>
                            {user.userName}
                        </p>
                    </div>

                    <Link
                        href='#'
                        className='h-8 w-8 rounded-lg bg-[#424242] flex justify-center items-center'
                    >
                        <ChevronRight size={26} />
                    </Link>
                </div>

                <div className='my-6 w-full rounded-full h-0.5 bg-[#666666]'></div>

                <div className='flex flex-col gap-2'>
                    <button className='w-full p-4 bg-backgroundtwo rounded-full text-left font-[500] flex gap-4 hover:bg-[#272727]'
                    onClick={hmm}
                    >
                        <CircleFadingPlus /> Create Post
                    </button>
                    <button
                        className='w-full p-4 bg-backgroundtwo rounded-full text-left font-[500] flex gap-4 hover:bg-[#272727]'
                        onClick={hmm}
                    >
                        <MessagesSquare /> Community
                    </button>
                    <Link
                        className='w-full p-4 bg-backgroundtwo rounded-full text-left font-[500] flex gap-4 hover:bg-[#272727]'
                        href={`/user/${user.userName}`}
                    >
                        <UserRoundPen />
                        Full Profile
                    </Link>
                    <button className='w-full p-4 bg-backgroundtwo rounded-full text-left font-[500] flex gap-4 hover:bg-[#272727]'
                    onClick={hmm}
                    >
                        <Settings />
                        Settings
                    </button>
                    <button
                        className='w-full p-4 bg-backgroundtwo rounded-full text-left font-[500] flex gap-4 hover:bg-[#272727] text-red-700 relative'
                        onClick={handleLogout}
                    >
                        <LogOut />
                        Log Out
                        {isLogoutLoading && (
                            <div className='absolute top-4 right-4'>
                                <svg className='idkgg' viewBox='25 25 50 50'>
                                    <circle
                                        className='gayxx'
                                        r='20'
                                        cy='50'
                                        cx='50'
                                    ></circle>
                                </svg>
                            </div>
                        )}
                    </button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
