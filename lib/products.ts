export interface Product {
  id: number;
  name: string;
  price: string;
  image: string | null; // null = needs upload
  creator: string;
  origin: string;
  totalViews: string;
  description: string;
  collection: string; // which collection this product belongs to
}

export const allProducts: Product[] = [
  {
    id: 1,
    name: "BOOLEAN EGYPTIAN",
    price: "$21.00",
    image: "/Rectangle 62.png",
    creator: "Ali Dawa",
    origin: "Made in Egypt",
    totalViews: "1.7K",
    description:
      "The Boolean Egyptian is a contemporary art piece that reimagines ancient Egyptian aesthetics through a modern digital lens. This piece blends classical sculpture forms with vibrant chromatic overlays, creating a dialogue between past and present artistic traditions.",
    collection: "Editorials",
  },
  {
    id: 2,
    name: "ROAD TO EGYPT",
    price: "$17.00",
    image: "/Rectangle 62 (1).png",
    creator: "Ali Dawa",
    origin: "Made in Egypt",
    totalViews: "2.3K",
    description:
      "Road to Egypt captures the essence of a journey through ancient landscapes, blending documentary photography with artistic vision. Each frame tells a story of cultural rediscovery and spiritual awakening.",
    collection: "Editorials",
  },
  {
    id: 3,
    name: "BLANC",
    price: "$17.00",
    image: "/Rectangle 62 (3).png",
    creator: "Mia Thornton",
    origin: "Made in France",
    totalViews: "980",
    description:
      "Blanc explores the concept of purity and emptiness through minimalist fashion photography. The interplay of light, fabric, and form creates a meditative visual experience that challenges conventional beauty standards.",
    collection: "Fashion",
  },
  {
    id: 4,
    name: "ELLIPSIA",
    price: "$17.00",
    image: "/Rectangle 62 (2).png",
    creator: "James O'Brien",
    origin: "Made in Ireland",
    totalViews: "1.2K",
    description:
      "Ellipsia is a photographic exploration of self-concealment and identity. The subject uses a camera as both shield and window, creating a powerful commentary on the relationship between observer and observed.",
    collection: "Editorials",
  },
  {
    id: 5,
    name: "THE LAWMAKERS",
    price: "$50.00",
    image: "/Rectangle 230 (2).png",
    creator: "Kendrick Lamar",
    origin: "Made in USA",
    totalViews: "3.5K",
    description:
      "The Lawmakers is a landmark photographic series documenting the unseen architects of society. Through intimate portraiture, this collection reveals the humanity behind power, capturing quiet moments of reflection and resolve.",
    collection: "Editorials",
  },
  {
    id: 6,
    name: "PHILOMENA '22",
    price: "$21.00",
    creator: "Ali Dawa",
    origin: "Made in Italy",
    totalViews: "1.7K",
    image: null,
    description:
      "Philomena '22 is a striking portrait series that merges classical Renaissance aesthetics with contemporary fashion. Shot in Milan, each frame draws inspiration from Italian masters while celebrating modern femininity and strength.",
    collection: "Fashion",
  },
  {
    id: 7,
    name: "ALTERNATING SEASONS",
    price: "$35.00",
    image: null,
    creator: "Ava Chen",
    origin: "Made in Japan",
    totalViews: "890",
    description:
      "A poetic visual journey through Japan's changing seasons, capturing fleeting moments of transformation in nature and daily life. Each photograph serves as a meditation on impermanence and beauty.",
    collection: "Editorials",
  },
  {
    id: 8,
    name: "OASIS",
    price: "$42.00",
    image: null,
    creator: "Marcus Reed",
    origin: "Made in Morocco",
    totalViews: "1.5K",
    description:
      "Oasis documents the interplay of light, water, and desert landscape in North Africa. The series captures rare moments where nature defies its surroundings, creating pockets of life and color.",
    collection: "Optics",
  },
  {
    id: 9,
    name: "VEIL OF DUST",
    price: "$18.00",
    image: null,
    creator: "Priya Sharma",
    origin: "Made in India",
    totalViews: "620",
    description:
      "Veil of Dust is an intimate documentary series exploring the daily rituals and quiet dignity of rural Indian communities. Through soft, diffused light, each image reveals beauty in simplicity.",
    collection: "Editorials",
  },
  {
    id: 10,
    name: "SUNSET BOULEVARD",
    price: "$22.00",
    image: null,
    creator: "Carlos Mendez",
    origin: "Made in USA",
    totalViews: "2.1K",
    description:
      "A cinematic exploration of Los Angeles' most iconic street, capturing the golden hour magic that has inspired generations of filmmakers and dreamers. Each frame is a love letter to Hollywood's enduring mystique.",
    collection: "Optics",
  },
  {
    id: 11,
    name: "URBAN DECAY",
    price: "$31.00",
    image: null,
    creator: "Lena Vogt",
    origin: "Made in Germany",
    totalViews: "1.8K",
    description:
      "Urban Decay finds beauty in abandoned industrial spaces across Berlin. The series documents the slow reclamation of human structures by nature, creating a visual narrative of entropy and renewal.",
    collection: "Art & Museum",
  },
  {
    id: 12,
    name: "GOLDEN HOUR",
    price: "$27.00",
    image: null,
    creator: "Yuki Tanaka",
    origin: "Made in Japan",
    totalViews: "950",
    description:
      "Golden Hour captures the magical minutes before sunset across Tokyo's skyline. The interplay of artificial and natural light creates a unique chromatic experience that defines modern urban photography.",
    collection: "Optics",
  },
  {
    id: 13,
    name: "NOIR ESSENCE",
    price: "$39.00",
    image: null,
    creator: "Sophie Laurent",
    origin: "Made in France",
    totalViews: "1.3K",
    description:
      "Noir Essence is a high-contrast black and white series that strips fashion photography to its purest form. By removing color, the work demands attention to form, texture, and the raw emotion of each subject.",
    collection: "Fashion",
  },
  {
    id: 14,
    name: "CHROMATIC",
    price: "$24.00",
    image: null,
    creator: "Dev Patel",
    origin: "Made in UK",
    totalViews: "770",
    description:
      "Chromatic is an explosion of color theory applied to street photography. Each image is carefully composed to create harmonious color relationships that transform ordinary urban scenes into abstract art.",
    collection: "Optics",
  },
  {
    id: 15,
    name: "MOSAIC",
    price: "$33.00",
    image: null,
    creator: "Fatima Al-Rashid",
    origin: "Made in UAE",
    totalViews: "1.1K",
    description:
      "Mosaic weaves together fragments of Middle Eastern architecture, textiles, and daily life into a cohesive visual tapestry. The series celebrates the rich geometric traditions that continue to influence contemporary design.",
    collection: "Art & Museum",
  },
];

/* ── More from collection items (for carousel on detail page) ── */
export interface CollectionItem {
  id: number;
  name: string;
  price: string;
  image: string | null;
}

export function getMoreFromCollection(
  productId: number,
  limit = 5
): CollectionItem[] {
  const product = allProducts.find((p) => p.id === productId);
  if (!product) return [];

  // Get products from the same collection, excluding the current one
  const sameCollection = allProducts.filter(
    (p) => p.collection === product.collection && p.id !== productId
  );

  // If not enough from same collection, add from other collections
  const others = allProducts.filter(
    (p) =>
      p.collection !== product.collection &&
      p.id !== productId &&
      !sameCollection.find((sc) => sc.id === p.id)
  );

  return [...sameCollection, ...others].slice(0, limit).map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    image: p.image,
  }));
}
