import { Hono } from "hono";
import { swaggerUI } from "@hono/swagger-ui";
import { handleSearch } from "./search/index.js";
import { handleAlbumDetails } from "./albums/index.js";
import { handleArtistDetails } from "./artists/index.js";
import { handlePlaylistDetails } from "./playlists/index.js";
import { handleRecommendations } from "./recommendations/index.js";
import { handleResolve } from "./resolve/index.js";
import { signedFetch } from "./utils/fetch.js";
import { formatTrack } from "./utils/formatter.js";
import { openAPISpec } from "./utils/openapi.js";

const api = new Hono();
const app = new Hono();
const BASE_URL = "https://api.audiomack.com/v1";

// Manual Logger
app.use("*", async (c, next) => {
    const start = Date.now();
    await next();
    const end = Date.now();
    console.log(`[Request] Method=${c.req.method} Path="${c.req.path}" URL="${c.req.url}" Status=${c.res.status} Time=${end - start}ms`);
});

// Manual CORS
app.use("*", async (c, next) => {
    await next();
    c.header("Access-Control-Allow-Origin", "*");
    c.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    c.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
});

app.options("*", (c) => c.body(null, 204));

// Global Cache Middleware
app.use("*", async (c, next) => {
    await next();
    if (c.res.status === 200) {
        c.header("Cache-Control", "public, max-age=3600, stale-while-revalidate=86400");
    }
});

// Swagger/OpenAPI
api.get("/", (c) => c.redirect("/docs"));
api.get("/docs", async (c) => {
    return c.text("OpenAPI Docs available at /openapi.json");
});

api.get("/openapi.json", (c) => {
    const host = c.req.header("host") || "localhost:3001";
    const protocol = host.includes("localhost") ? "http" : "https";

    const spec = {
        ...openAPISpec,
        servers: [
            {
                url: `${protocol}://${host}`,
                description: "Current server"
            }
        ]
    };

    return c.json(spec);
});

// Routes defined on API sub-app
api.get("/search", handleSearch);

// Music Details (ID based)
api.get("/music/:id", async (c) => {
    const id = c.req.param("id");
    try {
        const data = await signedFetch(`${BASE_URL}/music/${id}`);
        if (!data || !data.results) return c.json({ error: "Track not found" }, 404);
        return c.json(formatTrack(data.results));
    } catch (err: any) {
        return c.json({ error: err.message }, 500);
    }
});

// Music Details (Slug based) - New for LavaSrc/Official API compatibility
api.get("/music/song/:artist/:slug", async (c) => {
    const artist = c.req.param("artist");
    const slug = c.req.param("slug");
    try {
        const data = await signedFetch(`${BASE_URL}/music/song/${artist}/${slug}`);
        if (!data || !data.results) return c.json({ error: "Track not found" }, 404);
        return c.json(formatTrack(data.results));
    } catch (err: any) {
        return c.json({ error: err.message }, 500);
    }
});

api.get("/album/:id", handleAlbumDetails);
api.get("/artist/:slug", handleArtistDetails);
api.get("/playlist/:id", handlePlaylistDetails);
api.get("/recommendations/:id", handleRecommendations);
api.get("/resolve", handleResolve);

// Play Endpoint Logic
const handlePlay = async (c: any) => {
    const id = c.req.param("id");
    try {
        const data = await signedFetch(`${BASE_URL}/music/play/${id}?environment=desktop-web&hq=true&section=%2Fsearch`);
        const streamUrl = data?.url || data?.signed_url || data?.signedUrl || data?.stream_url || data?.streamUrl;

        if (!streamUrl) {
            console.warn(`[Play Error] No stream URL found for ID ${id}`, data);
            return c.json({ error: "Stream URL not found", debug: data }, 404);
        }

        return c.json({ stream_url: streamUrl });
    } catch (err: any) {
        return c.json({ error: err.message }, 500);
    }
};

api.get("/play/:id", handlePlay);
// Alias for official API structure
api.get("/music/play/:id", handlePlay);

// Mount API at root and /v1
app.route("/", api);
app.route("/v1", api);

// Error Handling
app.onError((err, c) => {
    console.error(`[App Error] ${err.message}`, err.stack);
    return c.json({ error: "Internal Server Error", message: err.message }, 500);
});

app.notFound((c) => {
    return c.json({ error: "Not Found", path: c.req.path }, 404);
});

export { app };
