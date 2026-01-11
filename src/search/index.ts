import { Context } from "hono";
import { signedFetch } from "../utils/fetch";
import { formatTrack, formatAlbum, formatArtist } from "../utils/formatter";

const BASE_URL = "https://api.audiomack.com/v1";

export async function handleSearch(c: Context) {
    const q = c.req.query("q");
    const type = c.req.query("type") || "music";
    const limit = c.req.query("limit") || "20";

    if (!q) return c.json({ error: "Missing query" }, 400);

    try {
        const data = await signedFetch(`${BASE_URL}/search?q=${encodeURIComponent(q)}&type=${type}&limit=${limit}`) as any;
        return c.json({
            results: data.results.map((item: any) => {
                if (type === "music") return formatTrack(item);
                if (type === "albums") return formatAlbum(item);
                if (type === "artists") return formatArtist(item);
                return item;
            })
        });
    } catch (err: any) {
        return c.json({ error: err.message }, 500);
    }
}
