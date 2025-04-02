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
        <main className='max-w-3xl mx-auto p-6 bg-backgroundtwo'>
            <h1 className='text-2xl font-bold mb-4'>Edit Profile</h1>
            
            
        </main>
    );
}
