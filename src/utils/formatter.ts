export function formatTrack(track: any) {
  return {
    id: track.id,
    title: track.title,
    artist: track.artist,
    uploader: track.uploader_name,
    image: track.image,
    duration: track.duration,
    url: track.url,
    stream_url: `/play/${track.id}`,
    stats: {
      plays: track.plays,
      favorites: track.favorites,
      reposts: track.reposts,
    },
    isrc: track.isrc,
    released: track.released,
  };
}

export function formatAlbum(album: any) {
  return {
    id: album.id,
    title: album.title,
    artist: album.artist,
    image: album.image,
    url: album.url,
    tracks: album.tracks?.map(formatTrack) || [],
    stats: {
      plays: album.plays,
      favorites: album.favorites,
    },
  };
}

export function formatArtist(artist: any) {
  return {
    id: artist.id,
    name: artist.name,
    slug: artist.url_slug,
    image: artist.image,
    bio: artist.bio,
    stats: {
      followers: artist.followers_count,
      plays: artist.plays,
    },
  };
}
