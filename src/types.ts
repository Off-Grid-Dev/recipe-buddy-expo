export type IngredientGroup =
  | "liquids"
  | "sugars"
  | "solids"
  | "stabilizers"
  | "flavorings";

export type Unit = "g" | "kg" | "ml" | "l";

export type RecipeCategory = "gelato" | "sorbetto" | "crema";

export type StepType =
  | "weighing"
  | "pasteurization"
  | "aging"
  | "churning"
  | "hardening";

export interface Ingredient {
  id: string;
  name: string;
  percentage: number;
  unit: Unit;
  group: IngredientGroup;
  notes?: string;
}

export interface RecipeStep {
  id: string;
  type: StepType;
  instruction: string;
  targetTemperature?: number;
  durationMinutes?: number;
}

export interface Recipe {
  id: string;
  name: string;
  category: RecipeCategory;
  description: string;
  baseWeightGrams: number;
  agingTimeHours: number;
  ingredients: Ingredient[];
  steps: RecipeStep[];
  imageUrl?: string;
}
