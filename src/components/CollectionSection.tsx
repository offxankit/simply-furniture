import React from 'react';
import { FEBRUARY_CATEGORIES, ADDITIONAL_CATALOG_ITEMS, ProductItem } from '../data/catalog';
import { ScrollSlide } from './ScrollSlide';

interface CollectionSectionProps {
  onOpenCategory: (category: 'Armchairs' | 'Chairs' | 'Sofas') => void;
  onSelectProduct: (product: ProductItem) => void;
}

export const CollectionSection: React.FC<CollectionSectionProps> = ({
  onOpenCategory,
  onSelectProduct,
}) => {
  const duneSofa = ADDITIONAL_CATALOG_ITEMS.find((p) => p.id === 'dune-sofa') || ADDITIONAL_CATALOG_ITEMS[0];

  return (
    <section id="about-section" className="relative z-10 w-full bg-transparent text-[#F3E5C8]">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
        {/* Editorial 2-Column Header Block */}
        <div className="animation-copy grid grid-cols-1 items-stretch gap-8 md:grid-cols-[1.02fr_0.98fr] lg:gap-14">
          {/* Left Column: Heading + Pill Sofa + Caption */}
          <ScrollSlide from="left" className="flex flex-col justify-between">
            <div>
              <h1 className="font-serif text-[25px] font-bold leading-[1.2] tracking-[-0.02em] text-[#F3E5C8] sm:text-[29px] lg:text-[31px]">
                Simplifying life
                <br />
                with the soft forms
              </h1>

              <button
                type="button"
                onClick={() => onSelectProduct(duneSofa)}
                aria-label="Inspect Dune Soft Modular Sofa"
                className="mt-4 w-full max-w-[445px] rounded-full overflow-hidden block group cursor-pointer focus:outline-none"
              >
                <img
                  src="/assets/extracted/pill_sofa.png?v=4k"
                  alt="Soft beige modular sofa in stadium pill frame"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover contrast-[1.04] saturate-[1.04] group-hover:scale-[1.02] transition-transform duration-200"
                />
              </button>
            </div>

            <p className="mt-4 text-[13.5px] font-bold tracking-[-0.01em] text-[#F3E5C8] sm:text-[14.5px]">
              Explore the most popular furniture categories of February
            </p>
          </ScrollSlide>

          {/* Right Column: Paragraph + Meet simple&soft collection heading */}
          <ScrollSlide from="right" className="flex flex-col justify-between pt-1">
            <p className="max-w-[440px] text-[13.5px] font-semibold leading-[1.48] text-[#F3E5C8] sm:text-[14.5px]">
              We create more than just furniture. We create furniture that will
              make your life easier, softer and more comfortable. Cozy
              armchairs, soft sofas, beds that you want to fall into -
              everything so that you really rest.
            </p>

            <h2 className="mt-6 font-serif text-[25px] font-bold leading-[1.2] tracking-[-0.02em] text-[#F3E5C8] sm:text-[29px] md:mt-0 lg:text-[31px]">
              Meet simple&amp;soft
              <br />
              collection
            </h2>
          </ScrollSlide>
        </div>

        {/* 3-Column Category Grid: Armchairs, Chairs, Sofas */}
        <div className="animation-copy mt-7 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
          {FEBRUARY_CATEGORIES.map((cat) => (
            <ScrollSlide key={cat.id} from={cat.id === 'cat-chairs' ? 'right' : 'left'}>
              <article className="flex flex-col">
                <div
                  onClick={() => onOpenCategory(cat.title)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Browse ${cat.title} category`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onOpenCategory(cat.title);
                    }
                  }}
                  className="group aspect-[197/229] w-full cursor-pointer overflow-hidden rounded-[24px] bg-[#E5E0D5]"
                >
                  <img
                    src={cat.image}
                    alt={cat.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover contrast-[1.04] saturate-[1.04] transition-transform duration-200 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="mt-3 flex items-center justify-between gap-4">
                  <h3 className="text-[18px] font-bold tracking-[-0.01em] text-[#F3E5C8] sm:text-[19px]">
                    {cat.title}
                  </h3>

                  <button
                    type="button"
                    onClick={() => onOpenCategory(cat.title)}
                    aria-label={`Shop ${cat.title}`}
                    className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full border border-[#F3E5C8]/60 bg-stone-950/85 px-4 py-1.5 text-[13px] font-bold text-[#F3E5C8] transition-colors hover:bg-stone-950"
                  >
                    <span>Shop</span>
                    <span aria-hidden="true" className="text-[12px] leading-none">
                      →
                    </span>
                  </button>
                </div>
              </article>
            </ScrollSlide>
          ))}
        </div>
      </div>
    </section>
  );
};
