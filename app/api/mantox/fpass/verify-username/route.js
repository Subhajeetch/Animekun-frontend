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
        // Parse request body
        const { username } = await req.json();

        // Validate required fields
        if (!username) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Username is required"
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
            username
        };

        const response = await axios.post(
            "http://0.0.0.0:8787/find-user-fpass",
            userInput,
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            }
        );

        // Securely set cookies
        cookieStore.set({
            name: "forPassToken",
            value: response.data.accessToken,
            httpOnly: true, // Prevents JavaScript access (XSS protection)
            secure: true, // Ensures HTTPS-only (prevents MITM attacks)
            sameSite: "strict", // Prevents CSRF attacks
            maxAge: 1800, // 30 mins (in seconds)
            path: "/" // Cookie is available across the whole site
        });

        // Return success response
        return new Response(
            JSON.stringify({
                success: true,
                message: "Found the account",
                user: response.data.user
            }),
            {
                status: 201,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": "true",
                    "Content-Type": "application/json"
                }
            }
        );
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
