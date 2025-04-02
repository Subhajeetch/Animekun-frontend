import { cookies } from "next/headers";

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

export async function POST() {
    const cookieStore = await cookies();

    // Delete authentication cookies
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");

    return new Response(
        JSON.stringify({
            success: true,
            message: "Logout successful!"
        }),
        {
            status: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
                "Content-Type": "application/json"
            }
        }
    );
}
