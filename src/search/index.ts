import { Context } from "hono";
import { signedFetch } from "../utils/fetch.js";
import { formatTrack, formatAlbum, formatArtist } from "../utils/formatter.js";

const BASE_URL = "https://api.audiomack.com/v1";

export async function handleSearch(c: Context) {
    const q = c.req.query("q");
    const type = c.req.query("type") || "music";
    const limit = c.req.query("limit") || "20";

    if (!q) return c.json({ error: "Missing query parameter 'q'" }, 400);

    try {
        const data = await signedFetch(`${BASE_URL}/search?q=${encodeURIComponent(q)}&type=${type}&limit=${limit}`);

        if (!data || !data.results) {
            return c.json({ results: [] });
        }

        const results = data.results.map((item: any) => {
            if (type === "music") return formatTrack(item);
            if (type === "albums") return formatAlbum(item);
            if (type === "artists") return formatArtist(item);
            return item;
        });

        // Cache search results for 1 hour
        c.header("Cache-Control", "public, max-age=3600");

        return c.json({ results });
    } catch (err: any) {
        console.error(`[Search Error] ${err.message}`);
        return c.json({ error: "Failed to fetch search results", message: err.message }, 500);
    }
}
