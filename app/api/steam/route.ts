import { NextResponse } from "next/server";

export const revalidate = 1800; // Cache for 30 minutes

interface SteamGame {
  name: string;
  link: string;
  icon: string;
  logo: string;
  hoursPlayed2Wk: string;
  hoursOnRecord: string;
}

interface SteamProfile {
  steamID: string;
  customURL: string;
  onlineState: string;
  stateMessage: string;
  avatar: string;
  memberSince: string;
  hoursPlayed2Wk: string;
  games: SteamGame[];
}

const FALLBACK_PROFILE: SteamProfile = {
  steamID: "damisaviola",
  customURL: "damisaviola",
  onlineState: "offline",
  stateMessage: "Offline",
  avatar: "https://avatars.fastly.steamstatic.com/007e9f3cc3c05f2af16be74d567c26bb34617c42_full.jpg",
  memberSince: "December 21, 2022",
  hoursPlayed2Wk: "0.0",
  games: [
    {
      name: "Marvel Rivals",
      link: "https://steamcommunity.com/app/2767030",
      icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2767030/839b4712925b95702ca56e0c4d399adf54f4d617.jpg",
      logo: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2767030/f77a7018444fbf8bd96dd79de42b4f5d6603d236/capsule_184x69.jpg?t=1786093208",
      hoursPlayed2Wk: "24.9",
      hoursOnRecord: "742",
    },
    {
      name: "Apex Legends",
      link: "https://steamcommunity.com/app/1172470",
      icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/1172470/8986dd626da56db5f3fe09bc1b8871739de8b00d.jpg",
      logo: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1172470/9d25b2de9ae52a1ec06797daeaf700feba1459cc/capsule_184x69.jpg?t=1786031871",
      hoursPlayed2Wk: "2.9",
      hoursOnRecord: "150",
    },
    {
      name: "Database Detective: Minor Crimes Division Demo",
      link: "https://steamcommunity.com/app/4248450",
      icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/4248450/05908d206c4b91d5d5e59ea5b52a15dd6773c3ac.jpg",
      logo: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4248450/abba12ba96dac7b570d818bc8c7c6ffb719b6d86/capsule_184x69.jpg?t=1773473288",
      hoursPlayed2Wk: "2.2",
      hoursOnRecord: "2.2",
    },
  ],
};

function extractTag(tag: string, text: string): string {
  const m = text.match(new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tag}>`));
  return m ? m[1].trim() : "";
}

export async function GET() {
  const profileUrls = [
    "https://steamcommunity.com/id/damisaviola/?xml=1",
    "https://steamcommunity.com/profiles/76561199446834372/?xml=1",
    "https://steamcommunity.com/id/damimaturbongs/?xml=1",
  ];

  for (const url of profileUrls) {
    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          Accept: "application/xml, text/xml, */*",
        },
        next: { revalidate: 1800 },
      });

      if (!res.ok) continue;

      const xml = await res.text();
      if (xml.includes("<error>")) continue;

      const steamID = extractTag("steamID", xml) || "damisaviola";
      const customURL = extractTag("customURL", xml) || "damisaviola";
      const onlineState = extractTag("onlineState", xml) || "offline";
      const stateMessage = extractTag("stateMessage", xml) || "Offline";
      const avatar = extractTag("avatarFull", xml) || extractTag("avatarMedium", xml);
      const memberSince = extractTag("memberSince", xml);
      const hoursPlayed2Wk = extractTag("hoursPlayed2Wk", xml);

      const games: SteamGame[] = [];
      const gameRegex = /<mostPlayedGame>([\s\S]*?)<\/mostPlayedGame>/g;
      let match;

      while ((match = gameRegex.exec(xml)) !== null) {
        const block = match[1];
        const name = extractTag("gameName", block);
        if (!name) continue;

        games.push({
          name,
          link: extractTag("gameLink", block),
          icon: extractTag("gameIcon", block),
          logo: extractTag("gameLogo", block),
          hoursPlayed2Wk: extractTag("hoursPlayed", block),
          hoursOnRecord: extractTag("hoursOnRecord", block),
        });
      }

      return NextResponse.json({
        profile: {
          steamID,
          customURL,
          onlineState,
          stateMessage,
          avatar: avatar || FALLBACK_PROFILE.avatar,
          memberSince: memberSince || FALLBACK_PROFILE.memberSince,
          hoursPlayed2Wk: hoursPlayed2Wk || "0.0",
          games: games.length > 0 ? games : FALLBACK_PROFILE.games,
        },
      });
    } catch (err) {
      console.warn(`Failed to fetch steam profile from ${url}:`, err);
    }
  }

  return NextResponse.json({ profile: FALLBACK_PROFILE });
}
