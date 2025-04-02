import axios from "axios";

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

// Handle username check request
export async function POST(req) {
    try {
        // Parse request body
        const { userName } = await req.json();

        // Validate request body
        if (!userName) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Username is required"
                }),
                { status: 400 }
            );
        }

        // Send request to Cloudflare Worker API
        const response = await axios.post(
            "http://0.0.0.0:8787/check-username",
            { userName },
            { headers: { "Content-Type": "application/json" } }
        );

        return new Response(JSON.stringify(response.data), {
            status: response.status,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        console.error("Username check error:", error.message);

        // Handle specific Axios errors
        const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Internal server error";

        return new Response(
            JSON.stringify({
                success: false,
                message: errorMessage,
                isUsernameExist: false
            }),
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
