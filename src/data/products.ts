// Product data for YS FRAGRANCE Collection
// Based on the actual product images available

export interface Product {
  name: string;
  category: "Z Silver" | "Z Gold";
  image: string;
  imageName: string;
}

// Z Silver Collection Products
export const silverProducts: Product[] = [
  {
    name: "Spark",
    category: "Z Silver",
    image: "/src/assets/products/spark.jpeg",
    imageName: "spark.jpeg",
  },
  {
    name: "Pink 502",
    category: "Z Silver",
    image: "/src/assets/products/pink-502.jpeg",
    imageName: "pink-502.jpeg",
  },
  {
    name: "Oud Greatness",
    category: "Z Silver",
    image: "/src/assets/products/oud-greatness.jpeg",
    imageName: "oud-greatness.jpeg",
  },
  {
    name: "Tuscan Leather",
    category: "Z Silver",
    image: "/src/assets/products/tuscan-leather.jpeg",
    imageName: "tuscan-leather.jpeg",
  },
  {
    name: "One Men Show",
    category: "Z Silver",
    image: "/src/assets/products/one-men-show.jpeg",
    imageName: "one-men-show.jpeg",
  },
];

// Z Gold Collection Products
export const goldProducts: Product[] = [
  {
    name: "Dior Sauvage",
    category: "Z Gold",
    image: "/src/assets/products/dior-sauvage.jpeg",
    imageName: "dior-sauvage.jpeg",
  },
  {
    name: "Meteore LV",
    category: "Z Gold",
    image: "/src/assets/products/meteore-lv.jpeg",
    imageName: "meteore-lv.jpeg",
  },
  {
    name: "Romantic Coffee",
    category: "Z Gold",
    image: "/src/assets/products/romantic-coffee.jpeg",
    imageName: "romantic-coffee.jpeg",
  },
];

// All products combined
export const allProducts: Product[] = [...silverProducts, ...goldProducts];

