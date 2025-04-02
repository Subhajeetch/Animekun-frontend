"use client";

import Link from "next/link";
import { UserRoundPen } from "lucide-react";
import useAuthStore from "@/AuthStore/userStore.js";

const EditButton = ({ userName }) => {
    const { user, isAuthenticated } = useAuthStore();

    return (
        isAuthenticated &&
        user.userName === userName && (
            <Link
                href='/user/profile/edit'
                className='flex gap-2 bg-white text-background px-3 py-2 rounded-full shadow-md font-semibold text-sm justify-center items-center hover:bg-[#e1e1e1]'
            >
                <UserRoundPen size={20} />
                Edit Profile
            </Link>
        )
    );
};

export default EditButton;
