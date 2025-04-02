import axios from "axios";
import MineConfig from "@/mine.config.js";

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

export async function POST(request) {
  try {
    // Parse request body
    const { name, email, description } = await request.json();

    // Validate required fields
    if (!email || !name || !description) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
    }

    // Prepare data to send to the Discord bot API
    const contactData = { name, email, desc: description };

    // Send the bug report to the Discord bot API using Axios
    const response = await axios.post(
                  `${MineConfig.discordBotApiUrl}/contact`,
      contactData,
      {
        headers: { "Content-Type": "application/json" }
      }
    );

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: "Bug report sent successfully!",
        result: response.data
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }
    );
  } catch (error) {
    console.error("Error processing bug report:", error.message);

    // Handle Axios-specific errors
    const errorMessage =
      error.response?.data?.error || error.message || "Internal server error";

    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
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
