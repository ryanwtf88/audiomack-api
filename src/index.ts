import { Hono } from "hono";
import { swaggerUI } from "@hono/swagger-ui";
import { Context } from "hono";
import { handleSearch } from "./search/index";
import { handleAlbumDetails } from "./albums/index";
import { handleArtistDetails } from "./artists/index";
import { handlePlaylistDetails } from "./playlists/index";
import { handleRecommendations } from "./recommendations/index";
import { handleResolve } from "./resolve/index";
import { signedFetch } from "./utils/fetch";
import { formatTrack } from "./utils/formatter";
import { openAPISpec } from "./utils/openapi";

const app = new Hono();
const BASE_URL = "https://api.audiomack.com/v1";

app.get("/", swaggerUI({ url: "/openapi.json" }));

app.get("/openapi.json", (c: Context) => {
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

// Mount Handlers
app.get("/search", handleSearch);
app.get("/music/:id", async (c: Context) => {
  const id = c.req.param("id");
  try {
    const data = await signedFetch(`${BASE_URL}/music/${id}`) as any;
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

// Play Stream
app.get("/play/:id", async (c: Context) => {
  const id = c.req.param("id");
  try {
    const data = await signedFetch(`${BASE_URL}/music/play/${id}?environment=desktop-web`) as any;
    return c.json({ stream_url: data.url });
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

export default {
  port: parseInt(process.env.PORT || "3001"),
  fetch: app.fetch,
};
