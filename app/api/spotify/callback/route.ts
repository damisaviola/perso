import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error || !code) {
    return new NextResponse(`<h3>Gagal otorisasi Spotify: ${error || "Kode tidak ditemukan"}</h3>`, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri = `${origin}/api/spotify/callback`;

  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

  try {
    const res = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri,
      }),
    });

    const data = await res.json();

    if (!res.ok || !data.refresh_token) {
      return new NextResponse(
        `<h3>Error menukar token:</h3><pre>${JSON.stringify(data, null, 2)}</pre>`,
        { headers: { "Content-Type": "text/html; charset=utf-8" } }
      );
    }

    const refreshToken = data.refresh_token;

    const html = `
      <!DOCTYPE html>
      <html lang="id">
      <head>
        <meta charset="utf-8" />
        <title>Spotify Token Berhasil</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #000; color: #fff; padding: 40px 20px; display: flex; justify-content: center; }
          .card { background: #1c1c1e; border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 30px; max-width: 600px; width: 100%; }
          h2 { color: #1DB954; margin-top: 0; }
          code { background: rgba(255,255,255,0.08); padding: 8px 12px; border-radius: 8px; font-size: 13px; display: block; word-break: break-all; margin: 15px 0; color: #f5f5f7; }
          p { color: #86868b; font-size: 14px; line-height: 1.6; }
          a { color: #2997ff; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="card">
          <h2>Berhasil Terhubung ke Spotify!</h2>
          <p>Salin baris berikut dan tempelkan ke file <code>.env.local</code> di folder proyek Anda:</p>
          <code>SPOTIFY_REFRESH_TOKEN=${refreshToken}</code>
          <p>Setelah disimpan, restart server dev (atau biarkan Next.js membaca ulang file) dan widget <strong>Now Playing</strong> akan langsung menampilkan lagu yang sedang Anda putar secara otomatis.</p>
          <p><a href="/">← Kembali ke Portfolio</a></p>
        </div>
      </body>
      </html>
    `;

    return new NextResponse(html, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  } catch (err) {
    console.error("Callback error:", err);
    return new NextResponse(`<h3>Terjadi kesalahan:</h3><pre>${String(err)}</pre>`, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }
}
