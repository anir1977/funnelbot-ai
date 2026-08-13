import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DemoSite from "@/components/demo/DemoSite";
import { demos, getDemo } from "@/lib/demos";

export function generateStaticParams() {
  return demos.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = getDemo(slug);
  if (!d) return { title: "Démo introuvable" };

  return {
    title: `${d.brand} — Démo ${d.category} | FunnelsLibrary`,
    description: `${d.hero.sub} Site de démonstration ${d.category.toLowerCase()} créé par FunnelsLibrary, agence web au Maroc.`,
  };
}

export default async function DemoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const demo = getDemo(slug);
  if (!demo) notFound();

  return <DemoSite demo={demo} />;
}
