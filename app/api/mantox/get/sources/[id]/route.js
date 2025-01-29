import { HiAnime } from "aniwatch";

export async function GET(request, { params }) {
  const hianime = new HiAnime.Scraper();
  const { searchParams } = new URL(request.url);

  const { id } = await params;
  const secondHalfEp = searchParams.get("ep");

  const server = searchParams.get("s") || "hd-1";
  const subOrDub = searchParams.get("c");

  const episodeId = `${id}?ep=${secondHalfEp}`;

  try {
    const data = await hianime.getEpisodeSources(episodeId, server, subOrDub);
    return new Response(JSON.stringify({ manto: true, data }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ manto: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
