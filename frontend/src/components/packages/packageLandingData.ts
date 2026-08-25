import type { LucideIcon } from "lucide-react";
import {
  Baby,
  Building2,
  Compass,
  Heart,
  Landmark,
  Mountain,
  Palmtree,
  Ship,
  Sparkles,
  Users,
  Waves,
} from "lucide-react";
import type { TravelPackage } from "../../types";

const PEXELS = (id: number, width: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;

export interface LandingPlace {
  /** Display name, also used as the catalog search term. */
  name: string;
  image: string;
  /** Lowercase terms matched against live package titles / destinations. */
  match: string[];
  /** Short supporting line — kept factual, no invented pricing. */
  note?: string;
}

export const HERO_IMAGE = PEXELS(3581368, 1920);

export const HERO_QUICK_PICKS: { label: string; icon: LucideIcon; term: string }[] = [
  { label: "Beaches", icon: Waves, term: "Goa" },
  { label: "Islands", icon: Palmtree, term: "Bali" },
  { label: "Heritage", icon: Landmark, term: "Rajasthan" },
  { label: "Backwaters", icon: Ship, term: "Kerala" },
  { label: "City breaks", icon: Building2, term: "Dubai" },
];

export const PROMO_SLIDES: {
  id: string;
  kicker: string;
  title: string;
  copy: string;
  image: string;
  match: string[];
}[] = [
  {
    id: "heritage",
    kicker: "Handcrafted itineraries",
    title: "Rajasthan, planned around your pace",
    copy: "Forts, havelis and desert nights — sequenced so you are never rushing between cities.",
    image: PEXELS(3581368, 1400),
    match: ["rajasthan", "jaipur", "udaipur"],
  },
  {
    id: "island",
    kicker: "Island escapes",
    title: "Sun, sand and slow mornings",
    copy: "Beach stays with airport transfers and activities pre-arranged by your travel expert.",
    image: PEXELS(1450353, 1400),
    match: ["goa", "bali", "mauritius"],
  },
  {
    id: "outdoors",
    kicker: "For the outdoors",
    title: "Trails, valleys and mountain air",
    copy: "Himalayan routes with sensible altitude gaps and local guides who know the weather.",
    image: PEXELS(1271619, 1400),
    match: ["himachal", "kashmir", "manali"],
  },
];

export const TRENDING_PLACES: LandingPlace[] = [
  { name: "Goa", image: PEXELS(1450353, 700), match: ["goa"], note: "Beaches & nightlife" },
  { name: "Kerala", image: PEXELS(338515, 700), match: ["kerala"], note: "Backwaters & hills" },
  { name: "Rajasthan", image: PEXELS(3581368, 700), match: ["rajasthan"], note: "Forts & palaces" },
  { name: "Dubai", image: PEXELS(2044434, 700), match: ["dubai"], note: "City & desert" },
  { name: "Bali", image: PEXELS(1024960, 700), match: ["bali"], note: "Villas & temples" },
  { name: "Varanasi", image: PEXELS(1583339, 700), match: ["varanasi"], note: "Ghats & rituals" },
];

/** First tile renders as the large hero tile of the mosaic. */
export const DEAL_TILES: (LandingPlace & { blurb: string })[] = [
  {
    name: "The Rajasthan heritage loop",
    image: PEXELS(3581368, 1100),
    match: ["rajasthan"],
    blurb: "Jaipur, Jodhpur and Udaipur sequenced so you actually get to sit still somewhere.",
  },
  {
    name: "Bali, slowly",
    image: PEXELS(1024960, 800),
    match: ["bali"],
    blurb: "Villas, temples and two beach days.",
  },
  {
    name: "Mauritius for two",
    image: PEXELS(258154, 800),
    match: ["mauritius"],
    blurb: "Lagoon stays and catamaran mornings.",
  },
  {
    name: "Goa long weekend",
    image: PEXELS(1450353, 800),
    match: ["goa"],
    blurb: "Three nights, north-coast beaches, easy flights.",
  },
  {
    name: "Kashmir in spring",
    image: PEXELS(1271619, 800),
    match: ["kashmir", "srinagar"],
    blurb: "Houseboats and Gulmarg — planned on request.",
  },
];

export const HOLIDAY_THEMES: {
  id: string;
  label: string;
  copy: string;
  icon: LucideIcon;
  term: string;
}[] = [
  {
    id: "honeymoon",
    label: "Honeymoon",
    copy: "Private transfers, quiet stays and one memorable dinner.",
    icon: Heart,
    term: "Bali",
  },
  {
    id: "family",
    label: "Family",
    copy: "Shorter travel days and stays that work for all ages.",
    icon: Baby,
    term: "Kerala",
  },
  {
    id: "adventure",
    label: "Adventure",
    copy: "Snorkelling, catamarans and island hikes with vetted operators.",
    icon: Mountain,
    term: "Mauritius",
  },
  {
    id: "heritage",
    label: "Heritage",
    copy: "Forts, temples and old cities with guides who tell it well.",
    icon: Landmark,
    term: "Rajasthan",
  },
  {
    id: "group",
    label: "Groups",
    copy: "Friends, offices and large families — one coordinator throughout.",
    icon: Users,
    term: "Dubai",
  },
];

export const SEASONAL_JOURNEYS: (LandingPlace & { window: string; why: string })[] = [
  {
    name: "Kerala",
    image: PEXELS(2774556, 900),
    match: ["kerala"],
    window: "Aug – Sep",
    why: "Monsoon greens and lower stay rates.",
  },
  {
    name: "Rajasthan",
    image: PEXELS(3581368, 900),
    match: ["rajasthan"],
    window: "Oct – Feb",
    why: "Cool days made for fort walks.",
  },
  {
    name: "Goa",
    image: PEXELS(1450353, 900),
    match: ["goa"],
    window: "Nov – Feb",
    why: "Dry weather and calm seas.",
  },
  {
    name: "Kashmir",
    image: PEXELS(1365425, 900),
    match: ["kashmir"],
    window: "Mar – May",
    why: "Blossom season before the summer rush.",
  },
  {
    name: "Dubai",
    image: PEXELS(2044434, 900),
    match: ["dubai"],
    window: "Nov – Mar",
    why: "Outdoor evenings and desert camps.",
  },
  {
    name: "Bali",
    image: PEXELS(1024960, 900),
    match: ["bali"],
    window: "Apr – Oct",
    why: "Driest stretch of the year.",
  },
];

export const VISA_GROUPS: { id: string; label: string; places: LandingPlace[] }[] = [
  {
    id: "visa-free",
    label: "Visa free for Indian passports",
    places: [
      { name: "Nepal", image: PEXELS(1365425, 400), match: ["nepal"] },
      { name: "Bhutan", image: PEXELS(1271619, 400), match: ["bhutan"] },
      { name: "Mauritius", image: PEXELS(1450353, 400), match: ["mauritius"] },
      { name: "Fiji", image: PEXELS(3601425, 400), match: ["fiji"] },
      { name: "Barbados", image: PEXELS(258154, 400), match: ["barbados"] },
    ],
  },
  {
    id: "visa-on-arrival",
    label: "Visa on arrival or e-visa",
    places: [
      { name: "Thailand", image: PEXELS(1654489, 400), match: ["thailand"] },
      { name: "Indonesia", image: PEXELS(1024960, 400), match: ["bali", "indonesia"] },
      { name: "Sri Lanka", image: PEXELS(2790396, 400), match: ["sri lanka"] },
      { name: "Maldives", image: PEXELS(264787, 400), match: ["maldives"] },
      { name: "UAE", image: PEXELS(2044434, 400), match: ["dubai", "uae"] },
    ],
  },
];

export const HIDDEN_GEMS: {
  id: string;
  script: string;
  title: string;
  copy: string;
  image: string;
  match: string[];
}[] = [
  {
    id: "spiti",
    script: "Off the map",
    title: "Spiti Valley",
    copy: "Monasteries at 4,000 m, cold desert roads and villages that still run on sunlight.",
    image: PEXELS(1365425, 1600),
    match: ["spiti", "himachal"],
  },
  {
    id: "gokarna",
    script: "Quiet coast",
    title: "Gokarna",
    copy: "Goa's calmer neighbour — cliff walks between five beaches and almost no crowds.",
    image: PEXELS(1450353, 1600),
    match: ["gokarna", "goa"],
  },
  {
    id: "bundi",
    script: "Slow heritage",
    title: "Bundi",
    copy: "Step wells, blue lanes and a palace most Rajasthan itineraries drive straight past.",
    image: PEXELS(3581368, 1600),
    match: ["bundi", "rajasthan"],
  },
];

export const PACKAGE_BENEFITS: { title: string; copy: string; icon: LucideIcon }[] = [
  {
    title: "One expert, start to finish",
    copy: "The person who plans your trip is the person you call while you're travelling.",
    icon: Compass,
  },
  {
    title: "Itineraries you can change",
    copy: "Swap hotels, add a city or shift dates before you pay anything.",
    icon: Sparkles,
  },
  {
    title: "Written cost breakdown",
    copy: "Flights, stays, transfers and inclusions listed line by line — no surprise extras.",
    icon: Landmark,
  },
  {
    title: "Support while you're away",
    copy: "Call or WhatsApp us during the trip if a plan needs to move.",
    icon: Users,
  },
];

/** First live package whose title or destination matches any of the given terms. */
export function findPackage(
  packages: TravelPackage[],
  terms: string[],
): TravelPackage | undefined {
  return packages.find((pkg) => {
    const haystack = `${pkg.title} ${pkg.destination}`.toLowerCase();
    return terms.some((term) => haystack.includes(term.toLowerCase()));
  });
}
