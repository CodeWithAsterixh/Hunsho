import { cn } from "@/lib/utils";
import React from "react";

type Props = Omit<React.HTMLAttributes<HTMLIFrameElement>, "src"> & {
  /** Free-text address or place name, e.g. "12 Ikoyi Road, Lagos, Nigeria" */
  address?: string;
  /** Pre-built embed URL — takes priority over `address` if provided */
  src?: string;
  zoom?: number;
};

/**
 * Grayscale Google Maps embed. Pass either `address` (a free-text query,
 * URL-encoded automatically) or a full `src` embed URL. Neither is
 * hardcoded here — this component has no opinion about what location a
 * given site needs to show (flagship boutique, showroom, HQ, etc).
 */
export default function Map({ className, address, src, zoom = 15, ...props }: Props) {
  const embedSrc =
    src ??
    (address
      ? `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`
      : undefined);

  if (!embedSrc) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("<Map /> requires either an `address` or `src` prop.");
    }
    return null;
  }

  return (
    <iframe
      src={embedSrc}
      className={cn(
        "absolute inset-0 w-full h-full border-0 filter grayscale contrast-115 invert-[0.03]",
        className,
      )}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Location map"
      {...props}
    />
  );
}
