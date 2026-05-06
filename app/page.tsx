import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Stats from "@/components/landing/Stats";
import Features from "@/components/landing/Features";
import Dashboard from "@/components/landing/Dashboard";
import MobilePreviews from "@/components/landing/MobilePreviews";
import Pricing from "@/components/landing/Pricing";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import CTAFooter from "@/components/landing/CTAFooter";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <Dashboard />
      <MobilePreviews />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTAFooter />
    </main>
  );
}
