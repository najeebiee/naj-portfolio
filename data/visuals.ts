export type VisualProject = {
  alt: string;
  category: string;
  description: string;
  image: string;
  role: string;
  tags: string[];
  title: string;
  year: string;
};

export const visuals: VisualProject[] = [
  {
    title: "Drift Coffee Campaign",
    category: "Brand Visuals",
    year: "2026",
    role: "Visual Design",
    description:
      "A bold product campaign built around high-contrast food imagery, red typography, and social-first composition.",
    tags: ["Campaign Art", "Product Launch", "Social Media"],
    image: "/images/visuals/visual-01.webp",
    alt: "Visual design project 01",
  },
  {
    title: "College Days Matrix",
    category: "Event Poster",
    year: "2026",
    role: "Layout Design",
    description:
      "An energetic event visual using oversized type, modular blocks, and vivid contrast for campus promotion.",
    tags: ["Poster Design", "Typography", "Event Identity"],
    image: "/images/visuals/visual-02.webp",
    alt: "Visual design project 02",
  },
  {
    title: "Above the Noise",
    category: "Editorial Creative",
    year: "2026",
    role: "Creative Direction",
    description:
      "A quiet monochrome composition shaped around atmosphere, restraint, and a calm premium visual tone.",
    tags: ["Editorial", "Monochrome", "Art Direction"],
    image: "/images/visuals/visual-02.webp",
    alt: "Visual design project 02",
  },
  {
    title: "Drift Coffee Campaign",
    category: "Brand Visuals",
    year: "2026",
    role: "Visual Design",
    description:
      "A bold product campaign built around high-contrast food imagery, red typography, and social-first composition.",
    tags: ["Campaign Art", "Product Launch", "Social Media"],
    image: "/images/visuals/visual-03.webp",
    alt: "Visual design project 03",
  },
  {
    title: "Coffee Mood System",
    category: "Social Campaign",
    year: "2026",
    role: "Visual Design",
    description:
      "A warm campaign direction balancing expressive copy, product moments, and scroll-ready social layouts.",
    tags: ["Social Media", "Copy-led", "Campaign Art"],
    image: "/images/visuals/visual-04.webp",
    alt: "Visual design project 04",
  },
  {
    title: "Classic Coffee Menu",
    category: "Menu Design",
    year: "2026",
    role: "Brand Layout",
    description:
      "A clean product menu concept with sharp hierarchy, bright color blocking, and appetite-focused framing.",
    tags: ["Menu Design", "Product Layout", "Typography"],
    image: "/images/visuals/visual-05.webp",
    alt: "Visual design project 05",
  },
  {
    title: "Dubai Cookie Launch",
    category: "Product Creative",
    year: "2026",
    role: "Visual Design",
    description:
      "A direct launch graphic using bold scale, strong product photography, and high-impact announcement type.",
    tags: ["Launch Creative", "Food Visuals", "Social Media"],
    image: "/images/visuals/visual-06.webp",
    alt: "Visual design project 06",
  },
  {
    title: "GutGuard Synbiotic",
    category: "Health Product Visual",
    year: "2026",
    role: "Product Composition",
    description:
      "A supplement-focused visual system designed around clarity, trust, and benefit-led product storytelling.",
    tags: ["Product Visual", "Health Brand", "Composition"],
    image: "/images/visuals/visual-07.webp",
    alt: "Visual design project 07",
  },
  {
    title: "Brand Motion Still",
    category: "Motion-ready Visual",
    year: "2026",
    role: "Creative Direction",
    description:
      "A cinematic still direction prepared for motion, balancing atmosphere, scale, and strong brand presence.",
    tags: ["Motion-ready", "Brand Direction", "Editorial"],
    image: "/images/visuals/visual-08.webp",
    alt: "Visual design project 08",
  },
];

export type VisualGalleryId = "drift" | "gutguard" | "naj";
export type ExhibitionRole = "hero" | "support" | "mini";

