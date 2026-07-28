function unsplash(photoId: string, width = 800): string {
  return `https://images.unsplash.com/${photoId}?w=${width}&q=80&fm=jpg&fit=crop&auto=format`;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string; // matches Category.slug in categories.ts
  subcategory: string; // matches Subcategory.slug
  priceNaira: number;
  purity: string;
  shortDescription: string;
  description: string;
  /** For the Gifting Edits cross-category filter — matches gifting subcategory slugs */
  occasionTags: string[];
  /** Unsplash product thumbnail shown in cards and the product page hero */
  imageUrl: string;
  /** Seeds the placeholder SpinViewer frame color — swap for real frame URLs when photography exists */
  placeholderHue: string;
}

// SAMPLE DATA — Hunsho has no real catalog yet (new brand, per PRD §1/§5).
// Structured to match the confirmed IA/category taxonomy exactly so this can
// be swapped for real CMS/database content without restructuring pages.
export const products: Product[] = [
  {
    id: "p01",
    slug: "solitaire-halo-ring",
    name: "Solitaire Halo Ring",
    category: "rings",
    subcategory: "engagement",
    priceNaira: 1250000,
    purity: "22k Gold",
    shortDescription: "A single stone set within a fine halo, in 22k gold.",
    description:
      "A solitaire stone set within a fine halo of smaller accents, finished in 22k gold. Hallmarked and supplied with a certificate of authenticity confirming purity.",
    occasionTags: ["weddings-owambe", "anniversaries"],
    imageUrl: unsplash("photo-1605100804763-247f67b3557e"),
    placeholderHue: "#7A2F3D",
  },
  {
    id: "p02",
    slug: "fine-stacking-band",
    name: "Fine Stacking Band",
    category: "rings",
    subcategory: "everyday-stacking",
    priceNaira: 320000,
    purity: "22k Gold",
    shortDescription: "A slim band in 22k gold, built to be worn stacked or alone.",
    description:
      "A slim, low-profile band in 22k gold. Designed to sit comfortably alongside other rings or worn alone for everyday wear.",
    occasionTags: ["birthdays"],
    imageUrl: unsplash("photo-1654521883301-070279dd0ae1"),
    placeholderHue: "#5C2430",
  },
  {
    id: "p03",
    slug: "teardrop-pendant-necklace",
    name: "Teardrop Pendant Necklace",
    category: "necklaces",
    subcategory: "pendants",
    priceNaira: 480000,
    purity: "22k Gold",
    shortDescription: "A single teardrop pendant on a fine 22k gold chain.",
    description:
      "A single teardrop-cut pendant suspended from a fine 22k gold chain. Adjustable length, hallmarked.",
    occasionTags: ["birthdays", "anniversaries"],
    imageUrl: unsplash("photo-1635767798638-3e25273a8236"),
    placeholderHue: "#7A2F3D",
  },
  {
    id: "p04",
    slug: "rope-chain-necklace",
    name: "Rope Chain Necklace",
    category: "necklaces",
    subcategory: "chains",
    priceNaira: 610000,
    purity: "24k Gold",
    shortDescription: "A dense rope-link chain in solid 24k gold.",
    description:
      "A dense, tightly woven rope-link chain in solid 24k gold. Substantial in hand and on the neck.",
    occasionTags: ["festive-season"],
    imageUrl: unsplash("photo-1758995115682-1452a1a9e35b"),
    placeholderHue: "#5C2430",
  },
  {
    id: "p05",
    slug: "classic-gold-studs",
    name: "Classic Gold Studs",
    category: "earrings",
    subcategory: "studs",
    priceNaira: 210000,
    purity: "22k Gold",
    shortDescription: "Everyday studs in solid 22k gold.",
    description:
      "A pair of simple, solid 22k gold studs, built for daily wear. Secure butterfly backing.",
    occasionTags: ["birthdays", "festive-season"],
    imageUrl: unsplash("photo-1573408301185-9519f94f4b23"),
    placeholderHue: "#7A2F3D",
  },
  {
    id: "p06",
    slug: "fine-hoop-earrings",
    name: "Fine Hoop Earrings",
    category: "earrings",
    subcategory: "hoops",
    priceNaira: 265000,
    purity: "22k Gold",
    shortDescription: "Lightweight hoops in 22k gold.",
    description:
      "Lightweight hoops in 22k gold, sized to sit close to the ear for everyday wear.",
    occasionTags: ["festive-season"],
    imageUrl: unsplash("photo-1631982690223-8aa4a7c59de6"),
    placeholderHue: "#5C2430",
  },
  {
    id: "p07",
    slug: "solid-gold-bangle",
    name: "Solid Gold Bangle",
    category: "bracelets",
    subcategory: "bangles",
    priceNaira: 540000,
    purity: "24k Gold",
    shortDescription: "A solid, substantial bangle in 24k gold.",
    description:
      "A solid bangle in 24k gold with a rounded profile. Available in a range of wrist sizes — see the size guide before ordering.",
    occasionTags: ["anniversaries", "weddings-owambe"],
    imageUrl: unsplash("photo-1764181237984-70ac5f211b06"),
    placeholderHue: "#7A2F3D",
  },
  {
    id: "p08",
    slug: "curb-chain-bracelet",
    name: "Curb Chain Bracelet",
    category: "bracelets",
    subcategory: "chain-bracelets",
    priceNaira: 395000,
    purity: "22k Gold",
    shortDescription: "A classic curb-link bracelet in 22k gold.",
    description:
      "A classic flat curb-link chain bracelet in 22k gold, with a secure lobster clasp.",
    occasionTags: ["birthdays"],
    imageUrl: unsplash("photo-1611652022419-a9419f74343d"),
    placeholderHue: "#5C2430",
  },
  {
    id: "p09",
    slug: "coral-bead-necklace-set",
    name: "Coral Bead Necklace Set",
    category: "traditional-ceremonial",
    subcategory: "coral-beads",
    priceNaira: 720000,
    purity: "Coral & 22k Gold accents",
    shortDescription: "A traditional coral bead set with 22k gold accents.",
    description:
      "A coral bead necklace set finished with 22k gold accent beads, made for traditional wedding ceremonies. Sold as a matched set.",
    occasionTags: ["weddings-owambe"],
    imageUrl: unsplash("photo-1719861837626-c97f80462525"),
    placeholderHue: "#7A2F3D",
  },
  {
    id: "p10",
    slug: "waist-bead-set",
    name: "Waist Bead Set",
    category: "traditional-ceremonial",
    subcategory: "waist-beads",
    priceNaira: 95000,
    purity: "Glass beads, 22k gold accents",
    shortDescription: "A hand-strung waist bead set with gold accents.",
    description:
      "A hand-strung waist bead set finished with 22k gold accent beads. Made to measure — provide waist measurement at checkout.",
    occasionTags: ["weddings-owambe", "birthdays"],
    imageUrl: unsplash("photo-1611085583191-a3b181a88401"),
    placeholderHue: "#5C2430",
  },
];

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.category === categorySlug);
}

export function getProductBySlug(categorySlug: string, productSlug: string): Product | undefined {
  return products.find((p) => p.category === categorySlug && p.slug === productSlug);
}

export function getProductsByOccasion(occasionSlug: string): Product[] {
  return products.filter((p) => p.occasionTags.includes(occasionSlug));
}

export function formatNaira(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}
