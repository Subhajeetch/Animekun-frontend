import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server"; // Add this import

const baseUrl = process.env.CF_DB_URI;

export async function OPTIONS() {
    return NextResponse.json(null, {
        status: 204,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
        }
    });
}

export async function POST(req) {
    try {
        const { userName, displayName, email, password, confirmPassword } =
            await req.json();

        // Your validation logic...
        if (!userName || !displayName || !email || !password || !confirmPassword) {
            return NextResponse.json(
                { success: false, message: "Missing required fields" },
                {
                    status: 400,
                    headers: { "Access-Control-Allow-Origin": "*" }
                }
            );
        }

        if (password !== confirmPassword) {
            return NextResponse.json(
                { success: false, message: "Passwords do not match" },
                {
                    status: 400,
                    headers: { "Access-Control-Allow-Origin": "*" }
                }
            );
        }

        const signUpData = { userName, displayName, email, password };
        const response = await axios.post(
            `${baseUrl}/sign-up`,
            signUpData,
            { headers: { "Content-Type": "application/json" } }
        );

        // Create NextResponse first
        const nextResponse = NextResponse.json(
            {
                success: true,
                message: "Sign Up successful!",
                user: response.data.user
            },
            {
                status: 201,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": "true"
                }
            }
        );

        // Set cookies on the response
        nextResponse.cookies.set({
            name: "accessToken",
            value: response.data.accessToken,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 86400,
            path: "/"
        });

        nextResponse.cookies.set({
            name: "refreshToken",
            value: response.data.refreshToken,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 2592000,
            path: "/"
        });

        return nextResponse;

    } catch (error) {
        console.error("Sign-up error:", error.message);

        const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Internal server error";

        return NextResponse.json(
            { success: false, message: errorMessage },
            {
                status: error.response?.status || 500,
                headers: { "Access-Control-Allow-Origin": "*" }
            }
        );
    }
}
