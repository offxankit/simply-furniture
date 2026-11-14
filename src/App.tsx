import { useEffect, useRef, useState, useCallback } from 'react';
import { HeroSection } from './components/HeroSection';
import { CollectionSection } from './components/CollectionSection';
import { SecretCollectionSection } from './components/SecretCollectionSection';
import { CartDrawer } from './components/CartDrawer';
import { CatalogDrawer } from './components/CatalogDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { DeliveryModal } from './components/DeliveryModal';
import { ProductItem, FurnitureCategory } from './data/catalog';
import {
  CartItem,
  addItemToCart,
  updateCartItemQuantity,
} from './utils/storeLogic';

const TOTAL_FRAMES = 598;
const MAX_CONCURRENT_LOADS = 10;

const getFramePath = (index: number): string => {
  const padded = String(index).padStart(6, '0');
  return `/vidfinal/frame_${padded}.png`;
};

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES + 1).fill(null));
  const isLoadedRef = useRef<boolean[]>(new Array(TOTAL_FRAMES + 1).fill(false));
  const isRequestedRef = useRef<boolean[]>(new Array(TOTAL_FRAMES + 1).fill(false));
  const lastDrawnFrameRef = useRef<number>(-1);
  const targetFrameRef = useRef<number>(1);
  const currentFrameRef = useRef<number>(1);

  // Drag interaction refs
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartFrameRef = useRef(1);

  // Store state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [catalogCategory, setCatalogCategory] = useState<FurnitureCategory | 'All'>('All');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [deliveryOpen, setDeliveryOpen] = useState(false);

  // Store actions
  const handleAddToCart = useCallback(
    (product: ProductItem, quantity: number, finish: string) => {
      setCart((prev) => addItemToCart(prev, product, quantity, finish));
    },
    []
  );

  const handleQuickAdd = useCallback((product: ProductItem) => {
    setCart((prev) => addItemToCart(prev, product, 1, 'Studio Original Upholstery'));
  }, []);

  const handleUpdateQuantity = useCallback(
    (productId: string, delta: number, selectedFinish?: string) => {
      setCart((prev) => updateCartItemQuantity(prev, productId, delta, selectedFinish));
    },
    []
  );

  const handleClearCart = useCallback(() => setCart([]), []);

  const openCatalog = useCallback(
    (category: FurnitureCategory | 'All' = 'All') => {
      setCatalogCategory(category);
      setCatalogOpen(true);
    },
    []
  );

  // Drag / scrub handlers on the centerpiece canvas
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartFrameRef.current = targetFrameRef.current;
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch { }
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - dragStartXRef.current;
    // Map drag across 300px to full 360 rotation
    const frameDelta = (deltaX / 300) * TOTAL_FRAMES * 0.5;
    let next = dragStartFrameRef.current + frameDelta;
    while (next < 1) next += TOTAL_FRAMES;
    while (next > TOTAL_FRAMES) next -= TOTAL_FRAMES;
    targetFrameRef.current = next;
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    isDraggingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch { }
  }, []);

  // Frame rendering and animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animFrameId: number;
    let activeLoads = 0;
    const priorityQueue: number[] = [];

    const drawFrame = (frameIndex: number) => {
      let img = imagesRef.current[frameIndex];
      let foundIndex = frameIndex;

      if (!img || !isLoadedRef.current[frameIndex]) {
        for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
          const prev = frameIndex - offset;
          if (prev >= 1 && isLoadedRef.current[prev] && imagesRef.current[prev]) {
            img = imagesRef.current[prev];
            foundIndex = prev;
            break;
          }
          const next = frameIndex + offset;
          if (next <= TOTAL_FRAMES && isLoadedRef.current[next] && imagesRef.current[next]) {
            img = imagesRef.current[next];
            foundIndex = next;
            break;
          }
        }
      }

      if (!img || !img.complete || img.naturalWidth === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const targetWidth = Math.round((rect.width || 760) * dpr);
      const targetHeight = Math.round((rect.height || 428) * dpr);

      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
      }

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      // Fill the viewport while keeping the furniture centered.
      const scale = Math.max(cw / iw, ch / ih);
      const renderW = Math.round(iw * scale);
      const renderH = Math.round(ih * scale);
      const offsetX = Math.round((cw - renderW) / 2);
      const offsetY = Math.round((ch - renderH) / 2);

      ctx.clearRect(0, 0, cw, ch);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, iw, ih, offsetX, offsetY, renderW, renderH);

      lastDrawnFrameRef.current = foundIndex;
    };

    const pumpQueue = () => {
      while (activeLoads < MAX_CONCURRENT_LOADS && priorityQueue.length > 0) {
        const nextIndex = priorityQueue.shift();
        if (nextIndex === undefined) break;
        if (isRequestedRef.current[nextIndex] || isLoadedRef.current[nextIndex]) continue;

        isRequestedRef.current[nextIndex] = true;
        activeLoads++;

        const img = new Image();
        img.decoding = 'async';
        img.src = getFramePath(nextIndex);

        img.onload = () => {
          isLoadedRef.current[nextIndex] = true;
          imagesRef.current[nextIndex] = img;
          activeLoads--;

          if (nextIndex === 1 && lastDrawnFrameRef.current === -1) {
            drawFrame(1);
          } else {
            const currentTarget = Math.round(currentFrameRef.current);
            if (currentTarget === nextIndex) drawFrame(nextIndex);
          }
          pumpQueue();
        };

        img.onerror = () => {
          activeLoads--;
          pumpQueue();
        };
      }
    };

    const prioritizeFrames = (centerIndex: number) => {
      const batch: number[] = [];
      for (let i = 0; i <= 25; i++) {
        const idx = centerIndex + i;
        if (idx <= TOTAL_FRAMES && !isRequestedRef.current[idx]) batch.push(idx);
      }
      for (let i = 1; i <= 8; i++) {
        const idx = centerIndex - i;
        if (idx >= 1 && !isRequestedRef.current[idx]) batch.push(idx);
      }
      if (batch.length > 0) {
        priorityQueue.unshift(...batch);
        pumpQueue();
      }
    };

    const updateTargetFrameFromScroll = () => {
      if (isDraggingRef.current) return;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollTop / maxScroll)) : 0;
      const target = 1 + progress * (TOTAL_FRAMES - 1);
      targetFrameRef.current = target;
      prioritizeFrames(Math.round(target));
    };

    const renderLoop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.001) {
        currentFrameRef.current += diff * 0.16;
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }

      const frameToDraw = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(currentFrameRef.current)));
      if (frameToDraw !== lastDrawnFrameRef.current) {
        drawFrame(frameToDraw);
      }

      animFrameId = requestAnimationFrame(renderLoop);
    };

    // Preload queue setup
    priorityQueue.push(1);
    for (let i = 2; i <= TOTAL_FRAMES; i++) priorityQueue.push(i);
    pumpQueue();

    window.addEventListener('scroll', updateTargetFrameFromScroll, { passive: true });
    const handleResize = () => {
      updateTargetFrameFromScroll();
      if (lastDrawnFrameRef.current > 0) drawFrame(lastDrawnFrameRef.current);
    };
    window.addEventListener('resize', handleResize);

    updateTargetFrameFromScroll();
    animFrameId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('scroll', updateTargetFrameFromScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div id="top" className="relative min-h-screen bg-transparent text-stone-900 font-sans selection:bg-stone-200 antialiased">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 h-full w-full"
        style={{ opacity: 1 }}
      />

      <HeroSection
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
        onSelectProduct={setSelectedProduct}
        onOpenCatalog={openCatalog}
        onOpenDelivery={() => setDeliveryOpen(true)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      />

      <CollectionSection
        onOpenCategory={openCatalog}
        onSelectProduct={setSelectedProduct}
      />

      <SecretCollectionSection onSelectProduct={setSelectedProduct} />

      <section
        aria-label="Final animation sequence"
        className="relative z-10 min-h-screen bg-transparent"
      />

      {/* ── Drawers & Modals ── */}
      <CartDrawer
        isOpen={cartOpen}
        cart={cart}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />

      <CatalogDrawer
        isOpen={catalogOpen}
        initialCategory={catalogCategory}
        onClose={() => setCatalogOpen(false)}
        onSelectProduct={(p) => {
          setCatalogOpen(false);
          setSelectedProduct(p);
        }}
        onQuickAdd={handleQuickAdd}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <DeliveryModal
        isOpen={deliveryOpen}
        onClose={() => setDeliveryOpen(false)}
      />
    </div>
  );
}