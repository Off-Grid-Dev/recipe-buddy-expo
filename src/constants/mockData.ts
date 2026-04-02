// types
import { Recipe } from "@/types";

const MOCK_RECIPES: Recipe[] = [
  {
    id: "pistachio",
    name: "Pistachio Bronte",
    category: "gelato",
    description:
      "Made with pure Bronte pistachio paste. Intense green color and deeply nutty finish.",
    baseWeightGrams: 5000,
    agingTimeHours: 12,
    ingredients: [
      {
        id: "1",
        name: `Whole Milk`,
        percentage: 56,
        unit: "g",
        group: "liquids",
      },
      {
        id: "2",
        name: "Cream 35%",
        percentage: 16,
        unit: "g",
        group: "liquids",
      },
      { id: "3", name: "Sucrose", percentage: 14, unit: "g", group: "sugars" },
      { id: "4", name: "Dextrose", percentage: 4, unit: "g", group: "sugars" },
      {
        id: "5",
        name: "Stabilizer",
        percentage: 0.5,
        unit: "g",
        group: "stabilizers",
      },
      {
        id: "6",
        name: "Pistachio Paste",
        percentage: 9.5,
        unit: "g",
        group: "flavorings",
      },
    ],
    steps: [
      {
        id: "s1",
        type: "weighing",
        instruction: "Weigh all ingredients accurately.",
      },
      {
        id: "s2",
        type: "pasteurization",
        instruction: "Pasteurize at 85°C for 5 minutes.",
        targetTemperature: 85,
      },
      {
        id: "s3",
        type: "aging",
        instruction: "Cool rapidly and age 12 hours at 4°C.",
        targetTemperature: 4,
        durationMinutes: 720,
      },
      {
        id: "s4",
        type: "churning",
        instruction: "Churn until smooth and creamy texture is achieved.",
      },
    ],
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
    agingTimeHours: 6,
    ingredients: [
      {
        id: "1",
        name: "Whole Milk",
        percentage: 60,
        unit: "g",
        group: "liquids",
      },
      {
        id: "2",
        name: "Cream 35%",
        percentage: 10,
        unit: "g",
        group: "liquids",
      },
      { id: "3", name: "Sucrose", percentage: 15, unit: "g", group: "sugars" },
      { id: "4", name: "Dextrose", percentage: 4, unit: "g", group: "sugars" },
      {
        id: "5",
        name: "Skim Milk Powder",
        percentage: 3.5,
        unit: "g",
        group: "solids",
      },
      {
        id: "6",
        name: "Stabilizer",
        percentage: 0.5,
        unit: "g",
        group: "stabilizers",
      },
      {
        id: "7",
        name: "Dark Chocolate",
        percentage: 7,
        unit: "g",
        group: "solids",
      },
    ],
    steps: [
      {
        id: "s1",
        type: "weighing",
        instruction: "Weigh all ingredients except chocolate.",
      },
      {
        id: "s2",
        type: "pasteurization",
        instruction: "Pasteurize at 85°C for 5 minutes.",
        targetTemperature: 85,
      },
      {
        id: "s3",
        type: "aging",
        instruction: "Cool and age 6 hours at 4°C.",
        targetTemperature: 4,
        durationMinutes: 360,
      },
      {
        id: "s4",
        type: "churning",
        instruction:
          "Churn base, then drizzle melted chocolate to form flakes.",
      },
    ],
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
    agingTimeHours: 4,
    ingredients: [
      { id: "1", name: "Water", percentage: 60, unit: "g", group: "liquids" },
      { id: "2", name: "Sucrose", percentage: 20, unit: "g", group: "sugars" },
      { id: "3", name: "Dextrose", percentage: 6, unit: "g", group: "sugars" },
      {
        id: "4",
        name: "Glucose Syrup",
        percentage: 6,
        unit: "g",
        group: "sugars",
      },
      {
        id: "5",
        name: "Lemon Juice",
        percentage: 7.5,
        unit: "g",
        group: "flavorings",
      },
      {
        id: "6",
        name: "Lemon Zest",
        percentage: 0.3,
        unit: "g",
        group: "flavorings",
      },
      {
        id: "7",
        name: "Stabilizer",
        percentage: 0.2,
        unit: "g",
        group: "stabilizers",
      },
    ],
    steps: [
      { id: "s1", type: "weighing", instruction: "Weigh all ingredients." },
      {
        id: "s2",
        type: "pasteurization",
        instruction: "Heat to 85°C briefly, then cool.",
        targetTemperature: 85,
      },
      {
        id: "s3",
        type: "aging",
        instruction: "Add lemon juice/zest, then rest 4 hours at 4°C.",
        targetTemperature: 4,
        durationMinutes: 240,
      },
      {
        id: "s4",
        type: "churning",
        instruction: "Churn until smooth and scoopable.",
      },
    ],
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
    agingTimeHours: 12,
    ingredients: [
      {
        id: "1",
        name: "Whole Milk",
        percentage: 55,
        unit: "g",
        group: "liquids",
      },
      {
        id: "2",
        name: "Cream 35%",
        percentage: 12,
        unit: "g",
        group: "liquids",
      },
      { id: "3", name: "Sucrose", percentage: 14, unit: "g", group: "sugars" },
      { id: "4", name: "Dextrose", percentage: 5, unit: "g", group: "sugars" },
      {
        id: "5",
        name: "Cocoa Powder",
        percentage: 6,
        unit: "g",
        group: "flavorings",
      },
      {
        id: "6",
        name: "Dark Chocolate 70%",
        percentage: 7.5,
        unit: "g",
        group: "flavorings",
      },
      {
        id: "7",
        name: "Stabilizer",
        percentage: 0.5,
        unit: "g",
        group: "stabilizers",
      },
    ],
    steps: [
      { id: "s1", type: "weighing", instruction: "Weigh all ingredients." },
      {
        id: "s2",
        type: "pasteurization",
        instruction: "Pasteurize at 85°C for 5 minutes.",
        targetTemperature: 85,
      },
      {
        id: "s3",
        type: "aging",
        instruction: "Cool and age 12 hours at 4°C.",
        targetTemperature: 4,
        durationMinutes: 720,
      },
      {
        id: "s4",
        type: "churning",
        instruction: "Churn until dense and creamy.",
      },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1593410974855-87ab9de04bb5?w=900&auto=format&fit=crop&q=60",
  },
];
export default MOCK_RECIPES;
