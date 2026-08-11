import Navbar         from "@/components/agency/Navbar";
import Hero            from "@/components/agency/Hero";
import Benefits        from "@/components/agency/Benefits";
import Demos           from "@/components/agency/Demos";
import Services        from "@/components/agency/Services";
import Process         from "@/components/agency/Process";
import WhyUs           from "@/components/agency/WhyUs";
import Pricing         from "@/components/agency/Pricing";
import FAQ             from "@/components/agency/FAQ";
import CTA             from "@/components/agency/CTA";
import Footer          from "@/components/agency/Footer";
import WhatsAppButton  from "@/components/agency/WhatsAppButton";

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-white">
      <Navbar />
      <Hero />
      <Benefits />
      <Demos />
      <Services />
      <Process />
      <WhyUs />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
