import { NextResponse } from "next/server";
import axios from "axios";
import FormData from "form-data";

const CLIENT_ID = process.env.IMGUR_CLIENT_ID;
const CLIENT_SECRET = process.env.IMGUR_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.IMGUR_REFRESH_TOKEN;

let accessToken = null; // Will be updated dynamically

// Function to refresh access token
async function refreshAccessToken() {
  try {
    console.log("Refreshing Imgur Access Token...");
    const { data } = await axios.post(
      "https://api.imgur.com/oauth2/token",
      new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: REFRESH_TOKEN
      })
    );

    if (data.access_token) {
      accessToken = data.access_token;
      console.log("New access token obtained successfully");
    } else {
      throw new Error("Imgur did not return a new access token");
    }
  } catch (error) {
    console.error(
      "Error refreshing access token:",
      error.response?.data || error.message
    );
    throw new Error("Failed to refresh Imgur access token");
  }
}

// Function to upload image to Imgur
async function uploadToImgur(imageBase64) {
  try {
    if (!accessToken) await refreshAccessToken();

    const imgurFormData = new FormData();
    imgurFormData.append("image", imageBase64);

    const response = await axios.post(
      "https://api.imgur.com/3/image",
      imgurFormData,
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );

    // **Log Rate Limits**
    console.log("Rate Limits:", {
      postLimit: response.headers["x-post-rate-limit-limit"],
      postRemaining: response.headers["x-post-rate-limit-remaining"],
      postReset: new Date(
        Date.now() + response.headers["x-post-rate-limit-reset"] * 1000
      ),

      clientLimit: response.headers["x-ratelimit-clientlimit"],
      clientRemaining: response.headers["x-ratelimit-clientremaining"],
      clientReset: new Date(
        Date.now() + response.headers["x-ratelimit-clientreset"] * 1000
      ),

      userLimit: response.headers["x-ratelimit-userlimit"],
      userRemaining: response.headers["x-ratelimit-userremaining"],
      userReset: new Date(
        Date.now() + response.headers["x-ratelimit-userreset"] * 1000
      )
    });

    if (response.data.success) {
      return { success: true, link: response.data.data.link };
    } else {
      throw new Error(response.data.data.error || "Imgur upload failed");
    }
  } catch (error) {
    console.error(
      "Error uploading to Imgur:",
      error.response?.data || error.message
    );

    if (error.response?.status === 403 || error.response?.status === 401) {
      console.warn("Token might be invalid, refreshing and retrying...");
      await refreshAccessToken();
      return uploadToImgur(imageBase64);
    }

    throw new Error("Failed to upload image to Imgur");
  }
}

// API Route Handler
export async function POST(req) {
  try {
    // Validate request
    if (!req.body) {
      return NextResponse.json(
        { success: false, error: "Empty request body" },
        { status: 400 }
      );
    }

    // Get image from request
    const formData = await req.formData();
    const imageFile = formData.get("image");

    if (!imageFile) {
      return NextResponse.json(
        { success: false, error: "No image provided" },
        { status: 400 }
      );
    }

    // Convert file to base64
    const buffer = await imageFile.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");

    // Upload image to Imgur
    const result = await uploadToImgur(base64Image);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Internal server error:", error.message);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
