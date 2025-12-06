import axios from "axios";

const discordWebhookBugReportsUrl = process.env.DISCORD_WEBHOOK_URI_BUG_REPORTS;
const fallbackImageUrl = "https://i.imgur.com/GhcOfwG.jpeg";

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
    const finalImage = imageLink?.trim() ? imageLink : fallbackImageUrl;

    // Ensure webhook URL is configured
    if (!discordWebhookBugReportsUrl) {
      return new Response(
        JSON.stringify({ success: false, error: "Server not configured: missing Discord webhook URL" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
    }

    // Truncate long description to fit Discord embed limits (1024 per field)
    const sanitizedDescription = bugDescription.length > 1024 ? bugDescription.slice(0, 1021) + "..." : bugDescription;

    // Build Discord webhook payload with an embed
    const embed = {
      title: "New Bug Report",
      color: 15158332,
      fields: [
        { name: "Name", value: name || "(not provided)", inline: true },
        { name: "Email", value: email || "(not provided)", inline: true },
        { name: "Description", value: sanitizedDescription }
      ],
      image: { url: finalImage },
      timestamp: new Date().toISOString()
    };

    const payload = { embeds: [embed] };

    // Send the bug report to the Discord webhook
    const response = await axios.post(discordWebhookBugReportsUrl, payload, {
      headers: { "Content-Type": "application/json" }
    });

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
