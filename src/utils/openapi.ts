export const openAPISpec = {
    openapi: "3.0.0",
    info: {
        title: "Audiomack API",
        version: "1.0.0",
        description: "Unofficial Audiomack API wrapper for accessing music, albums, artists, playlists, and recommendations",
        license: {
            name: "MIT",
            url: "https://opensource.org/licenses/MIT"
        }
    },
    servers: [
        {
            url: "{protocol}://{host}",
            description: "Dynamic server URL",
            variables: {
                protocol: {
                    default: "http",
                    enum: ["http", "https"]
                },
                host: {
                    default: "localhost:3001"
                }
            }
        }
    ],
    paths: {
        "/search": {
            get: {
                summary: "Search for music, albums, or artists",
                tags: ["Search"],
                parameters: [
                    {
                        name: "q",
                        in: "query",
                        required: true,
                        schema: { type: "string" },
                        description: "Search query"
                    },
                    {
                        name: "type",
                        in: "query",
                        schema: {
                            type: "string",
                            enum: ["music", "albums", "artists"],
                            default: "music"
                        },
                        description: "Type of content to search"
                    },
                    {
                        name: "limit",
                        in: "query",
                        schema: { type: "integer", default: 20, minimum: 1, maximum: 50 },
                        description: "Number of results"
                    }
                ],
                responses: {
                    "200": {
                        description: "Successful response",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        results: {
                                            type: "array",
                                            items: { $ref: "#/components/schemas/Track" }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/music/{id}": {
            get: {
                summary: "Get track details including ISRC",
                tags: ["Tracks"],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer" },
                        description: "Track ID"
                    }
                ],
                responses: {
                    "200": {
                        description: "Track details",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/Track" }
                            }
                        }
                    }
                }
            }
        },
        "/album/{id}": {
            get: {
                summary: "Get album details",
                tags: ["Albums"],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer" },
                        description: "Album ID"
                    }
                ],
                responses: {
                    "200": {
                        description: "Album details",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/Album" }
                            }
                        }
                    }
                }
            }
        },
        "/artist/{slug}": {
            get: {
                summary: "Get artist profile",
                tags: ["Artists"],
                parameters: [
                    {
                        name: "slug",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                        description: "Artist slug (e.g., 'future')"
                    }
                ],
                responses: {
                    "200": {
                        description: "Artist profile",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/Artist" }
                            }
                        }
                    }
                }
            }
        },
        "/playlist/{id}": {
            get: {
                summary: "Get playlist details",
                tags: ["Playlists"],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer" },
                        description: "Playlist ID"
                    }
                ],
                responses: {
                    "200": {
                        description: "Playlist details"
                    }
                }
            }
        },
        "/recommendations/{id}": {
            get: {
                summary: "Get track recommendations",
                tags: ["Recommendations"],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer" },
                        description: "Track ID"
                    }
                ],
                responses: {
                    "200": {
                        description: "List of recommended tracks",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/Track" }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/resolve": {
            get: {
                summary: "Resolve Audiomack URL to data",
                tags: ["Utilities"],
                parameters: [
                    {
                        name: "url",
                        in: "query",
                        required: true,
                        schema: { type: "string" },
                        description: "Audiomack URL (e.g., https://audiomack.com/artist/song/title)",
                        example: "https://audiomack.com/future/song/life-is-good"
                    }
                ],
                responses: {
                    "200": {
                        description: "Resolved resource data"
                    }
                }
            }
        },
        "/play/{id}": {
            get: {
                summary: "Get stream URL for a track",
                tags: ["Streaming"],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer" },
                        description: "Track ID"
                    }
                ],
                responses: {
                    "200": {
                        description: "Stream URL",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        stream_url: { type: "string" }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    components: {
        schemas: {
            Track: {
                type: "object",
                properties: {
                    id: { type: "integer", example: 8095948 },
                    title: { type: "string", example: "Life Is Good" },
                    artist: { type: "string", example: "Future feat. Drake" },
                    uploader: { type: "string", example: "Future" },
                    image: { type: "string", format: "uri", example: "https://i.audiomack.com/..." },
                    duration: { type: "string", example: "238" },
                    url: { type: "string" },
                    stream_url: { type: "string" },
                    isrc: { type: "string", example: "USSM11914962" },
                    stats: {
                        type: "object",
                        properties: {
                            plays: { type: "string", example: "66.0M" },
                            favorites: { type: "string", example: "264K" },
                            reposts: { type: "string", example: "25.1K" }
                        }
                    },
                    released: { type: "string" }
                }
            },
            Album: {
                type: "object",
                properties: {
                    id: { type: "integer" },
                    title: { type: "string" },
                    artist: { type: "string" },
                    image: { type: "string", format: "uri" },
                    url: { type: "string" },
                    tracks: {
                        type: "array",
                        items: { $ref: "#/components/schemas/Track" }
                    },
                    stats: {
                        type: "object",
                        properties: {
                            plays: { type: "string" },
                            favorites: { type: "string" }
                        }
                    }
                }
            },
            Artist: {
                type: "object",
                properties: {
                    id: { type: "integer" },
                    name: { type: "string", example: "Future" },
                    slug: { type: "string", example: "future" },
                    image: { type: "string", format: "uri" },
                    bio: { type: "string" },
                    stats: {
                        type: "object",
                        properties: {
                            followers: { type: "integer" },
                            plays: { type: "string" }
                        }
                    }
                }
            }
        }
    }
};
