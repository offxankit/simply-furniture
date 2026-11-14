import React from 'react';
import { HERO_POSITIONS, ADDITIONAL_CATALOG_ITEMS, ProductItem } from '../data/catalog';
import { ScrollSlide } from './ScrollSlide';

interface HeroSectionProps {
  cartCount: number;
  onOpenCart: () => void;
  onSelectProduct: (product: ProductItem) => void;
  onOpenCatalog: (category?: 'All' | 'Armchairs' | 'Chairs' | 'Sofas' | 'Secret Collection') => void;
  onOpenDelivery: () => void;
  onPointerDown?: (e: React.PointerEvent) => void;
  onPointerMove?: (e: React.PointerEvent) => void;
  onPointerUp?: (e: React.PointerEvent) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  cartCount,
  onOpenCart,
  onSelectProduct,
  onOpenCatalog,
  onOpenDelivery,
  onPointerDown,
  onPointerMove,
  onPointerUp,
}) => {
  const orbChair = ADDITIONAL_CATALOG_ITEMS[0];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-transparent text-[#F3E5C8]">
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      />

      <div className="pointer-events-none relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 sm:px-12 sm:py-8 lg:px-16">
        <ScrollSlide from="left">
          <header className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-8 lg:gap-14">
              <a
                href="#top"
                aria-label="Simply Furniture Home"
                className="pointer-events-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-stone-900 font-serif text-2xl leading-none text-stone-50 transition-colors hover:bg-stone-800"
              >
                s
              </a>

              <nav aria-label="Primary Navigation" className="animation-copy pointer-events-none hidden items-center gap-8 text-sm font-bold text-[#F3E5C8] md:flex">
                <button type="button" onClick={() => scrollToSection('about-section')} className="pointer-events-auto cursor-pointer transition-colors hover:text-stone-950">
                  About us
                </button>
                <button type="button" onClick={() => onOpenCatalog('All')} className="pointer-events-auto cursor-pointer transition-colors hover:text-stone-950">
                  Catalog
                </button>
                <button type="button" onClick={() => scrollToSection('secret-collection')} className="pointer-events-auto cursor-pointer transition-colors hover:text-stone-950">
                  Offers
                </button>
                <button type="button" onClick={onOpenDelivery} className="pointer-events-auto cursor-pointer transition-colors hover:text-stone-950">
                  Delivery
                </button>
              </nav>
            </div>

            <button
              type="button"
              onClick={onOpenCart}
              aria-label={`Shopping cart with ${cartCount} items`}
              className="pointer-events-auto relative flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-white/80 text-stone-900 transition-colors hover:bg-white"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 5h2.5l1.8 9.5a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.7L21 7H7" />
                <circle cx="10.5" cy="19.5" r="1.5" />
                <circle cx="17.5" cy="19.5" r="1.5" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-orange-700 px-1.5 text-xs font-bold tabular-nums text-white shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
          </header>
        </ScrollSlide>

        <main className="flex flex-1 flex-col justify-center py-10 sm:py-12">
          <ScrollSlide from="left" className="animation-copy max-w-3xl">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-[#F3E5C8] sm:text-sm">
              Thoughtful design for slower living
            </p>
            <h1 className="max-w-3xl font-serif text-5xl font-bold leading-[0.98] tracking-[-0.045em] text-[#F3E5C8] sm:text-7xl lg:text-8xl">
              Simply furniture.
              <span className="mt-2 block text-[#F3E5C8]">Made to feel like home.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base font-semibold leading-7 text-[#F3E5C8] sm:text-lg">
              Sculptural, comfortable pieces for the everyday moments that matter.
              Find a softer way to settle in.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onOpenCatalog('All')}
                className="pointer-events-auto rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-stone-700"
              >
                Browse the catalog
              </button>
              <button
                type="button"
                onClick={() => onSelectProduct(orbChair)}
                className="pointer-events-auto rounded-full border border-[#F3E5C8] bg-stone-950/85 px-6 py-3 text-sm font-bold text-[#F3E5C8] transition-colors hover:bg-stone-950"
              >
                Discover the Orb chair
              </button>
            </div>
          </ScrollSlide>

          <ScrollSlide from="right" className="mt-12 sm:mt-16">
            <div className="animation-copy mb-4 flex items-center justify-between gap-4">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#F3E5C8] sm:text-sm">
                Featured pieces
              </h2>
              <span className="text-xs font-semibold text-[#F3E5C8] sm:text-sm">Tap a piece to explore</span>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
              {HERO_POSITIONS.map((item, index) => (
                <ScrollSlide key={item.id} from={index % 2 === 0 ? 'left' : 'right'}>
                  <button
                    type="button"
                    onClick={() => onSelectProduct(item)}
                    aria-label={`View ${item.name} armchair`}
                    className="pointer-events-auto group relative flex min-w-0 items-center gap-4 rounded-2xl border border-[#F3E5C8]/60 bg-stone-950/85 p-3 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:bg-stone-950 sm:block sm:p-4"
                  >
                    {item.isNew && (
                      <span className="absolute left-3 top-3 z-10 rounded-md bg-stone-900 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white sm:left-4 sm:top-4">
                        New
                      </span>
                    )}
                    <div className="h-24 w-28 shrink-0 overflow-hidden rounded-xl bg-stone-100 sm:mb-3 sm:h-auto sm:w-full sm:aspect-[1.55]">
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 items-center justify-between gap-3 sm:w-full">
                      <span className="truncate text-sm font-bold text-[#F3E5C8] sm:text-base">
                        {item.name}
                      </span>
                      <span className="shrink-0 text-xs font-bold text-[#F3E5C8]">View →</span>
                    </div>
                  </button>
                </ScrollSlide>
              ))}
            </div>
          </ScrollSlide>
        </main>
      </div>
    </section>
  );
};
