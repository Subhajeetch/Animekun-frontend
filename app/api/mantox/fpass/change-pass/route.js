import axios from "axios";
import { cookies, headers } from "next/headers";

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
        const verificationCookie = cookieStore.get("OTP999VERIFIED")?.value;
        const forPassToken = cookieStore.get("forPassToken")?.value;

        if (!verificationCookie && !forPassToken) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Unauthorised"
                }),
                { status: 401 }
            );
        }

        // Parse request body
        const { newPassword, confirmNewPassword, username } = await req.json();

        // Validate required fields
        if (!newPassword || !confirmNewPassword) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Password on both field should be provided"
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

        if (newPassword !== confirmNewPassword) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Password on both field should be same"
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
            newPassword: confirmNewPassword,
            accessToken: forPassToken
        };

        const response = await axios.post(
            "http://0.0.0.0:8787/change-pass-fpass",
            userInput,
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            }
        );

        if (response.data.success) {
            cookieStore.delete("OTP999VERIFIED");
            cookieStore.delete("forPassToken");

            return new Response(
                JSON.stringify({
                    success: true,
                    message: "Password changed successfully"
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
