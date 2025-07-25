import type { FormValues } from "../types";

const calculateMixedCookingCreation = (values: FormValues): number => {
  return (
    Math.floor(values.jobLevel / 4) +
    Math.floor(values.dex / 3) +
    Math.floor(values.luk / 2)
  );
};

export default calculateMixedCookingCreation;
