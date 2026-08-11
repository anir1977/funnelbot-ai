import Navbar         from "@/components/agency/Navbar";
import Hero            from "@/components/agency/Hero";
import Stats           from "@/components/agency/Stats";
import Benefits        from "@/components/agency/Benefits";
import Marquee         from "@/components/agency/Marquee";
import Portfolio       from "@/components/agency/Portfolio";
import Services        from "@/components/agency/Services";
import Process         from "@/components/agency/Process";
import WhyUs           from "@/components/agency/WhyUs";
import Tools           from "@/components/agency/Tools";
import Cities          from "@/components/agency/Cities";
import Pricing         from "@/components/agency/Pricing";
import FAQ             from "@/components/agency/FAQ";
import Contact         from "@/components/agency/Contact";
import CTA             from "@/components/agency/CTA";
import Footer          from "@/components/agency/Footer";
import WhatsAppButton  from "@/components/agency/WhatsAppButton";

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-white">
      <Navbar />
      <Hero />
      <Stats />
      <Benefits />
      <Marquee />
      <Portfolio />
      <Services />
      <Process />
      <WhyUs />
      <Tools />
      <Cities />
      <Marquee dark />
      <Pricing />
      <FAQ />
      <Contact />
      <CTA />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
