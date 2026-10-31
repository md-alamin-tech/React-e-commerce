/**
 * Category Data
 * Contains the 8 core product categories matching the Belké Market layout.
 */

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
}

export const CATEGORIES: Category[] = [
  {
    id: 'dairy-cheese',
    name: 'Dairy & Cheese',
    slug: 'dairy-cheese',
    description: 'Traditional brined feta, artisan kaymak cream, kashkaval, and aged sheep cheeses.',
    image: 'https://images.unsplash.com/photo-1552767059-ce182ead6c1b?auto=format&fit=crop&w=600&q=80',
    itemCount: 14,
  },
  {
    id: 'meats-deli',
    name: 'Meats & Deli',
    slug: 'meats-deli',
    description: 'Smoked sudžuk sausages, thin-sliced pršut, cured pastirma, and specialty cold cuts.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    itemCount: 12,
  },
  {
    id: 'pantry-condiments',
    name: 'Pantry & Condiments',
    slug: 'pantry-condiments',
    description: 'Roasted red pepper ajvar, pindjur, ljutenica, Kalamata olives, and cold-pressed oils.',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
    itemCount: 22,
  },
  {
    id: 'sweets-desserts',
    name: 'Sweets & Desserts',
    slug: 'sweets-desserts',
    description: 'Handcrafted walnut baklava, rose Turkish delight, trileçe, and sesame halva.',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=600&q=80',
    itemCount: 16,
  },
  {
    id: 'beverages',
    name: 'Beverages',
    slug: 'beverages',
    description: 'Balkan mountain herbal teas, authentic roasted Turkish coffee, and sparkling mineral waters.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    itemCount: 10,
  },
  {
    id: 'bread-bakery',
    name: 'Bread & Bakery',
    slug: 'bread-bakery',
    description: 'Crisp spiral burek, fluffy somun flatbreads, pogacha hearth bread, and phyllo dough.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    itemCount: 11,
  },
  {
    id: 'frozen-foods',
    name: 'Frozen Foods',
    slug: 'frozen-foods',
    description: 'Ready-to-bake spinach & feta pitas, traditional beef ćevapi, and mantije dumplings.',
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=600&q=80',
    itemCount: 9,
  },
  {
    id: 'european-specialties',
    name: 'European Specialties',
    slug: 'european-specialties',
    description: 'Rare Mediterranean saffron, Adriatic sea salt crystals, and hand-picked oregano.',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=600&q=80',
    itemCount: 15,
  },
];
