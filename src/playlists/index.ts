import { Context } from "hono";
import { signedFetch } from "../utils/fetch";

const BASE_URL = "https://api.audiomack.com/v1";

export async function handlePlaylistDetails(c: Context) {
    const id = c.req.param("id");
    try {
        const data = await signedFetch(`${BASE_URL}/playlist/${id}`) as any;
        return c.json(data.results);
    } catch (err: any) {
        return c.json({ error: err.message }, 500);
    }
}
