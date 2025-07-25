import { itemTypes, specialPharmacyTable } from "../constants";
import type { FormValues, SimulationResult } from "../types";

const calculateResults = (
  values: FormValues,
  selectedItem: string
): SimulationResult[] => {
  const itemData = itemTypes[selectedItem];
  const results: SimulationResult[] = [];

  if (itemData.skill === "special_pharmacy") {
    // Special Pharmacy precise calculation
    const pharmacyData = specialPharmacyTable[values.specialPharmacyLevel];
    const difficulty = pharmacyData.specificValue + (itemData.itemRate || 0);
    const baseCreation =
      values.int +
      Math.floor(values.dex / 2) +
      values.luk +
      values.jobLevel +
      (values.baseLevel - 100) +
      values.potionResearchLevel * 5;

    // Calculate all possible outcomes based on random ranges
    // Random bonus: 30-150 (121 possible values)
    // FCP bonus: level * (4-10) (7 possible values per level)
    const fcpLevel = values.fullChemicalProtectionLevel;
    const outcomes: Record<number, number> = {};

    for (let randomBonus = 30; randomBonus <= 150; randomBonus++) {
      for (let fcpMultiplier = 4; fcpMultiplier <= 10; fcpMultiplier++) {
        const fcpBonus = fcpLevel * fcpMultiplier;
        const totalCreation = baseCreation + randomBonus + fcpBonus;
        const difference = totalCreation - difficulty;
        const { maxPotions } = pharmacyData;
        let potionsCreated = maxPotions - 6;

        if (difference >= 400) {
          potionsCreated = maxPotions;
        } else if (difference >= 300) {
          potionsCreated = maxPotions - 3;
        } else if (difference >= 100) {
          potionsCreated = maxPotions - 4;
        } else if (difference >= 1) {
          potionsCreated = maxPotions - 5;
        }

        outcomes[potionsCreated] = (outcomes[potionsCreated] || 0) + 1;
      }
    }

    // Convert to results with precise percentages
    const totalCombinations = 121 * 7; // 847 total combinations
    Object.entries(outcomes).forEach(([potions, count]) => {
      const percentage = (count / totalCombinations) * 100;
      for (let i = 0; i < Math.round(percentage * 100); i++) {
        results.push({
          creation: baseCreation + 90, // Average creation value for display
          difficulty,
          difference: baseCreation + 90 - difficulty,
          potionsCreated: parseInt(potions),
          successRate: `${percentage.toFixed(2)}%`,
          skill: itemData.skill,
        });
      }
    });
  } else if (itemData.skill === "potion_creation") {
    const rate =
      values.preparePotionLevel * 3 +
      values.potionResearchLevel +
      values.instructionChangeLevel +
      values.jobLevel * 0.2 +
      values.dex * 0.1 +
      values.luk * 0.1 +
      values.int * 0.05;

    const brewingRate =
      Math.min(100, Math.max(0, rate)) + (itemData.potionRate || 0);

    const finalRate = Math.min(100, Math.max(0, brewingRate));

    // Create results based on exact success rate
    const successCount = Math.round(finalRate);
    const failureCount = 100 - successCount;

    for (let i = 0; i < successCount; i++) {
      results.push({
        creation: finalRate,
        difficulty: 0,
        difference: finalRate,
        potionsCreated: 1,
        successRate: `${finalRate.toFixed(1)}%`,
        skill: itemData.skill,
      });
    }

    for (let i = 0; i < failureCount; i++) {
      results.push({
        creation: finalRate,
        difficulty: 0,
        difference: finalRate,
        potionsCreated: 0,
        successRate: `${finalRate.toFixed(1)}%`,
        skill: itemData.skill,
      });
    }
  } else {
    const creation =
      Math.floor(values.jobLevel / 4) +
      Math.floor(values.dex / 3) +
      Math.floor(values.luk / 2);

    const itemRate = itemData.itemRate || 0;

    // Calculate outcomes for difficulty range 30-150 + itemRate
    const outcomes: Record<number, number> = {};

    for (let baseDifficulty = 30; baseDifficulty <= 150; baseDifficulty++) {
      const totalDifficulty = baseDifficulty + itemRate;
      const difference = creation - totalDifficulty;
      let dishesCreated = 8;

      if (difference >= 30) {
        dishesCreated = 11; // Average of 10-12 dishes
      } else if (difference >= 10) {
        dishesCreated = 10;
      } else if (difference === -10) {
        dishesCreated = 8;
      } else if (difference <= -30) {
        dishesCreated = 5;
      } else if (difference <= -50) {
        dishesCreated = 0; // cooking fails
      }

      outcomes[dishesCreated] = (outcomes[dishesCreated] || 0) + 1;
    }

    // Convert to results with precise percentages
    const totalCombinations = 121; // 121 possible difficulty values
    Object.entries(outcomes).forEach(([dishes, count]) => {
      const percentage = (count / totalCombinations) * 100;
      for (let i = 0; i < Math.round(percentage * 100); i++) {
        results.push({
          creation,
          difficulty: 90 + itemRate, // Average difficulty for display
          difference: creation - (90 + itemRate),
          potionsCreated: parseInt(dishes),
          successRate: `${percentage.toFixed(2)}%`,
          skill: itemData.skill,
        });
      }
    });
  }

  return results;
};

export default calculateResults;
