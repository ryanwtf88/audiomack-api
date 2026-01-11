import { Context } from "hono";
import { signedFetch } from "../utils/fetch";
import { formatAlbum } from "../utils/formatter";

const BASE_URL = "https://api.audiomack.com/v1";

export async function handleAlbumDetails(c: Context) {
    const id = c.req.param("id");
    try {
        const data = await signedFetch(`${BASE_URL}/album/${id}`) as any;
        return c.json(formatAlbum(data.results));
    } catch (err: any) {
        return c.json({ error: err.message }, 500);
    }
}
