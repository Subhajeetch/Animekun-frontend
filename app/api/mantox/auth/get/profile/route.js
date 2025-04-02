import axios from "axios";
import MineConfig from "@/mine.config.js";

// Handle preflight CORS requests
export async function OPTIONS() {
    return new Response(null, {
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
        const { username } = await req.json();

        const response = await axios.post(
            `${MineConfig.dataBaseUrl}/get-profile`,
            { username },
            {
                headers: { "Content-Type": "application/json" }
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

        const user = response.data.user;

        return new Response(
            JSON.stringify({
                success: true,
                message: "successfully got the user",
                user
            }),
            {
                status: 200
            }
        );
    } catch (error) {
        console.error("Error getting profile:", error.message);

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
