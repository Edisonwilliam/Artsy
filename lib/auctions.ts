export interface AuctionLiveItem {
  id: number;
  image: string;
  hours: number;
  minutes: number;
  seconds: number;
  tag: string;
  viewers: number;
  currentBidUSD: string;
  chatMessages: ChatMessage[];
}

export interface ChatMessage {
  id: number;
  avatar: string;
  name: string;
  message: string;
}

export interface AuctionBidItem {
  id: number;
  name: string;
  ethPrice: string;
  image: string;
  creator: string;
  date: string;
  currentBid: string;
  liked: boolean;
}

/* ── Live auction carousel items ── */
export const liveAuctions: AuctionLiveItem[] = [
  {
    id: 1,
    image: "/Rectangle 236 (1).png",
    hours: 6,
    minutes: 40,
    seconds: 15,
    tag: "Lost or Wither",
    viewers: 295,
    currentBidUSD: "$45.00",
    chatMessages: [
      { id: 1, avatar: "/Ellipse 19.png", name: "Ella Flynn", message: "Tight bid" },
      { id: 2, avatar: "/Ellipse 19.png", name: "Madam Benson", message: "God abeg" },
      { id: 3, avatar: "/Ellipse 19.png", name: "boma jango", message: "0.900 eth" },
      { id: 4, avatar: "/Ellipse 19.png", name: "Ella Flynn", message: "Love thissss!" },
    ],
  },
  {
    id: 2,
    image: "/Rectangle 239 (1).png",
    hours: 6,
    minutes: 40,
    seconds: 15,
    tag: "Reflections",
    viewers: 184,
    currentBidUSD: "$32.50",
    chatMessages: [
      { id: 1, avatar: "/Ellipse 19.png", name: "Jake Morris", message: "Beautiful piece" },
      { id: 2, avatar: "/Ellipse 19.png", name: "Ella Flynn", message: "Raising my bid!" },
      { id: 3, avatar: "/Ellipse 19.png", name: "boma jango", message: "1.200 eth" },
      { id: 4, avatar: "/Ellipse 19.png", name: "Madam Benson", message: "Too good 🔥" },
    ],
  },
  {
    id: 3,
    image: "/Rectangle 230 (3).png",
    hours: 3,
    minutes: 15,
    seconds: 42,
    tag: "Urban Decay",
    viewers: 412,
    currentBidUSD: "$67.00",
    chatMessages: [
      { id: 1, avatar: "/Ellipse 19.png", name: "Madam Benson", message: "Going all in" },
      { id: 2, avatar: "/Ellipse 19.png", name: "Jake Morris", message: "Stunning work" },
      { id: 3, avatar: "/Ellipse 19.png", name: "Ella Flynn", message: "2.500 eth" },
      { id: 4, avatar: "/Ellipse 19.png", name: "boma jango", message: "This is fire!" },
    ],
  },
  {
    id: 4,
    image: "/Rectangle 91.png",
    hours: 1,
    minutes: 22,
    seconds: 8,
    tag: "Golden Hour",
    viewers: 538,
    currentBidUSD: "$89.00",
    chatMessages: [
      { id: 1, avatar: "/Ellipse 19.png", name: "boma jango", message: "My fav artist" },
      { id: 2, avatar: "/Ellipse 19.png", name: "Ella Flynn", message: "3.100 eth" },
      { id: 3, avatar: "/Ellipse 19.png", name: "Madam Benson", message: "Keep going!" },
      { id: 4, avatar: "/Ellipse 19.png", name: "Jake Morris", message: "Masterpiece 🎨" },
    ],
  },
];

/* ── Top bids items ── */
export const topBids: AuctionBidItem[] = [
  {
    id: 1,
    name: "Out of the box",
    ethPrice: "0.57 ETH",
    image: "/Rectangle 245.png",
    creator: "Jacob Banks",
    date: "12/08/22",
    currentBid: "0.987 ETH",
    liked: true,
  },
  {
    id: 2,
    name: "Out of the box",
    ethPrice: "0.34 ETH",
    image: "/Rectangle 245 (1).png",
    creator: "Jacob Banks",
    date: "12/08/22",
    currentBid: "0.987 ETH",
    liked: false,
  },
  {
    id: 3,
    name: "Falling apart",
    ethPrice: "0.67 ETH",
    image: "/Rectangle 246.png",
    creator: "Jacob Banks",
    date: "12/08/22",
    currentBid: "0.768 ETH",
    liked: false,
  },
  {
    id: 4,
    name: "Warped",
    ethPrice: "0.52 ETH",
    image: "/Rectangle 247.png",
    creator: "Jacob Banks",
    date: "12/08/22",
    currentBid: "0.624 ETH",
    liked: false,
  },
  {
    id: 5,
    name: "Suspension",
    ethPrice: "0.41 ETH",
    image: "/Rectangle 251.png",
    creator: "Jacob Banks",
    date: "12/08/22",
    currentBid: "0.553 ETH",
    liked: false,
  },
  {
    id: 6,
    name: "Timeless",
    ethPrice: "0.72 ETH",
    image: "/Rectangle 62.png",
    creator: "Jacob Banks",
    date: "12/08/22",
    currentBid: "0.812 ETH",
    liked: false,
  },
  {
    id: 7,
    name: "Perspective",
    ethPrice: "0.39 ETH",
    image: "/Rectangle 62 (1).png",
    creator: "Jacob Banks",
    date: "12/08/22",
    currentBid: "0.445 ETH",
    liked: false,
  },
  {
    id: 8,
    name: "Equilibrium",
    ethPrice: "0.88 ETH",
    image: "/Rectangle 62 (2).png",
    creator: "Jacob Banks",
    date: "12/08/22",
    currentBid: "1.120 ETH",
    liked: false,
  },
];
