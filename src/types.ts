export interface FormValues {
  int: number;
  dex: number;
  luk: number;
  jobLevel: number;
  baseLevel: number;
  potionResearchLevel: number;
  fullChemicalProtectionLevel: number;
  specialPharmacyLevel: number;
  preparePotionLevel: number;
  instructionChangeLevel: number;
}

export interface SpecialPharmacyData {
  specificValue: number;
  maxPotions: number;
}

export type Skill = "special_pharmacy" | "potion_creation" | "mixed_cooking";

export interface ItemTypeData {
  name: string;
  itemRate?: number; // For Special Pharmacy and Mixed Cooking items
  potionRate?: number; // For Potion Creation items
  skill: Skill;
  book?: string;
  id: number;
  materials: Array<{
    name: string;
    quantity: number;
    id: number;
  }>;
}

export interface SimulationResult {
  creation: number;
  difficulty: number;
  difference: number;
  potionsCreated: number;
  successRate: string;
  skill: Skill;
}

export type Theme = "light" | "dark";
