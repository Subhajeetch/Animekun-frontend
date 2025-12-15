"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Image, CircleArrowRight, LoaderCircle } from "lucide-react";
import LoadingSke from "@/Sections/Universal/Loader.jsx";
import "./some.css";
import { toast } from "sonner";
import CustomImage from "@/Sections/Universal/CustomImage";

export default function BugReportPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [bugDescription, setBugDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageLink, setImageLink] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const MAX_CHAR = 1100;
  const MAX_NAME_CHAR = 120;
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

  // Handle image selection
  const handleImageChange = async e => {
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

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
    setError("");
    setImageUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const uploadResponse = await axios.post(
        "/api/mantox/image/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );

      setImageLink(uploadResponse.data.link);
    } catch (err) {
      setError("Failed to upload image.");
    }

    setImageUploading(false);
  };

  // Handle bug description character count
  const handleBugDescription = e => {
    const text = e.target.value;
    setBugDescription(text);
    setCharCount(text.length);
  };

  // Validate email
  const isValidEmail = email => /\S+@\S+\.\S+/.test(email);

  // Submit form
  const handleSubmit = async e => {
    e.preventDefault();
    setError("");

    if (!email || !name || !bugDescription) {
      setError("All fields are required.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Invalid email address.");
      return;
    }

    if (name.length > MAX_NAME_CHAR) {
      setError("Name should not exceed 120 characters.");
      return;
    }

    if (bugDescription.length > MAX_CHAR) {
      setError("Bug description is too long.");
      return;
    }

    setLoading(true);

    let finalImage = imageLink || "https://i.imgur.com/GhcOfwG.jpeg"; // Fallback image

    try {
      const response = await axios.post("/api/mantox/imp/bug-reports", {
        imageLink: finalImage,
        email,
        name,
        bugDescription
      });

      if (response.data.success) {
        toast.success("Bug report submitted successfully!");
        setEmail("");
        setName("");
        setBugDescription("");
        setImage(null);
        setImagePreview(null);
        setCharCount(0);
        setImageLink("");
      } else {
        setError(response.data.error);
      }
    } catch (err) {
      setError("Failed to send bug report.");
    }

    setLoading(false);
  };

  useEffect(() => {
    if (error === "") {
      return;
    }
    toast.warning(error);
  }, [error]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-background shadow-lg rounded-xl mt-10">
      {/* Logo */}
      <div className="flex gap-[3px] mb-10 justify-center">
        {/* First Half of Logo */}
        <div className="relative h-[30px] md:h-[34px]">
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            style={{ fill: "var(--foreground)" }}
            className="w-full h-full"
            viewBox="0 0 290.000000 75.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,75.000000) scale(0.100000,-0.100000)"
              stroke="none"
            >
              <path
                d="M140 685 c0 -19 -4 -35 -10 -35 -5 0 -10 -11 -10 -25 0 -14 -4 -25
-10 -25 -5 0 -10 -9 -10 -20 0 -11 -7 -23 -15 -26 -8 -4 -15 -16 -15 -29 0
-13 -7 -25 -15 -29 -9 -3 -15 -18 -15 -36 0 -16 -4 -30 -10 -30 -13 0 -13
-137 0 -145 13 -8 13 -55 0 -55 -6 0 -10 -28 -10 -65 0 -61 2 -67 32 -95 18
-16 41 -30 51 -30 9 0 17 -4 17 -10 0 -6 50 -10 130 -10 80 0 130 4 130 10 0
6 14 10 31 10 20 0 40 10 60 29 26 26 29 36 29 90 0 34 -6 70 -12 81 -10 16
-10 24 0 40 14 24 16 150 2 150 -5 0 -10 13 -10 29 0 16 -7 34 -15 41 -8 7
-15 21 -15 31 0 11 -4 19 -10 19 -5 0 -10 11 -10 25 0 14 -4 25 -10 25 -5 0
-10 9 -10 19 0 11 -11 28 -24 38 -13 11 -25 28 -27 38 -7 33 -29 29 -29 -5 0
-20 9 -39 25 -54 23 -22 25 -29 25 -122 -1 -95 -2 -100 -30 -131 -27 -30 -35
-33 -86 -33 -49 0 -60 4 -90 32 l-34 32 0 100 c0 78 3 101 15 110 12 9 14 21
9 54 -8 51 -24 56 -24 7z m100 -415 c0 -5 -7 -10 -15 -10 -8 0 -15 5 -15 10 0
6 7 10 15 10 8 0 15 -4 15 -10z m50 0 c0 -5 -7 -10 -15 -10 -8 0 -15 5 -15 10
0 6 7 10 15 10 8 0 15 -4 15 -10z m-104 -64 c21 -21 30 -37 24 -41 -6 -4 -22
5 -35 19 -24 25 -75 36 -75 16 0 -5 -7 -10 -15 -10 -19 0 -19 5 2 30 26 30 60
25 99 -14z m224 20 c0 -8 6 -16 13 -19 9 -4 9 -7 0 -17 -10 -11 -14 -10 -19 3
-9 25 -52 20 -79 -9 -13 -14 -29 -23 -35 -19 -6 4 2 20 22 40 35 37 98 50 98
21z m-207 -136 c14 0 31 8 37 18 10 16 10 16 20 0 14 -23 66 -24 74 -1 5 11
10 13 17 6 8 -8 5 -17 -10 -32 -25 -25 -63 -27 -82 -5 -11 14 -13 14 -21 0 -5
-9 -21 -16 -36 -16 -30 0 -67 34 -56 52 5 7 11 6 19 -5 7 -10 24 -17 38 -17z"
              />
              <path
                d="M702 548 l3 -53 108 -3 108 -3 -3 -52 -3 -52 -105 0 -105 0 -3 53 -3
52 -50 0 -49 0 0 -220 0 -220 50 0 50 0 0 110 0 110 110 0 110 0 0 -110 0
-110 55 0 55 0 0 220 0 220 -55 0 -55 0 0 55 0 55 -111 0 -110 0 3 -52z"
              />
              <path
                d="M1140 325 l0 -275 50 0 50 0 0 165 0 165 54 0 55 0 3 -52 3 -53 53
-3 52 -3 0 -110 0 -109 55 0 55 0 0 275 0 275 -55 0 -55 0 0 -111 0 -110 -52
3 -53 3 -3 53 -3 52 -55 0 -54 0 0 55 0 55 -50 0 -50 0 0 -275z"
              />
              <path d="M1680 325 l0 -275 50 0 50 0 0 275 0 275 -50 0 -50 0 0 -275z" />
              <path
                d="M1900 325 l0 -275 50 0 50 0 0 165 0 165 59 0 60 0 3 -52 3 -53 48
-3 47 -3 0 55 0 56 55 0 55 0 2 -162 3 -163 55 0 55 0 0 270 0 270 -55 0 -55
0 -3 -52 -3 -52 -52 -3 -52 -3 -3 -52 -3 -53 -49 0 -49 0 -3 53 -3 52 -57 3
-58 3 0 54 0 55 -50 0 -50 0 0 -275z"
              />
              <path
                d="M2560 325 l0 -276 158 3 157 3 3 53 3 52 -110 0 -111 0 0 55 0 54
108 3 107 3 3 53 3 52 -110 0 -111 0 0 55 0 54 108 3 107 3 3 53 3 52 -160 0
-161 0 0 -275z"
              />
            </g>
          </svg>
        </div>

        {/* Second Half of Logo */}
        <div className="relative h-[30px] md:h-[34px]">
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            style={{ fill: "var(--main)" }}
            className="w-full h-full"
            viewBox="0 0 150.000000 75.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,75.000000) scale(0.100000,-0.100000)"
              stroke="none"
            >
              <path
                d="M20 330 l0 -260 50 0 50 0 0 99 0 100 53 3 52 3 3 48 3 47 -55 0 -56
0 0 110 0 110 -50 0 -50 0 0 -260z"
              />
              <path
                d="M330 540 l0 -50 -50 0 -50 0 0 -55 0 -55 50 0 50 0 0 54 0 55 53 3
52 3 3 48 3 47 -55 0 -56 0 0 -50z"
              />
              <path d="M550 380 l0 -210 50 0 50 0 0 210 0 210 -50 0 -50 0 0 -210z" />
              <path
                d="M864 577 c-2 -7 -3 -100 -2 -207 l3 -195 48 -3 47 -3 0 210 0 211
-45 0 c-28 0 -48 -5 -51 -13z"
              />
              <path
                d="M1070 330 l0 -260 50 0 50 0 0 154 0 155 53 3 52 3 3 47 3 47 -53 3
-53 3 -3 53 -3 52 -50 0 -49 0 0 -260z"
              />
              <path
                d="M1390 486 l0 -105 -52 -3 -53 -3 -3 -47 -3 -48 55 0 56 0 0 -105 0
-105 50 0 50 0 0 260 0 260 -50 0 -50 0 0 -104z"
              />
              <path d="M230 220 l0 -50 50 0 50 0 0 50 0 50 -50 0 -50 0 0 -50z" />
              <path
                d="M337 164 c-4 -4 -7 -27 -7 -51 l0 -43 56 0 55 0 -3 48 -3 47 -45 3
c-25 2 -49 0 -53 -4z"
              />
              <path
                d="M657 163 c-4 -3 -7 -26 -7 -50 l0 -43 105 0 105 0 0 50 0 50 -98 0
c-54 0 -102 -3 -105 -7z"
              />
            </g>
          </svg>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="text-[14px] font-bold ml-1">Name</label>
          <input
            type="text"
            placeholder="Luffy uzumaki..."
            value={name}
            onChange={e => setName(e.target.value)}
            maxLength={MAX_NAME_CHAR}
            className="w-full p-2 rounded outline-none bg-backgroundtwo
            text-[14px]"
            required
          />
        </div>

        <div>
          {/* Email */}
          <label className="text-[14px] font-bold ml-1">Email</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full p-2 rounded outline-none bg-backgroundtwo
            text-[14px]"
            required
          />
        </div>

        <div className="relative">
          {/* Bug Description */}
          <label className="text-[14px] font-bold ml-1">
            Describe your bug
          </label>
          <textarea
            placeholder="The button isn't wor..."
            value={bugDescription}
            onChange={handleBugDescription}
            maxLength={MAX_CHAR}
            className={`w-full p-2 rounded bg-backgroundtwo text-[14px] ${charCount > MAX_CHAR ? "border-red-500" : "outline-none"
              }`}
            rows="5"
            required
          ></textarea>

          {/* Character Counter */}
          <p
            className={`text-[13px] absolute top-0 right-2 ${charCount > MAX_CHAR ? "text-red-500" : "text-gray-600"
              }`}
          >
            {charCount}/{MAX_CHAR}
          </p>
        </div>

        <div>
          {/* Image Upload Box */}
          <label className="text-[14px] font-bold ml-1 mb-1">
            Upload Screenshot(Optional)
          </label>
          <div
            className="w-full h-40 border-2 border-dashed
          border-discriptionForeground rounded-lg flex items-center
          justify-center cursor-pointer hover:border-main relative"
          >
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleImageChange}
              className="absolute opacity-0 w-full h-40 cursor-pointer"
            />
            {imagePreview ? (
              <CustomImage
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="flex flex-col justify-center items-center">
                <div className="text-gray-500 font-bold flex gap-2">
                  <Image />
                  <span>Screenshot of the bug</span>
                </div>
                <p className="text-gray-500 text-[10px]">
                  Supported: jpeg, jpg, png. Maximum file size: 5MB
                </p>
              </div>
            )}

            {/* Image Uploading Indicator */}
            {imageUploading && (
              <div
                className="absolute top-0 left-0 right-0 bottom-0 flex justify-center
              items-center bg-[#00000059]"
              >
                <LoadingSke />
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full bg-status text-background font-bold p-2 rounded ${loading || imageUploading
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
            }`}
          disabled={loading || imageUploading}
        >
          {loading ? (
            <div className="flex gap-2 justify-center items-center">
              <svg className="gulux" viewBox="25 25 50 50">
                <circle className="humppa" r="20" cy="50" cx="50"></circle>
              </svg>
              <span>Submitting...</span>
            </div>
          ) : (
            <div className="flex gap-2 justify-center items-center">
              <CircleArrowRight />
              <span>Submit Bug Report</span>
            </div>
          )}
        </button>
      </form>
    </div>
  );
}
