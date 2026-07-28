"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Search, User, ShoppingBag, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
  pathname: string;
  cartCount?: number;
}

/**
 * Right-side drawer (not a full-screen centered overlay) — better suited to
 * retail navigation: room for an inline search field, a left-aligned list
 * that reads like a directory rather than a single wall of centered links,
 * and a persistent utility row for account/bag instead of one booking CTA.
 */
export function MobileNav({ isOpen, onClose, links, pathname, cartCount = 0 }: MobileNavProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-[var(--color-ink)]/60 backdrop-blur-[2px] lg:hidden"
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[100] w-[86%] max-w-[400px] flex flex-col bg-[var(--color-bg)] lg:hidden"
          >
            {/* Header row */}
            <div className="flex items-center justify-between px-5 h-20 border-b border-[var(--color-border)] shrink-0">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-secondary)]">
                Menu
              </span>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center text-[var(--color-ink)] cursor-pointer hover:opacity-70 transition-opacity"
                aria-label="Close menu"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Inline search */}
            <div className="px-5 pt-5 shrink-0">
              <label htmlFor="mobile-nav-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <Search
                  size={16}
                  strokeWidth={1.5}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]"
                />
                <input
                  id="mobile-nav-search"
                  type="search"
                  placeholder="Search"
                  className="field !pl-11"
                />
              </div>
            </div>

            {/* Nav list */}
            <nav className="flex-1 overflow-y-auto px-5 pt-6">
              <ul>
                {links.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li
                      key={link.href}
                      className="border-b border-[var(--color-border)] first:border-t"
                    >
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="group/link flex items-center gap-3 py-4 font-display text-2xl"
                      >
                        <span
                          className={cn(
                            "facet-rule shrink-0 opacity-0 -translate-x-1 transition-all duration-300",
                            "group-hover/link:opacity-100 group-hover/link:translate-x-0",
                            isActive && "opacity-100 translate-x-0",
                          )}
                          style={{
                            color: "var(--color-accent)",
                            width: "1.25rem",
                          }}
                          aria-hidden="true"
                        />
                        <span
                          className={cn(
                            "transition-colors duration-200",
                            isActive
                              ? "text-[var(--color-accent)]"
                              : "text-[var(--color-ink)]",
                          )}
                        >
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Utility row */}
            <div className="flex items-center justify-around border-t border-[var(--color-border)] px-5 py-4 shrink-0">
              <Link
                href="/account"
                onClick={onClose}
                className="flex flex-col items-center gap-1.5 text-[var(--color-ink)]"
              >
                <User size={18} strokeWidth={1.5} />
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-secondary)]">
                  Account
                </span>
              </Link>
              <Link
                href="/bag"
                onClick={onClose}
                className="relative flex flex-col items-center gap-1.5 text-[var(--color-ink)]"
              >
                <ShoppingBag size={18} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 right-1 flex items-center justify-center w-4 h-4 rounded-full bg-[var(--color-accent)] text-white text-[10px] font-mono leading-none">
                    {cartCount}
                  </span>
                )}
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-secondary)]">
                  Bag
                </span>
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
