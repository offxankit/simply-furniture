import React, { useState, useEffect } from 'react';
import { X, Search, Plus } from 'lucide-react';
import { ALL_PRODUCTS, FurnitureCategory, ProductItem } from '../data/catalog';
import { filterProductsByCategory, formatINR } from '../utils/storeLogic';

interface CatalogDrawerProps {
  isOpen: boolean;
  initialCategory: FurnitureCategory | 'All';
  onClose: () => void;
  onSelectProduct: (product: ProductItem) => void;
  onQuickAdd: (product: ProductItem) => void;
}

const CATEGORIES: Array<FurnitureCategory | 'All'> = [
  'All',
  'Armchairs',
  'Chairs',
  'Sofas',
  'Secret Collection',
];

export const CatalogDrawer: React.FC<CatalogDrawerProps> = ({
  isOpen,
  initialCategory,
  onClose,
  onSelectProduct,
  onQuickAdd,
}) => {
  const [activeCategory, setActiveCategory] = useState<FurnitureCategory | 'All'>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setActiveCategory(initialCategory);
  }, [initialCategory]);

  if (!isOpen) return null;

  const filteredProducts = filterProductsByCategory(ALL_PRODUCTS, activeCategory, searchQuery);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="catalog-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-black/55 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="bg-[#F1EEDF] text-[#231F1B] w-full max-w-[680px] h-full flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#DED8C8] flex items-center justify-between gap-4">
          <div>
            <h2 id="catalog-drawer-title" className="font-display-heavy text-[20px] text-[#47301D]">
              Simple &amp; Soft Catalog
            </h2>
            <p className="text-[12.5px] text-[#5B544A]">
              February Collection &amp; Anni S Limited Edition
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close catalog"
            className="w-9 h-9 rounded-full bg-[#E3DEC9] hover:bg-[#D5CFB8] flex items-center justify-center text-[#2B251B] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Category Filter Tabs & Search */}
        <div className="px-6 py-4 border-b border-[#DED8C8] space-y-3 bg-[#EAE6D7]">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-3.5 py-1.5 rounded-lg text-[12.5px] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeCategory === category
                    ? 'bg-[#47301D] text-[#F1EEDF]'
                    : 'bg-[#F1EEDF] text-[#3B342C] hover:bg-[#E0DBC9]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-[#6E675D] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by piece name, walnut, bouclé, velvet..."
              aria-label="Search furniture catalog"
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#F1EEDF] border border-[#D5CFB8] text-[13px] text-[#231F1B] placeholder:text-[#7A7267] focus:outline-none focus:border-[#47301D]"
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[15px] font-medium text-[#47301D]">
                No furniture pieces match your filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
                className="mt-3 px-4 py-2 rounded-full bg-[#47301D] text-[#F1EEDF] text-[12.5px] font-medium cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredProducts.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#E6E2D3] rounded-[22px] p-4 flex flex-col justify-between border border-[#DAD4C2]"
                >
                  <div>
                    <button
                      type="button"
                      onClick={() => onSelectProduct(item)}
                      className="w-full aspect-[4/3] bg-white rounded-[16px] overflow-hidden flex items-center justify-center p-3 group cursor-pointer"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
                      />
                    </button>

                    <div className="mt-3 flex items-baseline justify-between gap-2">
                      <h3 className="text-[16px] font-semibold text-[#231F1B]">
                        {item.name}
                      </h3>
                      <span className="text-[15px] font-bold text-[#47301D] tabular-nums">
                        {formatINR(item.price)}
                      </span>
                    </div>

                    <p className="text-[12px] text-[#5C554B] mt-0.5">
                      {item.category} · {item.dimensions}
                    </p>
                  </div>

                  <div className="mt-3.5 pt-3 border-t border-[#D8D2C0] flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectProduct(item)}
                      className="flex-1 py-2 px-3 rounded-full bg-[#F1EEDF] hover:bg-[#DFD9C6] text-[#231F1B] text-[12px] font-medium transition-colors cursor-pointer"
                    >
                      Details
                    </button>
                    <button
                      type="button"
                      onClick={() => onQuickAdd(item)}
                      aria-label={`Add ${item.name} to cart`}
                      className="py-2 px-3.5 rounded-full bg-[#4B331F] hover:bg-[#382515] text-[#F1EEDF] text-[12px] font-medium inline-flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
