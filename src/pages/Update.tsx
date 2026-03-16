import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import backgroundImage from "../assets/backgrounds/ChatGPT Image Jan 15, 2026, 01_02_08 AM.png";

const Update = () => {
  // Load all photos from the update folder (add new photos there and restart dev server to see them)
  const imageModules = import.meta.glob<{ default: string }>(
    "../assets/update/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
    { eager: true }
  );
  const updateImages = Object.entries(imageModules).map(([path, mod]) => ({
    url: mod?.default ?? "",
    name: path.split(/[/\\]/).pop() || "update",
  })).filter((img) => img.url);

  return (
    <>
      {/* Fixed Background */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100%",
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
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-display text-gold mb-6 animate-fade-up">
                  UPDATE
                </h1>
                <p className="text-muted-foreground font-body text-lg md:text-xl max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
                  Latest news and updates from YS FRAGRANCE.
                </p>
              </div>

              {/* Eid Special Launch – Aventus Charm (intro + attached photos) */}
              <div className="mb-16 p-8 sm:p-10 rounded-2xl border border-gold/30 bg-card/90 backdrop-blur-sm shadow-xl animate-fade-up" style={{ animationDelay: "0.2s" }}>
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-gold text-center mb-6 leading-tight">
                  🌙✨ Eid Special Launch – Aventus Charm ✨🌙
                </h2>
                <p className="font-body text-white/90 text-base sm:text-lg leading-relaxed mb-4">
                  This Eid, celebrate the joy of happiness, elegance, and style with our new fragrance <span className="text-gold font-semibold">Aventus Charm</span>.
                  A perfume made for those who want to feel confident, fresh, and unforgettable on this special occasion.
                </p>
                <p className="font-body text-white/90 text-base sm:text-lg leading-relaxed mb-4">
                  Aventus Charm gives a long-lasting, attractive, and luxury scent that makes your Eid moments more beautiful.
                  Perfect for Eid prayer, family gatherings, and special events.
                </p>
                <div className="mt-6 p-4 rounded-xl bg-gold/10 border border-gold/20 text-center">
                  <p className="font-display text-gold text-lg sm:text-xl mb-2">🎁 Special Eid Offer Available</p>
                  <p className="font-body text-white/90 text-sm sm:text-base">Available in 10ml, 35ml, 50ml, 100ml bottles</p>
                </div>
                <p className="font-display text-gold text-center text-lg sm:text-xl mt-6">
                  Aventus Charm – Feel the Power of Fragrance this Eid.
                </p>

                {/* Eid event photos – attached to this intro */}
                {updateImages.length > 0 && (
                  <>
                    <p className="font-display text-gold text-center text-sm uppercase tracking-widest mt-10 mb-4">
                      Eid event photos
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                      {updateImages.map((img) => (
                        <div
                          key={img.url}
                          className="rounded-xl overflow-hidden border border-gold/20 bg-card shadow-lg aspect-square flex items-center justify-center"
                        >
                          <img
                            src={img.url}
                            alt={img.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {updateImages.length === 0 && (
                <p className="text-center text-muted-foreground font-body">
                  Add photos to the <code className="text-gold">src/assets/update</code> folder to attach them to the Eid event.
                </p>
              )}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Update;
