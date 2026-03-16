import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";

const UpdateBanner = () => {
  return (
    <section className="relative py-4 px-4 sm:px-6">
      <div className="container mx-auto max-w-4xl">
        <Link
          to="/update"
          className="group flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full py-4 px-6 sm:px-8 rounded-2xl border border-gold/30 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 backdrop-blur-sm shadow-lg hover:shadow-gold/20 hover:border-gold/50 transition-all duration-300 overflow-hidden"
        >
          {/* Subtle shine overlay on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full pointer-events-none" />
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center group-hover:bg-gold/30 group-hover:scale-110 transition-all duration-300">
              <Sparkles className="w-6 h-6 text-gold" />
            </div>
            <div className="text-left sm:text-center">
              <span className="font-display text-lg sm:text-xl text-gold tracking-widest uppercase block">
                What&apos;s New
              </span>
              <span className="font-body text-sm sm:text-base text-muted-foreground">
                See our latest updates
              </span>
            </div>
          </div>
          <span className="hidden sm:inline text-gold/50">•</span>
          <span className="inline-flex items-center gap-2 font-body text-gold font-semibold group-hover:gap-3 transition-all">
            View Updates
            <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </Link>
      </div>
    </section>
  );
};

export default UpdateBanner;
