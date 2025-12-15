import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const baseUrl = process.env.CF_DB_URI;

// Handle preflight CORS requests
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
    const cookieStore = await cookies();

    try {
        const forPassToken = cookieStore.get("forPassToken")?.value;

        if (!forPassToken) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorised"
                },
                {
                    status: 401,
                    headers: { "Access-Control-Allow-Origin": "*" }
                }
            );
        }

        // Parse request body
        const { username, otp } = await req.json();

        // Validate required fields
        if (!username || !otp) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Username & OTP not provided"
                },
                {
                    status: 400,
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    }
                }
            );
        }

        const userInput = {
            username,
            otp,
            accessToken: forPassToken
        };

        const response = await axios.post(
            `${baseUrl}/verify-otp-fpass`,
            userInput,
            {
                headers: { "Content-Type": "application/json" }
            }
        );

        if (response.data.success) {
            // Create NextResponse first
            const nextResponse = NextResponse.json(
                {
                    success: true,
                    message: "OTP Verified Successfully"
                },
                {
                    status: 201,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json"
                    }
                }
            );

            // Set cookie on the response
            nextResponse.cookies.set({
                name: "OTP999VERIFIED",
                value: "trueasf",
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 1800,
                path: "/"
            });

            return nextResponse;
        } else {
            return NextResponse.json(
                { success: false, message: "Server error" },
                {
                    status: 500,
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    }
                }
            );
        }
    } catch (error) {
        console.error("Error finding the user", error.message);

        // Handle specific Axios errors
        const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Internal server error";

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
