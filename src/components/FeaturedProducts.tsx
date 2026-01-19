import { useState } from "react";
import ProductCard from "./ProductCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { allProducts, silverProducts, goldProducts } from "@/data/products";

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

// Create filtered arrays by category
const silverImages = imageProducts.filter(product => product.category === "Z Silver");
const goldImages = imageProducts.filter(product => product.category === "Z Gold");
const allImages = imageProducts;

// Debug: Log available images
if (import.meta.env.DEV) {
  console.log("Total images found:", allImages.length);
  console.log("Silver images:", silverImages.length);
  console.log("Gold images:", goldImages.length);
}

const FeaturedProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "Silver" | "Gold">("all");

  const getDisplayProducts = () => {
    switch (selectedCategory) {
      case "Silver":
        return silverImages;
      case "Gold":
        return goldImages;
      default:
        return allImages;
    }
  };

  const displayProducts = getDisplayProducts();

  return (
    <section id="collections" className="py-32 bg-background relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,170,110,0.03),transparent_70%)]" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="text-gold font-body text-sm tracking-[0.4em] uppercase mb-4">
            Our Collection
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
            TZ COLLECTION
          </h2>
          <div className="w-20 h-px bg-gold/50 mx-auto mb-8" />
          
          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as typeof selectedCategory)} className="w-full">
            <TabsList className="bg-background/50 border border-gold/20">
              <TabsTrigger value="all" className="data-[state=active]:text-gold data-[state=active]:bg-gold/10">
                TZ COLLECTION ({allImages.length})
              </TabsTrigger>
              <TabsTrigger value="Silver" className="data-[state=active]:text-gold data-[state=active]:bg-gold/10">
                Silver ({silverImages.length})
              </TabsTrigger>
              <TabsTrigger value="Gold" className="data-[state=active]:text-gold data-[state=active]:bg-gold/10">
                Gold ({goldImages.length})
              </TabsTrigger>
            </TabsList>
          </Tabs>
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
