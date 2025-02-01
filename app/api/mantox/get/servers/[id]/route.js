import { HiAnime } from "aniwatch";

const hianime = new HiAnime.Scraper();

export async function GET(request, { params }) {
  const { id } = await params;
  const halfEpisodeId = id;

  const { searchParams } = new URL(request.url);
  const secondHalfEp = searchParams.get("ep");

  try {
    const data = await hianime.getEpisodeServers(
      `${halfEpisodeId}?ep=${secondHalfEp}`
    );
    return new Response(JSON.stringify({ manto: true, data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching data:", err.message);
    return new Response(JSON.stringify({ manto: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
