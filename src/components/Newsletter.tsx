import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Welcome to YS FRAGRANCE",
        description: "You've been added to our exclusive list.",
      });
      setEmail("");
    }
  };

  return (
    <section className="py-24 bg-noir-light relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Header */}
          <p className="text-gold font-body text-sm tracking-[0.4em] uppercase mb-4">
            Join Our World
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
            Be the First to Know
          </h2>
          <p className="text-muted-foreground font-body text-lg mb-10">
            Subscribe for exclusive access to new collections, limited editions,
            and the art of fragrance.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background border-border/50 text-foreground placeholder:text-muted-foreground focus:border-gold font-body text-base h-12 rounded-none flex-1"
              required
            />
            <Button variant="gold" type="submit" className="h-12">
              Subscribe
            </Button>
          </form>

          {/* Privacy Note */}
          <p className="text-muted-foreground/60 font-body text-xs mt-6">
            By subscribing, you agree to our Privacy Policy.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
