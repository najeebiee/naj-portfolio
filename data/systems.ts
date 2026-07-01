export type SystemPage = {
  description: string;
  image?: string;
};

export type SystemProject = {
  buttonLabel: string;
  description: string;
  image: string;
  pages: SystemPage[];
  role: string;
  slug: string;
  stack: string[];
  subtitle: string;
  title: string;
  video: string;
  year: string;
};

export const systems: SystemProject[] = [
  {
    title: "GutGuard Commerce & Member Platform",
    subtitle: "Commerce, membership, and customer operations platform",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    role: "Designer & Developer",
    year: "2026",
    slug: "gutguard",
    stack: ["Next.js", "React 19", "TypeScript", "Tailwind", "Supabase", "Vercel"],
    image: "/images/systems/gutguard.png",
    video: "/videos/systems/gutguard.mp4",
    buttonLabel: "Open Project",
    pages: [
      {
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        description:
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
    ],
  },
  {
    title: "Sales Metrics & Budget Operations",
    subtitle: "Sales monitoring and budget operations dashboard",
    description:
      "Business operations dashboard designed for daily sales tracking, reporting, and encoder workflows. Built to handle real-time data across multiple store branches with role-based access.",
    role: "Designer & Developer",
    year: "2026",
    slug: "sales-metrics",
    stack: ["Next.js", "React 19", "TypeScript", "Tailwind", "Supabase", "Vercel"],
    image: "/images/systems/sales-metrics.png",
    video: "/videos/systems/sales-metrics.mp4",
    buttonLabel: "Open Project",
    pages: [
      {
        description:
          "Designed to simplify daily encoder operations through minimal workflows and fast reporting visibility.",
      },
      {
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        description:
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
    ],
  },
  {
    title: "Battle of Platoons: Performance Leaderboard System",
    subtitle: "Performance tracking and leaderboard operations system",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    role: "Designer & Developer",
    year: "2026",
    slug: "battle-of-platoons",
    stack: ["React", "Vite", "JavaScript", "Material UI", "Supabase", "Vercel"],
    image: "/images/systems/battle-of-platoons.png",
    video: "/videos/systems/battle-of-platoons.mp4",
    buttonLabel: "Open Project",
    pages: [
      {
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        description:
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
    ],
  },
  {
    title: "Guild Vault: Transaction Intelligence Console",
    subtitle: "Transaction intelligence and operational reporting console",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate.",
    role: "Designer & Developer",
    year: "2026",
    slug: "guild-vault",
    stack: ["Next.js", "React 19", "TypeScript", "Tailwind", "Supabase", "Vercel"],
    image: "/images/systems/guild-vault.png",
    video: "/videos/systems/guild-vault.mp4",
    buttonLabel: "Open Project",
    pages: [
      {
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        description:
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
    ],
  },
  {
    title: "GuildLedger: Finance & Event Operations System",
    subtitle: "Finance, event, and request operations system",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident.",
    role: "Designer & Developer",
    year: "2026",
    slug: "guild-ledger",
    stack: ["React", "TypeScript", "Vite", "Radix UI", "Lucide", "Sonner"],
    image: "/images/systems/guild-ledger.png",
    video: "/videos/systems/guild-ledger.mp4",
    buttonLabel: "Open Project",
    pages: [
      {
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        description:
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
    ],
  },
];
