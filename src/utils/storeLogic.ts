import { ProductItem, FurnitureCategory } from '../data/catalog';

export interface CartItem {
  product: ProductItem;
  quantity: number;
  selectedFinish?: string;
}

export interface CheckoutFormInput {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}

export interface CheckoutValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof CheckoutFormInput, string>>;
}

export const FREE_DELIVERY_THRESHOLD = 100000;
export const STANDARD_DELIVERY_FEE = 4500;

export function formatINR(amount: number): string {
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
}

export function addItemToCart(
  cart: CartItem[],
  product: ProductItem,
  quantity: number = 1,
  selectedFinish?: string
): CartItem[] {
  if (quantity <= 0) return cart;
  const finish = selectedFinish || 'Standard Studio Upholstery';
  const existingIndex = cart.findIndex(
    (item) => item.product.id === product.id && (item.selectedFinish || 'Standard Studio Upholstery') === finish
  );

  if (existingIndex > -1) {
    return cart.map((item, idx) =>
      idx === existingIndex
        ? { ...item, quantity: item.quantity + quantity }
        : item
    );
  }

  return [...cart, { product, quantity, selectedFinish: finish }];
}

export function updateCartItemQuantity(
  cart: CartItem[],
  productId: string,
  delta: number,
  selectedFinish?: string
): CartItem[] {
  return cart
    .map((item) => {
      const finishMatch = !selectedFinish || item.selectedFinish === selectedFinish;
      if (item.product.id === productId && finishMatch) {
        return { ...item, quantity: item.quantity + delta };
      }
      return item;
    })
    .filter((item) => item.quantity > 0);
}

export function calculateCartSummary(cart: CartItem[], promoCode?: string) {
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const normalizedPromo = (promoCode || '').trim().toUpperCase();
  const discountRate = normalizedPromo === 'SOFTFEB10' ? 0.1 : 0;
  const discount = Math.round(subtotal * discountRate);
  const discountedSubtotal = subtotal - discount;
  const deliveryFee =
    discountedSubtotal === 0 || discountedSubtotal >= FREE_DELIVERY_THRESHOLD
      ? 0
      : STANDARD_DELIVERY_FEE;
  const total = discountedSubtotal + deliveryFee;
  const amountToFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - discountedSubtotal);

  return {
    itemCount,
    subtotal,
    discount,
    deliveryFee,
    total,
    amountToFreeDelivery,
    qualifiesForFreeDelivery: discountedSubtotal >= FREE_DELIVERY_THRESHOLD && discountedSubtotal > 0
  };
}

export function filterProductsByCategory(
  products: ProductItem[],
  category: FurnitureCategory | 'All',
  searchQuery: string = ''
): ProductItem[] {
  const q = searchQuery.trim().toLowerCase();
  return products.filter((item) => {
    const matchesCategory = category === 'All' || item.category === category;
    const matchesQuery =
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.materials.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });
}

export function validateCheckoutForm(input: CheckoutFormInput): CheckoutValidationResult {
  const errors: Partial<Record<keyof CheckoutFormInput, string>> = {};

  if (!input.fullName || input.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name.';
  }
  if (!input.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!input.phone || input.phone.replace(/\D/g, '').length < 7) {
    errors.phone = 'Please enter a valid contact phone number.';
  }
  if (!input.address || input.address.trim().length < 5) {
    errors.address = 'Please enter your street delivery address.';
  }
  if (!input.city || input.city.trim().length < 2) {
    errors.city = 'Please enter your city or postal code.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}
