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
    try {
        // Parse request body
        const { username } = await req.json();

        // Validate required fields
        if (!username) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Username is required"
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
            username
        };

        const response = await axios.post(
            `${baseUrl}/find-user-fpass`,
            userInput,
            {
                headers: { "Content-Type": "application/json" }
            }
        );

        // Create NextResponse first
        const nextResponse = NextResponse.json(
            {
                success: true,
                message: "Found the account",
                user: response.data.user
            },
            {
                status: 201,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": "true",
                    "Content-Type": "application/json"
                }
            }
        );

        // Set cookie on the response
        nextResponse.cookies.set({
            name: "forPassToken",
            value: response.data.accessToken,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1800, // 30 mins (in seconds)
            path: "/"
        });

        return nextResponse;

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
