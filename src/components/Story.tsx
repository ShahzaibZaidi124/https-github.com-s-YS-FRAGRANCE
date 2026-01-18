import { Button } from "@/components/ui/button";

const Story = () => {
  const stats = [
    { number: "130+", label: "Years of Excellence" },
    { number: "50+", label: "Master Perfumers" },
    { number: "200+", label: "Rare Ingredients" },
    { number: "40+", label: "Countries Served" },
  ];

  return (
    <section id="story" className="py-32 bg-noir-light relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="animate-fade-up">
            <p className="text-gold font-body text-sm tracking-[0.4em] uppercase mb-4">
              Our Heritage
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground leading-tight mb-8">
              A Legacy of
              <span className="block text-gradient-gold">Artisan Excellence</span>
            </h2>
            <div className="space-y-6 text-muted-foreground font-body text-lg leading-relaxed mb-10">
              <p>
                Since 1892, Lumière has been crafting extraordinary fragrances
                that capture the essence of elegance and sophistication. Our
                perfumers travel the world seeking the rarest ingredients.
              </p>
              <p>
                Each bottle tells a unique story, blending tradition with
                innovation to create scents that transcend time and evoke
                the deepest emotions.
              </p>
            </div>
            <Button variant="goldOutline" size="lg">
              Discover Our Journey
            </Button>
          </div>

          {/* Right Stats */}
          <div className="grid grid-cols-2 gap-8 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center p-8 border border-border/30 bg-background/50 backdrop-blur-sm hover:border-gold/50 transition-all duration-500 group"
              >
                <span className="font-display text-4xl md:text-5xl text-gold group-hover:scale-110 transition-transform duration-300 inline-block">
                  {stat.number}
                </span>
                <span className="block mt-3 text-muted-foreground font-body text-sm tracking-wider uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
