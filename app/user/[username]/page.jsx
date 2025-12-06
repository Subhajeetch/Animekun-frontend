
import { CalendarDays, UserRound, Flame, ChevronRight } from "lucide-react";
import axios from "axios";
import EditButton from "./EditButton.jsx";

const Profile = async ({ params }) => {
    const { username } = await params;

    if (!username) {
        return (
            <main className='min-h-screen bg-backgroundtwo flex justify-center items-center'>
                <h1>Error 404</h1>
            </main>
        );
    }

    const response = await axios.post(`${process.env.NEXT_PUBLIC_SITE_URL}/api/mantox/auth/get/profile`,
        { username },
        {
            headers: { "Content-Type": "application/json" }
        }
    );

    const r = response.data;

    if (r.message === "User not found - L bro") {
        return (
            <main className='min-h-screen bg-backgroundtwo flex justify-center items-center'>
                <h1>Error 404</h1>
                <p>No user found</p>
            </main>
        );
    }

    const user = r.user;

    return (
        <main
            className='min-h-screen bg-backgroundtwo
        '
        >
            <div
                className='relative w-full h-56 md:h-72 lg:h-96 rounded-b-2xl
                    bg-amber-100 shadow-md'
            >
                <div className='h-full w-full rounded-b-2xl overflow-hidden'>
                    <img
                        className='h-full w-full object-cover'
                        src='https://s4.anilist.co/file/anilistcdn/media/anime/banner/21-wf37VakJmZqs.jpg'
                    ></img>
                </div>

                <div
                    className='absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t
          from-black/70 to-transparent rounded-b-2xl'
                ></div>

                <div className='absolute bottom-[-58px] lg:bottom-[-90px] left-6 md:left-[60px]'>
                    <img
                        src={user?.profilePicture || "https://i.imgur.com/Frqsihe.jpeg"}
                        alt='Profile'
                        className='w-24 lg:h-40 h-24 lg:w-40 rounded-full border-4 border-backgroundHover'
                    />
                </div>

                <div className='absolute top-3 right-3'>
                    <EditButton userName={user.userName} />
                </div>
            </div>

            {/* username & display name Info */}
            <div
                className='flex items-center pt-3 px-4 md:px-[54px]
                '
            >
                <div className='ml-[112px] lg:ml-[176px]'>
                    <h3 className='text-[24px] font-bold leading-[0.9]'>
                        {user?.displayName}
                    </h3>
                    <p className='text-gray-600 text-[16px]'>
                        @{user?.userName} &#x2022; {"he/him"}
                    </p>
                </div>
            </div>

            <div className='mt-8 lg:mt-16 flex flex-col md:flex-row gap-6 px-4 md:px-[54px]'>
                {/* About Section */}
                <div className='p-4 bg-background shadow-md rounded-2xl flex-1 max-w-2xl'>
                    <div className='flex gap-1 font-semibold justify-start items-center'>
                        <UserRound size={20} /> About
                    </div>
                    <p className='text-discriptionForeground mt-2 pl-2'>
                        {user?.bio || `Hey I'm @${user.userName}.`}
                    </p>

                    <div className='mt-6'>
                        <div className='flex gap-1 font-semibold'>
                            <CalendarDays size={20} /> Joined
                        </div>
                        <span className='text-[14px] text-discriptionForeground mt-1 ml-2'>
                            25 February, 2004
                        </span>
                    </div>
                </div>

                {/* stats */}
                <div className='p-4 bg-background shadow-md rounded-2xl flex flex-col gap-4 md:max-w-[480px]'>
                    <h3 className='flex gap-1 font-semibold'>
                        <Flame /> Stats
                    </h3>
                    <div className='flex gap-4'>
                        <div className='flex flex-col bg-[#2b3d46] rounded-2xl p-4 flex-1'>
                            <p className='font-bold flex gap-1'>
                                Watched hours <ChevronRight size={20} />
                            </p>
                            <div className='flex-1 flex justify-center'>
                                <p className='text-[40px] font-bold'>
                                    {user?.watchHours || "0"}
                                </p>
                            </div>
                        </div>
                        <div className='flex flex-col bg-[#2b3d46] rounded-2xl p-4'>
                            <p className='font-bold flex gap-1'>
                                Anime watched <ChevronRight size={20} />
                            </p>
                            <div className='flex-1 flex justify-center'>
                                <p className='text-[40px] font-bold'>
                                    {user?.watchedAnimes || "0"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Profile;
