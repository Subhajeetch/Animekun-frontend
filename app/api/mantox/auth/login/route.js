import axios from "axios";
import { NextResponse } from "next/server";

const baseUrl = process.env.CF_DB_URI;

export async function POST(req) {
    try {
        const { identifier, password } = await req.json();

        const response = await axios.post(
            `${baseUrl}/login`,
            { identifier, password },
            {
                headers: { "Content-Type": "application/json" }
            }
        );

        if (!response.data.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: response.data.message
                },
                { status: 500 }
            );
        }

        const { user, accessToken, refreshToken } = response.data;

        // Create NextResponse first
        const nextResponse = NextResponse.json(
            { success: true, user },
            {
                status: 200,
                headers: { "Content-Type": "application/json" }
            }
        );

        // Set cookies on the response
        if (accessToken) {
            nextResponse.cookies.set({
                name: "accessToken",
                value: accessToken,
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 86400, // 1 day
                path: "/"
            });
        }

        if (refreshToken) {
            nextResponse.cookies.set({
                name: "refreshToken",
                value: refreshToken,
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 2592000, // 30 days
                path: "/"
            });
        }

        return nextResponse;

    } catch (error) {
        console.error("Login error:", error.message);

        // Handle specific Axios errors
        const errorMessage =
            error.response?.data?.message || "Ooops... Something went wrong!";

        return NextResponse.json(
            { success: false, message: errorMessage },
            {
                status: error.response?.status || 500,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            }
        );
    }
}
