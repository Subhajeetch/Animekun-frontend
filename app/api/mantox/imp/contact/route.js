import axios from "axios";

const discordWebhookContactsUrl = process.env.DISCORD_WEBHOOK_URI_CONTACTS;

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

    // Ensure webhook URL is configured
    if (!discordWebhookContactsUrl) {
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
    const sanitizedDescription = description.length > 1024 ? description.slice(0, 1021) + "..." : description;

    // Build Discord webhook payload with an embed
    const embed = {
      title: "New Contact Message",
      color: 3447003,
      fields: [
        { name: "Name", value: name || "(not provided)", inline: true },
        { name: "Email", value: email || "(not provided)", inline: true },
        { name: "Message", value: sanitizedDescription }
      ],
      timestamp: new Date().toISOString()
    };

    const payload = { embeds: [embed] };

    // Send the contact message to the Discord webhook
    const response = await axios.post(discordWebhookContactsUrl, payload, {
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
    console.error("Error processing contact request:", error.message);

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
