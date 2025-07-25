const calculateMixedCookingDishes = (difference: number): number => {
  if (difference >= 30) {
    return 11; // Average of 10-12 dishes
  } else if (difference >= 10) {
    return 10; // 10 dishes
  } else if (difference === -10) {
    return 8; // 8 dishes
  } else if (difference <= -30) {
    return 5; // 5 dishes
  } else if (difference <= -50) {
    return 0; // cooking fails
  } else {
    return 8; // default case for other negative differences
  }
};

export default calculateMixedCookingDishes;
