import type { Metadata } from "next";
import { Breadcrumbs } from "@/src/shared/Breadcrumbs";
import { MagneticButton } from "@/src/shared/MagneticButton";

export const metadata: Metadata = {
  title: "Account — Hunsho",
  description: "Sign in to your Hunsho account.",
};

// UI shell only — no auth backend wired up yet. Needs a real auth provider
// (session handling, password reset, order history storage) before this is
// functional. Layout and design system usage are final.
export default function AccountPage() {
  return (
    <div className="section section--surface !pt-32">
      <div className="container max-w-sm">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Account", href: "/account" }]} />
        <h1 className="mb-8">Sign In</h1>
        <form className="flex flex-col gap-5 mb-6" aria-label="Sign in">
          <div>
            <label htmlFor="account-email">Email</label>
            <input id="account-email" name="email" type="email" required className="field" />
          </div>
          <div>
            <label htmlFor="account-password">Password</label>
            <input id="account-password" name="password" type="password" required className="field" />
          </div>
          <MagneticButton type="submit" variant="primary" size="lg">
            Sign In
          </MagneticButton>
        </form>
        <p className="text-sm text-[var(--color-text-secondary)]">
          New here? Account creation isn't wired up yet — reach out via{" "}
          <a href="/contact" className="underline hover:text-[var(--color-accent)]">Contact</a> in the meantime.
        </p>
      </div>
    </div>
  );
}
