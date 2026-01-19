const Footer = () => {
  return (
    <footer className="bg-card border-t border-gold/20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-gold/3 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-gold/2 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="text-center">
          {/* Brand Section */}
          <div className="mb-8">
            <h3 className="font-display text-2xl text-foreground mb-4">
              <span className="text-gradient-gold">TZ COLLECTION</span>
            </h3>
            <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6 max-w-md mx-auto">
              Our signature perfume collection. Feel fresh. Feel confident.
              Experience the art of fragrance.
            </p>
          </div>

          {/* WhatsApp Contact */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4 mb-3 p-4 rounded-lg bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/20 backdrop-blur-sm">
              <div className="relative">
                <svg 
                  className="w-8 h-8 text-[#25D366] drop-shadow-lg animate-pulse" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
              </div>
              <div className="text-center">
                <a 
                  href={`https://wa.me/923461034768`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-current hover:text-gold transition-all duration-300 font-body text-xl font-bold glow-gold tracking-wide hover:scale-105 transform no-underline"
                >
                  +92 346 1034768
                </a>
                <p className="text-white/80 font-body text-sm mt-1 glow-gold">Minhal Zaidi</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gold/20 mt-12 pt-8">
          <div className="text-center">
            <p className="text-muted-foreground font-body text-sm mb-2">
              © 2026 TZ COLLECTION. All rights reserved.
            </p>
            <p className="text-muted-foreground font-body text-sm">
              made by shahzaib
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
