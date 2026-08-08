import GoLogo from "../assets/logo/Go-Logo_LightBlue.png";
import LaravelLogo from "../assets/logo/Laravel.svg.webp";
import PHPLogo from "../assets/logo/PHP-logo.svg.webp";
import CodeIgniterLogo from "../assets/logo/codeigniter_plain_logo_icon_146591.webp";
import DockerLogo from "../assets/logo/docker.png";
import HTMLLogo from "../assets/logo/html logo.png";
import JSLogo from "../assets/logo/javascript.webp";
import MySQLLogo from "../assets/logo/mysql.webp";
import NextLogo from "../assets/logo/next_js_145038.webp";
import NuxtLogo from "../assets/logo/nuxjs.webp";
import PostgreSQLLogo from "../assets/logo/postgresql.webp";
import ReactLogo from "../assets/logo/reactjs.webp";
import SupabaseLogo from "../assets/logo/supabase.webp";
import TSLogo from "../assets/logo/typescript.webp";
import VueLogo from "../assets/logo/vuejs.webp";
import { StaticImageData } from "next/image";

export interface Project {
  id: string;
  title: string;
  category: "Web App" | "Mobile" | "UI/UX" | "AI";
  badge: "NEW" | "FEATURED" | "BEST" | "OPEN SOURCE";
  description: string;
  longDescription: string;
  image: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  bgColor: string;
  accentColor: string;
}

export interface Skill {
  name: string;
  category: "Frontend" | "Backend" | "Database" | "Framework" | "Design" | "DevOps" | "AI Tools";
  level: number;
  iconName: string;
  color: string;
  experience: string;
  logo?: StaticImageData;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  techStack: string[];
  color: string;
  iconName: string;
  logo?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  color: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
  color: string;
}

export interface BlogPost {
  id: string;
  title: string;
  snippet: string;
  readTime: string;
  date: string;
  category: string;
  color: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  color: string;
}

