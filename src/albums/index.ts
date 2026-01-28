import { Context } from "hono";
import { signedFetch } from "../utils/fetch.js";
import { formatAlbum } from "../utils/formatter.js";

const BASE_URL = "https://api.audiomack.com/v1";

export async function handleAlbumDetails(c: Context) {
    const id = c.req.param("id");
    try {
        const data = await signedFetch(`${BASE_URL}/album/${id}`);
        if (!data || !data.results) {
            return c.json({ error: "Album not found" }, 404);
        }

        // Cache album details for 24 hours
        c.header("Cache-Control", "public, max-age=86400");

        return c.json(formatAlbum(data.results));
    } catch (err: any) {
        console.error(`[Album Error] ${err.message}`);
        return c.json({ error: "Failed to fetch album details", message: err.message }, 500);
    }
}
