import { formatNaira, type Product } from "@/src/data/products";
import { RotateCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MagneticButton } from "./MagneticButton";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="card card--product group flex h-full flex-col">
      {/* Product Image */}
      <Link
        href={`/shop/${product.category}/${product.slug}`}
        className="relative block aspect-4/4.5 overflow-hidden bg-[var(--color-surface-secondary)]"
      >
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />

        {/* Purity */}
        <span className="absolute left-4 top-4 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-black">
          {product.purity}
        </span>

        {/* 360 Indicator */}
        <div className="absolute right-4 top-4 flex items-center gap-1 bg-black/70 px-3 py-1 text-[11px] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <RotateCw className="h-3 w-3" />
          <span>360°</span>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col py-2 h-auto gap-3 justify-between">
        <div className="flex flex-col gap-2 grow justify-between shrink">
          <h4 className="text-lg font-medium leading-tight mb-0!">
            {product.name}
          </h4>
          <p className="text-lg font-semibold mb-0!">
            {formatNaira(product.priceNaira)}
          </p>
        </div>

        <div className="w-full h-fit">
          <MagneticButton
            type="button"
            variant="secondary"
            href={`/shop/${product.category}/${product.slug}`}
            className="w-full"
          >
            View Product
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}