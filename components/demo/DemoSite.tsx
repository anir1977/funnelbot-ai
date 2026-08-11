"use client";

import { type Demo, templateFor } from "@/lib/demos";
import Editorial from "./templates/Editorial";
import Bold from "./templates/Bold";
import Clinical from "./templates/Clinical";
import Catalog from "./templates/Catalog";
import Estate from "./templates/Estate";

const templates = {
  editorial: Editorial,
  bold: Bold,
  clinical: Clinical,
  catalog: Catalog,
  estate: Estate,
} as const;

/** Dispatches a demo to the template its sector is built on. */
export default function DemoSite({ demo }: { demo: Demo }) {
  const Template = templates[templateFor(demo.slug)];
  return <Template demo={demo} />;
}
