import { Context } from "hono";
import { signedFetch } from "../utils/fetch.js";

const BASE_URL = "https://api.audiomack.com/v1";

export async function handlePlaylistDetails(c: Context) {
    const id = c.req.param("id");
    try {
        const data = await signedFetch(`${BASE_URL}/playlist/${id}`);
        if (!data || !data.results) {
            return c.json({ error: "Playlist not found" }, 404);
        }

        // Cache playlist details for 12 hours
        c.header("Cache-Control", "public, max-age=43200");

        return c.json(data.results);
    } catch (err: any) {
        console.error(`[Playlist Error] ${err.message}`);
        return c.json({ error: "Failed to fetch playlist details", message: err.message }, 500);
    }
}
