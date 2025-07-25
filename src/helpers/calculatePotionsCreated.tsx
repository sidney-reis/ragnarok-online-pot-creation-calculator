const calculatePotionsCreated = (
  difference: number,
  maxPotions: number
): number => {
  if (difference >= 400) {
    return maxPotions;
  } else if (difference >= 300) {
    return maxPotions - 3;
  } else if (difference >= 100) {
    return maxPotions - 4;
  } else if (difference >= 1) {
    return maxPotions - 5;
  } else {
    return maxPotions - 6;
  }
};

export default calculatePotionsCreated;
