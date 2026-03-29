// types
import { Recipe } from "../types";

const MOCK_RECIPES: Recipe[] = [
  {
    id: "pistachio",
    name: "Pistachio Bronte",
    category: "gelato",
    description:
      "Made with pure Bronte pistachio paste. Intense green color and deeply nutty finish.",
    baseWeightGrams: 5000,
    ingredients: [],
    steps: [],
    agingTimeHours: 12,
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1694116056814-edddc837a61d?w=900&auto=format&fit=crop&q=60",
  },
  {
    id: "stracciatella",
    name: "Stracciatella",
    category: "gelato",
    description:
      "Sweet cream base with hand-shaved dark chocolate flakes throughout.",
    baseWeightGrams: 5000,
    ingredients: [],
    steps: [],
    agingTimeHours: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1706177175286-dfc625f8fabe?w=900&auto=format&fit=crop&q=60",
  },
  {
    id: "lemon-sorbet",
    name: "Lemon Sorbetto",
    category: "sorbetto",
    description:
      "Dairy-free and refreshing. Bright Sicilian lemon zest and freshly squeezed juice.",
    baseWeightGrams: 4000,
    ingredients: [],
    steps: [],
    agingTimeHours: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1608322368735-b6b6ec262af7?w=900&auto=format&fit=crop&q=60",
  },
  {
    id: "dark-choc",
    name: "Dark Chocolate 70%",
    category: "gelato",
    description:
      "Rich cocoa base with deep, balanced sweetness and a clean finish.",
    baseWeightGrams: 5000,
    ingredients: [],
    steps: [],
    agingTimeHours: 12,
    imageUrl:
      "https://images.unsplash.com/photo-1593410974855-87ab9de04bb5?w=900&auto=format&fit=crop&q=60",
  },
];

export default MOCK_RECIPES;
