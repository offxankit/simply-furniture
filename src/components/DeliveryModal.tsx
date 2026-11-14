import React from 'react';
import { X, Truck, ShieldCheck, Clock } from 'lucide-react';

interface DeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeliveryModal: React.FC<DeliveryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delivery-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="bg-[#F1EEDF] text-[#231F1B] rounded-[28px] max-w-[540px] w-full p-6 sm:p-8 shadow-2xl border border-[#D8D3C4]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="delivery-modal-title"
              className="font-display-heavy text-[22px] text-[#47301D]"
            >
              White-Glove Delivery
            </h2>
            <p className="mt-1 text-[13px] text-[#5C554B]">
              In-room placement, assembly, and eco-packaging removal.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close delivery information"
            className="w-9 h-9 rounded-full bg-[#E3DEC9] hover:bg-[#D5CFB8] flex items-center justify-center text-[#2B251B] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <div className="p-4 rounded-2xl bg-[#E6E2D3] flex items-start gap-3.5">
            <Truck className="w-5 h-5 text-[#47301D] shrink-0 mt-0.5" />
            <div className="text-[13px]">
              <h3 className="font-semibold text-[#231F1B]">
                Complimentary Over ₹1,00,000
              </h3>
              <p className="text-[#4F483E] mt-0.5">
                Standard flat rate of ₹4,500 for single accent chairs; free on all orders
                above ₹1,00,000 including the Anni S Secret Collection.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#E6E2D3] flex items-start gap-3.5">
            <Clock className="w-5 h-5 text-[#47301D] shrink-0 mt-0.5" />
            <div className="text-[13px]">
              <h3 className="font-semibold text-[#231F1B]">
                Dispatch &amp; Scheduled Arrival
              </h3>
              <p className="text-[#4F483E] mt-0.5">
                In-stock February collection pieces ship within 3–5 business days with a
                2-hour scheduled delivery window.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#E6E2D3] flex items-start gap-3.5">
            <ShieldCheck className="w-5 h-5 text-[#47301D] shrink-0 mt-0.5" />
            <div className="text-[13px]">
              <h3 className="font-semibold text-[#231F1B]">
                10-Year Structural Frame Guarantee
              </h3>
              <p className="text-[#4F483E] mt-0.5">
                Every timber and steel frame is backed by our 10-year craftsmanship
                warranty and 30-day home trial.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-[#4B331F] hover:bg-[#382515] text-[#F1EEDF] text-[13px] font-medium cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
