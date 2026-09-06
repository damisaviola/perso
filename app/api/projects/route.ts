import { NextResponse } from "next/server";

export const revalidate = 3600; // Cache for 1 hour

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  fork: boolean;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  languages_url: string;
  pushed_at: string;
  topics?: string[];
}

const DEFAULT_DESCRIPTIONS: Record<string, string> = {
  expenseflow: "ExpenseFlow - Personal Financial Management SaaS untuk pencatatan dan analisis keuangan pribadi secara terstruktur.",
  "ormas-kesbangpolmimika": "Sistem informasi pengelolaan data dan verifikasi organisasi kemasyarakatan (Ormas) pada Bakesbangpol Kabupaten Mimika.",
  loktim: "Aplikasi web interaktif Loktim dengan performa cepat, antarmuka modern, dan terintegrasi dengan Vercel.",
};

const FALLBACK_PROJECTS = [
  {
    id: "expenseflow",
    title: "ExpenseFlow",
    category: "Web App",
    badge: "TERBARU",
    description: "ExpenseFlow - Personal Financial Management SaaS untuk pencatatan dan analisis keuangan pribadi secara terstruktur.",
    longDescription: "Aplikasi SaaS manajemen keuangan pribadi yang memfasilitasi pelacakan pengeluaran, budgeting, serta visualisasi arus kas dengan antarmuka yang bersih dan interaktif.",
    techStack: ["JavaScript", "Svelte", "TypeScript", "CSS"],
    liveUrl: "https://github.com/damisaviola/expenseflow",
    githubUrl: "https://github.com/damisaviola/expenseflow",
    bgColor: "#0ea5e9",
    accentColor: "#0284c7",
    stars: 0,
    pushedAt: "2026-09-03",
  },
  {
    id: "ormas-kesbangpolmimika",
    title: "Ormas Kesbangpol Mimika",
    category: "Web App",
    badge: "TERBARU",
    description: "Sistem informasi pengelolaan data dan verifikasi organisasi kemasyarakatan (Ormas) pada Bakesbangpol Kabupaten Mimika.",
    longDescription: "Sistem informasi berbasis web yang memfasilitasi administrasi, pendaftaran, dan verifikasi berkas organisasi masyarakat di wilayah Kesbangpol Mimika.",
    techStack: ["TypeScript", "CSS", "JavaScript"],
    liveUrl: "https://github.com/damisaviola/ormas-kesbangpolmimika",
    githubUrl: "https://github.com/damisaviola/ormas-kesbangpolmimika",
    bgColor: "#3b82f6",
    accentColor: "#1d4ed8",
    stars: 0,
    pushedAt: "2026-08-31",
  },
  {
    id: "loktim",
    title: "Loktim",
    category: "Web App",
    badge: "TERBARU",
    description: "Aplikasi web interaktif Loktim dengan performa cepat, antarmuka modern, dan terintegrasi dengan Vercel.",
    longDescription: "Aplikasi web modern Loktim yang dibangun menggunakan TypeScript dan dideploy pada platform Vercel dengan optimasi performa tinggi.",
    techStack: ["TypeScript", "JavaScript", "CSS", "Vercel"],
    liveUrl: "https://loktim.vercel.app",
    githubUrl: "https://github.com/damisaviola/loktim",
    bgColor: "#8b5cf6",
    accentColor: "#6d28d9",
    stars: 0,
    pushedAt: "2026-08-26",
  },
];

function formatTitle(name: string): string {
  if (name.toLowerCase() === "expenseflow") return "ExpenseFlow";
  if (name.toLowerCase() === "ormas-kesbangpolmimika") return "Ormas Kesbangpol Mimika";
  if (name.toLowerCase() === "loktim") return "Loktim";
  return name
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function GET() {
  try {
    const res = await fetch(
      "https://api.github.com/users/damisaviola/repos?sort=pushed&per_page=12",
      {
        headers: {
          "User-Agent": "damisaviola-portfolio",
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      console.warn("GitHub API responded with status:", res.status);
      return NextResponse.json({ projects: FALLBACK_PROJECTS });
    }

    const repos: GitHubRepo[] = await res.json();

    // Filter out forks and portfolio/profile repos, taking the top 3 latest
    const filteredRepos = repos
      .filter(
        (repo) =>
          !repo.fork &&
          repo.name.toLowerCase() !== "perso" &&
          repo.name.toLowerCase() !== "damisaviola"
      )
      .slice(0, 3);

    const projects = await Promise.all(
      filteredRepos.map(async (repo, index) => {
        let techStack = [repo.language].filter(Boolean) as string[];

        try {
          const langRes = await fetch(repo.languages_url, {
            headers: { "User-Agent": "damisaviola-portfolio" },
            next: { revalidate: 3600 },
          });
          if (langRes.ok) {
            const langs = await langRes.json();
            const keys = Object.keys(langs);
            if (keys.length > 0) {
              techStack = keys.slice(0, 4);
            }
          }
        } catch {
          // fallback to repo.language
        }

        const title = formatTitle(repo.name);
        const description =
          repo.description ||
          DEFAULT_DESCRIPTIONS[repo.name] ||
          `Repositori ${title} yang dikembangkan oleh Damianus Saviola di GitHub.`;

        return {
          id: repo.name,
          title,
          category: repo.language || "Web App",
          badge: index === 0 ? "TERBARU" : "RECENT",
          description,
          longDescription: description,
          techStack: techStack.length > 0 ? techStack : ["TypeScript", "Web"],
          liveUrl: repo.homepage || repo.html_url,
          githubUrl: repo.html_url,
          bgColor: "#1d1d1f",
          accentColor: "#0071e3",
          stars: repo.stargazers_count,
          pushedAt: repo.pushed_at,
        };
      })
    );

    return NextResponse.json({
      projects: projects.length > 0 ? projects : FALLBACK_PROJECTS,
    });
  } catch (error) {
    console.error("Error fetching GitHub projects:", error);
    return NextResponse.json({ projects: FALLBACK_PROJECTS });
  }
}