export type ExhibitionArtwork = {
  alt: string;
  height?: number;
  id: string;
  layout: {
    rotation: number;
    x: number;
    y: number;
    zIndex?: number;
  };
  medium: string;
  naturalHeight: number;
  naturalWidth: number;
  role: ExhibitionRole;
  src: string;
  title: string;
  tools: string[];
  year: string;
};

export type ExhibitionGallery = {
  accent: string;
  atmosphere: string;
  canvasHeight: number;
  id: VisualGalleryId;
  label: string;
  logo: {
    alt: string;
    height: number;
    layout: {
      rotation: number;
      width: number;
      x: number;
      y: number;
      zIndex?: number;
    };
    naturalHeight: number;
    naturalWidth: number;
    src: string;
  };
  summary: string;
  works: ExhibitionArtwork[];
};

export const exhibitionRoleHeights: Record<ExhibitionRole, number> = {
  hero: 700,
  support: 480,
  mini: 320,
};

export const visualGalleries: ExhibitionGallery[] = [
  {
    id: "drift",
    label: "Drift",
    accent: "#e63422",
    atmosphere: "Coffee campaign system",
    summary:
      "Bold red-black campaign work arranged with editorial tension, product energy, and controlled visual chaos.",
    canvasHeight: 3860,
    logo: {
      src: "/visuals/drift/logo/logo.svg",
      alt: "Drift logo",
      naturalWidth: 2176,
      naturalHeight: 861,
      height: 861,
      layout: { x: 1247, y: 210, width: 520, rotation: -3, zIndex: 2 },
    },
    works: [
      {
        id: "drift-cup",
        title: "Cup Study",
        role: "hero",
        src: "/visuals/drift/artworks/cup.webp",
        alt: "Drift coffee cup campaign artwork with bold product presentation.",
        naturalWidth: 2480,
        naturalHeight: 3508,
        year: "2026",
        medium: "Campaign visual",
        tools: ["Figma", "Photoshop"],
        layout: { x: 1800, y: 750, rotation: 0, zIndex: 3 },
      },
      {
        id: "drift-better",
        title: "Better With Drift",
        role: "support",
        src: "/visuals/drift/artworks/better.webp",
        alt: "Tall Drift promotional poster with red editorial typography.",
        naturalWidth: 2480,
        naturalHeight: 3508,
        year: "2026",
        medium: "Editorial poster",
        tools: ["Figma", "Photoshop"],
        layout: { x: 2027, y: 1508, rotation: -5, zIndex: 2 },
      },
      {
        id: "drift-dubai",
        title: "Dubai Cookie Launch",
        role: "support",
        src: "/visuals/drift/artworks/dubai.webp",
        alt: "Drift Dubai cookie launch social graphic.",
        naturalWidth: 1080,
        naturalHeight: 1350,
        year: "2026",
        medium: "Launch creative",
        tools: ["Figma"],
        layout: { x: 1010, y: 930, rotation: 4, zIndex: 4 },
      },
      {
        id: "drift-menu",
        title: "Classic Menu",
        role: "mini",
        src: "/visuals/drift/artworks/menu.webp",
        alt: "Drift menu artwork with coffee product pricing.",
        naturalWidth: 1080,
        naturalHeight: 1350,
        year: "2026",
        medium: "Menu design",
        tools: ["Figma"],
        layout: { x: 1260, y: 570, rotation: -7, zIndex: 1 },
      },
      {
        id: "drift-try",
        title: "Try It",
        role: "mini",
        src: "/visuals/drift/artworks/try.webp",
        alt: "Drift campaign fragment with bold coffee messaging.",
        naturalWidth: 1080,
        naturalHeight: 1350,
        year: "2026",
        medium: "Social creative",
        tools: ["Figma"],
        layout: { x: 70, y: 1480, rotation: 6, zIndex: 1 },
      },
      {
        id: "drift-visit",
        title: "Visit Drift",
        role: "support",
        src: "/visuals/drift/artworks/visit.webp",
        alt: "Large Drift visit campaign poster with strong red and black direction.",
        naturalWidth: 2480,
        naturalHeight: 3508,
        year: "2026",
        medium: "Campaign poster",
        tools: ["Figma", "Photoshop"],
        layout: { x: 2476, y: 1420, rotation: -2, zIndex: 4 },
      },
      {
        id: "drift-promo",
        title: "Promo Pulse",
        role: "support",
        src: "/visuals/drift/artworks/promo.webp",
        alt: "Drift promotional artwork with expressive campaign copy.",
        naturalWidth: 1080,
        naturalHeight: 1350,
        year: "2026",
        medium: "Promotional creative",
        tools: ["Figma"],
        layout: { x: 1120, y: 2070, rotation: 5, zIndex: 3 },
      },
      {
        id: "drift-after",
        title: "After Hours",
        role: "mini",
        src: "/visuals/drift/artworks/after.webp",
        alt: "Drift after-hours campaign detail in red and dark tones.",
        naturalWidth: 1080,
        naturalHeight: 1350,
        year: "2026",
        medium: "Campaign detail",
        tools: ["Figma"],
        layout: { x: 250, y: 2570, rotation: 4, zIndex: 2 },
      },
      {
        id: "drift-tear",
        title: "Tear Sheet",
        role: "support",
        src: "/visuals/drift/artworks/tear.webp",
        alt: "Drift poster-style artwork with editorial tear-sheet energy.",
        naturalWidth: 2480,
        naturalHeight: 3508,
        year: "2026",
        medium: "Poster system",
        tools: ["Figma", "Photoshop"],
        layout: { x: 2420, y: 855, rotation: -4, zIndex: 2 },
      },
    ],
  },
  {
    id: "gutguard",
    label: "GutGuard",
    accent: "#9ee9d6",
    atmosphere: "Clean health product communication",
    summary:
      "A calmer commercial room shaped around trust, product clarity, and benefit-led wellness visuals.",
    canvasHeight: 3120,
    logo: {
      src: "/visuals/gutguard/logo/logo.svg",
      alt: "GutGuard logo",
      naturalWidth: 986,
      naturalHeight: 320,
      height: 320,
      layout: { x: 520, y: 240, width: 560, rotation: 0, zIndex: 2 },
    },
    works: [
      {
        id: "gutguard-cover",
        title: "Product Cover",
        role: "support",
        src: "/visuals/gutguard/artworks/cover.webp",
        alt: "GutGuard clean product cover artwork.",
        naturalWidth: 960,
        naturalHeight: 355,
        year: "2026",
        medium: "Product campaign",
        tools: ["Figma"],
        layout: { x: 150, y: 760, rotation: 0, zIndex: 2 },
      },
      {
        id: "gutguard-synbiotic",
        title: "Synbiotic",
        role: "hero",
        src: "/visuals/gutguard/artworks/synbiotic.webp",
        alt: "GutGuard synbiotic product visual with clean commercial composition.",
        naturalWidth: 1587,
        naturalHeight: 2245,
        year: "2026",
        medium: "Product visual",
        tools: ["Figma", "Photoshop"],
        layout: { x: 910, y: 620, rotation: 1, zIndex: 3 },
      },
      {
        id: "gutguard-bottle",
        title: "Bottle System",
        role: "support",
        src: "/visuals/gutguard/artworks/bottle.webp",
        alt: "GutGuard bottle-focused supplement campaign artwork.",
        naturalWidth: 1582,
        naturalHeight: 2236,
        year: "2026",
        medium: "Product composition",
        tools: ["Figma", "Photoshop"],
        layout: { x: 380, y: 1390, rotation: -1, zIndex: 3 },
      },
      {
        id: "gutguard-gerd",
        title: "GERD Education",
        role: "support",
        src: "/visuals/gutguard/artworks/gerd.webp",
        alt: "GutGuard educational product marketing artwork about GERD.",
        naturalWidth: 1587,
        naturalHeight: 2245,
        year: "2026",
        medium: "Educational visual",
        tools: ["Figma"],
        layout: { x: 1030, y: 1600, rotation: 0, zIndex: 2 },
      },
      {
        id: "gutguard-skin",
        title: "Skin Benefits",
        role: "mini",
        src: "/visuals/gutguard/artworks/skin.webp",
        alt: "GutGuard skin benefit social creative.",
        naturalWidth: 1587,
        naturalHeight: 2100,
        year: "2026",
        medium: "Benefit creative",
        tools: ["Figma"],
        layout: { x: 170, y: 2240, rotation: 2, zIndex: 1 },
      },
      {
        id: "gutguard-support",
        title: "Support Card",
        role: "mini",
        src: "/visuals/gutguard/artworks/support.webp",
        alt: "GutGuard support-focused social campaign card.",
        naturalWidth: 1080,
        naturalHeight: 1350,
        year: "2026",
        medium: "Social card",
        tools: ["Figma"],
        layout: { x: 720, y: 2500, rotation: -2, zIndex: 1 },
      },
    ],
  },
  {
    id: "naj",
    label: "NAJ",
    accent: "#f1f1ed",
    atmosphere: "Personal visual identity studies",
    summary:
      "A closing signature room with expressive posters, reflective identity fragments, and personal visual studies.",
    canvasHeight: 3400,
    logo: {
      src: "/visuals/naj/logo/logo.svg",
      alt: "NAJ logo",
      naturalWidth: 89,
      naturalHeight: 32,
      height: 32,
      layout: { x: 700, y: 230, width: 240, rotation: 0, zIndex: 2 },
    },
    works: [
      {
        id: "naj-above",
        title: "Above",
        role: "hero",
        src: "/visuals/naj/artworks/above.webp",
        alt: "NAJ personal poster artwork titled Above.",
        naturalWidth: 5400,
        naturalHeight: 7200,
        year: "2026",
        medium: "Personal poster",
        tools: ["Figma", "Photoshop"],
        layout: { x: 210, y: 650, rotation: -2, zIndex: 3 },
      },
      {
        id: "naj-matrix",
        title: "Matrix",
        role: "support",
        src: "/visuals/naj/artworks/matrix.webp",
        alt: "NAJ matrix poster with campus-inspired visual identity.",
        naturalWidth: 5400,
        naturalHeight: 7200,
        year: "2026",
        medium: "Poster design",
        tools: ["Figma"],
        layout: { x: 940, y: 760, rotation: 3, zIndex: 2 },
      },
      {
        id: "naj-design",
        title: "Design Note",
        role: "mini",
        src: "/visuals/naj/artworks/design.webp",
        alt: "NAJ design study with expressive type and personal direction.",
        naturalWidth: 2464,
        naturalHeight: 3080,
        year: "2026",
        medium: "Design study",
        tools: ["Figma"],
        layout: { x: 1220, y: 1370, rotation: -4, zIndex: 1 },
      },
      {
        id: "naj-clinics",
        title: "Clinics",
        role: "support",
        src: "/visuals/naj/artworks/clinics.webp",
        alt: "NAJ clinics poster with clean visual structure.",
        naturalWidth: 5400,
        naturalHeight: 7200,
        year: "2026",
        medium: "Poster design",
        tools: ["Figma"],
        layout: { x: 490, y: 1790, rotation: 1, zIndex: 2 },
      },
      {
        id: "naj-announcement",
        title: "Announcement",
        role: "mini",
        src: "/visuals/naj/artworks/announcement.webp",
        alt: "NAJ announcement poster fragment.",
        naturalWidth: 2464,
        naturalHeight: 3080,
        year: "2026",
        medium: "Announcement visual",
        tools: ["Figma"],
        layout: { x: 80, y: 2300, rotation: 4, zIndex: 1 },
      },
      {
        id: "naj-cupid",
        title: "Cupid",
        role: "mini",
        src: "/visuals/naj/artworks/cupid.webp",
        alt: "NAJ cupid poster study.",
        naturalWidth: 836,
        naturalHeight: 1199,
        year: "2026",
        medium: "Poster study",
        tools: ["Figma"],
        layout: { x: 1030, y: 2460, rotation: -2, zIndex: 3 },
      },
    ],
  },
];
