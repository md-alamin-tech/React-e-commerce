/**
 * Recipes Mock Data
 * Authentic Balkan and Mediterranean recipes matching Section 4 of the mockup.
 */

export interface Recipe {
  id: string;
  title: string;
  slug: string;
  category: string;
  prepTime: string;
  cookTime: string;
  servings: string;
  image: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  associatedProductIds: string[];
}

export const RECIPES: Recipe[] = [
  {
    id: 'rec-baklava',
    title: 'Classic Baklava',
    slug: 'classic-baklava',
    category: 'Desserts',
    prepTime: '40 mins',
    cookTime: '45 mins',
    servings: '16 slices',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80',
    description: 'Golden phyllo layers packed with roasted walnuts, soaked in fragrant lemon and honey syrup.',
    ingredients: [
      '1 pack paper-thin Phyllo pastry dough',
      '450g mountain walnuts, finely chopped',
      '220g unsalted European butter, melted',
      '1 tsp ground cinnamon',
      '2 cups pure cane sugar',
      '1.5 cups spring water',
      '1/2 cup wildflower honey',
      '1 tbsp fresh lemon juice',
    ],
    instructions: [
      'Preheat oven to 350°F (175°C). Brush a 9x13 inch baking pan generously with melted butter.',
      'Unroll phyllo dough and trim to fit the pan. Cover with a slightly damp cloth while working.',
      'Layer 10 sheets of phyllo, brushing each sheet with melted butter.',
      'Scatter 1/3 of the chopped walnuts and cinnamon over the sheets. Layer 5 buttered phyllo sheets, followed by another layer of nuts.',
      'Finish with the remaining buttered phyllo sheets on top. Using a sharp knife, gently cut into diamond or diamond-square shapes.',
      'Bake for 45-50 minutes until crisp and golden brown.',
      'While baking, boil water, sugar, honey, and lemon juice for 10 minutes to make the syrup. Cool syrup completely.',
      'Pour the cooled syrup over the hot baklava as soon as it exits the oven. Allow to rest 4 hours before serving.',
    ],
    associatedProductIds: ['prod-baklava'],
  },
  {
    id: 'rec-burek',
    title: 'Burek with Cheese',
    slug: 'burek-with-cheese',
    category: 'Bakery',
    prepTime: '25 mins',
    cookTime: '35 mins',
    servings: '6-8 servings',
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80',
    description: 'Flaky golden phyllo spiral stuffed with rich crumbled feta, kajmak, and farm eggs.',
    ingredients: [
      '1 pack rustic phyllo sheets (yufka or thick phyllo)',
      '400g Belké traditional Feta cheese, crumbled',
      '200g artisan Kaymak cream or cottage curd',
      '3 large pasture eggs',
      '100ml sparkling mineral water',
      '100ml olive oil and melted butter blend',
      '1 tsp sea salt',
    ],
    instructions: [
      'Preheat oven to 390°F (200°C) and lightly grease a round pizza or pie pan.',
      'In a bowl, mix crumbled feta, kaymak, beaten eggs, and half the sparkling water into a thick creamy filling.',
      'Lay out two overlapping phyllo sheets, brush with olive oil and sparkling water.',
      'Spoon a generous ribbon of cheese filling along the long edge, then gently roll into a long snake.',
      'Starting from the center of the pan, spiral the rolled phyllo outwards into a snail shape.',
      'Brush top generously with remaining butter and bake for 35 minutes until deep golden crisp.',
      'Serve warm alongside cold yogurt or kefir.',
    ],
    associatedProductIds: ['prod-burek', 'prod-feta', 'prod-kaymak'],
  },
  {
    id: 'rec-tave-kosi',
    title: 'Traditional Tavë Kosi',
    slug: 'traditional-tave-kosi',
    category: 'Mains',
    prepTime: '20 mins',
    cookTime: '60 mins',
    servings: '4 servings',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    description: 'Albania’s national dish: tender baked lamb nestled in arborio rice and a velvety baked garlic-yogurt custard.',
    ingredients: [
      '800g tender lamb shoulder cut into chunks',
      '80g arborio rice',
      '500g whole milk Greek yogurt',
      '4 whole eggs',
      '4 cloves garlic, minced',
      '50g butter',
      '2 tbsp flour',
      'Fresh oregano, salt, and cracked black pepper',
    ],
    instructions: [
      'Season lamb with salt, pepper, and oregano. Sauté in butter until nicely browned, then simmer with 2 cups of water for 40 minutes until fork tender. Reserve the broth.',
      'Scatter raw rice across the bottom of a stoneware baking dish. Place tender lamb chunks over the rice, and ladle 1 cup of warm broth over.',
      'In a saucepan, melt 2 tbsp butter, whisk in flour for 1 minute, then whisk in 1 cup lamb broth until smooth.',
      'In a separate bowl, whisk yogurt, whole eggs, and minced garlic. Gradually combine with the tempered roux.',
      'Pour the creamy yogurt custard over the meat and rice.',
      'Bake at 375°F (190°C) for 40-45 minutes until the custard is set, puffed, and browned with golden spots.',
    ],
    associatedProductIds: ['prod-olive-oil'],
  },
  {
    id: 'rec-ajvar',
    title: 'Ajvar (Roasted Red Pepper Spread)',
    slug: 'ajvar-roasted-spread',
    category: 'Appetizers & Spreads',
    prepTime: '45 mins',
    cookTime: '90 mins',
    servings: '4 jars',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
    description: 'Sweet red peppers fire-charred, peeled, and slowly simmered with garlic and virgin oil.',
    ingredients: [
      '3 kg red horn peppers (Kurtovska Kapija or red bell)',
      '1 large eggplant',
      '250ml sunflower or light olive oil',
      '4 cloves garlic, minced',
      '1.5 tbsp sea salt',
      '1 tbsp red wine vinegar',
    ],
    instructions: [
      'Roast peppers and eggplant whole over an open wood fire or charcoal grill until skins are completely charred and blistered.',
      'Transfer hot peppers into sealed pots or plastic bags for 20 minutes to steam.',
      'Peel away charred skins, remove stems and seeds carefully. Drain peeled peppers in a colander for 2 hours.',
      'Finely chop or grind the peppers and eggplant pulp in a meat grinder.',
      'Transfer to a wide, heavy-bottomed preserving pot. Simmer over low-medium heat, stirring continuously in a wooden spoon figure-eight.',
      'Gradually stream in hot oil as the mixture thickens. Cook for 1 to 1.5 hours until the spoon leaves a clear trail across the pot bottom.',
      'Stir in garlic, vinegar, and sea salt. Spoon into hot sterilized jars and seal tightly.',
    ],
    associatedProductIds: ['prod-ajvar'],
  },
  {
    id: 'rec-peppers',
    title: 'Stuffed Peppers (Speca të Mbushura)',
    slug: 'stuffed-peppers-speca-te-mbushura',
    category: 'Mains',
    prepTime: '25 mins',
    cookTime: '50 mins',
    servings: '6 servings',
    image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=800&q=80',
    description: 'Sweet summer peppers packed with ground beef, seasoned rice, mint, and slow-baked in tomato sauce.',
    ingredients: [
      '8 large sweet green or yellow bell peppers',
      '500g lean ground beef',
      '1 cup long-grain rice, rinsed',
      '2 onions, finely diced',
      '2 grated tomatoes',
      '1 bunch fresh parsley and mint',
      '1 tbsp sweet paprika',
      'Olive oil, salt, and pepper',
    ],
    instructions: [
      'Slice tops off peppers and scoop out seeds; save the tops as lids.',
      'Sauté onions in olive oil until translucent. Add ground beef and brown thoroughly.',
      'Stir in rice, paprika, diced tomatoes, fresh chopped herbs, salt, and black pepper. Cook 3 minutes.',
      'Stuff each pepper 3/4 full with the filling (rice will expand). Cap with the pepper tops.',
      'Arrange upright in a baking dish. Pour 1 cup seasoned tomato broth around the peppers.',
      'Cover with foil and bake at 380°F (190°C) for 45 minutes, remove foil for final 10 minutes to caramelize tops.',
    ],
    associatedProductIds: ['prod-olive-oil'],
  },
  {
    id: 'rec-trilece',
    title: 'Authentic Trileçe',
    slug: 'authentic-trilece',
    category: 'Desserts',
    prepTime: '30 mins',
    cookTime: '30 mins',
    servings: '12 portions',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    description: 'Sponge cake soaked with three milks (whole milk, evaporated milk, and heavy cream), crowned in homemade caramel.',
    ingredients: [
      '6 large eggs, separated',
      '1 cup granulated sugar',
      '1.5 cups all-purpose flour',
      '1 tbsp baking powder & 1 tsp vanilla extract',
      '500ml whole milk',
      '400ml heavy whipping cream',
      '350ml evaporated milk',
      'For Caramel: 1 cup sugar, 2 tbsp butter, 100ml heavy cream',
    ],
    instructions: [
      'Whip egg whites with half the sugar until stiff peaks form. In another bowl, beat egg yolks with remaining sugar until pale yellow.',
      'Gently fold yolks into whites. Sift in flour and baking powder, folding with a spatula.',
      'Pour into a 9x13 inch buttered glass dish. Bake at 340°F (170°C) for 25-30 minutes until golden and springy.',
      'Whisk the three milks together. Pierce the warm cake all over with a skewer or fork.',
      'Slowly ladle all three milks over the cake. It will absorb completely as it chills.',
      'Melt sugar in a pan until amber brown, whisk in butter and warmed heavy cream until silky smooth.',
      'Spread caramel over the chilled cake. Refrigerate at least 4 hours before slicing.',
    ],
    associatedProductIds: ['prod-trilece'],
  },
];
