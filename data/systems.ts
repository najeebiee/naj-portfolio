export type SystemProject = {
  buttonLabel: string;
  preview: string;
  stack: string[];
  subtitle: string;
  title: string;
  year: string;
};

export const systems: SystemProject[] = [
  {
    title: "GutGuard Commerce & Member Platform",
    subtitle: "Commerce, membership, and customer operations platform",
    year: "2026",
    stack: ["Next.js", "React 19", "TypeScript", "Tailwind", "Supabase", "Vercel"],
    preview: "/videos/systems/gutguard-commerce-member-platform-compressed.mp4",
    buttonLabel: "Open Project",
  },
  {
    title: "Sales Metrics & Budget Operations",
    subtitle: "Sales monitoring and budget operations dashboard",
    year: "2026",
    stack: ["Next.js", "React 19", "TypeScript", "Tailwind", "Supabase", "Vercel"],
    preview: "/videos/systems/sales-metrics-budget-operations-compressed.mp4",
    buttonLabel: "Open Project",
  },
  {
    title: "Battle of Platoons: Performance Leaderboard System",
    subtitle: "Performance tracking and leaderboard operations system",
    year: "2026",
    stack: ["React", "Vite", "JavaScript", "Material UI", "Supabase", "Vercel"],
    preview: "/videos/systems/battle-of-platoons-performance-leaderboard-compressed.mp4",
    buttonLabel: "Open Project",
  },
  {
    title: "Guild Vault: Transaction Intelligence Console",
    subtitle: "Transaction intelligence and operational reporting console",
    year: "2026",
    stack: ["Next.js", "React 19", "TypeScript", "Tailwind", "Supabase", "Vercel"],
    preview: "/videos/systems/guild-vault-transaction-intelligence-console-compressed.mp4",
    buttonLabel: "Open Project",
  },
  {
    title: "GuildLedger: Finance & Event Operations System",
    subtitle: "Finance, event, and request operations system",
    year: "2026",
    stack: ["React", "TypeScript", "Vite", "Radix UI", "Lucide", "Sonner"],
    preview: "/videos/systems/guildledger-finance-event-operations-compressed.mp4",
    buttonLabel: "Open Project",
  },
];
