import { HiAnime } from "aniwatch";

const hianime = new HiAnime.Scraper();

export async function GET(request, { params }) {
  const { date } = await params;

  try {
    const data = await hianime.getEstimatedSchedule(date);
    return new Response(JSON.stringify({ manto: true, data }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("Error fetching data:", err.message);
    return new Response(JSON.stringify({ manto: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
