import axios from "axios";
import { cookies, headers } from "next/headers";
import MineConfig from "@/mine.config.js";

// Handle preflight CORS requests
export async function OPTIONS() {
    return new Response(null, {
        status: 204, // No Content
        headers: {
            "Access-Control-Allow-Origin": "*", // Allow all origins
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
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Unauthorised"
                }),
                { status: 401 }
            );
        }

        // Parse request body
        const { username, email } = await req.json();

        // Validate required fields
        if (!username && !email) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Username & email not provided"
                }),
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
            email,
            accessToken: forPassToken
        };

        const response = await axios.post(
            `${MineConfig.dataBaseUrl}/verify-email-fpass`,
            userInput,
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            }
        );

        if (response.data.success) {
            // Return success response
            return new Response(
                JSON.stringify({
                    success: true,
                    message: "Email verified"
                }),
                {
                    status: 201,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json"
                    }
                }
            );
        } else {
            return new Response(
                JSON.stringify({ success: false, message: "Server error" }),
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

        return new Response(
            JSON.stringify({ success: false, message: errorMessage }),
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
