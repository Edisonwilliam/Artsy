export interface CartItem {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
  quantity: number;
}

/* ── Default cart items (matching the design) ── */
export const defaultCartItems: CartItem[] = [
  {
    id: 1,
    name: "Philomena",
    category: "Editorials",
    image: "/Rectangle 62.png",
    price: 36.5,
    quantity: 1,
  },
  {
    id: 2,
    name: "Warped",
    category: "Editorials",
    image: "/Rectangle 62 (1).png",
    price: 36.5,
    quantity: 1,
  },
  {
    id: 3,
    name: "Ellipsia",
    category: "Nature",
    image: "/Rectangle 62 (2).png",
    price: 36.5,
    quantity: 1,
  },
  {
    id: 4,
    name: "Résurgence",
    category: "Nature",
    image: "/Rectangle 62 (3).png",
    price: 36.5,
    quantity: 1,
  },
];

export const SHIPPING_COST = 2.5;
