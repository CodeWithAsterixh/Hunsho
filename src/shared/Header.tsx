"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, ShoppingBag } from "lucide-react";
import { MobileNav } from "./MobileNav";
import { cn } from "@/lib/utils";

const links = [
  { label: "Shop", href: "/shop" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

interface HeaderProps {
  /** Brand wordmark — placeholder until the PRD names the house. */
  brandName?: string;
  /** Number badge on the bag icon, e.g. items in cart. Omit or 0 to hide. */
  cartCount?: number;
}

export function Header({ brandName = "Hunsho", cartCount = 0 }: HeaderProps) {
  const pathname = usePathname();
  // Defaults to false (solid/dark treatment): most pages have no hero at
  // all, so this avoids a first-paint flash of invisible white-on-light
  // text on those pages, at the cost of a much smaller flash on the two
  // pages that do have a hero (corrected as soon as the effect below runs).
  const [onHero, setOnHero] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // A page is "on a hero" only if a dark section is actually sitting at
      // the very top of the viewport right now — pages with no
      // data-progress-invert section (i.e. everything except Home) never
      // qualify, so the header defaults to its solid/dark-ink treatment
      // instead of rendering invisible white-on-light text.
      const heroSections = document.querySelectorAll<HTMLElement>("[data-progress-invert]");
      const heroAtTop = Array.from(heroSections).some(
        (el) => el.getBoundingClientRect().top <= 0,
      );

      // Once a hero is confirmed present, switch to solid after 40px of
      // scroll — not after scrolling past the entire (often full-viewport)
      // hero section.
      setOnHero(heroAtTop && window.scrollY <= 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
    // Re-run on every route change: Header lives in the root layout and
    // doesn't remount on client-side navigation, so without this dependency
    // the effect (and therefore onHero) would never update when navigating
    // from a page with a hero to one without, or vice versa.
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 w-full z-[50] transition-all duration-500 border-b",
          isOpen ? "opacity-0 pointer-events-none" : "",
          onHero
            ? "border-b-transparent bg-transparent"
            : "border-b-[var(--color-border)] bg-[var(--color-bg)]/92 backdrop-blur-md",
        )}
      >
        <div className="container flex h-20 items-center justify-between">
          <Link
            href="/"
            className={cn(
              "font-display text-lg font-semibold tracking-tight transition-colors z-[50]",
              onHero ? "!text-white" : "!text-[var(--color-ink)]",
            )}
          >
            {brandName}
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "font-mono text-xs uppercase tracking-widest transition-colors duration-300",
                    onHero
                      ? active
                        ? "!text-white font-semibold"
                        : "!text-white/60 hover:!text-white"
                      : active
                        ? "!text-[var(--color-accent)] font-semibold"
                        : "!text-[var(--color-text-secondary)] hover:!text-[var(--color-accent-strong)]",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1 z-[50]">
            <div
              className={cn(
                "hidden lg:flex items-center gap-1",
                onHero ? "text-white" : "text-[var(--color-ink)]",
              )}
            >
              <button
                type="button"
                aria-label="Search"
                className="p-2.5 hover:opacity-70 transition-opacity cursor-pointer"
              >
                <Search size={18} strokeWidth={1.5} />
              </button>
              <Link
                href="/account"
                aria-label="Account"
                className="p-2.5 hover:opacity-70 transition-opacity"
              >
                <User size={18} strokeWidth={1.5} />
              </Link>
              <Link
                href="/bag"
                aria-label={`Bag${cartCount ? `, ${cartCount} items` : ""}`}
                className="relative p-2.5 hover:opacity-70 transition-opacity"
              >
                <ShoppingBag size={18} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span
                    className={cn(
                      "absolute top-1 right-1 flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-mono leading-none",
                      onHero
                        ? "bg-white text-[var(--color-ink)]"
                        : "bg-[var(--color-accent)] text-white",
                    )}
                  >
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "lg:hidden flex flex-col gap-1.5 p-2 justify-center items-center w-10 h-10 cursor-pointer",
                onHero ? "text-white" : "text-[var(--color-ink)]",
              )}
              aria-label="Toggle Menu"
            >
              <span
                className={cn(
                  "h-[2px] w-5 bg-current transition-transform duration-300",
                  isOpen ? "rotate-45 translate-y-[8px]" : "",
                )}
              />
              <span
                className={cn(
                  "h-[2px] w-5 bg-current transition-opacity duration-200",
                  isOpen ? "opacity-0" : "",
                )}
              />
              <span
                className={cn(
                  "h-[2px] w-5 bg-current transition-transform duration-300",
                  isOpen ? "-rotate-45 -translate-y-[8px]" : "",
                )}
              />
            </button>
          </div>
        </div>
      </header>

      <MobileNav
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        links={links}
        pathname={pathname}
        cartCount={cartCount}
      />
    </>
  );
}
