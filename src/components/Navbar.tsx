import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-10">
            {isHomePage && (
              <a
                href="#collections"
                className="text-foreground/80 hover:text-gold transition-colors duration-300 font-body text-sm tracking-widest uppercase"
              >
                Collections
              </a>
            )}
            <Link
              to="/contact"
              className="text-foreground/80 hover:text-gold transition-colors duration-300 font-body text-sm tracking-widest uppercase"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
