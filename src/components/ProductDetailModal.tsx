import React, { useState } from 'react';
import { X, Check, ShoppingBag } from 'lucide-react';
import { ProductItem } from '../data/catalog';
import { formatINR } from '../utils/storeLogic';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onAddToCart: (product: ProductItem, quantity: number, finish: string) => void;
}

const FINISH_OPTIONS = [
  'Studio Original Upholstery',
  'Warm Oatmeal Bouclé',
  'Deep Moss Velvet',
];

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [selectedFinish, setSelectedFinish] = useState<string>(FINISH_OPTIONS[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedFeedback, setAddedFeedback] = useState<boolean>(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedFinish);
    setAddedFeedback(true);
    setTimeout(() => {
      setAddedFeedback(false);
      onClose();
    }, 650);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="bg-[#F1EEDF] text-[#231F1B] rounded-[28px] max-w-[740px] w-full overflow-hidden shadow-2xl border border-[#D8D3C4]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image Column */}
          <div className="bg-[#E5E1D3] p-8 flex flex-col items-center justify-center relative min-h-[280px]">
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="max-h-[260px] w-auto object-contain rounded-[18px]"
              />
            </div>
            <div className="mt-4 text-[12px] text-[#5B554C] text-center">
              <span>{product.category}</span>
              <span aria-hidden="true"> · </span>
              <span>{product.dimensions}</span>
            </div>
          </div>

          {/* Purchase Contiguous Module */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[12px] font-medium text-[#6A6258]">
                    {product.subtitle}
                  </p>
                  <h2
                    id="product-modal-title"
                    className="mt-1 font-display-heavy text-[24px] text-[#47301D]"
                  >
                    {product.name}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close product details"
                  className="w-9 h-9 rounded-full bg-[#E3DEC9] hover:bg-[#D5CFB8] flex items-center justify-center text-[#2B251B] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-[22px] font-bold text-[#231F1B] tabular-nums">
                  {formatINR(product.price)}
                </span>
                {product.limitedStock && (
                  <span className="text-[12px] text-[#7A4B2A] font-medium">
                    Limited Edition · {product.limitedStock} of 8 remaining
                  </span>
                )}
              </div>

              <p className="mt-3 text-[13.5px] leading-[1.5] text-[#3B352E]">
                {product.description}
              </p>

              <div className="mt-4 pt-3 border-t border-[#DED9C8] text-[12.5px] text-[#4E473E] space-y-1">
                <div>
                  <strong className="font-semibold text-[#231F1B]">Materials: </strong>
                  {product.materials}
                </div>
                <div>
                  <strong className="font-semibold text-[#231F1B]">Dimensions: </strong>
                  {product.dimensions}
                </div>
              </div>

              {/* Upholstery Selection */}
              <div className="mt-4">
                <label className="block text-[12px] font-semibold text-[#231F1B] mb-1.5">
                  Upholstery Finish
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {FINISH_OPTIONS.map((finish) => (
                    <button
                      key={finish}
                      type="button"
                      onClick={() => setSelectedFinish(finish)}
                      className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors cursor-pointer ${
                        selectedFinish === finish
                          ? 'bg-[#47301D] text-[#F1EEDF]'
                          : 'bg-[#E3DEC9] text-[#2B251B] hover:bg-[#D8D2BA]'
                      }`}
                    >
                      {finish}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quantity & Add to Cart Row */}
            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center bg-[#E3DEC9] rounded-full px-2 py-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-7 h-7 rounded-full hover:bg-[#D5CFB8] flex items-center justify-center font-bold text-[#231F1B] cursor-pointer"
                >
                  −
                </button>
                <span className="w-8 text-center text-[13.5px] font-semibold tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="w-7 h-7 rounded-full hover:bg-[#D5CFB8] flex items-center justify-center font-bold text-[#231F1B] cursor-pointer"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 bg-[#4B331F] hover:bg-[#382515] text-[#F1EEDF] text-[13.5px] font-medium py-3 px-5 rounded-full flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
              >
                {addedFeedback ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>
                      Add to Cart · {formatINR(product.price * quantity)}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
