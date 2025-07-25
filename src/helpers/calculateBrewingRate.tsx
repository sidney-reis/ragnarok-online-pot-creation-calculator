import type { FormValues } from "../types";

const calculateBrewingRate = (values: FormValues): number => {
  const rate =
    values.preparePotionLevel * 3 +
    values.potionResearchLevel +
    values.instructionChangeLevel +
    values.jobLevel * 0.2 +
    values.dex * 0.1 +
    values.luk * 0.1 +
    values.int * 0.05;
  return Math.min(100, Math.max(0, rate)); // Cap between 0-100%
};

export default calculateBrewingRate;
