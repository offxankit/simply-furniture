import React from 'react';
import { SECRET_COLLECTION_ITEMS, ProductItem } from '../data/catalog';
import { ScrollSlide } from './ScrollSlide';

interface SecretCollectionSectionProps {
  onSelectProduct: (product: ProductItem) => void;
}

export const SecretCollectionSection: React.FC<SecretCollectionSectionProps> = ({
  onSelectProduct,
}) => {
  return (
    <section id="secret-collection" className="relative z-10 w-full overflow-hidden bg-transparent text-[#F3E5C8]">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
        <div className="animation-copy grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-16">
          <ScrollSlide from="left" className="min-w-0">
            <h2 className="text-[24px] font-bold leading-[1.22] tracking-[-0.01em] text-[#F3E5C8] sm:text-[29px] lg:text-[32px]">
              Sit down. Lie down. Rest now.
              <br />
              Secret collection from Anni S
            </h2>

            <p className="mt-4 max-w-[560px] text-[13px] font-semibold leading-[1.48] text-[#F3E5C8] sm:text-[14px]">
              A collaboration between Simply and Anni and Raj. 8 pieces of
              furniture for relaxation, tranquility and comfort - available
              to order on our website exclusively in February.
            </p>
          </ScrollSlide>

          <ScrollSlide from="right" className="relative min-w-0">
            <img
              src="/assets/extracted/sec3_chairs_clean.png?v=4k"
              alt="Verta, Cresta, and Perra armchairs from the Anni S Secret Collection"
              referrerPolicy="no-referrer"
              className="block h-auto w-full select-none object-contain"
            />

            <div className="absolute inset-0 grid grid-cols-3">
              {SECRET_COLLECTION_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectProduct(item)}
                  aria-label={`Inspect ${item.name} from Secret Collection`}
                  className="group relative flex h-full w-full cursor-pointer flex-col items-center justify-end pb-[2.2%] focus:outline-none sm:pb-[2.5%]"
                >
                  <span className="text-[12.5px] font-bold leading-none text-[#F3E5C8] transition-colors group-hover:underline sm:text-[14px]">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          </ScrollSlide>
        </div>
      </div>
    </section>
  );
};
