
import { categories } from "@/src/data/categories";
import { products } from "@/src/data/products";
import { stockImages } from "@/src/data/stock-images";
import { BackgroundVideo } from "@/src/shared/BackgroundVideo";
import { MagneticButton } from "@/src/shared/MagneticButton";
import { ProductCard } from "@/src/shared/ProductCard";
import { Reveal } from "@/src/shared/scroll-animations";
import { ScrollFrameStory } from "@/src/shared/ScrollFrameStory";
import { SpinViewer } from "@/src/shared/SpinViewer";
import { SplitHeading } from "@/src/shared/SplitHeading";
import { ArrowRightIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hunsho — Fine Jewelry, Lagos",
  description:
    "22k and 24k gold jewelry, hallmarked and certified. Rings, necklaces, earrings, bracelets, and traditional pieces, with an on-model 360° view of every piece.",
};

const featured = products.slice(0, 4);
const spotlightProduct = products[0];

export default function Home() {

  return (
    <>
      {/* Hero — answers who/what/why/trust/next in composition, not paragraphs */}
      <section
  data-progress-invert
  className="section section--ink relative isolate overflow-hidden min-h-[100svh] flex items-center"
>
  {/* Background Gradient */}
  <div className="absolute inset-0 -z-20 bg-[var(--color-ink)]" />

  {/* Desktop / Tablet Video */}
  <div className="pointer-events-none absolute inset-y-0 right-0 hidden bg-black md:flex w-[48%] lg:w-[42%] xl:w-[40%] justify-end -z-10">
    <div className="relative h-full w-full">
      <video
        src="/ring-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="h-full w-full object-contain object-center"
      />

      {/* Fade into the content */}
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[var(--color-ink)]" />
    </div>
  </div>

  <div className="container relative z-10">
    <div className="max-w-3xl">
      <span className="eyebrow mb-6 block">
        22k &amp; 24k Gold — Hallmarked
      </span>

      <SplitHeading
        as="h1"
        text="Jewelry, seen the way you'll actually wear it."
        className="max-w-3xl"
      />

      <p className="lead mt-5 max-w-xl !text-[var(--color-text-on-ink-muted)]">
        Every piece ships with an on-model 360° view — rotate, zoom, and see
        real scale before you buy. Rings, necklaces, earrings, bracelets, and
        traditional pieces, from our flagship in Ikorodu.
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
        <MagneticButton
          to="/shop"
          variant="accent"
          size="lg"
        >
          Shop the Collection
        </MagneticButton>

        <MagneticButton
          to="/about"
          variant="secondary"
          size="lg"
          className="!border-white/30 !text-white"
        >
          Our Story
        </MagneticButton>
      </div>

      {/* Mobile Video */}
      <div className="mt-12 block md:hidden">
        <div className="aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-white/5">
          <video
            src="/ring-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Trust strip — no fake stats, just plain factual credibility signals */}
      <section className="section--surface !py-8 border-b border-[var(--color-border)]">
        <div className="container flex flex-wrap gap-x-10 gap-y-3 justify-center sm:justify-between font-mono text-xs uppercase tracking-widest text-[var(--color-text-secondary)]">
          <span>Hallmarked 22k &amp; 24k Gold</span>
          <span>Certificate of Authenticity, Every Piece</span>
          <span>Flagship Boutique — Ikorodu, Lagos</span>
          <span>3-Day Delivery in Lagos</span>
        </div>
      </section>

      {/* Category entry points */}
      <section className="section section--surface">
        <div className="container">
          <Reveal as="div" once>
            <span className="eyebrow mb-4">Shop</span>
            <h2 className="max-w-lg">Find the piece you came for.</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-3 gap-6">
            {categories
              .filter((c) => c.slug !== "gifting")
              .map((cat) => {
                const img = stockImages[cat.slug];
                return (
                  <div
                    key={cat.slug}
                    className="group card-overlay-text relative aspect-[4/5] overflow-hidden bg-[var(--color-ink)] flex items-end p-5"
                  >
                    <Image
                      src={img.url}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, 50vw"
                      className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 size-full px-3 py-1.5  flex flex-col justify-end bg-linear-to-t from-(--color-ink)/85 to-40% group-hover:to-70% duration-300 to-transparent">
                      <h3 className="inline-block  text-[length:var(--text-lg)] group-hover:-translate-y-2 duration-300">
                        {cat.label}
                      </h3>
                      <Link
                        href={`/shop/${cat.slug}`}
                        className="w-fit max-h-0 overflow-hidden group-hover:max-h-fit group-hover:-translate-y-2 duration-300 flex items-center justify-start gap-2"
                      >
                        See Category <ArrowRightIcon />
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* Scroll-driven craft/trust story — frame sequence tied to scroll
          progress, not drag. Ties directly into the purity/hallmark trust
          strategy from PRD §7, rather than being motion for its own sake. */}
      <ScrollFrameStory
        alt="22k gold jewelry, from raw material to finished, hallmarked piece"
        videoSrc="/jewelry-products.mp4"
        videoFrameCount={60}
        chapters={[
          {
            eyebrow: "Sourcing",
            title: "Every piece starts as certified gold.",
            body: "22k and 24k — nothing lower, nothing assumed. Purity is confirmed before a single piece is made.",
          },
          {
            eyebrow: "Certification",
            title: "Hallmarked, not just claimed.",
            body: "Every finished piece is hallmarked and issued a certificate of authenticity — the number on the label matches the number in your hand.",
          },
          {
            eyebrow: "Delivery",
            title: "Seen before it arrives, then delivered with the paperwork.",
            body: "The on-model 360° view on every product page is there so you know exactly what's coming — the certificate ships with it, not as an afterthought.",
          },
        ]}
      />

      {/* Headline feature demo — the on-model 360° viewer */}
      <section className="section section--raised">
        <div className="container grid lg:grid-cols-2 gap-10 items-center">
          <Reveal as="div" once>
            <span className="eyebrow mb-4">How We&apos;re Different</span>
            <h2 className="max-w-md mb-4">See it on, before it arrives.</h2>
            <p className="lead mb-6">
              Every product page includes real footage of the piece worn on the
              body part it sits on — rotate through the frames, zoom in on the
              detail. Not a render. Not a model wearing a different size.
            </p>
            <MagneticButton to={`/shop/${spotlightProduct.category}/${spotlightProduct.slug}`} variant="primary">
              View {spotlightProduct.name}
            </MagneticButton>
          </Reveal>
          <SpinViewer
            videoSrc="/ring-video.mp4"
            videoFrameCount={24}
            alt={`${spotlightProduct.name}, 360 degree on-model view`}
            className="border border-[var(--color-border)]"
          />
        </div>
      </section>

      {/* Featured products */}
      <section className="section section--surface">
        <div className="container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="eyebrow mb-4">New This Season</span>
              <h2 className="mb-0">A few pieces to start with.</h2>
            </div>
            <Link href="/shop" className="hidden sm:block font-mono text-xs uppercase tracking-widest text-[var(--color-accent-strong)] hover:text-[var(--color-accent)] transition-colors">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Gifting / occasion tie-in */}
      <section className="section section--ink relative overflow-hidden" data-progress-invert>
        <BackgroundVideo
          src="https://videos.pexels.com/video-files/11122340/11122340-hd_1920_1080_25fps.mp4"
          poster="https://images.pexels.com/videos/11122340/pexels-photo-11122340.jpeg?auto=compress&w=1260&h=750&dpr=1"
          className="absolute inset-0 w-full h-full object-cover opacity-50 brightness-75"
        />
        <div className="relative container flex flex-col gap-4 items-center justify-center max-w-2xl mx-auto">
          <span className="eyebrow mb-4 text-center">Gifting</span>
          <h2 className="mb-4 w-full">Weddings, owambe, and everything worth marking.</h2>
          <p className="lead mx-auto text-center mb-8 !text-[var(--color-text-on-ink-muted)]">
            Curated by occasion, not just by category — because the right gift
            usually starts with the moment, not the metal.
          </p>
          <MagneticButton to="/shop/gifting" variant="accent" size="lg">
            Shop Gifting Edits
          </MagneticButton>
        </div>
      </section>
    </>
  );
}
