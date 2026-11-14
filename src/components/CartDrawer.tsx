import React, { useState } from 'react';
import { X, Trash2, CheckCircle2, ArrowRight } from 'lucide-react';
import {
  CartItem,
  calculateCartSummary,
  validateCheckoutForm,
  CheckoutFormInput,
  formatINR,
} from '../utils/storeLogic';

interface CartDrawerProps {
  isOpen: boolean;
  cart: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, delta: number, selectedFinish?: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  cart,
  onClose,
  onUpdateQuantity,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [step, setStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart');
  const [orderId, setOrderId] = useState('');
  const [form, setForm] = useState<CheckoutFormInput>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormInput, string>>>({});

  if (!isOpen) return null;

  const summary = calculateCartSummary(cart, promoCode);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateCheckoutForm(form);
    if (!result.valid) {
      setErrors(result.errors);
      return;
    }
    setErrors({});
    const newId = `SF-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderId(newId);
    setStep('confirmed');
    onClearCart();
  };

  const handleClose = () => {
    if (step === 'confirmed') {
      setStep('cart');
    }
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-black/55 backdrop-blur-xs"
      onClick={handleClose}
    >
      <div
        className="bg-[#F1EEDF] text-[#231F1B] w-full max-w-[460px] h-full flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#DED8C8] flex items-center justify-between">
          <div>
            <h2 id="cart-drawer-title" className="font-display-heavy text-[19px] text-[#47301D]">
              {step === 'cart' && 'Your Soft Living Bag'}
              {step === 'checkout' && 'Delivery & Order Details'}
              {step === 'confirmed' && 'Order Confirmed'}
            </h2>
            <p className="text-[12px] text-[#5E574D]">
              {step === 'cart' && `${summary.itemCount} item(s) selected`}
              {step === 'checkout' && 'White-glove delivery & assembly included'}
              {step === 'confirmed' && `Receipt #${orderId}`}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close shopping cart"
            className="w-9 h-9 rounded-full bg-[#E3DEC9] hover:bg-[#D5CFB8] flex items-center justify-center text-[#2B251B] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 'confirmed' ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#ADB18E] text-[#231F1B] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-display-heavy text-[20px] text-[#47301D]">
                Order #{orderId} Confirmed
              </h3>
              <p className="text-[13.5px] text-[#3E3830] leading-relaxed">
                Thank you, <strong>{form.fullName}</strong>. Our studio dispatch team is
                preparing your furniture shipment to{' '}
                <strong>{form.address}, {form.city}</strong>.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="mt-4 px-6 py-2.5 rounded-full bg-[#4B331F] text-[#F1EEDF] text-[13px] font-medium cursor-pointer"
              >
                Continue Exploring
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className="py-14 text-center">
              <p className="text-[15px] font-medium text-[#47301D]">
                Your bag is currently empty.
              </p>
              <p className="mt-1 text-[13px] text-[#665F55]">
                Select any armchair, chair, or sofa to add it to your space.
              </p>
            </div>
          ) : step === 'cart' ? (
            <div className="space-y-4">
              {/* Free delivery indicator */}
              <div className="p-3.5 rounded-2xl bg-[#E5E1D2] text-[12.5px] text-[#352F28]">
                {summary.qualifiesForFreeDelivery ? (
                  <span>Complimentary White-Glove Delivery unlocked on your order.</span>
                ) : (
                  <span>
                    Add <strong>{formatINR(summary.amountToFreeDelivery)}</strong> more for
                    complimentary White-Glove Delivery.
                  </span>
                )}
              </div>

              {/* Cart Items */}
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedFinish}`}
                    className="p-3.5 rounded-2xl bg-[#E6E2D3] border border-[#D8D2C0] flex items-center gap-3.5"
                  >
                    <div className="w-16 h-16 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="text-[14.5px] font-semibold text-[#231F1B] truncate">
                          {item.product.name}
                        </h3>
                        <span className="text-[14px] font-bold text-[#47301D] tabular-nums">
                          {formatINR(item.product.price * item.quantity)}
                        </span>
                      </div>
                      <p className="text-[11.5px] text-[#5E574D] truncate">
                        {item.selectedFinish}
                      </p>

                      <div className="mt-2 flex items-center justify-between">
                        <div className="inline-flex items-center bg-[#F1EEDF] rounded-full px-1.5 py-0.5">
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(item.product.id, -1, item.selectedFinish)
                            }
                            aria-label={`Decrease quantity of ${item.product.name}`}
                            className="w-6 h-6 rounded-full hover:bg-[#DDD7C4] flex items-center justify-center text-xs font-bold cursor-pointer"
                          >
                            −
                          </button>
                          <span className="w-6 text-center text-[12px] font-semibold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(item.product.id, 1, item.selectedFinish)
                            }
                            aria-label={`Increase quantity of ${item.product.name}`}
                            className="w-6 h-6 rounded-full hover:bg-[#DDD7C4] flex items-center justify-center text-xs font-bold cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQuantity(
                              item.product.id,
                              -item.quantity,
                              item.selectedFinish
                            )
                          }
                          aria-label={`Remove ${item.product.name}`}
                          className="text-[#6B6359] hover:text-[#47301D] p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code */}
              <div className="pt-2">
                <label className="block text-[12px] font-medium text-[#4A433A] mb-1">
                  Promo Code (try <span className="font-semibold">SOFTFEB10</span>)
                </label>
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter code"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#E6E2D3] border border-[#D4CEBC] text-[13px] text-[#231F1B] focus:outline-none focus:border-[#47301D]"
                />
              </div>
            </div>
          ) : (
            <form id="checkout-form" onSubmit={handleSubmitOrder} className="space-y-3.5" noValidate>
              <div>
                <label className="block text-[12px] font-semibold text-[#231F1B] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  placeholder="Aarav Sharma"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#E6E2D3] border border-[#D4CEBC] text-[13px]"
                />
                {errors.fullName && (
                  <p className="text-[11.5px] text-[#9E2A2B] mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#231F1B] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="aarav@simplyhome.in"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#E6E2D3] border border-[#D4CEBC] text-[13px]"
                />
                {errors.email && (
                  <p className="text-[11.5px] text-[#9E2A2B] mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#231F1B] mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#E6E2D3] border border-[#D4CEBC] text-[13px]"
                />
                {errors.phone && (
                  <p className="text-[11.5px] text-[#9E2A2B] mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#231F1B] mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="142 Indiranagar 100 Feet Rd"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#E6E2D3] border border-[#D4CEBC] text-[13px]"
                />
                {errors.address && (
                  <p className="text-[11.5px] text-[#9E2A2B] mt-1">{errors.address}</p>
                )}
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#231F1B] mb-1">
                  City &amp; PIN Code
                </label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="Bengaluru 560038"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#E6E2D3] border border-[#D4CEBC] text-[13px]"
                />
                {errors.city && (
                  <p className="text-[11.5px] text-[#9E2A2B] mt-1">{errors.city}</p>
                )}
              </div>
            </form>
          )}
        </div>

        {/* Footer Summary */}
        {cart.length > 0 && step !== 'confirmed' && (
          <div className="p-6 border-t border-[#DED8C8] bg-[#EAE6D7] space-y-3">
            <div className="space-y-1 text-[13px]">
              <div className="flex justify-between text-[#4F483E]">
                <span>Subtotal</span>
                <span className="tabular-nums">{formatINR(summary.subtotal)}</span>
              </div>
              {summary.discount > 0 && (
                <div className="flex justify-between text-[#3E5C38]">
                  <span>February 10% Discount</span>
                  <span className="tabular-nums">−{formatINR(summary.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#4F483E]">
                <span>White-Glove Delivery</span>
                <span className="tabular-nums">
                  {summary.deliveryFee === 0 ? 'Free' : formatINR(summary.deliveryFee)}
                </span>
              </div>
              <div className="pt-2 border-t border-[#D6D0BE] flex justify-between text-[15px] font-bold text-[#231F1B]">
                <span>Total</span>
                <span className="tabular-nums">{formatINR(summary.total)}</span>
              </div>
            </div>

            {step === 'cart' ? (
              <button
                type="button"
                onClick={() => setStep('checkout')}
                className="w-full py-3 px-5 rounded-full bg-[#4B331F] hover:bg-[#382515] text-[#F1EEDF] text-[13.5px] font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="px-4 py-3 rounded-full bg-[#DFD9C6] text-[#231F1B] text-[13px] font-medium cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  form="checkout-form"
                  className="flex-1 py-3 px-5 rounded-full bg-[#4B331F] hover:bg-[#382515] text-[#F1EEDF] text-[13.5px] font-medium transition-colors cursor-pointer"
                >
                  Place Order · {formatINR(summary.total)}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
