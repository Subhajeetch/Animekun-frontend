import { cookies } from "next/headers";
import axios from "axios";

export async function POST(req) {
    try {
        const cookieStore = cookies();
        
        const { identifier, password } = await req.json();
        
        

        const response = await axios.post(
            "http://0.0.0.0:8787/login",
            { identifier, password },
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            }
        );

        if (!response.data.success) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: response.data.message
                }),
                { status: 500 }
            );
        }

        const { user, accessToken, refreshToken } = response.data;

        // Securely set the new access token if it exists
        if (accessToken) {
            cookieStore.set({
                name: "accessToken",
                value: accessToken,
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 86400, // 1 day
                path: "/"
            });
        }

        // Securely set the new refresh token if it exists
        if (refreshToken) {
            cookieStore.set({
                name: "refreshToken",
                value: refreshToken,
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 2592000, // 30 days
                path: "/"
            });
        }

        return new Response(JSON.stringify({ success: true, user }), {
            status: 200
        });
    } catch (error) {
        console.error("Login error:", error.message);

        // Handle specific Axios errors
        const errorMessage =
            error.response?.data?.message || "Ooops... Something went wrong!";

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
