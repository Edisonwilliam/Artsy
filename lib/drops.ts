export interface Drop {
  id: number;
  title: string;
  image: string;
  description: string;
  creator: string;
  date: string;
  status: "upcoming" | "live" | "ended";
  timeRemaining: { hours: number; minutes: number; seconds: number };
  /** Only used when status is "ended" */
  endedAgo?: string;
  actionLabel: string;
  actionHref: string;
}

export const drops: Drop[] = [
  {
    id: 1,
    title: "Eyo : Eko For Show",
    image: "/Rectangle 239 (1).png",
    description:
      "Lorem ipsum dolor sit amet consectetur. Amet odio a semper quis viverra tempor. Sed nunc tempus aliquet lectus ut vulputate.",
    creator: "Aliya Minat",
    date: "November 21 at 11 am WAT",
    status: "upcoming",
    timeRemaining: { hours: 6, minutes: 45, seconds: 22 },
    actionLabel: "Get notified",
    actionHref: "#",
  },
  {
    id: 2,
    title: "Ginger Suburbs",
    image: "/Rectangle 236 (1).png",
    description:
      "Lorem ipsum dolor sit amet consectetur. Amet odio a semper quis viverra tempor. Sed nunc tempus aliquet lectus ut vulputate.",
    creator: "Tina Benson",
    date: "November 21 at 11 am WAT",
    status: "live",
    timeRemaining: { hours: 6, minutes: 45, seconds: 22 },
    actionLabel: "Join now",
    actionHref: "#",
  },
  {
    id: 3,
    title: "Sink",
    image: "/Featured product (1).png",
    description:
      "Lorem ipsum dolor sit amet consectetur. Amet odio a semper quis viverra tempor. Sed nunc tempus aliquet lectus ut vulputate.",
    creator: "Aliya Minat",
    date: "November 21 at 11 am WAT",
    status: "ended",
    timeRemaining: { hours: 0, minutes: 0, seconds: 0 },
    endedAgo: "2 hours ago",
    actionLabel: "View",
    actionHref: "#",
  },
  {
    id: 4,
    title: "Warped '99",
    image: "/Featured product 2.png",
    description:
      "Lorem ipsum dolor sit amet consectetur. Amet odio a semper quis viverra tempor. Sed nunc tempus aliquet lectus ut vulputate.",
    creator: "Aliya Minat",
    date: "November 21 at 11 am WAT",
    status: "ended",
    timeRemaining: { hours: 0, minutes: 0, seconds: 0 },
    endedAgo: "5 hours ago",
    actionLabel: "View",
    actionHref: "#",
  },
];
