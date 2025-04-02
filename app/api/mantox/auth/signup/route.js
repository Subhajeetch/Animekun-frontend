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

// Handle sign-up POST request
export async function POST(req) {
    const cookieStore = await cookies();

    try {
        // Parse request body
        const { userName, displayName, email, password, confirmPassword } =
            await req.json();

        // Validate required fields
        if (
            !userName ||
            !displayName ||
            !email ||
            !password ||
            !confirmPassword
        ) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Missing required fields"
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

        // Ensure password matches confirmation
        if (password !== confirmPassword) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Passwords do not match"
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

        // Prepare sign-up data
        const signUpData = { userName, displayName, email, password };

        // Send request to backend sign-up API
        const response = await axios.post(
            "http://0.0.0.0:8787/sign-up",
            signUpData,
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            }
        );

        // Securely set cookies
        cookieStore.set({
            name: "accessToken",
            value: response.data.accessToken,
            httpOnly: true, // Prevents JavaScript access (XSS protection)
            secure: true, // Ensures HTTPS-only (prevents MITM attacks)
            sameSite: "strict", // Prevents CSRF attacks
            maxAge: 86400, // 1 day (in seconds)
            path: "/" // Cookie is available across the whole site
        });

        cookieStore.set({
            name: "refreshToken",
            value: response.data.refreshToken,
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 2592000, // 30 days
            path: "/"
        });

        // Return success response
        return new Response(
            JSON.stringify({
                success: true,
                message: "Sign Up successful!",
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
        console.error("Sign-up error:", error.message);

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
