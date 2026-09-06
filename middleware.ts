import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Helper untuk mengirim notifikasi ke Discord Webhook secara asynchronous
async function sendDiscordAlert(webhookUrl: string, info: {
  ip: string;
  country: string;
  city: string;
  path: string;
  userAgent: string;
  time: string;
}) {
  try {
    const locationText = info.city ? `${info.city}, ${info.country}` : info.country || "Tidak diketahui";

    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            title: "🌐 Pengunjung Baru Terdeteksi",
            color: 2725887, // Apple Blue (#2997FF)
            fields: [
              { name: "Alamat IP", value: `\`${info.ip}\``, inline: true },
              { name: "Lokasi", value: locationText, inline: true },
              { name: "Halaman", value: `\`${info.path}\``, inline: false },
              { name: "Perangkat / Browser", value: info.userAgent, inline: false },
            ],
            footer: { text: "Portofolio Damianus Saviola • Visitor Monitor" },
            timestamp: info.time,
          },
        ],
      }),
    });
  } catch (err) {
    console.error("[Discord Webhook Error]:", err);
  }
}

// Helper untuk mengirim notifikasi ke Telegram Bot secara asynchronous
async function sendTelegramAlert(token: string, chatId: string, info: {
  ip: string;
  country: string;
  city: string;
  path: string;
  userAgent: string;
  time: string;
}) {
  try {
    const locationText = info.city ? `${info.city}, ${info.country}` : info.country || "Tidak diketahui";
    const text = `🌐 <b>Pengunjung Baru</b>\n\n` +
      `<b>IP:</b> <code>${info.ip}</code>\n` +
      `<b>Lokasi:</b> ${locationText}\n` +
      `<b>Halaman:</b> <code>${info.path}</code>\n` +
      `<b>Perangkat:</b> ${info.userAgent}`;

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
      }),
    });
  } catch (err) {
    console.error("[Telegram Alert Error]:", err);
  }
}

export async function middleware(request: NextRequest) {
  // 1. Dapatkan IP Asli Pengunjung (mendukung Cloudflare, Vercel, Nginx Proxy)
  const forwarded = request.headers.get("x-forwarded-for");
  const cfConnectingIp = request.headers.get("cf-connecting-ip");
  const realIp = request.headers.get("x-real-ip");
  const ip = cfConnectingIp || (forwarded ? forwarded.split(",")[0].trim() : realIp) || "127.0.0.1";

  // 2. Dapatkan Lokasi Geografis (disediakan otomatis oleh Vercel / Cloudflare)
  const country = request.headers.get("x-vercel-ip-country") || request.headers.get("cf-ipcountry") || "Local";
  const city = request.headers.get("x-vercel-ip-city") || request.headers.get("cf-ipcity") || "";

  // 3. Info Request
  const path = request.nextUrl.pathname;
  const userAgent = request.headers.get("user-agent") || "Peramban Tidak Diketahui";
  const time = new Date().toISOString();

  // 4. Tampilkan log rapi di terminal server / Vercel Runtime Logs
  console.log(
    `[Pengunjung] ${new Date().toLocaleTimeString("id-ID")} | IP: ${ip} | Lokasi: ${city ? `${city}, ` : ""}${country} | Halaman: ${path}`
  );

  // 5. Kirim notifikasi webhook jika disetting di .env.local
  const discordWebhook = process.env.DISCORD_WEBHOOK_URL;
  if (discordWebhook) {
    // Jalankan tanpa menghambat respon halaman (fire-and-forget)
    sendDiscordAlert(discordWebhook, { ip, country, city, path, userAgent, time });
  }

  const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;
  if (telegramToken && telegramChatId) {
    sendTelegramAlert(telegramToken, telegramChatId, { ip, country, city, path, userAgent, time });
  }

  return NextResponse.next();
}

// Konfigurasi Matcher: Hanya pantau rute halaman utama, abaikan aset statis internal
export const config = {
  matcher: [
    /*
     * Mengecualikan:
     * - _next/static (file statis bundler)
     * - _next/image (optimasi gambar Next.js)
     * - favicon.ico, robots.txt, sitemap.xml
     * - ekstensi file gambar dan dokumen umum
     */
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};
