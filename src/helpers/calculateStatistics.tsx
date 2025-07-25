import type { SimulationResult } from "../types";

const calculateStatistics = (results: SimulationResult[]) => {
  const potionCounts: Record<number, number> = {};

  results.forEach((result) => {
    potionCounts[result.potionsCreated] =
      (potionCounts[result.potionsCreated] || 0) + 1;
  });

  const statistics = Object.entries(potionCounts).map(([potions, count]) => ({
    potions: parseInt(potions),
    count,
    percentage: ((count / results.length) * 100).toFixed(2),
  }));

  return statistics.sort((a, b) => b.potions - a.potions);
};

export default calculateStatistics;
