import ProductCard from "./ProductCard";

// Dynamically import all images from the assets/products folder
const imageModules = import.meta.glob<{ default: string }>("../assets/products/*.{jpeg,jpg,png,webp}", {
  eager: true,
});

// Create array of all images with their URLs and names
interface ImageProduct {
  name: string;
  category: "Z Silver" | "Z Gold";
  image: string;
  imageName: string;
}

// Get all image URLs and create products from them WITHOUT names
const imageProducts: ImageProduct[] = [];

Object.keys(imageModules).forEach((path, index) => {
  const pathParts = path.split(/[/\\]/);
  const fileName = pathParts[pathParts.length - 1] || "";

  // Skip non-image files, video files, and specifically skip Image 2
  if (fileName && !fileName.includes(".mp4") && index !== 1) {
    const imageUrl = imageModules[path].default;
    
    imageProducts.push({
      name: `Image ${imageProducts.length + 1} (${fileName})`, // Show image number and filename
      category: Math.random() > 0.5 ? "Z Silver" : "Z Gold",
      image: imageUrl,
      imageName: fileName,
    });
  }
});

// Debug: Log available images
if (import.meta.env.DEV) {
  console.log("Total images found:", imageProducts.length);
}

const FeaturedProducts = () => {
  const displayProducts = imageProducts;

  return (
    <section id="collections" className="py-32 bg-background relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,170,110,0.03),transparent_70%)]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="w-20 h-px bg-gold/50 mx-auto" />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {displayProducts.map((product, index) => (
            <ProductCard
              key={`${product.image}-${index}`}
              name={product.name}
              category={product.category}
              image={product.image}
              delay={index * 0.1}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
