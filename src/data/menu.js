export const RESTAURANT = {
  name: "Oak & Leaf",
  tagline: "Garden kitchen · Table ordering",
  defaultTable: 14,
};

export const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "popular", label: "Popular" },
  { id: "appetizers", label: "Appetizers" },
  { id: "mains", label: "Main Course" },
  { id: "drinks", label: "Drinks" },
];

export const SPICE_LEVELS = [
  { id: "mild", label: "Mild", hint: "Gentle heat" },
  { id: "medium", label: "Medium", hint: "House spice" },
  { id: "spicy", label: "Spicy", hint: "Bold chili" },
];

export const MENU_ITEMS = [
  {
    id: "mohinga",
    name: "Garden Mohinga",
    description: "Rice noodle soup with catfish broth, banana stem, and crisp toppings.",
    price: 4500,
    category: "mains",
    popular: true,
    spiceable: true,
    image:
      "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "tea-leaf",
    name: "Tea Leaf Salad",
    description: "Fermented tea leaves, roasted peanuts, sesame, tomato, and lime.",
    price: 5500,
    category: "appetizers",
    popular: true,
    spiceable: true,
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "coconut-chicken",
    name: "Coconut Chicken Curry",
    description: "Slow-simmered chicken in coconut milk with turmeric and lemongrass.",
    price: 8500,
    category: "mains",
    popular: true,
    spiceable: true,
    image:
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "grilled-prawns",
    name: "Charred River Prawns",
    description: "Grilled prawns with chili-lime butter and garden herbs.",
    price: 12000,
    category: "mains",
    popular: true,
    spiceable: true,
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "spring-rolls",
    name: "Crisp Garden Rolls",
    description: "Vegetable spring rolls with sweet chili dipping sauce.",
    price: 3800,
    category: "appetizers",
    popular: false,
    spiceable: false,
    image:
      "https://images.unsplash.com/photo-1544025162-d766d81c35e4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "pumpkin-soup",
    name: "Roasted Pumpkin Soup",
    description: "Silky pumpkin, ginger, and toasted pumpkin seeds.",
    price: 4200,
    category: "appetizers",
    popular: false,
    spiceable: false,
    image:
      "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "beef-salad",
    name: "Seared Beef Salad",
    description: "Warm beef, cucumber, mint, and tamarind dressing.",
    price: 7800,
    category: "mains",
    popular: false,
    spiceable: true,
    image:
      "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "coconut-rice",
    name: "Fragrant Coconut Rice",
    description: "Jasmine rice steamed with coconut milk and pandan.",
    price: 2500,
    category: "mains",
    popular: false,
    spiceable: false,
    image:
      "https://images.unsplash.com/photo-1516684738277-80de6c1e7c81?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "lime-soda",
    name: "Salted Lime Soda",
    description: "Fresh lime, a pinch of salt, and sparkling water.",
    price: 2200,
    category: "drinks",
    popular: true,
    spiceable: false,
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "iced-tea",
    name: "Jasmine Iced Tea",
    description: "House-brewed jasmine tea over ice with honey.",
    price: 1800,
    category: "drinks",
    popular: false,
    spiceable: false,
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "avocado-shake",
    name: "Avocado Shake",
    description: "Creamy avocado blended with condensed milk.",
    price: 3500,
    category: "drinks",
    popular: true,
    spiceable: false,
    image:
      "https://images.unsplash.com/photo-1623065424302-7c0d6d0a0c0e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "mango-sticky",
    name: "Mango Sticky Rice",
    description: "Sweet coconut sticky rice with ripe mango.",
    price: 4800,
    category: "appetizers",
    popular: true,
    spiceable: false,
    image:
      "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&q=80",
  },
];

export const formatKs = (amount) =>
  `${Number(amount).toLocaleString("en-US")} Ks`;
