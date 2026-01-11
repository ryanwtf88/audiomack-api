export interface AudiomackResource {
    type: "song" | "album" | "artist" | "playlist" | "unknown";
    artistSlug?: string;
    slug?: string;
    id?: string;
    originalUrl: string;
}

export class Urls {
    static readonly BASE_API = "https://api.audiomack.com/v1";

    static parse(url: string): AudiomackResource {
        try {
            const u = new URL(url);
            const parts = u.pathname.split("/").filter(Boolean);

            if (parts.length === 3) {
                const [artistSlug, typeRaw, slug] = parts;
                if (typeRaw === "song") {
                    return { type: "song", artistSlug, slug, originalUrl: url };
                }
                if (typeRaw === "album") {
                    return { type: "album", artistSlug, slug, originalUrl: url };
                }
                if (typeRaw === "playlist") {
                    return { type: "playlist", artistSlug, slug, originalUrl: url };
                }
            }

            if (parts.length === 1) {
                return { type: "artist", artistSlug: parts[0], originalUrl: url };
            }

            return { type: "unknown", originalUrl: url };
        } catch (e) {
            return { type: "unknown", originalUrl: url };
        }
    }

    static getApiUrl(resource: AudiomackResource): string | null {
        if (resource.id) {
            if (resource.type === "song") return `${this.BASE_API}/music/${resource.id}`;
            if (resource.type === "album") return `${this.BASE_API}/album/${resource.id}`;
            if (resource.type === "playlist") return `${this.BASE_API}/playlist/${resource.id}`;
        }

        if (resource.type === "artist" && resource.artistSlug) {
            return `${this.BASE_API}/artist/${resource.artistSlug}`;
        }

        return null;
    }
}
