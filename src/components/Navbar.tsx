import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="font-display text-xl sm:text-2xl tracking-[0.15em] sm:tracking-[0.3em] text-gold whitespace-nowrap">
            YS FRAGRANCE
          </Link>

          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center gap-10">
            {isHomePage ? (
              <a
                href="#collections"
                className="text-foreground/80 hover:text-gold transition-colors duration-300 font-body text-sm tracking-widest uppercase"
              >
                Collections
              </a>
            ) : (
              <Link
                to="/#collections"
                className="text-foreground/80 hover:text-gold transition-colors duration-300 font-body text-sm tracking-widest uppercase"
              >
                Collections
              </Link>
            )}
            <Link
              to="/update"
              className="text-foreground/80 hover:text-gold transition-colors duration-300 font-body text-sm tracking-widest uppercase"
            >
              Update
            </Link>
            <Link
              to="/contact"
              className="text-foreground/80 hover:text-gold transition-colors duration-300 font-body text-sm tracking-widest uppercase"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gold p-2 transition-colors hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-gold/20 animate-fade-in py-8 px-6 space-y-6">
            <div className="flex flex-col gap-6 text-center">
              {isHomePage ? (
                <a
                  href="#collections"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-foreground hover:text-gold transition-colors font-body text-lg uppercase tracking-widest py-2 border-b border-gold/10"
                >
                  Collections
                </a>
              ) : (
                <Link
                  to="/#collections"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-foreground hover:text-gold transition-colors font-body text-lg uppercase tracking-widest py-2 border-b border-gold/10"
                >
                  Collections
                </Link>
              )}
              <Link
                to="/update"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-foreground hover:text-gold transition-colors font-body text-lg uppercase tracking-widest py-2 border-b border-gold/10"
              >
                Update
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-foreground hover:text-gold transition-colors font-body text-lg uppercase tracking-widest py-2"
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
