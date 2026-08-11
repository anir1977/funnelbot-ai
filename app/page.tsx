import Navbar          from "@/components/landing/Navbar";
import Hero             from "@/components/landing/Hero";
import PainPoints       from "@/components/landing/PainPoints";
import StickyFeatures   from "@/components/landing/StickyFeatures";
import WaDemo           from "@/components/landing/WaDemo";
import Dashboard        from "@/components/landing/Dashboard";
import Pricing          from "@/components/landing/Pricing";
import FAQ              from "@/components/landing/FAQ";
import CTAFooter        from "@/components/landing/CTAFooter";
import WhatsAppFloat    from "@/components/landing/WhatsAppFloat";

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-[#121414]">
      <Navbar />
      <Hero />
      <PainPoints />
      <StickyFeatures />
      <WaDemo />
      <Dashboard />
      <Pricing />
      <FAQ />
      <CTAFooter />
      <WhatsAppFloat />
    </main>
  );
}
