import { useState } from "react";
import ProductCard from "../ProductCard";
import { allProducts, silverProducts, goldProducts } from "@/data/products";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Dynamically import all images from both the products folder and FeaturedProducts folder
// Using multiple patterns to catch all possible image formats
const imageModules1 = import.meta.glob<{ default: string }>("../../assets/products/*.jpeg", { eager: true });
const imageModules2 = import.meta.glob<{ default: string }>("../../assets/products/*.jpg", { eager: true });
const imageModules3 = import.meta.glob<{ default: string }>("../../assets/products/*.png", { eager: true });
const imageModules4 = import.meta.glob<{ default: string }>("../../assets/products/*.webp", { eager: true });

// Also load images from the FeaturedProducts folder
const localImageModules1 = import.meta.glob<{ default: string }>("./*.jpeg", { eager: true });
const localImageModules2 = import.meta.glob<{ default: string }>("./*.jpg", { eager: true });
const localImageModules3 = import.meta.glob<{ default: string }>("./*.png", { eager: true });
const localImageModules4 = import.meta.glob<{ default: string }>("./*.webp", { eager: true });

// Combine all image modules from both locations
const allImageModules = {
  ...imageModules1,
  ...imageModules2,
  ...imageModules3,
  ...imageModules4,
  ...localImageModules1,
  ...localImageModules2,
  ...localImageModules3,
  ...localImageModules4,
};

// Create image map from dynamically imported images
const imageMap: Record<string, string> = {};
const imageArray: Array<{ name: string; url: string }> = [];

Object.keys(allImageModules).forEach((path) => {
  // Extract filename from path (handle both Windows and Unix paths)
  const pathParts = path.split(/[/\\]/);
  const fileName = pathParts[pathParts.length - 1] || "";
  
  if (fileName && !fileName.includes("index")) {
    // Get the image URL from the module
    const imageUrl = allImageModules[path].default;
    // Store with both original filename and lowercase version for matching
    imageMap[fileName] = imageUrl;
    imageMap[fileName.toLowerCase()] = imageUrl;
    imageArray.push({ name: fileName, url: imageUrl });
  }
});

// Debug: Log available images (remove in production if needed)
if (import.meta.env.DEV) {
  console.log("Available product images:", imageArray.map(img => img.name));
  console.log("Total images found:", imageArray.length);
}

// Better placeholder image
const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600'%3E%3Crect fill='%231a1a1a' width='400' height='600'/%3E%3Crect fill='%232a2a2a' x='0' y='0' width='400' height='100'/%3E%3Ctext x='50%25' y='45%25' font-family='system-ui, -apple-system, sans-serif' font-size='32' font-weight='bold' fill='%23c8aa6e' text-anchor='middle' dominant-baseline='middle'%3EZ%3C/text%3E%3Ctext x='50%25' y='55%25' font-family='system-ui, -apple-system, sans-serif' font-size='18' fill='%23999' text-anchor='middle' dominant-baseline='middle'%3EImage Coming Soon%3C/text%3E%3C/svg%3E";

// Helper function to map products with their images
const mapProductsWithImages = (productList: typeof allProducts) => {
  let unusedImageIndex = 0;
  
  return productList.map((product, index) => {
    // Try multiple matching strategies
    const productImageName = product.imageName.toLowerCase();
    const productNameLower = product.name.toLowerCase();
    
    // First, try exact match (case-insensitive)
    let imageKey = Object.keys(imageMap).find(
      (key) => key.toLowerCase() === productImageName
    );
    
    // If not found, try matching just the base name (without extension)
    if (!imageKey) {
      const baseName = productImageName.replace(/\.(jpeg|jpg|png|webp)$/i, "");
      imageKey = Object.keys(imageMap).find(
        (key) => {
          const keyBase = key.toLowerCase().replace(/\.(jpeg|jpg|png|webp)$/i, "");
          return keyBase === baseName;
        }
      );
    }
    
    // If still not found, try partial match (contains the product name)
    if (!imageKey) {
      const searchName = productNameLower.replace(/\s+/g, "-");
      const searchWords = productNameLower.split(/\s+/).filter(w => w.length > 2);
      
      imageKey = Object.keys(imageMap).find(
        (key) => {
          const keyLower = key.toLowerCase();
          // Try matching product name words in filename
          return searchWords.some(word => keyLower.includes(word)) || 
                 keyLower.includes(searchName) || 
                 searchName.includes(keyLower.replace(/\.(jpeg|jpg|png|webp)$/i, ""));
        }
      );
    }
    
    // If still not found and we have unused images, use them in order
    if (!imageKey && unusedImageIndex < imageArray.length) {
      // Skip already used images by checking if they're in the map with a different key
      const unusedImage = imageArray[unusedImageIndex];
      imageKey = unusedImage.name;
      unusedImageIndex++;
    }
    
    const importedImage = imageKey ? imageMap[imageKey] : null;
    
    // Debug missing images in development
    if (import.meta.env.DEV) {
      if (importedImage) {
        console.log(`✓ Image found for: ${product.name} -> ${imageKey}`);
      } else {
        console.warn(`✗ Image not found for product: ${product.name} (looking for: ${product.imageName})`);
      }
    }
    
    return {
      ...product,
      image: importedImage || placeholderImage,
    };
  });
};

const FeaturedProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "Z Silver" | "Z Gold">("all");

  const allProductsWithImages = mapProductsWithImages(allProducts);
  const silverProductsWithImages = mapProductsWithImages(silverProducts);
  const goldProductsWithImages = mapProductsWithImages(goldProducts);

  const getDisplayProducts = () => {
    switch (selectedCategory) {
      case "Z Silver":
        return silverProductsWithImages;
      case "Z Gold":
        return goldProductsWithImages;
      default:
        return allProductsWithImages;
    }
  };

  const displayProducts = getDisplayProducts();

  return (
    <section id="collections" className="py-16 sm:py-32 bg-background relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,170,110,0.03),transparent_70%)]" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as typeof selectedCategory)} className="w-full">
            <TabsList className="bg-background/50 border border-gold/20 h-auto flex-wrap justify-center p-1">
              <TabsTrigger value="all" className="data-[state=active]:text-gold data-[state=active]:bg-gold/10 px-3 py-2 sm:px-6 text-xs sm:text-base">
                All Products ({allProducts.length})
              </TabsTrigger>
              <TabsTrigger value="Z Silver" className="data-[state=active]:text-gold data-[state=active]:bg-gold/10 px-3 py-2 sm:px-6 text-xs sm:text-base">
                Z Silver ({silverProducts.length})
              </TabsTrigger>
              <TabsTrigger value="Z Gold" className="data-[state=active]:text-gold data-[state=active]:bg-gold/10 px-3 py-2 sm:px-6 text-xs sm:text-base">
                Z Gold ({goldProducts.length})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {displayProducts.map((product, index) => (
            <ProductCard
              key={product.name}
              name={product.name}
              category={product.category}
              image={product.image}
              delay={index * 0.1}
              index={0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
