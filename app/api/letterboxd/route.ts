import { NextResponse } from "next/server";
import Parser from "rss-parser";

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  try {
    const parser = new Parser({
      customFields: {
        item: ["letterboxd:filmTitle", "letterboxd:filmYear", "letterboxd:memberRating"],
      },
    });
    const feed = await parser.parseURL("https://letterboxd.com/damisaviola/rss/");

    // Get the first 6 items
    const latestItems = feed.items.slice(0, 6);

    const movies = latestItems.map((item) => {
      // Extract the thumbnail image from the CDATA description
      const imgRegex = /<img src="([^"]+)"/;
      const imgMatch = item.content?.match(imgRegex);
      const thumbnail = imgMatch ? imgMatch[1] : null;

      // Ensure we have a string for the rating, default to no rating if missing
      const rating = item["letterboxd:memberRating"] || "";

      return {
        title: item["letterboxd:filmTitle"] || item.title,
        year: item["letterboxd:filmYear"] || "",
        rating: rating,
        link: item.link,
        thumbnail: thumbnail,
        pubDate: item.pubDate,
      };
    });

    return NextResponse.json({ movies });
  } catch (error) {
    console.error("Error fetching Letterboxd RSS:", error);
    return NextResponse.json({ error: "Failed to fetch movies" }, { status: 500 });
  }
}
