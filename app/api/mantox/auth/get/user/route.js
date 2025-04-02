import { cookies } from "next/headers";
import axios from "axios";

export async function GET(request) {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")?.value;
        const refreshToken = cookieStore.get("refreshToken")?.value;

        if (!accessToken && !refreshToken) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Not authenticated"
                }),
                { status: 401 }
            );
        }

        const response = await axios.post(
            "http://0.0.0.0:8787/get-user",
            { accessToken, refreshToken },
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            }
        );

        if (!response.data.success) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Something went wrong"
                }),
                { status: 500 }
            );
        }

        const user = response.data.user;

        return new Response(JSON.stringify({ success: true, user }), {
            status: 200
        });
    } catch (error) {
        console.error(error);

        return new Response(
            JSON.stringify({ success: false, message: "Unauthorized" }),
            { status: 401 }
        );
    }
}
