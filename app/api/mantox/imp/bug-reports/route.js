import axios from "axios";

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
    const { imageLink, email, name, bugDescription } = await request.json();

    // Validate required fields
    if (!email || !name || !bugDescription) {
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

    // Use fallback image if not provided
    const finalImage = imageLink?.trim()
      ? imageLink
      : "https://i.imgur.com/GhcOfwG.jpeg";

    // Prepare data to send to the Discord bot API
    const bugData = { imageLink: finalImage, email, name, bugDescription };

    // Send the bug report to the Discord bot API using Axios
    const response = await axios.post(
      "https://dbot-sectet-production.up.railway.app/report",
      bugData,
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
