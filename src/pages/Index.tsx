import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import UpdateBanner from "@/components/UpdateBanner";
import VideoSection from "@/components/VideoSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import backgroundImage from "../assets/backgrounds/ChatGPT Image Jan 15, 2026, 01_02_08 AM.png";

const Index = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [hash]);

  return (
    <>
      {/* Fixed Background */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: '100%'
        }}
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-background/85" />
      </div>
      
      {/* Content */}
      <main className="relative z-10 min-h-screen">
        <Navbar />
        <Hero />
        <UpdateBanner />
        <VideoSection />
        <FeaturedProducts />
        <Footer />
      </main>
    </>
  );
};

export default Index;
