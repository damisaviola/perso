import { NextResponse, userAgent } from "next/server";
import type { NextRequest } from "next/server";

// Interface untuk data detail pengunjung dan perangkat
interface VisitorDeviceInfo {
  deviceType: string;
  deviceModel: string;
  os: string;
  architecture: string;
  browser: string;
  engine: string;
  themeMode?: string;
  saveData?: boolean;
  isBot: boolean;
  visitorStatus: string;
  ip: string;
  country: string;
  countryFlag: string;
  city: string;
  region: string;
  timezone: string;
  locationText: string;
  path: string;
  referer: string;
  language: string;
  time: string;
  formattedTime: string;
  rawUserAgent: string;
}

// Konversi kode negara 2 huruf ke emoji bendera (misal "ID" -> 🇮🇩)
function getCountryFlag(countryCode?: string): string {
  if (!countryCode || countryCode.length !== 2 || countryCode.toUpperCase() === "LOCAL") {
    return "🌐";
  }
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

// Ekstraksi data mendalam perangkat dari request headers & User-Agent
function parseDetailedVisitorInfo(request: NextRequest): VisitorDeviceInfo {
  const ua = userAgent(request);
  const rawUserAgent = request.headers.get("user-agent") || "Peramban Tidak Diketahui";

  // Client Hints (Sec-CH-UA) yang dikirimkan oleh browser Chromium & modern
  const secChPlatform = (request.headers.get("sec-ch-ua-platform") || "").replace(/"/g, "");
  const secChPlatformVersion = (request.headers.get("sec-ch-ua-platform-version") || "").replace(/"/g, "");
  const secChModel = (request.headers.get("sec-ch-ua-model") || "").replace(/"/g, "");
  const secChMobile = request.headers.get("sec-ch-ua-mobile");
  const secChArch = (request.headers.get("sec-ch-ua-arch") || "").replace(/"/g, "");
  const secChBitness = (request.headers.get("sec-ch-ua-bitness") || "").replace(/"/g, "");
  const prefersColorScheme = request.headers.get("sec-ch-prefers-color-scheme");
  const saveDataHeader = request.headers.get("save-data");

  // 1. Sistem Operasi (OS) & Deteksi Cerdas Windows 11
  let osName = ua.os.name || secChPlatform || "Tidak Diketahui";
  let osVersion = ua.os.version || "";

  if (osName.toLowerCase() === "windows") {
    if (secChPlatformVersion) {
      const major = parseInt(secChPlatformVersion.split(".")[0], 10);
      if (major >= 13) {
        osName = "Windows 11";
        osVersion = "";
      } else if (major > 0) {
        osName = "Windows 10";
        osVersion = "";
      }
    } else if (osVersion === "10") {
      osName = "Windows 10 / 11";
      osVersion = "";
    }
  } else if (osName.toLowerCase() === "mac os" || osName.toLowerCase() === "macos") {
    osName = "macOS";
  }

  const fullOs = osVersion ? `${osName} ${osVersion}` : osName;

  // 2. Kategori Perangkat (Device Form Factor)
  let typeLabel = "💻 Komputer (Desktop / Laptop)";
  const devType = ua.device.type;
  if (devType === "mobile" || secChMobile === "?1" || /iphone|android.*mobile|windows phone/i.test(rawUserAgent)) {
    typeLabel = "📱 Smartphone (Mobile)";
  } else if (devType === "tablet" || /ipad|android(?!.*mobile)|tablet/i.test(rawUserAgent)) {
    typeLabel = "📱 Tablet / iPad";
  } else if (devType === "smarttv" || /smart-tv|googletv|appletv/i.test(rawUserAgent)) {
    typeLabel = "📺 Smart TV";
  } else if (devType === "console" || /playstation|xbox|nintendo/i.test(rawUserAgent)) {
    typeLabel = "🎮 Konsol Game";
  } else if (devType === "wearable") {
    typeLabel = "⌚ Smartwatch / Wearable";
  }

  // 3. Brand & Model Perangkat
  let vendor = ua.device.vendor || "";
  let model = ua.device.model || secChModel || "";

  if (!vendor && !model) {
    if (/iphone/i.test(rawUserAgent)) {
      vendor = "Apple";
      model = "iPhone";
    } else if (/ipad/i.test(rawUserAgent)) {
      vendor = "Apple";
      model = "iPad";
    } else if (/macintosh|mac os x/i.test(rawUserAgent)) {
      vendor = "Apple";
      model = "Mac (MacBook / iMac / Mac mini)";
    } else if (/windows/i.test(rawUserAgent)) {
      vendor = "PC";
      model = "Windows Device";
    } else if (/android/i.test(rawUserAgent)) {
      vendor = "Android";
      model = "Perangkat Android";
    }
  }

  const deviceModel = model
    ? vendor && !model.toLowerCase().includes(vendor.toLowerCase())
      ? `${vendor} ${model}`
      : model
    : vendor || "Perangkat Generik";

  // 4. Arsitektur CPU & Bitness
  const arch = ua.cpu.architecture || secChArch || "";
  const bitness =
    secChBitness ||
    (/win64|x64|wow64|x86_64|amd64/i.test(rawUserAgent)
      ? "64"
      : /i686|i386|x86/i.test(rawUserAgent)
      ? "32"
      : "");

  let archDisplay = "Tidak Terdeteksi";
  if (arch === "amd64" || arch === "x86_64" || (arch === "x86" && bitness === "64")) {
    archDisplay = "64-bit (x86_64 / AMD64)";
  } else if (arch === "arm64" || /arm64|aarch64/i.test(rawUserAgent)) {
    archDisplay = "64-bit (ARM64 / Apple Silicon / Snapdragon)";
  } else if (/iphone|ipad/i.test(rawUserAgent)) {
    archDisplay = "64-bit ARM (Apple Silicon A-Series)";
  } else if (bitness === "64") {
    archDisplay = "64-bit";
  } else if (bitness === "32") {
    archDisplay = "32-bit (x86)";
  }

  // 5. Peramban (Browser) & Mesin Rendering
  let browserName = ua.browser.name || "Peramban Tidak Dikenal";
  if (/edg\//i.test(rawUserAgent)) browserName = "Microsoft Edge";
  else if (/brave/i.test(rawUserAgent) || (request.headers.get("sec-ch-ua") || "").includes("Brave"))
    browserName = "Brave Browser";
  else if (/opr\/|opera/i.test(rawUserAgent)) browserName = "Opera";
  else if (/samsungbrowser/i.test(rawUserAgent)) browserName = "Samsung Internet";
  else if (/arc\//i.test(rawUserAgent)) browserName = "Arc Browser";

  const browserVersion = ua.browser.version || "";
  const fullBrowser = browserVersion ? `${browserName} v${browserVersion}` : browserName;

  const engineName = ua.engine.name || "";
  const engineVersion = ua.engine.version || "";
  const fullEngine = engineName
    ? engineVersion
      ? `${engineName} v${engineVersion}`
      : engineName
    : "Tidak Terdeteksi";

  // 6. Preferensi Tampilan & Penghemat Data
  let themeMode = undefined;
  if (prefersColorScheme === "dark") themeMode = "🌙 Gelap (Dark)";
  else if (prefersColorScheme === "light") themeMode = "☀️ Terang (Light)";

  const saveData = saveDataHeader === "on";

  // 7. Status Pengunjung & Deteksi Bot
  const isBot = ua.isBot || /bot|crawler|spider|curl|postman|lighthouse/i.test(rawUserAgent);
  let visitorStatus = "👤 Pengguna Asli (Bukan Bot)";
  if (isBot) {
    const botMatch = rawUserAgent.match(
      /(googlebot|discordbot|bingbot|slurp|duckduckbot|baiduspider|yandex|telegrambot|whatsapp|twitterbot|facebookexternalhit|lighthouse)/i
    );
    visitorStatus = `🤖 Bot / Web Crawler (${botMatch ? botMatch[0] : "Web Bot"})`;
  }

  // 8. IP & Lokasi Geografis (Vercel / Cloudflare / Proxy)
  const forwarded = request.headers.get("x-forwarded-for");
  const cfConnectingIp = request.headers.get("cf-connecting-ip");
  const realIp = request.headers.get("x-real-ip");
  const ip = cfConnectingIp || (forwarded ? forwarded.split(",")[0].trim() : realIp) || "127.0.0.1";

  const countryCode =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    (ip === "127.0.0.1" || ip === "::1" ? "Local" : "");
  const countryFlag = getCountryFlag(countryCode);
  const city =
    request.headers.get("x-vercel-ip-city") ||
    request.headers.get("cf-ipcity") ||
    (countryCode === "Local" ? "Localhost" : "");
  const region = request.headers.get("x-vercel-ip-country-region") || request.headers.get("cf-region") || "";
  const timezone =
    request.headers.get("x-vercel-ip-timezone") || request.headers.get("cf-timezone") || "Asia/Jakarta";

  let locationText = "Tidak diketahui";
  if (countryCode === "Local") {
    locationText = "🏠 Local Development (Mesin Lokal)";
  } else if (city || countryCode) {
    const locParts = [city, region, countryCode].filter(Boolean);
    locationText = `${countryFlag} ${locParts.join(", ")}`;
  }

  // 9. Rute Halaman, Sumber (Referer), & Bahasa
  const path = request.nextUrl.pathname;
  const rawReferer = request.headers.get("referer") || "";
  let referer = "Langsung / Direct (Tanpa Referer)";
  if (rawReferer) {
    try {
      const refUrl = new URL(rawReferer);
      referer = `${refUrl.hostname}${refUrl.pathname !== "/" ? refUrl.pathname : ""}`;
    } catch {
      referer = rawReferer;
    }
  }

  const acceptLanguage = request.headers.get("accept-language") || "";
  const language = acceptLanguage
    ? acceptLanguage.split(";")[0].split(",").slice(0, 2).join(", ")
    : "Tidak ditentukan";

  const now = new Date();
  const time = now.toISOString();
  let formattedTime = "";
  try {
    formattedTime =
      new Intl.DateTimeFormat("id-ID", {
        dateStyle: "medium",
        timeStyle: "medium",
        timeZone: timezone || "Asia/Jakarta",
      }).format(now) + ` (${timezone || "WIB"})`;
  } catch {
    formattedTime = `${now.toLocaleString("id-ID")} (${timezone || "WIB"})`;
  }

  return {
    deviceType: typeLabel,
    deviceModel,
    os: fullOs,
    architecture: archDisplay,
    browser: fullBrowser,
    engine: fullEngine,
    themeMode,
    saveData,
    isBot,
    visitorStatus,
    ip,
    country: countryCode,
    countryFlag,
    city,
    region,
    timezone,
    locationText,
    path,
    referer,
    language,
    time,
    formattedTime,
    rawUserAgent,
  };
}

// Helper untuk mengirim notifikasi ke Discord Webhook secara asynchronous
async function sendDiscordAlert(webhookUrl: string, info: VisitorDeviceInfo) {
  try {
    // Penentuan warna embed bertema Cyber / Matrix:
    // Matrix Neon Green (0x00FF66) untuk desktop, Neon Cyan (0x00E5FF) untuk mobile, Neon Amber (0xFFA500) untuk bot
    let embedColor = 0x00FF66;
    let embedTitle = "⚡ [INBOUND CONNECTION] HOST INTERCEPTED";

    if (info.isBot) {
      embedColor = 0xFFA500;
      embedTitle = "⚠️ [AUTOMATED ANOMALY] WEB CRAWLER DETECTED";
    } else if (info.deviceType.includes("Smartphone")) {
      embedColor = 0x00E5FF;
      embedTitle = "⚡ [INBOUND CONNECTION] MOBILE TARGET INTERCEPTED";
    } else if (info.deviceType.includes("Tablet")) {
      embedColor = 0x00B0FF;
      embedTitle = "⚡ [INBOUND CONNECTION] TABLET NODE INTERCEPTED";
    }

    // Truncate UA agar tidak melebihi limit 1024 karakter Discord field
    const safeUa =
      info.rawUserAgent.length > 900 ? info.rawUserAgent.slice(0, 900) + "..." : info.rawUserAgent;

    const deviceFieldLines = [
      `• **Kategori:** ${info.deviceType}`,
      `• **Hardware:** \`${info.deviceModel}\``,
      `• **Arsitektur:** \`${info.architecture}\``,
    ];

    const osFieldLines = [
      `• **Operating System:** \`${info.os}\``,
      `• **CPU Platform:** \`${info.architecture}\``,
    ];

    const browserFieldLines = [
      `• **Client Software:** \`${info.browser}\``,
      `• **Core Engine:** \`${info.engine}\``,
    ];
    if (info.themeMode) {
      browserFieldLines.push(`• **UI Theme:** ${info.themeMode}`);
    }
    if (info.saveData) {
      browserFieldLines.push(`• **Data Saver:** ⚡ Active`);
    }

    const networkFieldLines = [
      `• **Source IP:** \`${info.ip}\``,
      `• **Endpoint Target:** \`${info.path}\``,
      `• **Origin Trace:** \`${info.referer}\``,
    ];

    const locationFieldLines = [
      `• **Origin Node:** ${info.locationText}`,
      `• **Grid Timezone:** \`${info.timezone}\``,
      `• **Intercept Time:** ${info.formattedTime}`,
    ];

    const clientFieldLines = [
      `• **Entity:** ${info.visitorStatus}`,
      `• **Accept Language:** \`${info.language}\``,
    ];

    const fields = [
      {
        name: "🖥️ [TARGET DEVICE / HARDWARE]",
        value: deviceFieldLines.join("\n"),
        inline: true,
      },
      {
        name: "⚙️ [SYSTEM KERNEL & OS]",
        value: osFieldLines.join("\n"),
        inline: true,
      },
      {
        name: "🌐 [CLIENT & RENDERING ENGINE]",
        value: browserFieldLines.join("\n"),
        inline: false,
      },
      {
        name: "📍 [GEOLOCATION NODE & TIME]",
        value: locationFieldLines.join("\n"),
        inline: true,
      },
      {
        name: "🌐 [NETWORK & ROUTING TRACE]",
        value: networkFieldLines.join("\n"),
        inline: true,
      },
      {
        name: "🛡️ [ENTITY PROFILE & STATUS]",
        value: clientFieldLines.join("\n"),
        inline: false,
      },
      {
        name: "📋 [RAW PAYLOAD / USER-AGENT]",
        value: `\`\`\`\n${safeUa}\n\`\`\``,
        inline: false,
      },
    ];

    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            title: embedTitle,
            description: `> **[STATUS: 200 OK] // INCOMING PACKET INTERCEPTED**\n> Node: **${info.locationText}** | Target: \`${info.path}\` | Host: \`${info.deviceModel}\` (${info.os})`,
            color: embedColor,
            fields,
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
async function sendTelegramAlert(token: string, chatId: string, info: VisitorDeviceInfo) {
  try {
    const text =
      `⚡ <b>[INBOUND CONNECTION INTERCEPTED]</b>\n\n` +
      `🎯 <b>Endpoint Target:</b> <code>${info.path}</code>\n` +
      `🖥️ <b>Host Hardware:</b> ${info.deviceType} - <code>${info.deviceModel}</code>\n` +
      `⚙️ <b>Kernel OS:</b> <code>${info.os}</code> (${info.architecture})\n` +
      `🌐 <b>Client Software:</b> <code>${info.browser}</code> (${info.engine})\n` +
      `📍 <b>Origin Node:</b> ${info.locationText}\n` +
      `🌐 <b>Source IP:</b> <code>${info.ip}</code>\n` +
      `🧭 <b>Routing Origin:</b> <code>${info.referer}</code>\n` +
      `🗣️ <b>Accept Language:</b> <code>${info.language}</code>\n` +
      `🛡️ <b>Entity Classification:</b> ${info.visitorStatus}\n` +
      `⏰ <b>Intercept Timestamp:</b> ${info.formattedTime}`;

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
  // Ekstraksi data lengkap pengunjung & perangkat
  const visitorInfo = parseDetailedVisitorInfo(request);

  // Tampilkan log rapi di terminal server / Vercel Runtime Logs
  console.log(
    `[Pengunjung] ${visitorInfo.formattedTime} | Perangkat: ${visitorInfo.deviceModel} (${visitorInfo.os}) | IP: ${visitorInfo.ip} | Lokasi: ${visitorInfo.locationText} | Halaman: ${visitorInfo.path}`
  );

  // Kirim notifikasi webhook jika disetting di .env.local (fire-and-forget)
  const discordWebhook = process.env.DISCORD_WEBHOOK_URL;
  if (discordWebhook) {
    sendDiscordAlert(discordWebhook, visitorInfo);
  }

  const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;
  if (telegramToken && telegramChatId) {
    sendTelegramAlert(telegramToken, telegramChatId, visitorInfo);
  }

  return NextResponse.next();
}

// Konfigurasi Matcher: Hanya pantau rute halaman utama, abaikan aset statis internal
export const config = {
  matcher: [
    /*
     * Mengecualikan:
     * - api (route handler internal seperti /api/projects, /api/letterboxd)
     * - _next/static (file statis bundler)
     * - _next/image (optimasi gambar Next.js)
     * - favicon.ico, robots.txt, sitemap.xml
     * - ekstensi file gambar dan dokumen umum
     */
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};
