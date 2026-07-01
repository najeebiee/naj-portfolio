import { notFound } from "next/navigation";
import { systems } from "@/data/systems";
import { SystemDetailPage } from "@/components/system-detail-page";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return systems.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const system = systems.find((s) => s.slug === slug);
  if (!system) return {};
  return { title: `${system.title} | naj` };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const system = systems.find((s) => s.slug === slug);
  if (!system) notFound();
  return <SystemDetailPage system={system} />;
}
