export interface ProjectDetail {
  id: string;
  name: string;
  category: "Web App" | "Civic Tech" | "Enterprise" | "Open Source";
  badge: "FEATURED" | "BEST" | "NEW" | "CIVIC TECH";
  summary: string;
  problem: string;
  objectives: string;
  keyFeatures: string[];
  roleAndContribution: string;
  techStack: string[];
  architecture: string;
  challengesAndSolutions: string;
  learnings: string;
  liveUrl: string;
  githubUrl: string;
  color: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: "Frontend" | "Backend" | "Database" | "Tools";
  description: string;
  concreteUseCases: string;
  proficiencyLevel: "Advanced" | "Proficient" | "Working Knowledge";
  color: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  location: string;
  reward: string;
  xpReward: number;
}

export interface Collectible {
  id: string;
  name: string;
  description: string;
  x: number;
  y: number;
  color: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
  badge: string;
}

export interface LocationInfo {
  id: string;
  name: string;
  zone: string;
  coordinates: { x: number; y: number };
  description: string;
  details: string[];
}

export const GAME_DEVELOPER_DATA = {
  profile: {
    name: "Damianus Saviola Maturbongs",
    shortName: "Damianus Saviola",
    role: "Frontend Developer & UI Engineer",
    location: "Yogyakarta, Indonesia",
    tagline: "Explore my journey, skills, and projects.",
    bio: "Lulusan S1 Sistem Informasi (Digital Bisnis) dari Universitas Amikom Yogyakarta dengan IPK 3.88/4.00. Berfokus pada perancangan antarmuka web modern yang responsif, berarsitektur bersih, dan interaktif dengan ekosistem Next.js, React, Vue, dan TypeScript.",
    careerGoal: "Membangun produk web skala besar yang berkinerja tinggi, berestetika premium, dan memberikan dampak nyata bagi pengguna.",
    education: {
      university: "Universitas Amikom Yogyakarta",
      degree: "S1 Sistem Informasi (Konsentrasi Digital Bisnis)",
      period: "2022 — 2026",
      gpa: "3.88 / 4.00 (Summa Cum Laude Honors)",
    },
    contact: {
      email: "damimaturbongs@gmail.com",
      github: "https://github.com/damisaviola",
      linkedin: "https://linkedin.com/in/damimaturbongs",
      location: "Yogyakarta, Indonesia",
    },
  },

  quests: [
    {
      id: "quest_meet",
      title: "Awakening & The Developer's Codex",
      description: "Temui NPC Damianus di Home Village dan baca papan pengumuman untuk membuka kemampuan Dash (Shift/Space).",
      location: "Home Village",
      reward: "Developer Codex & Dash Ability",
      xpReward: 120,
    },
    {
      id: "quest_coffee",
      title: "The Coffee Overclock Heist",
      description: "Temukan Mesin Kopi Legendaris di dekat Lab Plaza untuk mengisi ulang stamina debugging Damianus.",
      location: "Lab Plaza",
      reward: "Caffeine Overclock Buff",
      xpReward: 150,
    },
    {
      id: "quest_puzzle",
      title: "Mainframe Debugger: Production Hotfix",
      description: "Pecahkan teka-teki debug di Terminal Utama Project Laboratory untuk menyelamatkan server dari crash.",
      location: "Project Laboratory",
      reward: "Production Master Key",
      xpReward: 250,
    },
    {
      id: "quest_skills",
      title: "Resonance of the Four Altars",
      description: "Aktifkan ke-4 Altar Keahlian di Skill Forest (Frontend, Backend, Database, DevOps).",
      location: "Skill Forest",
      reward: "Full-Stack Architect Crown",
      xpReward: 200,
    },
    {
      id: "quest_academy",
      title: "The Summa Cum Laude Archives",
      description: "Kunjungi Akademi Amikom dan bicaralah dengan Profesor untuk memeriksa arsip akademik IPK 3.88.",
      location: "Academy",
      reward: "Scholar Honor Laurel",
      xpReward: 150,
    },
    {
      id: "quest_crystals",
      title: "The Knowledge Crystal Hunt",
      description: "Kumpulkan kristal pengetahuan tersembunyi yang tersebar di seluruh penjuru pulau.",
      location: "Realm World",
      reward: "Knowledge Seeker Crest",
      xpReward: 200,
    },
    {
      id: "quest_tower",
      title: "Broadcast to the Realm",
      description: "Aktifkan menara pemancar Communication Tower untuk menyalin email atau meminta Curriculum Vitae (CV).",
      location: "Communication Tower",
      reward: "Guild Ambassador Badge",
      xpReward: 180,
    },
  ] as Quest[],

  debugPuzzle: {
    title: "MAINFRAME HOTFIX PROTOCOL",
    scenario: "Server produksi mendeteksi 3 kendala kritis sebelum peluncuran web. Pilih solusi rekayasa yang paling tepat!",
    steps: [
      {
        id: "step_1",
        issue: "KENDALA #1: Unhandled Promise Rejection pada pemanggilan API eksternal.",
        options: [
          { text: "Bungkus panggilan API dengan blok try...catch dan sediakan state fallback aman.", correct: true },
          { text: "Hapus fungsi async/await dan biarkan promise berjalan tanpa error handling.", correct: false },
          { text: "Abaikan error dan restart server berulang kali secara manual.", correct: false },
        ],
        explanation: "Penerapan try...catch dengan fallback memastikan aplikasi web tetap stabil dan user mendapatkan feedback jelas saat jaringan terganggu.",
      },
      {
        id: "step_2",
        issue: "KENDALA #2: Terjadi layout shift dan tampilan horizontal scroll pada layar smartphone.",
        options: [
          { text: "Kunci lebar kontainer dengan pixel absolut width: 1440px.", correct: false },
          { text: "Gunakan Tailwind layout responsif (w-full max-w-5xl px-4 sm:px-8) dan fleksibel.", correct: true },
          { text: "Nonaktifkan viewport ponsel dari meta tag HTML.", correct: false },
        ],
        explanation: "Desain antarmuka responsif fluid dengan padding adaptif menjamin tata letak presisi dan nyaman di semua resolusi layar.",
      },
      {
        id: "step_3",
        issue: "KENDALA #3: Ukuran bundle aplikasi terlalu besar karena modul game canvas dimuat di server.",
        options: [
          { text: "Muat modul client-side secara dinamis menggunakan next/dynamic dengan ssr: false.", correct: true },
          { text: "Gabungkan seluruh file JavaScript menjadi satu bundel raksasa tanpa code splitting.", correct: false },
          { text: "Hapus framework dan tulis ulang seluruh kode dengan HTML murni tanpa styling.", correct: false },
        ],
        explanation: "Dynamic import Next.js dengan SSR dinonaktifkan memisahkan eksekusi browser API dari server, menghasilkan first-load yang sangat cepat.",
      },
    ],
  },

  collectibles: [
    {
      id: "crystal_react",
      name: "Crystal of Next.js & React",
      description: "Pengetahuan rendering hybrid (SSR/SSG/ISR), React Server Components, dan declarative UI.",
      x: 350,
      y: 950,
      color: "#06B6D4",
    },
    {
      id: "crystal_ts",
      name: "Crystal of TypeScript",
      description: "Keamanan tipe data tingkat lanjut, generic types, dan inferensi arsitektur kode bebas bug.",
      x: 520,
      y: 1180,
      color: "#3B82F6",
    },
    {
      id: "crystal_vue",
      name: "Crystal of Vue & Pinia",
      description: "Pemahaman Single Page Application (SPA), reactivity system Vue 3, dan state management.",
      x: 320,
      y: 1300,
      color: "#10B981",
    },
    {
      id: "crystal_laravel",
      name: "Crystal of Backend & APIs",
      description: "Keahlian membangun REST API terstruktur dengan Laravel MVC, PHP, dan Golang.",
      x: 560,
      y: 960,
      color: "#EF4444",
    },
    {
      id: "crystal_clean_code",
      name: "Crystal of Clean Architecture",
      description: "Struktur folder modular, pemisahan dependensi, dan prinsip SOLID dalam rekayasa web.",
      x: 1050,
      y: 420,
      color: "#8B5CF6",
    },
    {
      id: "crystal_ui_ux",
      name: "Crystal of UI/UX Craftsmanship",
      description: "Perancangan antarmuka visual yang estetik, taktil, responsif, dan ramah aksesibilitas.",
      x: 1250,
      y: 920,
      color: "#EC4899",
    },
    {
      id: "crystal_db",
      name: "Crystal of Database Engineering",
      description: "Relational database design, query optimization MySQL/PostgreSQL, dan Supabase realtime.",
      x: 1650,
      y: 360,
      color: "#F59E0B",
    },
    {
      id: "crystal_coffee",
      name: "Crystal of Coffee Resilience",
      description: "Daya tahan debugging larut malam dan pemecahan masalah algoritma rumit.",
      x: 1720,
      y: 1200,
      color: "#D97706",
    },
  ] as Collectible[],

  locations: [
    {
      id: "loc_home",
      name: "Home Village — About Me",
      zone: "Zone A (Northwest)",
      coordinates: { x: 400, y: 400 },
      description: "Titik awal petualangan. Di sini kamu bisa bertemu dengan avatar Damianus dan mempelajari profil, latar belakang, serta filosofi rekayasanya.",
      details: [
        "Tempat berdialog dengan NPC Damianus Saviola.",
        "Mendengarkan kisah perjalanan masuk ke dunia web development.",
        "Mengetahui filosofi kode: clean, interactive, dan human-centered.",
      ],
    },
    {
      id: "loc_academy",
      name: "Academy — Education & Organizations",
      zone: "Zone B (North)",
      coordinates: { x: 1100, y: 400 },
      description: "Pusat pembelajaran dan jejaring akademik. Menyimpan rekam jejak perkuliahan di Universitas Amikom Yogyakarta dan kiprah organisasi mahasiswa.",
      details: [
        "S1 Sistem Informasi (Digital Bisnis) — IPK 3.88/4.00.",
        "Amikom Computer Club (AMCC) — Pelatihan & Proyek Frontend.",
        "Google Developer Groups (GDG) — Workshop & Kolaborasi Global.",
        "KOMPARI Babarsari — Pengembangan Media Digital.",
      ],
    },
    {
      id: "loc_skills",
      name: "Skill Forest — Tech Arsenal",
      zone: "Zone C (Southwest)",
      coordinates: { x: 400, y: 1100 },
      description: "Hutan rimbun tempat bertumpunya altar-altar keahlian teknis. Dikelompokkan berdasarkan domain pengembangan web.",
      details: [
        "Altar Frontend: Next.js, React, Vue.js, TypeScript, Tailwind.",
        "Altar Backend: Laravel, PHP, CodeIgniter, Golang.",
        "Altar Database: MySQL, PostgreSQL, Supabase.",
        "Altar Tools & DevOps: Docker, Git, RESTful APIs, Figma.",
      ],
    },
    {
      id: "loc_projects",
      name: "Project Laboratory — Projects Showcase",
      zone: "Zone D (Center South)",
      coordinates: { x: 1100, y: 1100 },
      description: "Laboratorium teknologi tempat berlangsungnya rekayasa aplikasi web nyata. Berisi 6 terminal komputer interaktif.",
      details: [
        "Terminal 1: Lapor Masyarakat (Mimika Center).",
        "Terminal 2: Sistem Informasi Lapangan Futsal.",
        "Terminal 3: SIKOSKAR (Pemesanan Kos Karangsari).",
        "Terminal 4: Timverse (Timika News Portal).",
        "Terminal 5: Website Paroki Babarsari.",
        "Terminal 6: Sistem Ormas Kesbangpol Mimika.",
      ],
    },
    {
      id: "loc_achievements",
      name: "Achievement Hall — Certifications & Laurels",
      zone: "Zone E (Northeast)",
      coordinates: { x: 1700, y: 400 },
      description: "Aula penghargaan yang memamerkan pencapaian akademik terkonfirmasi, sertifikat pelatihan, dan rekam jejak kontribusi.",
      details: [
        "Penghargaan IPK 3.88/4.00 Summa Cum Laude.",
        "10+ Sertifikasi internal pelatihan AMCC.",
        "8+ Seminar & Workshop teknologi Google Developer Groups.",
        "Deploy aplikasi civic tech Mimika Center.",
      ],
    },
    {
      id: "loc_tower",
      name: "Communication Tower — Contact & Inquiries",
      zone: "Zone F (Southeast)",
      coordinates: { x: 1700, y: 1100 },
      description: "Menara transmisi sinyal untuk menghubungi Damianus secara langsung atau mengunduh ringkasan CV.",
      details: [
        "Kirim email langsung ke damimaturbongs@gmail.com.",
        "Akses akun GitHub & profil LinkedIn.",
        "Opsi mengunduh Curriculum Vitae (CV).",
      ],
    },
  ] as LocationInfo[],

  projects: [
    {
      id: "lapor-masyarakat",
      name: "Lapor Masyarakat (Mimika Center)",
      category: "Civic Tech",
      badge: "FEATURED",
      summary: "Platform pengaduan dan aspirasi warga interaktif berbasis web untuk memfasilitasi komunikasi transparan antara warga dengan Mimika Center.",
      problem: "Masyarakat menghadapi kendala birokrasi dan tidak adanya media digital terpusat untuk menyampaikan aspirasi atau aduan publik dengan pelacakan status penanganan yang transparan.",
      objectives: "Membangun sistem Single Page Application (SPA) yang responsif, mudah digunakan oleh berbagai kalangan, dengan formulir aduan multi-langkah dan sinkronisasi status laporan secara transparan.",
      keyFeatures: [
        "Formulir aduan warga interaktif dengan validasi multi-tahap",
        "Modul upload berkas dan foto bukti lampiran aduan",
        "Sistem tiket pelacakan status penanganan laporan secara transparan",
        "Dashboard admin terpadu untuk verifikasi dan tindak lanjut aduan",
        "Antarmuka responsif dan ramah pengguna di ponsel maupun desktop",
      ],
      roleAndContribution: "Frontend Web Developer — Bertanggung jawab penuh merancang dan membangun antarmuka SPA menggunakan Vue.js dan TypeScript, mengintegrasikan RESTful API untuk sinkronisasi data laporan, serta mengoptimalkan performa rendering.",
      techStack: ["Vue.js 3", "TypeScript", "RESTful API", "Tailwind CSS", "Pinia", "HTML5"],
      architecture: "Single Page Application (SPA) berbasis Vue 3 dengan state management Pinia, modular component architecture, dan komunikasi API via Axios REST client.",
      challengesAndSolutions: "Tantangan: Pengelolaan file upload gambar bukti berukuran besar dari perangkat ponsel warga. Solusi: Menerapkan client-side image compression dan multi-step form validation sebelum data dikirim ke endpoint server.",
      learnings: "Meningkatkan kemahiran arsitektur SPA modern, pengelolaan data stateful skala menengah, dan perancangan aplikasi civic tech yang berorientasi kemudahan publik.",
      liveUrl: "https://github.com/damisaviola",
      githubUrl: "https://github.com/damisaviola",
      color: "#8B1E2D",
    },
    {
      id: "futsal-booking",
      name: "Sistem Informasi Lapangan Futsal",
      category: "Web App",
      badge: "BEST",
      summary: "Aplikasi manajemen pemesanan lapangan futsal berbasis web untuk mengelola jadwal sewa, membership, dan rekapitulasi pembayaran.",
      problem: "Pencatatan manual konvensional sering memicu jadwal ganda (double-booking), kesulitan pengecekan ketersediaan jam sewa secara cepat, dan pencatatan kas yang rentan salah.",
      objectives: "Menyediakan platform pemesanan berbasis jadwal real-time yang mencegah bentrok jam sewa dan mengotomasi kalkulasi transaksi pelanggan.",
      keyFeatures: [
        "Kalender interaktif ketersediaan jadwal lapangan",
        "Pencegahan bentrok jadwal otomatis pada jam yang sama",
        "Manajemen data pelanggan dan program membership diskon",
        "Rekapitulasi transaksi sewa dan cetak laporan keuangan berkala",
      ],
      roleAndContribution: "Full-Stack Web Developer — Merancang basis data MySQL, mengembangkan logika pemesanan dengan Laravel MVC, serta mendesain antarmuka pengguna berbasis Bootstrap 5.",
      techStack: ["Laravel", "MySQL", "PHP", "Bootstrap 5", "JavaScript"],
      architecture: "Model-View-Controller (MVC) Laravel dengan database relasional MySQL, query builder Eloquent, dan middleware proteksi hak akses admin/kasir.",
      challengesAndSolutions: "Tantangan: Logika validasi tumpang tindih waktu booking (time-slot overlapping) pada jam-jam ramai. Solusi: Menerapkan query conditional database untuk mengecek collision waktu sebelum transaksi disimpan.",
      learnings: "Memperdalam pemahaman perancangan basis data relasional ternormalisasi dan implementasi business rules pada framework Laravel.",
      liveUrl: "https://github.com/damisaviola",
      githubUrl: "https://github.com/damisaviola",
      color: "#22C55E",
    },
    {
      id: "sikoskar",
      name: "SIKOSKAR (Pemesanan Kos Karangsari)",
      category: "Web App",
      badge: "BEST",
      summary: "Sistem informasi berbasis web yang memfasilitasi pencarian dan pemesanan kamar kos di wilayah Karangsari secara daring.",
      problem: "Pencari kos harus datang langsung ke lokasi hanya untuk mengetahui apakah kamar masih tersedia dan bagaimana fasilitas yang disediakan.",
      objectives: "Menyajikan katalog kamar kos lengkap dengan galeri foto, rincian fasilitas, tarif sewa, serta formulir reservasi online.",
      keyFeatures: [
        "Katalog kamar kos interaktif dengan galeri foto fasilitas",
        "Filter pencarian berdasarkan tipe kamar dan fasilitas",
        "Formulir reservasi kamar kos online dengan bukti pemesanan",
        "Panel pengelola kos untuk memperbarui status kamar (terisi/kosong)",
      ],
      roleAndContribution: "Web Developer — Merancang arsitektur MVC menggunakan CodeIgniter, mengelola tabel database kamar & pemesan, dan mengimplementasikan antarmuka responsif.",
      techStack: ["CodeIgniter", "PHP", "MySQL", "HTML5", "CSS3"],
      architecture: "Classic MVC PHP Framework dengan database relasional MySQL dan session authentication.",
      challengesAndSolutions: "Tantangan: Sinkronisasi status ketersediaan kamar saat ada reservasi masuk. Solusi: Menerapkan trigger status kamar otomatis saat reservasi disetujui pengelola.",
      learnings: "Mengasah pemahaman dasar arsitektur web backend PHP dan alur transaksi bisnis penyewaan properti.",
      liveUrl: "https://github.com/damisaviola",
      githubUrl: "https://github.com/damisaviola",
      color: "#F59E0B",
    },
    {
      id: "timverse",
      name: "Timverse (Timika Verse)",
      category: "Open Source",
      badge: "NEW",
      summary: "Portal berita dan informasi modern seputar daerah Timika dengan pembaruan data waktu nyata dan autentikasi pembaca.",
      problem: "Keterbatasan platform berita digital lokal yang cepat, ringan, dan memiliki interaksi pembaca yang responsif di perangkat mobile.",
      objectives: "Membangun portal berita performa tinggi dengan fitur real-time updates, autentikasi pembaca untuk kolom komentar, dan CMS artikel.",
      keyFeatures: [
        "Penyajian artikel berita cepat dengan Next.js Server Components",
        "Sistem komentar dan interaksi pembaca real-time dengan Supabase",
        "Autentikasi pembaca (email & password)",
        "Dashboard manajemen konten untuk redaksi berita",
      ],
      roleAndContribution: "Frontend Developer — Mengembangkan struktur halaman dengan Next.js App Router, integrasi Tailwind CSS, serta menghubungkan database real-time Supabase.",
      techStack: ["Next.js", "Supabase", "React", "Tailwind CSS", "TypeScript"],
      architecture: "Modern Server-Client Hybrid Next.js dengan Supabase PostgreSQL backend dan real-time websocket subscriptions.",
      challengesAndSolutions: "Tantangan: Mengoptimasi kecepatan muat halaman artikel berita dengan gambar. Solusi: Menerapkan Next.js Image Optimization dan ISR (Incremental Static Regeneration).",
      learnings: "Penguasaan ekosistem Next.js App Router terbaru, server-side data fetching, dan integrasi backend modern BaaS (Backend-as-a-Service).",
      liveUrl: "https://github.com/damisaviola",
      githubUrl: "https://github.com/damisaviola",
      color: "#EC4899",
    },
    {
      id: "web-paroki",
      name: "Website Paroki Babarsari",
      category: "Enterprise",
      badge: "NEW",
      summary: "Platform digital media informasi paroki untuk mempublikasikan warta mingguan, jadwal perayaan misa, dan pengumuman komunitas umat.",
      problem: "Biaya cetak warta mingguan yang tinggi dan lambatnya distribusi pengumuman kegiatan komunitas kepada seluruh jemaat.",
      objectives: "Mendigitalisasi warta jemaat ke dalam website resmi yang mudah diperbarui oleh sekretariat paroki dan mudah diakses oleh seluruh jemaat.",
      keyFeatures: [
        "Modul penerbitan artikel warta dan pengumuman komunitas",
        "Jadwal perayaan misa dinamis",
        "Arsip digital dokumen dan warta mingguan yang dapat diunduh",
        "Formulir kontak sekretariat paroki",
      ],
      roleAndContribution: "Web Developer (KOMPARI) — Berkontribusi merancang dan membangun 5+ fitur fungsional pada website menggunakan WordPress serta memberikan panduan operasional kepada pengurus.",
      techStack: ["WordPress", "PHP", "CSS3", "JavaScript"],
      architecture: "WordPress Content Management System (CMS) dengan custom theme hooks dan plugin kustom.",
      challengesAndSolutions: "Tantangan: Memastikan tampilan tetap mudah dibaca dan diakses oleh jemaat lintas generasi (anak-anak hingga lansia). Solusi: Desain antarmuka dengan kontras tinggi, hierarki tipografi tegas, dan navigasi yang sangat sederhana.",
      learnings: "Keterampilan manajemen CMS organisasi, penyesuaian kebutuhan pengguna non-teknis, dan kerja tim di divisi multimedia komunitas.",
      liveUrl: "https://github.com/damisaviola",
      githubUrl: "https://github.com/damisaviola",
      color: "#3B82F6",
    },
    {
      id: "ormas-kesbangpol",
      name: "Sistem Ormas Bakesbangpol Mimika",
      category: "Enterprise",
      badge: "CIVIC TECH",
      summary: "Sistem informasi pengelolaan data, administrasi pendaftaran, dan verifikasi berkas organisasi kemasyarakatan pada Bakesbangpol Kabupaten Mimika.",
      problem: "Verifikasi berkas fisik organisasi kemasyarakatan memakan waktu lama, rawan berkas tercecer, dan menyulitkan rekapitulasi data ormas aktif di wilayah kabupaten.",
      objectives: "Membangun sistem informasi terpusat untuk digitalisasi pendaftaran ormas, unggah dokumen legalitas, dan alur verifikasi berkas berjenjang oleh petugas Kesbangpol.",
      keyFeatures: [
        "Portal pendaftaran ormas online dan unggah berkas legalitas (SK Kemenkumham, AD/ART)",
        "Alur verifikasi berkas bertahap dengan catatan revisi langsung",
        "Database terpusat ormas aktif dan pencarian data organisasi",
        "Penerbitan surat keterangan tanda lapor terverifikasi otomatis",
      ],
      roleAndContribution: "Full-Stack Developer — Merancang arsitektur database ormas, modul upload dan validasi dokumen, serta hak akses petugas verifikator.",
      techStack: ["Laravel", "MySQL", "PHP", "Bootstrap", "JavaScript"],
      architecture: "Laravel Enterprise Architecture dengan role-based access control (RBAC) dan secure file storage.",
      challengesAndSolutions: "Tantangan: Memastikan keamanan berkas dokumen legalitas ormas dan kejelasan riwayat revisi berkas. Solusi: Menerapkan log audit verifikasi berkas dan hashing penyimpanan dokumen.",
      learnings: "Pengalaman berharga dalam merancang sistem informasi institusi pemerintahan dengan standar akurasi data dan kepatuhan regulasi administrasi.",
      liveUrl: "https://github.com/damisaviola",
      githubUrl: "https://github.com/damisaviola",
      color: "#0284C7",
    },
  ] as ProjectDetail[],

  skills: [
    {
      id: "sk_nextjs",
      name: "Next.js",
      category: "Frontend",
      description: "Framework React untuk produksi dengan Server-Side Rendering (SSR), Server Components, dan optimasi performa tinggi.",
      concreteUseCases: "Digunakan pada Timverse dan arsitektur portofolio modern untuk routing dinamis dan revalidasi data.",
      proficiencyLevel: "Advanced",
      color: "#000000",
    },
    {
      id: "sk_react",
      name: "React",
      category: "Frontend",
      description: "Pustaka JavaScript deklaratif berbasis komponen untuk antarmuka pengguna interaktif dan state management modular.",
      concreteUseCases: "Membangun komponen UI, dialog modal interaktif, dan reactive states.",
      proficiencyLevel: "Advanced",
      color: "#06B6D4",
    },
    {
      id: "sk_vue",
      name: "Vue.js",
      category: "Frontend",
      description: "Framework progresif dengan reaktivitas tinggi dan kurva pembelajaran efisien untuk Single Page Applications.",
      concreteUseCases: "Digunakan dalam proyek produksi Lapor Masyarakat Mimika Center dengan Pinia dan TypeScript.",
      proficiencyLevel: "Proficient",
      color: "#10B981",
    },
    {
      id: "sk_typescript",
      name: "TypeScript",
      category: "Frontend",
      description: "Superset JavaScript dengan sistem pengetikan statis ketat (strict typing) untuk mencegah bug sejak waktu kompilasi.",
      concreteUseCases: "Menulis seluruh tipe data proyek, props komponen, model response API, dan konfigurasi state.",
      proficiencyLevel: "Advanced",
      color: "#3B82F6",
    },
    {
      id: "sk_tailwind",
      name: "Tailwind CSS",
      category: "Frontend",
      description: "Utility-first CSS framework untuk perancangan antarmuka visual yang presisi, responsif, dan konsisten.",
      concreteUseCases: "Penerapan sistem token desain, tema gelap/terang, dan layout responsif di seluruh proyek.",
      proficiencyLevel: "Advanced",
      color: "#38BDF8",
    },
    {
      id: "sk_laravel",
      name: "Laravel",
      category: "Backend",
      description: "Framework PHP modern dengan arsitektur MVC elegan, Eloquent ORM, dan sistem routing yang tangguh.",
      concreteUseCases: "Membangun backend Sistem Lapangan Futsal dan Sistem Ormas Kesbangpol Mimika.",
      proficiencyLevel: "Proficient",
      color: "#EF4444",
    },
    {
      id: "sk_php",
      name: "PHP",
      category: "Backend",
      description: "Bahasa pemrograman server-side untuk pemrosesan logika bisnis, manipulasi database, dan pembuatan API.",
      concreteUseCases: "Pengembangan sistem web berbasis Laravel, CodeIgniter, dan kustomisasi WordPress.",
      proficiencyLevel: "Advanced",
      color: "#777BB4",
    },
    {
      id: "sk_golang",
      name: "Golang",
      category: "Backend",
      description: "Bahasa backend dengan konkurensi tinggi (goroutines) dan kecepatan eksekusi compiled code untuk microservices.",
      concreteUseCases: "Eksplorasi pembuatan REST API backend ringan dan penanganan request paralel pada workshop GDG.",
      proficiencyLevel: "Working Knowledge",
      color: "#00ADD8",
    },
    {
      id: "sk_mysql",
      name: "MySQL",
      category: "Database",
      description: "Sistem manajemen basis data relasional (RDBMS) standar industri untuk penyimpanan data terstruktur.",
      concreteUseCases: "Perancangan skema relasional tabel pemesanan, membership, data ormas, dan autentikasi user.",
      proficiencyLevel: "Advanced",
      color: "#4479A1",
    },
    {
      id: "sk_supabase",
      name: "Supabase & PostgreSQL",
      category: "Database",
      description: "Backend-as-a-service modern berbasis PostgreSQL dengan real-time subscriptions dan built-in authentication.",
      concreteUseCases: "Database backend untuk proyek portal berita Timverse dengan sinkronisasi komentar live.",
      proficiencyLevel: "Proficient",
      color: "#3ECF8E",
    },
    {
      id: "sk_docker",
      name: "Docker",
      category: "Tools",
      description: "Containerization platform untuk memastikan lingkungan pengembangan dan deployment konsisten di semua mesin.",
      concreteUseCases: "Isolasi database local, PHP runtime, dan container environment saat pengembangan tim.",
      proficiencyLevel: "Working Knowledge",
      color: "#2496ED",
    },
    {
      id: "sk_git",
      name: "Git & GitHub",
      category: "Tools",
      description: "Sistem kontrol versi terdistribusi untuk pelacakan kode, branch workflow, dan kolaborasi tim.",
      concreteUseCases: "Manajemen repositori proyek, commit history berkala, pull request, dan integrasi GitHub Pages / Vercel.",
      proficiencyLevel: "Advanced",
      color: "#F05032",
    },
  ] as SkillItem[],

  achievements: [
    {
      id: "ach_gpa",
      title: "Lulusan S1 Sistem Informasi — IPK 3.88/4.00",
      issuer: "Universitas Amikom Yogyakarta",
      year: "2026",
      description: "Menyelesaikan studi sarjana konsentrasi Digital Bisnis dengan predikat kelulusan dengan pujian (Summa Cum Laude).",
      badge: "ACADEMIC SUMMA CUM LAUDE",
    },
    {
      id: "ach_mimika",
      title: "Implementasi Aplikasi Civic Tech Lapor Masyarakat",
      issuer: "Mimika Center",
      year: "2024",
      description: "Berhasil merancang dan mendeploy antarmuka SPA website aduan masyarakat interaktif berbasis Vue.js & TypeScript.",
      badge: "PRODUCTION CIVIC TECH",
    },
    {
      id: "ach_amcc",
      title: "10+ Pelatihan & Sertifikasi Frontend Web Development",
      issuer: "Amikom Computer Club (AMCC)",
      year: "2022 — 2025",
      description: "Menuntaskan serangkaian pelatihan intensif web development, arsitektur MVC, dan kolaborasi tim lintas fungsi.",
      badge: "ORGANIZATIONAL EXCELLENCE",
    },
    {
      id: "ach_gdg",
      title: "Peningkatan Skill Web 70% melalui 8+ Workshop GDG",
      issuer: "Google Developer Groups (GDG)",
      year: "2023 — 2025",
      description: "Aktif mengikuti workshop teknologi web modern (Next.js, Golang, Firebase, Supabase) dalam komunitas developer global.",
      badge: "COMMUNITY DEVELOPER",
    },
    {
      id: "ach_kompari",
      title: "Digitalisasi Media Website Paroki Babarsari",
      issuer: "KOMPARI Babarsari",
      year: "2023 — 2026",
      description: "Mengembangkan 5+ fitur digital fungsional untuk memudahkan jemaat paroki mengakses informasi kegiatan secara daring.",
      badge: "COMMUNITY SERVICE",
    },
  ] as AchievementItem[],

  npcDialogues: {
    damianus: {
      npcName: "Damianus Saviola",
      role: "The Creator / Frontend Architect",
      avatar: "🧙‍♂️",
      pages: [
        "Halo, Adventurer! Selamat datang di Developer World. Saya Damianus Saviola Maturbongs, Frontend Developer & UI Engineer berbasis di Yogyakarta.",
        "Dunia ini dibangun untuk merefleksikan perjalanan saya dalam rekayasa web: mulai dari studi di Amikom, organisasi kampus, hingga membangun aplikasi web nyata.",
        "Kamu bisa menjelajahi desa ini, mengunjungi Akademi, memeriksa Altar Teknologi di Hutan Skill, atau masuk ke Laboratorium untuk melihat proyek-proyek yang telah saya bangun.",
        "Gunakan tombol [E] atau [ENTER] untuk berinteraksi dengan objek dan orang di sekitarmu. Jika kamu seorang recruiter atau ingin melihat versi konvensional, klik tombol 'View Portfolio' kapan saja!",
      ],
    },
    guide: {
      npcName: "Elder Guide",
      role: "Village Mentor",
      avatar: "🧭",
      pages: [
        "Salam penjelajah! Petunjuk singkat untukmu:",
        "Gunakan tombol [W, A, S, D] atau [Panah] untuk bergerak di peta. Di perangkat ponsel, gunakan virtual D-pad di layar.",
        "Perhatikan tanda [E: INTERACT] yang muncul saat kamu mendekati bangunan, komputer terminal, batu kristal, atau papan pengumuman.",
        "Kumpulkan 8 Knowledge Crystal yang tersebar di peta untuk melengkapi koleksi pengetahuan developermu!",
      ],
    },
    academyMentor: {
      npcName: "Professor Amikom",
      role: "Dean of Information Systems",
      avatar: "🎓",
      pages: [
        "Selamat datang di Academy of Knowledge! Damianus menyelesaikan studi S1 Sistem Informasi (Digital Bisnis) di Universitas Amikom Yogyakarta.",
        "Prestasi akademik yang diraih adalah IPK 3.88 dari 4.00 dengan predikat Summa Cum Laude.",
        "Selain perkuliahan, Damianus aktif dalam AMCC (Amikom Computer Club), Google Developer Groups (GDG), dan KOMPARI.",
      ],
    },
  },
};
