import { app } from "../src/app.js";

export default async function handler(req: any, res: any) {
    try {
        const protocol = req.headers["x-forwarded-proto"] || "https";
        const host = req.headers["host"] || "example.com";
        // Ensure req.url starts with /
        const path = req.url.startsWith("/") ? req.url : "/" + req.url;
        const url = new URL(path, `${protocol}://${host}`);

        const request = new Request(url.toString(), {
            method: req.method,
            headers: req.headers as any,
            body: (req.method !== "GET" && req.method !== "HEAD") ? JSON.stringify(req.body) : undefined,
        });

        const response = await app.fetch(request);

        res.statusCode = response.status;
        response.headers.forEach((value, key) => res.setHeader(key, value));

        const arrayBuffer = await response.arrayBuffer();
        res.end(Buffer.from(arrayBuffer));
    } catch (err: any) {
        console.error("Handler Error:", err);
        res.statusCode = 500;
        res.json({ error: "Internal Server Error", details: err.message });
    }
}
