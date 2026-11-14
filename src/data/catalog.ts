export type FurnitureCategory = 'Armchairs' | 'Chairs' | 'Sofas' | 'Secret Collection';

export interface ProductItem {
  id: string;
  name: string;
  subtitle: string;
  category: FurnitureCategory;
  price: number;
  isNew?: boolean;
  limitedStock?: number;
  image: string;
  dimensions: string;
  materials: string;
  description: string;
}

export interface CategoryCardItem {
  id: string;
  title: 'Armchairs' | 'Chairs' | 'Sofas';
  image: string;
}

export const HERO_POSITIONS: ProductItem[] = [
  {
    id: 'koda',
    name: 'Koda',
    subtitle: 'Architectural Velvet Armchair',
    category: 'Armchairs',
    price: 74900,
    isNew: true,
    image: '/assets/extracted/koda_inner.png?v=4k',
    dimensions: '88 × 84 × 74 cm',
    materials: 'Deep moss cotton velvet, cognac back cushion, smoked walnut side panels',
    description: 'Plush rounded armrests framed by sculptural walnut slabs with a contrasting warm cognac lumbar pillow for deep everyday lounging.'
  },
  {
    id: 'dana',
    name: 'Dana',
    subtitle: 'Soft-Form Lounge Chair',
    category: 'Armchairs',
    price: 64500,
    isNew: true,
    image: '/assets/extracted/dana_inner.png?v=4k',
    dimensions: '82 × 80 × 76 cm',
    materials: 'Forest green brushed chenille, powder-coated matte black steel legs',
    description: 'Generously proportioned cushions with gentle organic curves elevated on slender architectural legs.'
  },
  {
    id: 'verta-hero',
    name: 'Verta',
    subtitle: 'Two-Tone Barrel Armchair',
    category: 'Armchairs',
    price: 79500,
    isNew: true,
    image: '/assets/extracted/verta_inner.png?v=4k',
    dimensions: '86 × 82 × 75 cm',
    materials: 'Sage green wool blend shell, chalk bouclé seat, botanical jacquard cushion',
    description: 'Wraparound curved backrest in muted sage paired with an ultra-soft cream seat base and patterned lumbar pillow.'
  }
];

export const SECRET_COLLECTION_ITEMS: ProductItem[] = [
  {
    id: 'verta-secret',
    name: 'Verta',
    subtitle: 'Anni S Secret Collection · Piece 01/08',
    category: 'Secret Collection',
    price: 124000,
    limitedStock: 3,
    image: '/assets/extracted/sec3_verta.png?v=4k',
    dimensions: '92 × 88 × 72 cm',
    materials: 'Warm taupe heavy bouclé, high-resilience cloud foam core',
    description: 'Low-slung monolithic silhouette with double-layered wraparound arms crafted by Anni and Raj for complete stillness and rest.'
  },
  {
    id: 'cresta-secret',
    name: 'Cresta',
    subtitle: 'Anni S Secret Collection · Piece 02/08',
    category: 'Secret Collection',
    price: 142000,
    limitedStock: 2,
    image: '/assets/extracted/sec3_cresta.png?v=4k',
    dimensions: '90 × 86 × 74 cm',
    materials: 'Peat moss textured wool, sculpted dark walnut structural fins',
    description: 'Floating horseshoe backrest suspended by architectural timber buttresses over a deep pebble-shaped seat.'
  },
  {
    id: 'perra-secret',
    name: 'Perra',
    subtitle: 'Anni S Secret Collection · Piece 03/08',
    category: 'Secret Collection',
    price: 129000,
    limitedStock: 4,
    image: '/assets/extracted/sec3_perra.png?v=4k',
    dimensions: '94 × 90 × 73 cm',
    materials: 'Terracotta rose brushed mohair velvet, woven linen bolster & sphere pillow',
    description: 'Playful geometric volumes and ultra-plush upholstery designed in collaboration with Anni and Raj.'
  }
];

export const ADDITIONAL_CATALOG_ITEMS: ProductItem[] = [
  {
    id: 'simply-orb',
    name: 'Simply Orb Lounge',
    subtitle: 'Signature Spherical Armchair',
    category: 'Armchairs',
    price: 108000,
    isNew: true,
    image: '/assets/extracted/hero_chair_clean.png?v=4k',
    dimensions: '104 × 98 × 78 cm',
    materials: 'Olive matte nubuck-touch weave, solid turned oak legs',
    description: 'Our iconic rounded nest armchair that cradles the body from every angle. Featured on the February cover.'
  },
  {
    id: 'aura-armchair',
    name: 'Aura',
    subtitle: 'Sculpted Timber & Bouclé Lounge',
    category: 'Armchairs',
    price: 94500,
    image: '/assets/extracted/cat_armchairs.png?v=4k',
    dimensions: '85 × 88 × 74 cm',
    materials: 'Pebble grey wool bouclé, blackened ash frame',
    description: 'Sweeping monolithic side frames cradle tilted cloud cushions for effortless posture support.'
  },
  {
    id: 'oslo-chair',
    name: 'Oslo',
    subtitle: 'Curved Back Dining Chair',
    category: 'Chairs',
    price: 35900,
    image: '/assets/extracted/cat_chairs.png?v=4k',
    dimensions: '56 × 54 × 77 cm',
    materials: 'Sage textured linen weave, slim matte black tubular steel',
    description: 'Softly padded wrap-around backrest paired with an airy architectural frame for long dinner conversations.'
  },
  {
    id: 'terra-sofa',
    name: 'Terra Curved Sofa',
    subtitle: 'Walnut Shell 3-Seater Sofa',
    category: 'Sofas',
    price: 295000,
    image: '/assets/extracted/cat_sofas.png?v=4k',
    dimensions: '265 × 112 × 76 cm',
    materials: 'Espresso velvet upholstery, bent walnut architectural shell',
    description: 'Organic serpentine seating wrapped in a continuous bent-wood walnut exterior.'
  },
  {
    id: 'dune-sofa',
    name: 'Dune Soft Modular',
    subtitle: 'Deep Cloud 3-Seater Sofa',
    category: 'Sofas',
    price: 245000,
    image: '/assets/extracted/pill_sofa.png?v=4k',
    dimensions: '240 × 104 × 72 cm',
    materials: 'Oatmeal heavy linen-cotton blend, feather-down top layer',
    description: 'Simplifying life with soft forms—our signature low-profile modular sofa built for afternoon rest.'
  }
];

export const ALL_PRODUCTS: ProductItem[] = [
  ...HERO_POSITIONS,
  ...SECRET_COLLECTION_ITEMS,
  ...ADDITIONAL_CATALOG_ITEMS
];

export const FEBRUARY_CATEGORIES: CategoryCardItem[] = [
  {
    id: 'cat-armchairs',
    title: 'Armchairs',
    image: '/assets/extracted/cat_armchairs.png?v=4k',
  },
  {
    id: 'cat-chairs',
    title: 'Chairs',
    image: '/assets/extracted/cat_chairs.png?v=4k',
  },
  {
    id: 'cat-sofas',
    title: 'Sofas',
    image: '/assets/extracted/cat_sofas.png?v=4k',
  }
];
