import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const client_id = process.env.SPOTIFY_CLIENT_ID;

  if (!client_id) {
    return NextResponse.json(
      {
        error: "SPOTIFY_CLIENT_ID belum diatur di file .env.local",
        instruction: "Tambahkan SPOTIFY_CLIENT_ID dan SPOTIFY_CLIENT_SECRET dari developer.spotify.com/dashboard ke file .env.local Anda.",
      },
      { status: 400 }
    );
  }

  const { origin } = new URL(request.url);
  const redirect_uri = `${origin}/api/spotify/callback`;
  const scopes = "user-read-currently-playing user-read-recently-played user-read-playback-state";

  const authUrl = `https://accounts.spotify.com/authorize?${new URLSearchParams({
    response_type: "code",
    client_id,
    scope: scopes,
    redirect_uri,
  }).toString()}`;

  return NextResponse.redirect(authUrl);
}
