import type { Metadata } from "next";
import { Breadcrumbs } from "@/src/shared/Breadcrumbs";
import { MagneticButton } from "@/src/shared/MagneticButton";

export const metadata: Metadata = {
  title: "Contact — Hunsho",
  description: "Get in touch with Hunsho.",
};

export default function ContactPage() {
  return (
    <div className="section section--surface !pt-32">
      <div className="container max-w-xl">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact", href: "/contact" }]} />
        <h1 className="mb-3">Contact</h1>
        <p className="lead mb-10">
          Questions about sizing, an order, or a piece you're considering — reach
          out and we'll respond as soon as we can.
        </p>

        {/*
          Form has no submit handler yet — needs a real backend endpoint
          (email service, CRM, or ticketing integration) before this is
          functional. UI is complete and ready to wire up.
        */}
        <form className="flex flex-col gap-5" aria-label="Contact form">
          <div>
            <label htmlFor="contact-name">Name</label>
            <input id="contact-name" name="name" type="text" required className="field" />
          </div>
          <div>
            <label htmlFor="contact-email">Email</label>
            <input id="contact-email" name="email" type="email" required className="field" />
          </div>
          <div>
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              className="field !h-auto py-3"
            />
          </div>
          <MagneticButton type="submit" variant="primary" size="lg" className="self-start">
            Send Message
          </MagneticButton>
        </form>
      </div>
    </div>
  );
}