// Portfolio Data
export const PORTFOLIO_DATA = {
  personal: {
    name: "Damianus Saviola Maturbongs",
    shortName: "Damianus Saviola",
    brandName: "DAMIANUS",
    initials: "DSM",
    roleTitles: [
      "Creative Frontend Developer",
      "UI Engineer",
      "Creative Coder",
      "Design Systems Specialist",
    ],
    bio: "Lulusan S1 Sistem Informasi (Digital Bisnis) dengan IPK 3.88/4.00 dan pengalaman dalam lebih dari 3 proyek pengembangan aplikasi web. Memiliki keahlian dalam web development, analisis sistem, serta kolaborasi tim lintas fungsi.",
    location: "Yogyakarta, Indonesia",
    experienceYears: "3+ Proyek Web",
    completedProjects: "3+",
    happyClients: "100%",
    linesOfCode: "50K+",
    email: "damimaturbongs@gmail.com",
    github: "https://github.com/damisaviola",
    linkedin: "https://linkedin.com/in/damimaturbongs",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    whatsapp: "https://wa.me/6281240585292",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
  },
  skills: [
    { name: "Next.js", category: "Frontend", level: 90, iconName: "Layers", color: "#111111", experience: "2 thn", logo: NextLogo },
    { name: "React", category: "Frontend", level: 90, iconName: "Layers", color: "#06B6D4", experience: "2 thn", logo: ReactLogo },
    { name: "Vue.js", category: "Frontend", level: 85, iconName: "Globe", color: "#42b883", experience: "1 thn", logo: VueLogo },
    { name: "Nuxt.js", category: "Frontend", level: 80, iconName: "Globe", color: "#00DC82", experience: "1 thn", logo: NuxtLogo },
    { name: "TypeScript", category: "Frontend", level: 85, iconName: "Code2", color: "#3178C6", experience: "2 thn", logo: TSLogo },
    { name: "JavaScript", category: "Frontend", level: 90, iconName: "Code2", color: "#F7DF1E", experience: "3 thn", logo: JSLogo },
    { name: "HTML5", category: "Frontend", level: 95, iconName: "FileCode", color: "#E34F26", experience: "3 thn", logo: HTMLLogo },
    { name: "Laravel", category: "Backend", level: 85, iconName: "Server", color: "#FF2D20", experience: "2 thn", logo: LaravelLogo },
    { name: "PHP", category: "Backend", level: 85, iconName: "Server", color: "#777BB4", experience: "3 thn", logo: PHPLogo },
    { name: "CodeIgniter", category: "Backend", level: 80, iconName: "Server", color: "#EE4323", experience: "2 thn", logo: CodeIgniterLogo },
    { name: "Golang", category: "Backend", level: 80, iconName: "Terminal", color: "#00ADD8", experience: "1 thn", logo: GoLogo },
    { name: "MySQL", category: "Database", level: 85, iconName: "Database", color: "#4479A1", experience: "2 thn", logo: MySQLLogo },
    { name: "PostgreSQL", category: "Database", level: 80, iconName: "Database", color: "#336791", experience: "1 thn", logo: PostgreSQLLogo },
    { name: "Supabase", category: "Database", level: 85, iconName: "Cloud", color: "#3ECF8E", experience: "2 thn", logo: SupabaseLogo },
    { name: "Docker", category: "DevOps", level: 80, iconName: "Terminal", color: "#2496ED", experience: "2 thn", logo: DockerLogo },
  ] as Skill[],

  projects: [
    {
      id: "futsal-booking",
      title: "Sistem Informasi Lapangan Futsal",
      category: "Web App",
      badge: "FEATURED",
      description: "Sistem informasi berbasis web menggunakan Laravel dan MySQL untuk pengelolaan jadwal, pemesanan lapangan, dan data membership.",
      longDescription: "Aplikasi manajemen pemesanan lapangan futsal yang mempermudah admin mengelola jadwal ketersediaan lapangan, transaksi pembayaran, serta sistem membership pelanggan. Dibangun menggunakan arsitektur MVC pada framework Laravel.",
      image: "https://images.unsplash.com/photo-1518605368461-1ee7c515a452?auto=format&fit=crop&w=800&q=80",
      techStack: ["Laravel", "MySQL", "PHP", "Bootstrap 5"],
      liveUrl: "https://github.com/damisaviola",
      githubUrl: "https://github.com/damisaviola",
      bgColor: "#22C55E",
      accentColor: "#111111",
    },
    {
      id: "sikoskar",
      title: "SIKOSKAR (Pemesanan Kos)",
      category: "Web App",
      badge: "BEST",
      description: "Aplikasi pemesanan kos Karangsari berbasis web menggunakan CodeIgniter dan MySQL.",
      longDescription: "Sistem Informasi Pemesanan Kos Karangsari (SIKOSKAR) dirancang untuk membantu pencari kos menemukan kamar yang tersedia, melihat fasilitas, serta melakukan reservasi secara online.",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
      techStack: ["CodeIgniter", "PHP", "MySQL", "HTML5"],
      liveUrl: "https://github.com/damisaviola",
      githubUrl: "https://github.com/damisaviola",
      bgColor: "#FFD60A",
      accentColor: "#111111",
    },
    {
      id: "web-paroki",
      title: "Website Paroki Babarsari",
      category: "Web App",
      badge: "NEW",
      description: "Pengembangan dan pengelolaan website Paroki Babarsari menggunakan WordPress.",
      longDescription: "Membangun lebih dari 5 fitur fungsional untuk website Paroki Babarsari, termasuk sistem artikel, pengumuman kegiatan gereja, serta manajemen konten komunitas agar informasi dapat tersampaikan dengan baik kepada umat.",
      image: "https://images.unsplash.com/photo-1438283173091-5dbf5c5a3206?auto=format&fit=crop&w=800&q=80",
      techStack: ["WordPress", "PHP", "CSS3"],
      liveUrl: "https://github.com/damisaviola",
      githubUrl: "https://github.com/damisaviola",
      bgColor: "#3B82F6",
      accentColor: "#FFFFFF",
    },
    {
      id: "timverse",
      title: "Timverse (Timika Verse)",
      category: "Web App",
      badge: "OPEN SOURCE",
      description: "Aplikasi berita berbasis web dengan fitur berita, autentikasi pengguna, dan integrasi database realtime.",
      longDescription: "Portal berita modern yang berfokus pada informasi daerah Timika, dibangun menggunakan Next.js App Router dan Supabase. Memiliki fitur real-time updates, user authentication untuk komentar, serta dashboard admin CMS.",
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80",
      techStack: ["Next.js", "Supabase", "React", "Tailwind CSS"],
      liveUrl: "https://github.com/damisaviola",
      githubUrl: "https://github.com/damisaviola",
      bgColor: "#EC4899",
      accentColor: "#111111",
    },
  ] as Project[],

  experiences: [
    {
      id: "exp-amcc",
      company: "Amikom Computer Club (AMCC)",
      role: "Anggota – Web Development (Frontend)",
      period: "2022 - 2025",
      description: "Aktif mengikuti pelatihan dan berkolaborasi dalam proyek pengembangan web di lingkungan kampus.",
      achievements: [
        "Mengikuti lebih dari 10 pelatihan dan sertifikasi internal terkait frontend web development.",
        "Berkolaborasi dalam tim lintas fungsi (frontend & backend) untuk merancang 2 proyek aplikasi web menggunakan Laravel dan Bootstrap 5.",
      ],
      techStack: ["Laravel", "Bootstrap 5", "HTML", "CSS"],
      color: "#FFD60A",
      iconName: "Code2",
      logo: "/assets/organisasi/amcc.png",
    },
    {
      id: "exp-gdg",
      company: "Google Developer Groups (GDG)",
      role: "Member – Divisi Pengembangan Web",
      period: "2023 - 2025",
      description: "Terlibat dalam komunitas developer global untuk peningkatan skill pengembangan web modern.",
      achievements: [
        "Mengikuti peningkatan kemampuan web development hingga 70% melalui lebih dari 8 workshop dan seminar teknologi.",
        "Membangun beberapa aplikasi web menggunakan Next.js, Angular, Golang, Firebase, dan Supabase sebagai hasil implementasi workshop.",
      ],
      techStack: ["Next.js", "Angular", "Golang", "Firebase", "Supabase"],
      color: "#3B82F6",
      iconName: "Globe",
      logo: "/assets/organisasi/google-developers.svg",
    },
    {
      id: "exp-kompari",
      company: "Komunitas Multimedia Paroki Babarsari (KOMPARI)",
      role: "Anggota – Divisi Pengembangan Web",
      period: "2023 - 2026",
      description: "Berperan dalam digitalisasi dan pengelolaan media informasi paroki melalui pengembangan website.",
      achievements: [
        "Membantu perancangan dan pengembangan 5+ fitur website Paroki Babarsari menggunakan WordPress.",
      ],
      techStack: ["WordPress", "PHP", "Web Design"],
      color: "#FF5A5F",
      iconName: "Layout",
      logo: "/assets/organisasi/kompari.jpg",
    },
    {
      id: "exp-ikna",
      company: "Ikatan Keluarga Nasrani Amikom (IKNA)",
      role: "Anggota",
      period: "2022 - 2024",
      description: "Berpartisipasi aktif dalam kegiatan komunitas mahasiswa kerohanian di lingkungan kampus.",
      achievements: [
        "Berpartisipasi aktif dan membantu kepanitiaan dalam menyukseskan 5+ event organisasi tahunan.",
      ],
      techStack: ["Event Management", "Team Collaboration"],
      color: "#22C55E",
      iconName: "Users",
    },
  ] as ExperienceItem[],

  services: [
    {
      id: "srv-frontend",
      title: "Frontend Development",
      description: "Pembuatan aplikasi web modern, responsif, dan ultra cepat berbasis Next.js, React, dan TypeScript.",
      deliverables: ["Clean Architecture", "Responsive Layout", "SEO Optimized", "Type Safety"],
      color: "#FFD60A",
      iconName: "Code2",
    },
    {
      id: "srv-ui-design",
      title: "UI Engineering & Design",
      description: "Perancangan antarmuka pengguna bernilai estetika tinggi, unik, dan berkarakter kuat (Neo Brutalism / Modern Minimalist).",
      deliverables: ["Figma Design File", "Design System", "Interactive Prototype", "Icon Sets"],
      color: "#EC4899",
      iconName: "Palette",
    },
    {
      id: "srv-landing",
      title: "High-Conversion Landing Page",
      description: "Landing page berdaya tarik tinggi yang memikat perhatian pengunjung dan mendorong tingkat konversi aksi.",
      deliverables: ["Copywriting Structure", "Fast Loading", "Form Integration", "A/B Ready"],
      color: "#3B82F6",
      iconName: "Rocket",
    },
    {
      id: "srv-company",
      title: "Website Perusahaan Modern",
      description: "Website profil bisnis berkelas internasional yang memancarkan kredibilitas, kreativitas, dan nilai profesional.",
      deliverables: ["CMS Ready", "Multi Language", "Analytics Integration", "Security SSL"],
      color: "#22C55E",
      iconName: "Building2",
    },
    {
      id: "srv-dashboard",
      title: "Interactive Web Dashboard",
      description: "Dashboard analitik dengan visualisasi data, chart interaktif, serta kendali real-time yang nyaman digunakan.",
      deliverables: ["Data Visualization", "Role Permissions", "Dark Mode", "Export PDF/CSV"],
      color: "#8B5CF6",
      iconName: "LayoutDashboard",
    },
    {
      id: "srv-mobile",
      title: "Mobile App Design System",
      description: "Perancangan UI/UX aplikasi iOS dan Android yang siap diimplementasikan oleh tim pengembang.",
      deliverables: ["Screen Flows", "Component Specs", "Micro Animations", "Assets Export"],
      color: "#06B6D4",
      iconName: "Smartphone",
    },
    {
      id: "srv-api",
      title: "API Integration & Backend",
      description: "Menghubungkan aplikasi web dengan REST API, GraphQL, payment gateway, dan layanan AI cloud secara aman.",
      deliverables: ["REST / GraphQL", "Authentication", "Stripe / Payment", "Database Sync"],
      color: "#FF9F1C",
      iconName: "Cpu",
    },
  ] as ServiceItem[],

  testimonials: [
    {
      id: "t-1",
      name: "Budi Santoso",
      role: "CEO & Founder",
      company: "TechNova ID",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      quote: "Damianus berhasil mengubah ide landing page kami menjadi karya visual Neo Brutalism yang luar biasa memukau. Tingkat konversi registrasi kami naik 40% dalam minggu pertama!",
      rating: 5,
      color: "#FFD60A",
    },
    {
      id: "t-2",
      name: "Jessica Tan",
      role: "Head of Product",
      company: "VibeApp Digital",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
      quote: "Penguasaan Damianus Saviola dalam Next.js, Framer Motion, dan detail micro-interactions benar-benar tiada tanding. Proyek kami selesai lebih cepat dari deadline!",
      rating: 5,
      color: "#3B82F6",
    },
    {
      id: "t-3",
      name: "Marcus Vance",
      role: "Creative Director",
      company: "HyperDesign Agency (US)",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      quote: "Working with Damianus Saviola was an absolute blast. His Neo Brutalism aesthetic is bold, clean, and extremely user-friendly. Highly recommended for top-tier creative coding!",
      rating: 5,
      color: "#EC4899",
    },
  ] as Testimonial[],

  blogs: [
    {
      id: "b-1",
      title: "Mengapa Neo Brutalism UI Menjadi Tren Desain Web Paling Berani Tahun Ini",
      snippet: "Eksplorasi alasan mengapa perpaduan garis hitam tebal, bayangan tajam, dan warna kontras mendobrak kejenuhan antarmuka serba minimalis.",
      readTime: "5 min read",
      date: "02 Aug 2026",
      category: "UI/UX Trend",
      color: "#FFD60A",
    },
    {
      id: "b-2",
      title: "Panduan Animasi Framer Motion + GSAP untuk Performa 60FPS di Next.js",
      snippet: "Teknik praktis menciptakan mikro-interaksi halus tanpa mengorbankan Core Web Vitals dan kecepatan rendering server.",
      readTime: "7 min read",
      date: "25 Jul 2026",
      category: "Frontend Dev",
      color: "#3B82F6",
    },
    {
      id: "b-3",
      title: "Membangun Design System Berbasis Tailwind CSS v4 dari Nol",
      snippet: "Bagaimana mengelola token warna, bayangan hard-edge, dan tipe huruf secara modular dan scalable untuk skala tim.",
      readTime: "6 min read",
      date: "12 Jul 2026",
      category: "Design System",
      color: "#22C55E",
    },
  ] as BlogPost[],

  faqs: [
    {
      question: "Apakah Anda menerima pengerjaan proyek freelance atau pembuatan website?",
      answer: "Ya! Selain sibuk dengan perkuliahan dan organisasi kampus, saya juga terbuka untuk kolaborasi proyek freelance, baik itu pembuatan company profile, sistem informasi, maupun aplikasi web lainnya.",
      color: "#FFD60A",
    },
    {
      question: "Mengapa memilih konsentrasi Digital Bisnis dalam studi Sistem Informasi?",
      answer: "Saya percaya bahwa aplikasi web yang sukses tidak hanya dilihat dari kehebatan kodenya, tetapi juga bagaimana solusi digital tersebut mampu menjawab kebutuhan bisnis dan memberikan dampak positif bagi penggunanya.",
      color: "#3B82F6",
    },
    {
      question: "Tech stack apa yang menjadi spesialisasi utama Anda?",
      answer: "Saya memiliki spesialisasi kuat di ekosistem frontend modern menggunakan Next.js dan React (dengan Tailwind CSS). Untuk backend, saya sangat terbiasa menggunakan PHP (Laravel/CodeIgniter) dan sesekali menggunakan Golang maupun BaaS seperti Firebase/Supabase.",
      color: "#EC4899",
    },
    {
      question: "Apakah Anda juga bisa melakukan perancangan desain (UI/UX)?",
      answer: "Tentu! Walaupun fokus utama saya adalah Web Development, saya sangat menyukai proses eksplorasi UI/UX (Web Design) dan selalu memastikan antarmuka yang saya bangun interaktif, bersih, serta memperhatikan prinsip-prinsip kemudahan pengguna (accessibility).",
      color: "#22C55E",
    },
  ] as FaqItem[],
};
