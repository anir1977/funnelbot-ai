import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Stats from "@/components/landing/Stats";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Dashboard from "@/components/landing/Dashboard";
import MobilePreviews from "@/components/landing/MobilePreviews";
import UseCases from "@/components/landing/UseCases";
import Pricing from "@/components/landing/Pricing";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import CTAFooter from "@/components/landing/CTAFooter";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <Dashboard />
      <MobilePreviews />
      <UseCases />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTAFooter />
      <WhatsAppFloat />
    </main>
  );
}
