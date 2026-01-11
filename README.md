# Audiomack API

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ryanwtf88/audiomack-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/ryanwtf88/audiomack-api/blob/master/LICENSE.md)

Unofficial Audiomack API wrapper built with [Bun](https://bun.sh) and [Hono](https://hono.dev). Provides access to Audiomack's music catalog including search, tracks, albums, artists, playlists, and recommendations without requiring user authentication.

## Features

- 🔍 **Search** - Music, albums, artists, and playlists
- 🎵 **Track Details** - Full metadata including ISRC codes
- 💿 **Albums & Playlists** - Complete collection information
- 👤 **Artist Profiles** - Detailed artist information
- 🎯 **Recommendations** - Related track suggestions
- 🔗 **URL Resolver** - Parse and fetch data from Audiomack URLs
- 🖼️ **Image URLs** - All responses include artwork URLs
- 🚫 **No Auth Required** - Uses public API access
- 📚 **Swagger UI** - Interactive API documentation

## Installation

### Prerequisites

- [Bun](https://bun.sh) >= 1.0.0

### Setup

```bash
# Clone the repository
git clone https://github.com/ryanwtf88/audiomack-api.git
cd audiomack-api

# Install dependencies
bun install

# Setup environment variables
cp .env.example .env
# Edit .env with your credentials if needed

# Start the development server
bun run dev
```

The API will be available at `http://localhost:3001`

### Environment Variables

Create a `.env` file in the root directory:

```env
AUDIOMACK_CONSUMER_KEY=
AUDIOMACK_CONSUMER_SECRET=
PORT=3001
```

> **Note:** The default credentials are public OAuth credentials from Audiomack's web client.

## Interactive Documentation

The API includes **Swagger UI** for interactive documentation and testing:

- **Local:** <http://localhost:3001>
- **Vercel:** <https://your-project.vercel.app/api>

The Swagger UI automatically detects the server URL and provides:

- Complete API endpoint documentation
- Request/response schemas
- Interactive "Try it out" functionality
- Example requests and responses

## API Endpoints

### Search

Search for music, albums, artists, or playlists.

```http
GET /search?q={query}&type={type}&limit={limit}
```

**Parameters:**

- `q` (required) - Search query
- `type` (optional) - `music`, `albums`, `artists` - Default: `music`
- `limit` (optional) - Number of results (1-50) - Default: `20`

**Example:**

```bash
curl "http://localhost:3001/search?q=drake&type=music&limit=5"
```

### Track Details

Get detailed information about a specific track including ISRC.

```http
GET /music/{id}
```

### Album Details

Get album information and track listing.

```http
GET /album/{id}
```

### Artist Profile

Get artist information and statistics.

```http
GET /artist/{slug}
```

### Playlist Details

Get playlist information and tracks.

```http
GET /playlist/{id}
```

### Recommendations

Get track recommendations based on a song.

```http
GET /recommendations/{id}
```

### URL Resolver

Parse and fetch data from any Audiomack URL.

```http
GET /resolve?url={audiomack_url}
```

**Supported URL formats:**

- `https://audiomack.com/{artist}/song/{slug}`
- `https://audiomack.com/{artist}/album/{slug}`
- `https://audiomack.com/{artist}/playlist/{slug}`
- `https://audiomack.com/{artist}`

### Stream URL

Get the streaming URL for a track.

```http
GET /play/{id}
```

> **Note:** Some tracks may be premium-only or geo-restricted.

## Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ryanwtf88/audiomack-api)

Click the button above or follow these steps:

1. **Install Vercel CLI:**

   ```bash
   npm i -g vercel
   ```

2. **Deploy:**

   ```bash
   vercel
   ```

3. **Set Environment Variables:**

   ```bash
   vercel env add AUDIOMACK_CONSUMER_KEY
   vercel env add AUDIOMACK_CONSUMER_SECRET
   ```

4. **Deploy to Production:**

   ```bash
   vercel --prod
   ```

Your API will be available at `https://your-project.vercel.app/api`

### Other Platforms

The API can be deployed to any platform that supports Node.js or Bun:

- Railway
- Render
- Fly.io
- AWS Lambda
- Google Cloud Functions

## Scripts

```bash
# Development with hot reload
bun run dev

# Production
bun run start

# Build
bun run build

# Clean build artifacts
bun run clean
```

## Response Format

All endpoints return JSON with consistent formatting. See the [Swagger UI](http://localhost:3001) for complete schema documentation.

## Limitations

- Uses public API access (no user-specific features)
- Some content may be geo-restricted
- Premium tracks may have limited access
- Rate limiting may apply

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](https://github.com/ryanwtf88/audiomack-api/blob/master/CONTRIBUTING.md) before submitting a Pull Request.

## Security

For security concerns, please review our [Security Policy](https://github.com/ryanwtf88/audiomack-api/blob/master/SECURITY.md).

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/ryanwtf88/audiomack-api/blob/master/LICENSE.md) file for details.

## Disclaimer

This is an unofficial API wrapper. Audiomack is a trademark of Audiomack, Inc. This project is not affiliated with or endorsed by Audiomack.

## Author

**RY4N**

- GitHub: [@ryanwtf88](https://github.com/ryanwtf88)
- Repository: [audiomack-api](https://github.com/ryanwtf88/audiomack-api)
