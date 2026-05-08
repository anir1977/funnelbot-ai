import Navbar       from "@/components/landing/Navbar";
import Hero          from "@/components/landing/Hero";
import Stats         from "@/components/landing/Stats";
import HowItWorks    from "@/components/landing/HowItWorks";
import Features      from "@/components/landing/Features";
import Dashboard     from "@/components/landing/Dashboard";
import Pricing       from "@/components/landing/Pricing";
import Testimonials  from "@/components/landing/Testimonials";
import FAQ           from "@/components/landing/FAQ";
import CTAFooter     from "@/components/landing/CTAFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <Stats />
      <HowItWorks />
      <Features />
      <Dashboard />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTAFooter />
      <WhatsAppFloat />
    </main>
  );
}
