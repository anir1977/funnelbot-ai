import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "FunnelsLibrary — Agence web au Maroc. Sites professionnels livrés en 7 jours.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Preview card shown wherever the link is pasted — WhatsApp above all, since
 * that is how the agency reaches its prospects. Rendered from primitives with
 * no remote font or image, so it cannot fail on a network hiccup at build time.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0F172A",
          padding: "72px 80px",
        }}
      >
        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "#2563EB",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <div style={{ width: 34, height: 6, borderRadius: 3, background: "#fff" }} />
            <div style={{ width: 24, height: 6, borderRadius: 3, background: "rgba(255,255,255,0.85)" }} />
            <div style={{ width: 14, height: 6, borderRadius: 3, background: "rgba(255,255,255,0.7)" }} />
          </div>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700, color: "#fff" }}>
            Funnels
            <span style={{ color: "#60A5FA" }}>Library</span>
          </div>
        </div>

        {/* Claim */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 26,
              color: "#60A5FA",
              letterSpacing: 4,
              textTransform: "uppercase",
              marginBottom: 24,
            }}
          >
            Agence web au Maroc
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.1,
              letterSpacing: -2,
              maxWidth: 940,
              display: "flex",
            }}
          >
            Votre entreprise mérite un site qui inspire confiance.
          </div>
        </div>

        {/* Proof points */}
        <div style={{ display: "flex", gap: 44, fontSize: 27, color: "#94A3B8" }}>
          {["Livré en 7 jours", "18 modèles par métier", "Devis gratuit"].map((item) => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  background: "#22C55E",
                }}
              />
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
