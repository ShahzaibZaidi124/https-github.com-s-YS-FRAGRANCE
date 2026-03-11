import { useState } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

interface ProductCardProps {
  name: string;
  category: "Z Silver" | "Z Gold";
  image: string;
  delay: number;
  index: number;
}

const ProductCard = ({ name, category, image, delay, index }: ProductCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="group relative opacity-0 animate-fade-up cursor-pointer"
        style={{ animationDelay: `${delay}s`, animationFillMode: 'forwards' }}
        onClick={() => setIsOpen(true)}
      >
        <div className="relative overflow-hidden rounded-lg bg-card border border-gold/20 shadow-lg hover:shadow-gold/10 transition-all duration-300">
          {/* Product Image (same size as video - full width, responsive) */}
          <div className="w-full aspect-video overflow-hidden rounded-lg">
            <img
              src={image}
              alt={name}
              className="media-frame group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>

          {/* View Details Overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button className="bg-gold text-black px-4 py-2 rounded-lg font-semibold hover:bg-gold/90 transition-colors duration-200">
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* Product Details Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl w-[95vw] sm:w-full mx-auto p-4 sm:p-6 overflow-y-auto max-h-[90vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Product Image (modal) */}
            <div className="w-full aspect-video overflow-hidden rounded-lg">
              <img
                src={image}
                alt={`Product ${index + 1}`}
                className="media-frame"
              />
            </div>

            {/* Product Video (modal) */}
            <div className="w-full aspect-video overflow-hidden rounded-lg bg-muted">
              <video
                  className="media-frame-video"
                  controls
                  autoPlay
                  loop
                  playsInline
                >
                <source src="/src/assets/products/perfume video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          
          <div className="text-center space-y-3 sm:space-y-4 mt-4">
              {/* WhatsApp Contact */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 p-3 rounded-lg bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/20">
                <div className="relative">
                  <svg 
                    className="w-6 h-6 text-[#25D366]" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"></div>
                </div>
                <div className="text-center sm:text-left">
                  <a 
                    href={`https://wa.me/923461034768`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-current hover:text-gold transition-all duration-300 font-body text-base sm:text-lg font-bold glow-gold tracking-wide no-underline"
                  >
                    +92 346 1034768
                  </a>
                  <p className="text-white/80 font-body text-xs sm:text-sm mt-1">Minhal Zaidi</p>
                </div>
              </div>
            </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;