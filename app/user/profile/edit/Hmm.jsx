"use client";
import React, { useState, useEffect } from "react";
import useAuthStore from "@/AuthStore/userStore.js";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import axios from "axios";

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
        <div className='max-w-3xl mx-auto p-6 bg-backgroundtwo'>
            <h1 className='text-2xl font-bold mb-4'>Edit Profile</h1>

            {/* Profile Picture Upload */}
            <div className='mb-4'>
                <label className='block text-sm font-medium'>
                    Profile Picture
                </label>
                <Dialog>
                    <DialogTrigger disabled={!!pfpRestriction}>
                        <img
                            src={formData.profilePicture}
                            alt='Profile'
                            className='w-32 h-32 object-cover rounded-full cursor-pointer border-2 border-gray-300'
                        />
                    </DialogTrigger>
                    {pfpRestriction && (
                        <p className='text-red-500 text-sm mt-1'>
                            You changed your profile picture recently. Wait{" "}
                            {pfpRestriction}.
                        </p>
                    )}
                    <DialogContent>
                        <input
                            type='file'
                            accept='image/*'
                            onChange={e =>
                                handleImageChange(e, "profilePicture")
                            }
                            className='border-dotted border-2 w-full p-4 text-center'
                        />
                        {imageUploading && (
                            <p className='text-gray-500 text-sm'>
                                Uploading...
                            </p>
                        )}
                    </DialogContent>
                </Dialog>
            </div>

            {/* Cover Picture Upload */}
            <div className='mb-4'>
                <label className='block text-sm font-medium'>
                    Cover Picture
                </label>
                <Dialog>
                    <DialogTrigger disabled={!!coverRestriction}>
                        <div
                            className='w-full h-40 cursor-pointer object-cover bg-amber-100'
                            style={{
                                backgroundColor: formData.coverColor,
                                backgroundImage: `url('${formData.coverPicture}')`
                            }}
                        ></div>
                    </DialogTrigger>
                    {coverRestriction && (
                        <p className='text-red-500 text-sm mt-1'>
                            You changed your cover recently. Wait{" "}
                            {coverRestriction}.
                        </p>
                    )}
                    <DialogContent>
                        <input
                            type='file'
                            accept='image/*'
                            onChange={e => handleImageChange(e, "coverPicture")}
                            className='border-dotted border-2 w-full p-4 text-center'
                        />
                        {imageUploading && (
                            <p className='text-gray-500 text-sm'>
                                Uploading...
                            </p>
                        )}
                    </DialogContent>
                </Dialog>
            </div>

            {/* Editable Fields */}
            {[
                { label: "Display Name", name: "displayName" },
                { label: "Bio", name: "bio" },
                { label: "Pronouns", name: "pronouns" },
                { label: "Note", name: "note" }
            ].map(({ label, name }) => (
                <div key={name} className='mb-4'>
                    <label className='block text-sm font-medium'>{label}</label>
                    <input
                        type='text'
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        className='w-full p-2 border rounded'
                    />
                </div>
            ))}

            {/* Save Changes Pop-up */}
            {hasChanges && (
                <div className='fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg transition-all duration-300 animate-bounce'>
                    You have unsaved changes
                    <button
                        onClick={handleSave}
                        className='ml-4 bg-blue-500 px-3 py-1 rounded'
                    >
                        Save
                    </button>
                </div>
            )}
        </div>
    );
}
