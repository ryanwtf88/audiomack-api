import { Context } from "hono";
import { signedFetch } from "../utils/fetch.js";
import { formatArtist } from "../utils/formatter.js";

const BASE_URL = "https://api.audiomack.com/v1";

export async function handleArtistDetails(c: Context) {
    const slug = c.req.param("slug");
    try {
        const data = await signedFetch(`${BASE_URL}/artist/${slug}`);
        if (!data || !data.results) {
            return c.json({ error: "Artist not found" }, 404);
        }

        // Cache artist details for 24 hours
        c.header("Cache-Control", "public, max-age=86400");

        return c.json(formatArtist(data.results));
    } catch (err: any) {
        console.error(`[Artist Error] ${err.message}`);
        return c.json({ error: "Failed to fetch artist details", message: err.message }, 500);
    }
}
