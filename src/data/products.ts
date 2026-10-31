/**
 * Products Mock Data
 * Rich catalog of authentic European and Balkan grocery items with variants, images, and reviews.
 */

export interface ProductVariant {
  id: string;
  name: string; // e.g. "500g", "1kg", "Mild", "Hot", "Original"
  price: number;
  inStock: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categoryName: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  featured: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  inStock: boolean;
  stockCount: number;
  origin: string;
  shortDescription: string;
  description: string;
  images: string[];
  variants: ProductVariant[];
  ingredients?: string[];
  weight: string;
  reviews: Review[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'prod-ajvar',
    name: 'Ajvar (Roasted Red Pepper Spread)',
    slug: 'ajvar-roasted-red-pepper-spread',
    category: 'pantry-condiments',
    categoryName: 'Pantry & Condiments',
    price: 8.49,
    originalPrice: 9.99,
    rating: 4.9,
    reviewCount: 48,
    featured: true,
    isBestSeller: true,
    inStock: true,
    stockCount: 35,
    origin: 'North Macedonia / Balkans',
    shortDescription: 'Slow-roasted red horn peppers and eggplant simmered with sunflower oil and sea salt.',
    description: 'Our traditional Ajvar is prepared using fire-roasted red peppers slowly cooked over low heat for hours until rich, velvety, and smoky sweet. Known across the Balkans as "vegetable caviar," it is perfect spooned over crusty bread, paired with sharp feta cheese, or served alongside grilled meats.',
    images: [
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1589135233689-d56795f55333?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=800&q=80',
    ],
    variants: [
      { id: 'v-ajvar-mild-550', name: 'Mild - 550g Jar', price: 8.49, inStock: true },
      { id: 'v-ajvar-hot-550', name: 'Hot / Spicy - 550g Jar', price: 8.99, inStock: true },
      { id: 'v-ajvar-mild-1000', name: 'Family Size - 1000g Jar', price: 14.99, inStock: true },
    ],
    ingredients: ['Roasted Red Horn Peppers (84%)', 'Roasted Eggplant', 'Sunflower Oil', 'Sea Salt', 'Wine Vinegar'],
    weight: '550g',
    reviews: [
      {
        id: 'rev-1',
        author: 'Arben K.',
        rating: 5,
        date: '2026-10-14',
        comment: 'Tastes identical to the ajvar my grandmother prepared in Korça every autumn! Thick, smoky, and absolutely delicious.',
        verified: true,
      },
      {
        id: 'rev-2',
        author: 'Elena Rossi',
        rating: 5,
        date: '2026-10-21',
        comment: 'Spread on warm sourdough with feta cheese is heaven. Ordered 4 more jars.',
        verified: true,
      },
    ],
  },
  {
    id: 'prod-feta',
    name: 'Feta Cheese (Traditional Brined)',
    slug: 'feta-cheese-traditional-brined',
    category: 'dairy-cheese',
    categoryName: 'Dairy & Cheese',
    price: 9.99,
    originalPrice: 11.50,
    rating: 4.8,
    reviewCount: 39,
    featured: true,
    isBestSeller: true,
    inStock: true,
    stockCount: 22,
    origin: 'Greece / Balkan Highlands',
    shortDescription: 'Authentic PDO barrel-aged sheep and goat milk cheese in natural brine.',
    description: 'Creamy yet crumbly, tangy, and deeply savory. Cured in wooden barrels with natural sea brine for a minimum of three months. A staple on every Balkan breakfast table, Greek salad, or baked into warm pastries.',
    images: [
      'https://images.unsplash.com/photo-1552767059-ce182ead6c1b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1559561853-08451507cbe7?auto=format&fit=crop&w=800&q=80',
    ],
    variants: [
      { id: 'v-feta-400', name: '400g Tub in Brine', price: 9.99, inStock: true },
      { id: 'v-feta-800', name: '800g Block', price: 17.50, inStock: true },
      { id: 'v-feta-spicy', name: 'Marinated with Oregano & Chili (350g)', price: 11.99, inStock: true },
    ],
    ingredients: ['Pasteurized Sheep Milk (70% min)', 'Pasteurized Goat Milk (30% max)', 'Sea Salt', 'Lactic Culture', 'Microbial Rennet'],
    weight: '400g',
    reviews: [
      {
        id: 'rev-3',
        author: 'Maria D.',
        rating: 5,
        date: '2026-09-28',
        comment: 'Real authentic feta with high sheep milk content. Melts wonderfully in pita.',
        verified: true,
      },
    ],
  },
  {
    id: 'prod-baklava',
    name: 'Artisan Walnut Baklava',
    slug: 'artisan-walnut-baklava',
    category: 'sweets-desserts',
    categoryName: 'Sweets & Desserts',
    price: 12.99,
    rating: 5.0,
    reviewCount: 64,
    featured: true,
    isBestSeller: true,
    inStock: true,
    stockCount: 18,
    origin: 'Sarajevo / Pristina',
    shortDescription: 'Paper-thin layers of buttery phyllo pastry filled with chopped mountain walnuts & lemon syrup.',
    description: 'Handmade by master pastry bakers. Forty translucent layers of crisp phyllo drenched in clarified butter, generously layered with crushed walnuts, and finished with a fragrant citrus and clover honey syrup.',
    images: [
      'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    ],
    variants: [
      { id: 'v-baklava-6pc', name: 'Box of 6 pieces (350g)', price: 12.99, inStock: true },
      { id: 'v-baklava-12pc', name: 'Box of 12 pieces (700g)', price: 22.99, inStock: true },
      { id: 'v-baklava-pistachio', name: 'Antep Pistachio Edition (6pc)', price: 15.99, inStock: true },
    ],
    ingredients: ['Wheat Flour', 'Purified Butter', 'Mountain Walnuts (32%)', 'Pure Cane Sugar', 'Honey', 'Lemon Juice'],
    weight: '350g',
    reviews: [
      {
        id: 'rev-4',
        author: 'Mirsad B.',
        rating: 5,
        date: '2026-10-18',
        comment: 'Crisp on top, syrup absorbed perfectly without being overly sweet. Best I had in the US!',
        verified: true,
      },
    ],
  },
  {
    id: 'prod-burek',
    name: 'Burek with Cheese (Freshly Baked Spiral)',
    slug: 'burek-with-cheese',
    category: 'bread-bakery',
    categoryName: 'Bread & Bakery',
    price: 11.49,
    rating: 4.9,
    reviewCount: 52,
    featured: true,
    isBestSeller: true,
    inStock: true,
    stockCount: 15,
    origin: 'Albania / Bosnia',
    shortDescription: 'Golden flaky phyllo wheel stuffed with savory curd cheese, fresh eggs, and herbs.',
    description: 'The crown jewel of Balkan bakeries. Freshly baked each morning: paper-thin hand-stretched dough rolled around a rich filling of traditional white cheese, organic eggs, and whole cream. Crispy outside, tender and molten within.',
    images: [
      'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    ],
    variants: [
      { id: 'v-burek-cheese', name: 'Whole Wheel - Traditional Cheese (650g)', price: 11.49, inStock: true },
      { id: 'v-burek-spinach', name: 'Whole Wheel - Spinach & Feta (650g)', price: 11.99, inStock: true },
      { id: 'v-burek-beef', name: 'Whole Wheel - Seasoned Minced Beef (650g)', price: 13.49, inStock: true },
    ],
    ingredients: ['Enriched Wheat Flour', 'Cow Milk White Cheese', 'Eggs', 'Vegetable Oil', 'Butter', 'Salt'],
    weight: '650g',
    reviews: [
      {
        id: 'rev-5',
        author: 'Drita S.',
        rating: 5,
        date: '2026-10-25',
        comment: 'Warm this up in the oven for 10 minutes and pair with plain yogurt. Pure nostalgic perfection.',
        verified: true,
      },
    ],
  },
  {
    id: 'prod-turkish-delight',
    name: 'Turkish Delight (Rahat Lokum Assortment)',
    slug: 'turkish-delight-rahat-lokum',
    category: 'sweets-desserts',
    categoryName: 'Sweets & Desserts',
    price: 7.99,
    rating: 4.7,
    reviewCount: 31,
    featured: true,
    inStock: true,
    stockCount: 40,
    origin: 'Istanbul / Balkans',
    shortDescription: 'Silky confection dusted with powdered sugar, infused with Damascus rosewater and roasted nuts.',
    description: 'Traditional confection prepared slowly in copper cauldrons with natural starch, pure sugar, and rose essences, loaded with crunchy roasted walnuts and pistachios. Served with Turkish coffee across Europe.',
    images: [
      'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80',
    ],
    variants: [
      { id: 'v-lokum-rose', name: 'Rosewater & Lemon (300g)', price: 7.99, inStock: true },
      { id: 'v-lokum-pistachio', name: 'Double Roasted Pistachio (350g)', price: 9.99, inStock: true },
      { id: 'v-lokum-walnut', name: 'Balkan Walnut & Pomegranate (300g)', price: 8.99, inStock: true },
    ],
    weight: '300g',
    reviews: [],
  },
  {
    id: 'prod-olive-oil',
    name: 'Imported Extra Virgin Olive Oil (Cold-Pressed)',
    slug: 'imported-extra-virgin-olive-oil',
    category: 'pantry-condiments',
    categoryName: 'Pantry & Condiments',
    price: 18.99,
    originalPrice: 22.00,
    rating: 4.9,
    reviewCount: 44,
    featured: true,
    isBestSeller: true,
    inStock: true,
    stockCount: 28,
    origin: 'Kalamata, Greece & Vlorë, Albania',
    shortDescription: 'Single-estate early harvest cold-pressed extra virgin olive oil with vibrant peppery finish.',
    description: 'Produced from ancient olive groves overlooking the Ionian and Adriatic coasts. First cold-pressed within hours of harvest, boasting an acidity below 0.3%. Rich in polyphenol antioxidants with herbaceous aromas of wild thyme and fresh cut grass.',
    images: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
    ],
    variants: [
      { id: 'v-oil-750', name: '750ml Glass Bottle', price: 18.99, inStock: true },
      { id: 'v-oil-1000', name: '1000ml Decanter', price: 23.99, inStock: true },
      { id: 'v-oil-3000', name: '3-Liter Culinary Tin', price: 49.99, inStock: true },
    ],
    weight: '750ml',
    reviews: [],
  },
  {
    id: 'prod-kaymak',
    name: 'Kaymak (Artisan Clotted Cream)',
    slug: 'kaymak-artisan-clotted-cream',
    category: 'dairy-cheese',
    categoryName: 'Dairy & Cheese',
    price: 8.99,
    rating: 4.9,
    reviewCount: 29,
    featured: false,
    inStock: true,
    stockCount: 20,
    origin: 'Serbia / Bosnia',
    shortDescription: 'Velvety Balkan clotted cream made by skimming slow-simmered whole milk.',
    description: 'Thick, spreadable, rich dairy gold. Irreplaceable on fresh somun bread alongside cevapi, or drizzled with wildflower honey for breakfast.',
    images: [
      'https://images.unsplash.com/photo-1559561853-08451507cbe7?auto=format&fit=crop&w=800&q=80',
    ],
    variants: [
      { id: 'v-kaymak-250', name: '250g Tub', price: 8.99, inStock: true },
      { id: 'v-kaymak-450', name: '450g Tub', price: 14.50, inStock: true },
    ],
    weight: '250g',
    reviews: [],
  },
  {
    id: 'prod-kashkaval',
    name: 'Kashkaval (Aged Yellow Sheep Cheese)',
    slug: 'kashkaval-aged-yellow-sheep-cheese',
    category: 'dairy-cheese',
    categoryName: 'Dairy & Cheese',
    price: 10.99,
    rating: 4.8,
    reviewCount: 27,
    featured: false,
    inStock: true,
    stockCount: 24,
    origin: 'Bulgaria / Albania',
    shortDescription: 'Semi-hard aged sheep milk cheese with a smooth texture and nutty, buttery profile.',
    description: 'Known as the "cheddar of the Balkans," Kashkaval is aged for over six months until semi-firm, savory, and fragrant. Perfect for slicing on charcuterie boards, pan-frying into Kačkavalj pohovani, or melting over warm flatbread.',
    images: [
      'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=800&q=80',
    ],
    variants: [
      { id: 'v-kash-350', name: '350g Wedge', price: 10.99, inStock: true },
      { id: 'v-kash-700', name: '700g Wheel Piece', price: 19.99, inStock: true },
    ],
    weight: '350g',
    reviews: [],
  },
  {
    id: 'prod-ljutenica',
    name: 'Ljutenica (Chunky Pepper, Tomato & Garlic Relish)',
    slug: 'ljutenica-chunky-relish',
    category: 'pantry-condiments',
    categoryName: 'Pantry & Condiments',
    price: 7.99,
    rating: 4.8,
    reviewCount: 23,
    featured: false,
    inStock: true,
    stockCount: 30,
    origin: 'Bulgaria',
    shortDescription: 'Hearty relish of roasted red peppers, sun-ripened tomatoes, garlic cloves, and parsley.',
    description: 'Slightly chunkier and more piquant than ajvar, this traditional spread is bursting with garlic zest and slow-stewed tomatoes. Outstanding as a dip, burger condiment, or paired with grilled meats.',
    images: [
      'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=800&q=80',
    ],
    variants: [
      { id: 'v-lju-540', name: '540g Jar', price: 7.99, inStock: true },
    ],
    weight: '540g',
    reviews: [],
  },
  {
    id: 'prod-sudzuk',
    name: 'Sudžuk (Smoked Beef Dry Sausage)',
    slug: 'sudzuk-smoked-beef-dry-sausage',
    category: 'meats-deli',
    categoryName: 'Meats & Deli',
    price: 13.99,
    rating: 4.9,
    reviewCount: 38,
    featured: true,
    inStock: true,
    stockCount: 16,
    origin: 'Bosnia / Sandžak',
    shortDescription: 'Cured and hardwood-smoked 100% halal beef sausage seasoned with garlic and black pepper.',
    description: 'Dry-cured according to century-old mountain methods. Smoked over beechwood embers and air-dried in the cool alpine wind. Firm, aromatic, and deeply flavorful.',
    images: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    ],
    variants: [
      { id: 'v-sudzuk-mild', name: 'Mild Garlic - 400g Pair', price: 13.99, inStock: true },
      { id: 'v-sudzuk-hot', name: 'Spicy Paprika - 400g Pair', price: 14.49, inStock: true },
    ],
    weight: '400g',
    reviews: [],
  },
  {
    id: 'prod-przut',
    name: 'Dalmatian / Njeguški Pršut (Dry Cured Ham)',
    slug: 'przut-dry-cured-ham',
    category: 'meats-deli',
    categoryName: 'Meats & Deli',
    price: 15.99,
    rating: 4.9,
    reviewCount: 34,
    featured: false,
    inStock: true,
    stockCount: 14,
    origin: 'Montenegro / Croatia',
    shortDescription: 'Sea salt cured mountain ham naturally dried in the coastal Bora wind for 18 months.',
    description: 'Sliced wafer-thin. Deep ruby red color, melt-in-your-mouth tenderness, and a delicate woodsmoke and sea salt aroma.',
    images: [
      'https://images.unsplash.com/photo-1528607929212-2636ec44253e?auto=format&fit=crop&w=800&q=80',
    ],
    variants: [
      { id: 'v-przut-200', name: 'Thin Sliced (200g Pack)', price: 15.99, inStock: true },
      { id: 'v-przut-500', name: 'Boneless Chunk (500g)', price: 34.99, inStock: true },
    ],
    weight: '200g',
    reviews: [],
  },
  {
    id: 'prod-trilece',
    name: 'Trileçe (Three-Milk Caramel Cake)',
    slug: 'trilece-three-milk-caramel-cake',
    category: 'sweets-desserts',
    categoryName: 'Sweets & Desserts',
    price: 6.99,
    rating: 5.0,
    reviewCount: 45,
    featured: false,
    inStock: true,
    stockCount: 12,
    origin: 'Albanian Confectionery',
    shortDescription: 'Airy sponge cake saturated in a blend of whole milk, cream, and evaporated milk, glazed in rich amber caramel.',
    description: 'A beloved modern Balkan icon. Light, ultra-moist, cool sponge cake soaked overnight in sweet three-milk nectar, crowned with a silky homemade golden caramel mirror.',
    images: [
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    ],
    variants: [
      { id: 'v-trilece-slice', name: 'Single Generous Portion', price: 6.99, inStock: true },
      { id: 'v-trilece-tray', name: 'Party Tray (6 Servings)', price: 29.99, inStock: true },
    ],
    weight: '280g',
    reviews: [],
  },
  {
    id: 'prod-tea',
    name: 'Balkan Mountain Herbal Tea (Çaj Mali)',
    slug: 'caj-mali-mountain-tea',
    category: 'beverages',
    categoryName: 'Beverages',
    price: 6.49,
    rating: 4.8,
    reviewCount: 19,
    featured: false,
    inStock: true,
    stockCount: 35,
    origin: 'Southern Albania & Epirus',
    shortDescription: 'Wild-harvested Sideritis mountain tea sprigs with fragrant floral notes of mint, citrus, and honey.',
    description: 'Naturally caffeine-free, gathered by hand in rocky high-altitude slopes. Known for centuries as a restorative winter cure and daily afternoon beverage. Brew with honey and lemon.',
    images: [
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    ],
    variants: [
      { id: 'v-tea-50', name: '50g Whole Dried Bunches', price: 6.49, inStock: true },
      { id: 'v-tea-150', name: '150g Value Pack', price: 14.99, inStock: true },
    ],
    weight: '50g',
    reviews: [],
  },
  {
    id: 'prod-coffee',
    name: 'Authentic Balkan / Turkish Roasted Coffee',
    slug: 'authentic-balkan-turkish-coffee',
    category: 'beverages',
    categoryName: 'Beverages',
    price: 5.99,
    rating: 4.9,
    reviewCount: 51,
    featured: false,
    inStock: true,
    stockCount: 40,
    origin: 'Traditional Roastery',
    shortDescription: 'Finely stone-ground dark roast coffee for brewing in a classic cezve/džezva pot with velvety crema.',
    description: 'Ground to an ultra-fine powder specifically for copper pot brewing. Rich aroma, velvety foam head, and thick chocolate undertones.',
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    ],
    variants: [
      { id: 'v-coffee-250', name: '250g Foil Pack', price: 5.99, inStock: true },
      { id: 'v-coffee-500', name: '500g Value Pack', price: 10.99, inStock: true },
    ],
    weight: '250g',
    reviews: [],
  },
  {
    id: 'prod-cevapi',
    name: 'Traditional Beef Ćevapi (Frozen Grill Pack)',
    slug: 'traditional-beef-cevapi',
    category: 'frozen-foods',
    categoryName: 'Frozen Foods',
    price: 14.99,
    rating: 5.0,
    reviewCount: 42,
    featured: false,
    inStock: true,
    stockCount: 22,
    origin: 'Bosnia & Herzegovina',
    shortDescription: 'Juicy spiced minced beef fingers ready for the grill or stovetop pan.',
    description: 'Crafted with premium ground beef, garlic, sparkling mineral water, and sea salt. Fluffy inside, nicely charred outside. Best served in somun bread with raw diced onion and a scoop of kaymak.',
    images: [
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    ],
    variants: [
      { id: 'v-cevapi-20pc', name: 'Pack of 20 pieces (600g)', price: 14.99, inStock: true },
      { id: 'v-cevapi-40pc', name: 'Family Pack 40 pieces (1.2kg)', price: 26.99, inStock: true },
    ],
    weight: '600g',
    reviews: [],
  },
  {
    id: 'prod-olives',
    name: 'Wild Kalamata & Green Olives in Herb Marinade',
    slug: 'wild-kalamata-green-olives',
    category: 'pantry-condiments',
    categoryName: 'Pantry & Condiments',
    price: 8.99,
    rating: 4.8,
    reviewCount: 21,
    featured: false,
    inStock: true,
    stockCount: 30,
    origin: 'Southern Mediterranean',
    shortDescription: 'Hand-picked colossal olives marinated in virgin olive oil, wild oregano, rosemary, and lemon rind.',
    description: 'Plump, firm, and naturally brine-cured without chemical accelerators. A colorful medley of meaty Kalamata and fruity Green Chalkidiki olives.',
    images: [
      'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
    ],
    variants: [
      { id: 'v-olives-500', name: '500g Jar', price: 8.99, inStock: true },
    ],
    weight: '500g',
    reviews: [],
  },
];
