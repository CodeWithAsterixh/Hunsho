/**
 * Curated stock photography from Unsplash (images.unsplash.com is already
 * whitelisted in next.config.ts). Every entry below was individually
 * checked for "Free to use under the Unsplash License" (not Unsplash+,
 * which is a paid tier) before inclusion.
 *
 * IMPORTANT — what this can and can't stand in for:
 * These are single static images, suitable for category tiles, backgrounds,
 * and editorial use. They are NOT a substitute for the SpinViewer frame
 * sequences on product pages — a real 360° on-model shoot of a specific
 * SKU can't be faked by combining unrelated stock photos of different
 * pieces from different photographers, so SpinViewer still uses the
 * generated placeholder (see lib/placeholder-frames.ts) until that
 * photography exists.
 */
export interface StockImage {
  url: string;
  alt: string;
  credit: string; // not required by the Unsplash License, kept for the team's own reference
}

function unsplash(photoId: string, width = 1200): string {
  return `https://images.unsplash.com/${photoId}?w=${width}&q=80&fm=jpg&fit=crop&auto=format`;
}

export const stockImages: Record<string, StockImage> = {
  rings: {
    url: unsplash("photo-1654521883301-070279dd0ae1"),
    alt: "A pair of gold rings",
    credit: "Voska Studio on Unsplash",
  },
  necklaces: {
    url: unsplash("photo-1758995115682-1452a1a9e35b"),
    alt: "Gold necklace and matching earrings on display",
    credit: "Zayed Ahmed Zadu on Unsplash",
  },
  earrings: {
    // Same photo as necklaces — it shows a matched necklace-and-earrings
    // set. Swap for a dedicated earrings shot when real photography exists.
    url: unsplash("photo-1758995115682-1452a1a9e35b"),
    alt: "Gold earrings on display",
    credit: "Zayed Ahmed Zadu on Unsplash",
  },
  bracelets: {
    url: unsplash("photo-1764181237984-70ac5f211b06"),
    alt: "Hands adorned with gold rings and bracelets",
    credit: "Brandy Urstadt on Unsplash",
  },
  "traditional-ceremonial": {
    // A 19th-century Siam coral, pearl, and silver bead necklace — a
    // museum piece (The Cleveland Museum of Art), used here as an
    // evocative reference image, not a real product photo. Swap for actual
    // product photography of Hunsho's own pieces when available.
    url: unsplash("photo-1719861837626-c97f80462525"),
    alt: "Antique coral and bead necklace",
    credit: "The Cleveland Museum of Art on Unsplash (public domain)",
  },
  gifting: {
    url: unsplash("photo-1758995115682-1452a1a9e35b"),
    alt: "Gold jewelry arranged for gifting",
    credit: "Zayed Ahmed Zadu on Unsplash",
  },
};
