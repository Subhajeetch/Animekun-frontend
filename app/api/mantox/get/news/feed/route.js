import axios from "axios";
import { load } from "cheerio";

const BASE_URL = "https://www.animenewsnetwork.com";

const fetchNewsFeeds = async topic => {
  try {
    const url = topic ? `${BASE_URL}/news/?topic=${topic}` : `${BASE_URL}/news`;
    const { data } = await axios.get(url);
    const $ = load(data);
    const feeds = [];

    $(".herald.box.news").each((i, el) => {
      const title = $(el).find("h3").text().trim();
      const slug = $(el).find("h3 > a").attr("href") || "";
      const url = `${BASE_URL}${slug}`;
      const byline = $(el).find(".byline");
      const uploadedAt = byline.find("time").text().trim();
      const topics = [];

      byline.find(".topics > a").each((i, el) => {
        topics.push($(el).text().trim());
      });

      const El = $(el).find(".preview");
      const preview = {
        intro: El.find(".intro").text().trim(),
        full: El.find(".full").text().replace("―", "").trim()
      };

      const thumbnailSlug = $(el).find(".thumbnail").attr("data-src");
      const thumbnail = thumbnailSlug
        ? `${BASE_URL}${thumbnailSlug}`
        : "https://i.imgur.com/KkkVr1g.png";

      feeds.push({
        id: slug.replace("/news/", ""),
        title,
        uploadedAt,
        topics,
        preview,
        thumbnail,
        url
      });
    });

    return feeds;
  } catch (error) {
    throw new Error("Error fetching news feeds: " + error.message);
  }
};

export async function GET(request, { params }) {
  const { searchParams } = new URL(request.url);
  const t = searchParams.get("t") || "anime";

  try {
    const data = await fetchNewsFeeds(t);
    return new Response(JSON.stringify({ manto: true, topic: t, data }), {
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
