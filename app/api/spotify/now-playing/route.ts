import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT = "https://api.spotify.com/v1/me/player/recently-played?limit=1";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

async function getAccessToken() {
  if (!client_id || !client_secret || !refresh_token) {
    return null;
  }

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export async function GET() {
  try {
    const tokenData = await getAccessToken();

    // If Spotify API credentials are not yet set in .env.local
    if (!tokenData || !tokenData.access_token) {
      return NextResponse.json({
        isPlaying: false,
        isConfigured: Boolean(client_id && refresh_token),
        title: "Playlist Uku",
        artist: "damisaviola",
        album: "Koleksi Favorit",
        albumImageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
        songUrl: "https://open.spotify.com/playlist/2fMU9es2sX6N89wCIt0vdT",
        progressMs: 0,
        durationMs: 0,
        statusText: "Offline / Menunggu Spotify",
      });
    }

    // Check what is currently playing
    const res = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
      cache: "no-store",
    });

    if (res.status === 204 || res.status > 400) {
      // Nothing is currently playing, fetch recently played track
      const recentRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
        cache: "no-store",
      });

      if (recentRes.ok) {
        const recentData = await recentRes.json();
        const item = recentData.items?.[0];
        const track = item?.track;

        if (track) {
          return NextResponse.json({
            isPlaying: false,
            isConfigured: true,
            title: track.name,
            artist: track.artists.map((a: { name: string }) => a.name).join(", "),
            album: track.album.name,
            albumImageUrl: track.album.images?.[0]?.url || null,
            songUrl: track.external_urls.spotify,
            progressMs: 0,
            durationMs: track.duration_ms,
            statusText: "Terakhir Diputar",
            playedAt: item.played_at,
          });
        }
      }

      return NextResponse.json({
        isPlaying: false,
        isConfigured: true,
        title: "Sedang Tidak Memutar",
        artist: "damisaviola",
        album: "Spotify",
        albumImageUrl: null,
        songUrl: "https://open.spotify.com/playlist/2fMU9es2sX6N89wCIt0vdT",
        statusText: "Offline",
      });
    }

    const song = await res.json();

    if (!song.item) {
      return NextResponse.json({
        isPlaying: false,
        isConfigured: true,
        title: "Sedang Tidak Memutar",
        artist: "damisaviola",
        album: "Spotify",
        albumImageUrl: null,
        songUrl: "https://open.spotify.com/playlist/2fMU9es2sX6N89wCIt0vdT",
        statusText: "Offline",
      });
    }

    const isPlaying = song.is_playing;
    const title = song.item.name;
    const artist = song.item.artists.map((a: { name: string }) => a.name).join(", ");
    const album = song.item.album.name;
    const albumImageUrl = song.item.album.images?.[0]?.url || null;
    const songUrl = song.item.external_urls.spotify;
    const progressMs = song.progress_ms || 0;
    const durationMs = song.item.duration_ms || 0;

    return NextResponse.json({
      isPlaying,
      isConfigured: true,
      title,
      artist,
      album,
      albumImageUrl,
      songUrl,
      progressMs,
      durationMs,
      statusText: isPlaying ? "Sedang Memutar" : "Dijeda (Paused)",
    });
  } catch (error) {
    console.error("Spotify Now Playing Error:", error);
    return NextResponse.json({
      isPlaying: false,
      isConfigured: false,
      title: "Playlist Uku",
      artist: "damisaviola",
      statusText: "Error memuat",
    });
  }
}
