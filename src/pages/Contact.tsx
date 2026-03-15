import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import backgroundImage from "../assets/backgrounds/ChatGPT Image Jan 15, 2026, 01_02_08 AM.png";

const Contact = () => {
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
        <div className="absolute inset-0 bg-background/85" />
      </div>

      <main className="relative z-10 min-h-screen">
        <Navbar />
        
        <section className="pt-32 pb-24">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              {/* Header */}
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-display text-gold mb-6 animate-fade-up">
                  CONTACT US
                </h1>
                <p className="text-muted-foreground font-body text-lg md:text-xl max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
                  Have questions about our collection or need help finding your signature scent? We're here to assist you.
                </p>
              </div>

              <div className="max-w-2xl mx-auto">
                {/* Contact Info */}
                <div className="space-y-8 animate-fade-up" style={{ animationDelay: "0.4s" }}>
                  <div className="p-8 rounded-2xl bg-card border border-gold/20 backdrop-blur-sm">
                    <h2 className="font-display text-2xl text-foreground mb-8 text-center">Get in Touch</h2>
                    
                    <div className="space-y-6">
                      <div className="flex items-start gap-4 justify-center md:justify-start">
                        <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                          <Phone className="w-5 h-5 text-gold" />
                        </div>
                        <div>
                          <p className="text-gold font-sans font-bold text-sm tracking-tight drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] mb-1">WhatsApp</p>
                          <a href="https://wa.me/923461034768" className="text-white font-sans font-bold text-lg tracking-tight drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] hover:text-gold transition-colors block">
                            +92 346 1034768
                          </a>
                          <a href="https://wa.me/923352672670" className="text-white font-sans font-bold text-lg tracking-tight drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] hover:text-gold transition-colors block">
                            +92 335 2672670
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 justify-center md:justify-start">
                        <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                          <Mail className="w-5 h-5 text-gold" />
                        </div>
                        <div>
                          <p className="text-gold font-sans font-bold text-sm tracking-tight drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] mb-1">Email</p>
                          <a href="mailto:Minhal@ysfragrance.com" className="text-white font-sans font-bold text-lg tracking-tight drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] hover:text-gold transition-colors">
                            Minhal@ysfragrance.com
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 justify-center md:justify-start">
                        <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                          <Map_Pin className="w-5 h-5 text-gold" />
                        </div>
                        <div>
                          <p className="text-gold font-sans font-bold text-sm tracking-tight drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] mb-1">Location</p>
                          <p className="text-white font-sans font-bold text-lg tracking-tight drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
                            Pakistan
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Collections Link */}
                  <div className="text-center">
                    <Link 
                      to="/#collections" 
                      className="inline-flex items-center gap-2 text-gold hover:text-white transition-all duration-300 font-display text-xl group"
                    >
                      View Our Collections
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

// Fixed Lucide icon name from Map_Pin to MapPin
const Map_Pin = MapPin;

export default Contact;
