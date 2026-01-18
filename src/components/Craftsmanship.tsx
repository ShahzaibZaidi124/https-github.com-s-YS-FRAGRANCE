import { Sparkles, Gem, Leaf } from "lucide-react";

const features = [
  {
    icon: <Gem className="w-8 h-8" />,
    title: "Rare Ingredients",
    description:
      "We source the world's most precious ingredients, from Bulgarian rose to Indian sandalwood, ensuring unparalleled quality.",
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Master Perfumers",
    description:
      "Our fragrances are created by renowned noses with decades of experience, blending art and science into every bottle.",
  },
  {
    icon: <Leaf className="w-8 h-8" />,
    title: "Sustainable Luxury",
    description:
      "We're committed to ethical sourcing and sustainable practices, preserving nature's beauty for generations to come.",
  },
];

const Craftsmanship = () => {
  return (
    <section id="craftsmanship" className="py-32 bg-background relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(200,170,110,0.05),transparent_50%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="text-gold font-body text-sm tracking-[0.4em] uppercase mb-4">
            The Art of Perfumery
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
            Crafted to Perfection
          </h2>
          <div className="w-20 h-px bg-gold/50 mx-auto" />
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="text-center p-10 border border-border/30 bg-card/50 backdrop-blur-sm hover:border-gold/50 transition-all duration-500 group animate-fade-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-gold/30 text-gold mb-8 group-hover:bg-gold/10 transition-all duration-300">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="font-display text-2xl text-foreground mb-4">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground font-body text-base leading-relaxed">
                {feature.description}
              </p>

              {/* Decorative Line */}
              <div className="w-12 h-px bg-gold/30 mx-auto mt-8 group-hover:w-20 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Craftsmanship;
