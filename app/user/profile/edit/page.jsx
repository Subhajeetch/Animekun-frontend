"use client";
import React, { useState, useEffect } from "react";
import useAuthStore from "@/AuthStore/userStore.js";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import axios from "axios";
import { Pencil, Upload } from 'lucide-react';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export default function EditProfile() {
    const { user } = useAuthStore();

    // State for editable fields
    const [formData, setFormData] = useState({
        bio: user?.bio || "",
        coverColor: user?.coverColor || "#ffffff",
        coverPicture:
            user?.coverPicture ||
            "https://s4.anilist.co/file/anilistcdn/media/anime/banner/21-wf37VakJmZqs.jpg",
        profilePicture:
            user?.profilePicture || "https://i.imgur.com/Frqsihe.jpeg",
        displayName: user?.displayName || "",
        pronouns: user?.pronouns || "",
        note: user?.note || "",
        lastPfpCh: user?.lastPfpCh,
        lastCovCh: user?.lastCovCh
    });

    // Track changes for showing "Unsaved Changes" popup
    const [hasChanges, setHasChanges] = useState(false);
    const [imageUploading, setImageUploading] = useState(false);
    const [error, setError] = useState("");

    // Ensure UI updates when formData changes
    useEffect(() => {
        setHasChanges(true);
    }, [formData]);

    // Calculate time restriction for profile/cover picture
    const getRemainingTime = lastChange => {
        if (!lastChange) return null;
        const now = Date.now();
        const diff = now - lastChange;
        const remaining = 48 * 60 * 60 * 1000 - diff; // 48 hours in ms
        if (remaining > 0) {
            const hours = Math.floor(remaining / (60 * 60 * 1000));
            const minutes = Math.floor(
                (remaining % (60 * 60 * 1000)) / (60 * 1000)
            );
            return `${hours}h ${minutes}m`;
        }
        return null;
    };

    const pfpRestriction = getRemainingTime(formData.lastPfpCh);
    const coverRestriction = getRemainingTime(formData.lastCovCh);

    // Handle input change
    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle image upload
    const handleImageChange = async (e, type) => {
        const file = e.target.files[0];
        if (!file) return;

        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!allowedTypes.includes(file.type)) {
            setError("Invalid image format. Use JPEG, PNG, or JPG.");
            return;
        }

        if (file.size > MAX_IMAGE_SIZE) {
            setError("Image size should not exceed 5MB.");
            return;
        }

        setImageUploading(true);

        try {
            const formDataData = new FormData();
            formDataData.append("image", file);

            const uploadResponse = await axios.post(
                "/api/mantox/image/upload",
                formDataData,
                {
                    headers: { "Content-Type": "multipart/form-data" }
                }
            );

            setFormData(prev => ({
                ...prev,
                [type]: uploadResponse.data.link,
                ...(type === "profilePicture" && { lastPfpCh: Date.now() }),
                ...(type === "coverPicture" && { lastCovCh: Date.now() })
            }));
        } catch (err) {
            setError("Failed to upload image.");
        }

        setImageUploading(false);
    };

    // Handle form submission
    const handleSave = async () => {
        try {
            await axios.post("/update/profile", formData);
            setHasChanges(false);
        } catch (error) {
            console.error("Failed to update profile:", error);
        }
    };

    return (
        <main className='bg-backgroundtwo min-h-screen'>
            <div
                className='relative w-full h-56 md:h-72 lg:h-96 rounded-b-2xl
                    bg-amber-100 shadow-md'
            >
                <div className='h-full w-full rounded-b-2xl overflow-hidden'>
                    <img
                        className='h-full w-full object-cover'
                        src='https://s4.anilist.co/file/anilistcdn/media/anime/banner/21-wf37VakJmZqs.jpg'
                    ></img>

                    <div className='absolute top-3 right-3 bg-backgroundHover shadow-lg flex gap-2 rounded-xl items-center cursor-pointer px-3 py-2'>
                        <Upload size={20} /> <span>Upload Cover</span>
                    </div>
                </div>

                <div
                    className='absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t
          from-black/70 to-transparent rounded-b-2xl'
                ></div>

                <div className='absolute bottom-[-58px] lg:bottom-[-90px] left-6 md:left-[60px] cursor-pointer'>
                    <img
                        src={user?.profilePicture || "https://i.imgur.com/Frqsihe.jpeg"}
                        alt='Profile'
                        className='w-24 lg:h-40 h-24 lg:w-40 rounded-full border-4 border-backgroundHover'
                    />

                    <div className="absolute top-1 right-1 rounded-full p-1 border-4 border-backgroundHover bg-background">
                        <Pencil size={18} />
                    </div>
                </div>
            </div>


            {/* username & display name Info */}
            <div
                className='flex items-center pt-3 px-4 md:px-[54px]
                '
            >
                <div className='ml-[112px] lg:ml-[176px]'>
                    <h3 className='text-[24px] font-bold leading-[0.9]'>
                        {"MANTO999"}
                    </h3>
                    <p className='text-gray-600 text-[16px]'>
                        @{"manto999"} &#x2022; {"he/him"}
                    </p>
                </div>
            </div>


            <div className='px-4 md:px-[54px] mt-14'>
                <h2 className="font-semibold text-[20px] mb-1">Display Name</h2>
                <input type="text" value={"MANTO999"} className="outline-none w-full md:w-[410px] px-3 py-2 rounded-md bg-[#2c2c2c]" />

                <h2 className="font-semibold text-[20px] mb-1 mt-4">Username</h2>
                <input type="text" value={"manto999"} className="outline-none w-full md:w-[410px] px-3 py-2 rounded-md bg-[#2c2c2c]" />

                <h2 className="font-semibold text-[20px] mb-1 mt-4">Pronouns</h2>
                <input type="text" value={"he/him"} className="outline-none w-full md:w-[410px] px-3 py-2 rounded-md bg-[#2c2c2c]" />
            </div>
        </main>
    );
}
