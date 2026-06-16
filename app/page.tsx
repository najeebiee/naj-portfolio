import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero/hero-section";
import { SystemsSection } from "@/components/systems-section";
import { VisualsSection } from "@/components/visuals-section";
import { AboutContactTransition } from "@/components/about-contact-transition";
import { CapabilitiesSection } from "@/components/capabilities-section";
import { SplitText } from "@/components/split-text";

const toolkitTools = [
  { name: "VS Code", logo: "/toolkit/vscode.svg" },
  { name: "Figma", logo: "/toolkit/figma.svg" },
  { name: "Next.js", logo: "/toolkit/nextjs.svg" },
  { name: "TypeScript", logo: "/toolkit/typescript.svg" },
  { name: "Tailwind CSS", logo: "/toolkit/tailwind.svg" },
  { name: "Supabase", logo: "/toolkit/supabase.svg" },
  { name: "Vercel", logo: "/toolkit/vercel.svg" },
  { name: "GitHub", logo: "/toolkit/github.svg" },
  { name: "GitHub Copilot", logo: "/toolkit/copilot.svg" },
  { name: "Claude", logo: "/toolkit/claude.svg" },
  { name: "OpenAI", logo: "/toolkit/codex.svg" },
  { name: "Google Gemini", logo: "/toolkit/gemini.svg" },
];

type ToolMarkProps = {
  logo: string;
  name: string;
};

function ToolMark({ logo, name }: ToolMarkProps) {
  return (
    <span className="flex size-[56px] items-center justify-center">
      <img
        alt=""
        aria-hidden="true"
        className="max-h-[72px] max-w-[150px] object-contain"
        src={logo}
      />
      <span className="sr-only">{name}</span>
    </span>
  );
}

export default function Home() {
  return (
    <main className="min-h-svh bg-[#050505] text-white">
      <Navbar />
      <HeroSection />

      <CapabilitiesSection />

      <section
        aria-labelledby="toolkit-title"
        className="relative h-[400px] w-full overflow-hidden bg-[#050505] px-[50px] text-white"
        id="toolkit"
      >
        <div className="relative h-full">
          <h2
            className="absolute left-0 top-[30px] font-display text-[32px] font-medium leading-none tracking-normal text-white"
            id="toolkit-title"
          >
            <SplitText stagger={0.075} text="Tool Kit" />
          </h2>

          <div className="absolute left-[273px] right-[-50px] top-[30px] h-[200px] overflow-hidden">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[240px] bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[240px] bg-gradient-to-l from-[#050505] via-[#050505]/80 to-transparent"
            />

            <div className="toolkit-marquee flex w-max">
              {[0, 1].map((group) => (
                <div className="flex shrink-0 gap-5 pr-5" key={group}>
                  {toolkitTools.map((tool) => (
                    <div
                      className="flex h-[200px] w-[303px] shrink-0 flex-col items-center justify-center gap-5 rounded-[32px] bg-[#151515] text-white"
                      key={`${group}-${tool.name}`}
                    >
                      <ToolMark logo={tool.logo} name={tool.name} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SystemsSection />
      <VisualsSection />
      <AboutContactTransition />
    </main>
  );
}
