import { Context } from "hono";
import { signedFetch } from "../utils/fetch";
import { formatTrack } from "../utils/formatter";

const BASE_URL = "https://api.audiomack.com/v1";

export async function handleRecommendations(c: Context) {
    const id = c.req.param("id");
    try {
        const data = await signedFetch(`${BASE_URL}/music/recommendations/${id}`) as any;
        return c.json(data.results.map(formatTrack));
    } catch (err: any) {
        return c.json({ error: err.message }, 500);
    }
}
