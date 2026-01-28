# Audiomack API

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ryanwtf88/audiomack-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/ryanwtf88/audiomack-api/blob/master/LICENSE.md)

Unofficial Audiomack API wrapper built with [Bun](https://bun.sh) and [Hono](https://hono.dev). Optimized for Vercel Serverless with drop-in compatibility for LavaSrc etc

## Features

- 🚀 **Serverless Ready** - Fully optimized for Vercel with zero config
- 🔌 **LavaSrc Compatible** - Native support for `/v1` prefix and resource routes
- 🔍 **Search** - Music, albums, artists, and playlists
- 🎵 **Track Details** - Full metadata including ISRC codes
- 🎯 **Recommendations** - Related track suggestions
- 🔗 **URL Resolver** - Parse and fetch data from Audiomack URLs
- 🖼️ **Image URLs** - All responses include artwork URLs
- 🚫 **No Auth Required** - Uses public API access
- 📚 **Swagger UI** - Interactive API documentation

## Installation

### Prerequisites

- [Bun](https://bun.sh) >= 1.0.0 (Local Development)

### Setup

```bash
# Clone the repository
git clone https://github.com/ryanwtf88/audiomack-api.git
cd audiomack-api

# Install dependencies
bun install

# Start the development server
bun run dev
```

The API will be available at `http://localhost:3001`

> **Note:** No environment variables are required. Public credentials are built-in.

## LavaSrc / NodeLink Compatibility

This API is designed to be a drop-in replacement for AudioPlayer sources like LavaSrc that expect the official Audiomack API structure.

**Base URL:** `https://your-project.vercel.app/v1`

**Supported Resource Routes:**
- `/v1/music/song/:artist/:slug`
- `/v1/music/play/:id`
- `/v1/search`

## API Endpoints

The API is available at both the root `/` (simplified) and `/v1/` (official compatibility) paths.

### Search

```http
GET /v1/search?q={query}&type={type}&limit={limit}
```

**Parameters:**
- `q` (required) - Search query
- `type` (optional) - `music`, `albums`, `artists` - Default: `music`
- `limit` (optional) - Number of results (1-50) - Default: `20`

**Example:**
```bash
curl "https://your-project.vercel.app/v1/search?q=drake"
```

### Track Details

Get details by ID or Artist/Slug.

```http
GET /v1/music/{id}
GET /v1/music/song/{artist}/{slug}
```

### Stream URL

Get the streaming URL for a track.

```http
GET /v1/music/play/{id}
# OR
GET /play/{id}
```

### Recommendations

Get related tracks.

```http
GET /v1/recommendations/{id}
```

### URL Resolver

Parse any Audiomack URL.

```http
GET /resolve?url={audiomack_url}
```

## Deployment

### Deploy to Vercel

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel --prod
   ```

That's it! No environment variables or complex configuration needed.

## Interactive Documentation

- **Swagger UI:** `/docs` (e.g., `https://your-project.vercel.app/docs`)
- **OpenAPI Spec:** `/openapi.json`

## Disclaimer

This is an unofficial API wrapper. Audiomack is a trademark of Audiomack, Inc. This project is not affiliated with or endorsed by Audiomack.

## Author

**RY4N**
- GitHub: [@ryanwtf88](https://github.com/ryanwtf88)
