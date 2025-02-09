import axios from "axios";
import { load } from "cheerio";

const BASE_URL = "https://www.animenewsnetwork.com";
const scrapeNewsInfo = async url => {
  try {
    const { data } = await axios.get(url);
    const $ = load(data);
    //console.log($);

    const title = $("#page_header").text().replace("News", "").trim();
    const intro = $(".intro").first().text().trim();
    const description = $(".meat > p").text().trim().split("\n\n").join("\n");
    const uploadedAt = $("#page-title > small > time").text().trim();
    const thumbnailSlug = $(".meat > figure.fright")
      .first()
      .find("img")
      .attr("data-src");

    return {
      id: url.split("news/")[1],
      title,
      uploadedAt,
      intro,
      description,
      thumbnail: thumbnailSlug
        ? `${BASE_URL}${thumbnailSlug}`
        : "https://i.imgur.com/KkkVr1g.png",
      url
    };
  } catch (error) {
    throw new Error("Error fetching news info: " + error.message);
  }
};

export async function GET(request, { params }) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    const data = await scrapeNewsInfo(`${BASE_URL}/news/${id}`);
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
