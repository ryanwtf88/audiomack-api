import { Context } from "hono";
import { signedFetch } from "../utils/fetch";
import { formatArtist } from "../utils/formatter";

const BASE_URL = "https://api.audiomack.com/v1";

export async function handleArtistDetails(c: Context) {
    const slug = c.req.param("slug");
    try {
        const data = await signedFetch(`${BASE_URL}/artist/${slug}`) as any;
        return c.json(formatArtist(data.results));
    } catch (err: any) {
        return c.json({ error: err.message }, 500);
    }
}
