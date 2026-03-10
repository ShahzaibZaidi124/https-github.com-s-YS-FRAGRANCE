import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Hero = () => {
  const [rating, setRating] = useState(4);
  const { toast } = useToast();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Decorative elements overlay */}
      <div className="absolute inset-0">
        {/* Decorative circles */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold/5 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gold/3 blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(200,170,110,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(200,170,110,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Title */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-[#C8AA6E] mb-8 animate-fade-up tracking-wider">
            YS FRAGRANCE
          </h1>
          
          {/* Description */}
          <p className="text-muted-foreground font-body text-2xl md:text-3xl lg:text-4xl max-w-3xl mx-auto mb-12 animate-fade-up font-medium relative z-10">
            Our signature perfume collection is available now. Feel fresh. Feel confident.
          </p>

          <div className="flex items-center justify-center gap-1 mb-8 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            {[0,1,2,3,4].map((i) => (
              <Star
                key={i}
                className={`w-6 h-6 cursor-pointer ${i < rating ? "text-gold" : "text-muted-foreground"}`}
                fill={i < rating ? "currentColor" : "none"}
                onClick={() => {
                  const newRating = i + 1;
                  setRating(newRating);
                  toast({ title: "Thanks for your rating", description: `${newRating} star${newRating > 1 ? "s" : ""}` });
                }}
              />
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-up" style={{ animationDelay: "0.6s" }}>
            <Button asChild variant="gold" size="lg">
              <a href="#collections">TZ COLLECTION</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-gold/60" />
      </div>

      {/* Side decorative elements */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-40 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-40 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
    </section>
  );
};

export default Hero;
