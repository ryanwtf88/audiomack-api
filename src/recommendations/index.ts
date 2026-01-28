import { Context } from "hono";
import { signedFetch } from "../utils/fetch.js";
import { formatTrack } from "../utils/formatter.js";

const BASE_URL = "https://api.audiomack.com/v1";

export async function handleRecommendations(c: Context) {
    const id = c.req.param("id");
    try {
        // Correct endpoint pattern for recommendations
        const data = await signedFetch(`${BASE_URL}/music/${id}/recommendations`);
        if (!data || !data.results) {
            return c.json({ results: [] });
        }

        const results = data.results.map(formatTrack);

        // Cache recommendations for 12 hours
        c.header("Cache-Control", "public, max-age=43200");

        return c.json(results);
    } catch (err: any) {
        console.error(`[Recommendations Error] ${err.message}`);
        return c.json({ error: "Failed to fetch recommendations", message: err.message }, 500);
    }
}
