import { Hono } from "hono";
import { handle } from "hono/vercel";
import { swaggerUI } from "@hono/swagger-ui";
import { handleSearch } from "../src/search/index";
import { handleAlbumDetails } from "../src/albums/index";
import { handleArtistDetails } from "../src/artists/index";
import { handlePlaylistDetails } from "../src/playlists/index";
import { handleRecommendations } from "../src/recommendations/index";
import { handleResolve } from "../src/resolve/index";
import { signedFetch } from "../src/utils/fetch";
import { formatTrack } from "../src/utils/formatter";
import { openAPISpec } from "../src/utils/openapi";

const app = new Hono();
const BASE_URL = "https://api.audiomack.com/v1";

app.get("/", swaggerUI({ url: "/openapi.json" }));

app.get("/openapi.json", (c) => {
    const host = c.req.header("host") || "localhost:3001";
    const protocol = "https";

    const spec = {
        ...openAPISpec,
        servers: [
            {
                url: `${protocol}://${host}`,
                description: "Production server"
            }
        ]
    };

    return c.json(spec);
});

app.get("/search", handleSearch);

app.get("/music/:id", async (c) => {
    const id = c.req.param("id");
    try {
        const data = await signedFetch(`${BASE_URL}/music/${id}`);
        return c.json(formatTrack(data.results));
    } catch (err: any) {
        return c.json({ error: err.message }, 500);
    }
});

app.get("/album/:id", handleAlbumDetails);
app.get("/artist/:slug", handleArtistDetails);
app.get("/playlist/:id", handlePlaylistDetails);
app.get("/recommendations/:id", handleRecommendations);
app.get("/resolve", handleResolve);

app.get("/play/:id", async (c) => {
    const id = c.req.param("id");
    try {
        const data = await signedFetch(`${BASE_URL}/music/play/${id}?environment=desktop-web`);
        return c.json({ stream_url: data.url });
    } catch (err: any) {
        return c.json({ error: err.message }, 500);
    }
});

export default handle(app);
