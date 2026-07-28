import Link from "next/link";
import { MagneticButton } from "./MagneticButton";

const linkGroups: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Client Services",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Shipping & Returns", href: "/shipping-returns" },
      { label: "Jewelry Care", href: "/care" },
      { label: "Visit Us", href: "/visit" },
    ],
  },
  {
    heading: "The House",
    links: [
      { label: "About", href: "/about" },
      { label: "Journal", href: "/journal" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

interface FooterProps {
  brandName?: string;
}

export function Footer({ brandName = "Hunsho" }: FooterProps) {
  return (
    <footer className="border-t border-[var(--color-border)]">
      {/* Newsletter band */}
      <div className="section--ink py-14">
        <div className="container flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-start gap-4">
            <span
              className="facet-rule shrink-0 mt-3"
              style={{ color: "var(--color-accent-soft)", width: "2rem" }}
              aria-hidden="true"
            />
            <div>
              <h3 className="mb-1">Stay informed</h3>
              <p className="text-sm max-w-md">
                New arrivals and atelier notes, sent occasionally — no more than we&apos;d
                want to receive ourselves.
              </p>
            </div>
          </div>

          <form className="flex w-full max-w-sm gap-0" aria-label="Newsletter signup">
            <label htmlFor="footer-newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="footer-newsletter-email"
              type="email"
              required
              placeholder="Email address"
              className="field flex-1 !bg-transparent !border-white/25 !text-white placeholder:text-white/50 !rounded-r-none"
            />
            <MagneticButton variant="accent" type="submit" className="h-full">
              Sign Up
            </MagneticButton>
          </form>
        </div>
      </div>

      {/* Link columns */}
      <div className="section--raised py-14">
        <div className="container grid grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-10">
          <div className="col-span-2 lg:col-span-2 flex flex-col gap-3">
            <span className="font-display text-lg font-semibold text-[var(--color-ink)]">
              {brandName}
            </span>
            <p className="text-sm text-[var(--color-text-secondary)] max-w-xs">
              Contact and location details to follow once confirmed.
            </p>
          </div>

          {linkGroups.map((group) => (
            <div key={group.heading} className="flex flex-col gap-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-secondary)]">
                {group.heading}
              </span>
              <ul className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="section--raised border-t border-[var(--color-border)]/60 py-6">
        <div className="container flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-mono text-[var(--color-text-secondary)]">
          <span>
            © {new Date().getFullYear()} {brandName}. All rights reserved.
          </span>
          <span>Secure checkout</span>
        </div>
      </div>
    </footer>
  );
}
