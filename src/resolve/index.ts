import { Context } from "hono";
import { Urls } from "../utils/Urls.js";
import { signedFetch } from "../utils/fetch.js";
import { formatTrack, formatAlbum, formatArtist } from "../utils/formatter.js";

const BASE_URL = "https://api.audiomack.com/v1";

export async function handleResolve(c: Context) {
    const url = c.req.query("url");
    if (!url) return c.json({ error: "Missing query parameter 'url'" }, 400);

    const resource = Urls.parse(url);
    if (resource.type === "unknown") {
        return c.json({ error: "Could not parse Audiomack URL", url }, 400);
    }

    try {
        if (resource.type === "artist") {
            const data = await signedFetch(`${BASE_URL}/artist/${resource.artistSlug}`);
            if (!data || !data.results) return c.json({ error: "Artist not found" }, 404);

            c.header("Cache-Control", "public, max-age=86400");
            return c.json(formatArtist(data.results));
        }

        const query = resource.slug?.replace(/-/g, " ") || "";

        let searchType = "music";
        if (resource.type === "album") searchType = "albums";
        if (resource.type === "playlist") searchType = "playlists";

        const searchRes = await signedFetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}&show=${searchType}&limit=10`);

        if (!searchRes || !searchRes.results || searchRes.results.length === 0) {
            return c.json({ error: "Resource not found (no search results)", parsed: resource }, 404);
        }

        const match = searchRes.results.find((item: any) => {
            const itemSlug = item.url_slug;
            const itemArtistSlug = item.uploader_url_slug || item.uploader?.url_slug;

            const slugMatch = itemSlug === resource.slug;
            const artistMatch = itemArtistSlug === resource.artistSlug;

            return slugMatch && artistMatch;
        });

        if (match) {
            let result;
            if (resource.type === "song") {
                const details = await signedFetch(`${BASE_URL}/music/${match.id}`);
                result = formatTrack(details.results);
            } else if (resource.type === "album") {
                const details = await signedFetch(`${BASE_URL}/album/${match.id}`);
                result = formatAlbum(details.results);
            } else if (resource.type === "playlist") {
                const details = await signedFetch(`${BASE_URL}/playlist/${match.id}`);
                result = details.results;
            }

            if (result) {
                c.header("Cache-Control", "public, max-age=86400");
                return c.json(result);
            }
        }

        return c.json({
            error: "Resource not found (slug mismatch)",
            debug: {
                parsed: resource,
                search_query: query,
                results_count: searchRes.results?.length || 0
            }
        }, 404);

    } catch (err: any) {
        console.error(`[Resolve Error] ${err.message}`);
        return c.json({ error: "Failed to resolve URL", message: err.message }, 500);
    }
}
