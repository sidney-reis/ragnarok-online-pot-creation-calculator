import type { SpecialPharmacyData, ItemTypeData } from "./types";

export const HEADER_HEIGHT = 64;

export const specialPharmacyTable: Record<number, SpecialPharmacyData> = {
  1: { specificValue: 600, maxPotions: 7 },
  2: { specificValue: 580, maxPotions: 8 },
  3: { specificValue: 560, maxPotions: 8 },
  4: { specificValue: 540, maxPotions: 9 },
  5: { specificValue: 520, maxPotions: 9 },
  6: { specificValue: 500, maxPotions: 10 },
  7: { specificValue: 480, maxPotions: 10 },
  8: { specificValue: 460, maxPotions: 11 },
  9: { specificValue: 440, maxPotions: 11 },
  10: { specificValue: 420, maxPotions: 12 },
};

export const colors = {
  success: {
    bg: "#f6ffed",
    border: "#b7eb8f",
    dot: "#52c41a",
  },
  warning: {
    bg: "#fffbe6",
    border: "#ffe58f",
    dot: "#faad14",
  },
  error: {
    bg: "#fff2f0",
    border: "#ffccc7",
    dot: "#ff4d4f",
  },
  neutral: {
    bg: "#fafafa",
    border: "#d9d9d9",
    dot: "#8c8c8c",
  },
};

export const itemTypes: Record<string, ItemTypeData> = {
  // Special Pharmacy items
  thorn_plant_seed: {
    name: "items.thornPlantSeed",
    itemRate: 30,
    icon: "https://irowiki.org/images/db/item/6210.png",
    skill: "special_pharmacy",
    book: "books.howToGrowPlantGenes",
    materials: [
      {
        name: "Prickly Fruit",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/576.png",
      },
    ],
  },
  blood_sucker_plant_seed: {
    name: "items.bloodSuckerPlantSeed",
    itemRate: 30,
    icon: "https://irowiki.org/images/db/item/6211.png",
    skill: "special_pharmacy",
    book: "books.howToGrowPlantGenes",
    materials: [
      {
        name: "materials.maneaterRoot",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/1033.png",
      },
    ],
  },
  bomb_mushroom_spore: {
    name: "items.bombMushroomSpore",
    itemRate: 15,
    icon: "https://irowiki.org/images/db/item/6212.png",
    skill: "special_pharmacy",
    book: "books.howToGrowPlantGenes",
    materials: [
      {
        name: "materials.mushroomSpore",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/921.png",
      },
      {
        name: "materials.poisonSpore",
        quantity: 5,
        icon: "https://irowiki.org/images/db/item/7033.png",
      },
      {
        name: "materials.gunPowder",
        quantity: 2,
        icon: "https://irowiki.org/images/db/item/6244.png",
      },
    ],
  },
  enriched_white_potionz: {
    name: "items.enrichedWhitePotionz",
    itemRate: 10,
    icon: "https://irowiki.org/images/db/item/12428.png",
    skill: "special_pharmacy",
    book: "books.howToMakeHighQualityPotion",
    materials: [
      {
        name: "materials.emptyTestTube",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/1092.png",
      },
      {
        name: "materials.whitePotion",
        quantity: 20,
        icon: "https://irowiki.org/images/db/item/504.png",
      },
      {
        name: "materials.whiteHerb",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/509.png",
      },
      {
        name: "materials.alcohol",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/970.png",
      },
    ],
  },
  vitata500: {
    name: "items.vitata500",
    itemRate: 20,
    icon: "https://irowiki.org/images/db/item/12436.png",
    skill: "special_pharmacy",
    book: "books.howToMakeHighQualityPotion",
    materials: [
      {
        name: "materials.emptyTestTube",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/1092.png",
      },
      {
        name: "materials.grape",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/514.png",
      },
      {
        name: "materials.honey",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/518.png",
      },
      {
        name: "materials.blueHerb",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/510.png",
      },
    ],
  },
  enrich_celermine_juice: {
    name: "items.enrichCelermineJuice",
    itemRate: 30,
    icon: "https://irowiki.org/images/db/item/12437.png",
    skill: "special_pharmacy",
    book: "books.howToMakeHighQualityPotion",
    materials: [
      {
        name: "materials.emptyTestTube",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/1092.png",
      },
      {
        name: "materials.concentrationPotion",
        quantity: 5,
        icon: "https://irowiki.org/images/db/item/645.png",
      },
      {
        name: "materials.awakeningPotion",
        quantity: 5,
        icon: "https://irowiki.org/images/db/item/656.png",
      },
      {
        name: "materials.spicySauce",
        quantity: 5,
        icon: "https://irowiki.org/images/db/item/7455.png",
      },
    ],
  },
  cure_free: {
    name: "items.cureFree",
    itemRate: 40,
    icon: "https://irowiki.org/images/db/item/12475.png",
    skill: "special_pharmacy",
    book: "books.howToMakeHighQualityPotion",
    materials: [
      {
        name: "materials.emptyTestTube",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/1092.png",
      },
      {
        name: "materials.panacea",
        quantity: 5,
        icon: "https://irowiki.org/images/db/item/525.png",
      },
      {
        name: "materials.greenHerb",
        quantity: 20,
        icon: "https://irowiki.org/images/db/item/511.png",
      },
      {
        name: "materials.mastelaFruit",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/522.png",
      },
      {
        name: "materials.yggdrasilLeaf",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/610.png",
      },
    ],
  },
  concentrated_red_syrup: {
    name: "items.concentratedRedSyrup",
    itemRate: 100,
    icon: "https://irowiki.org/images/db/item/1100003.png",
    skill: "special_pharmacy",
    book: "books.howToMakeHighQualityPotion",
    materials: [
      {
        name: "materials.emptyPotionBottle",
        quantity: 5,
        icon: "https://irowiki.org/images/db/item/1093.png",
      },
      {
        name: "materials.emptyBottle",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/713.png",
      },
      {
        name: "materials.redSyrup",
        quantity: 15,
        icon: "https://irowiki.org/images/db/item/11621.png",
      },
    ],
  },
  concentrated_blue_syrup: {
    name: "items.concentratedBlueSyrup",
    itemRate: 130,
    icon: "https://irowiki.org/images/db/item/1100004.png",
    skill: "special_pharmacy",
    book: "books.howToMakeHighQualityPotion",
    materials: [
      {
        name: "materials.emptyPotionBottle",
        quantity: 5,
        icon: "https://irowiki.org/images/db/item/1093.png",
      },
      {
        name: "materials.emptyBottle",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/713.png",
      },
      {
        name: "materials.blueSyrup",
        quantity: 15,
        icon: "https://irowiki.org/images/db/item/11624.png",
      },
    ],
  },
  concentrated_golden_syrup: {
    name: "items.concentratedGoldenSyrup",
    itemRate: 150,
    icon: "https://irowiki.org/images/db/item/1100005.png",
    skill: "special_pharmacy",
    book: "books.howToMakeHighQualityPotion",
    materials: [
      {
        name: "materials.emptyPotionBottle",
        quantity: 5,
        icon: "https://irowiki.org/images/db/item/1093.png",
      },
      {
        name: "materials.emptyBottle",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/713.png",
      },
      {
        name: "materials.whiteSyrup",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/11623.png",
      },
      {
        name: "materials.yellowSyrup",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/11622.png",
      },
    ],
  },
  red_herb_activator: {
    name: "items.redHerbActivator",
    itemRate: 100,
    icon: "https://irowiki.org/images/db/item/100232.png",
    skill: "special_pharmacy",
    book: "books.howToMakeHighQualityPotion",
    materials: [
      {
        name: "materials.emptyTestTube",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/1092.png",
      },
      {
        name: "materials.redHerb",
        quantity: 45,
        icon: "https://irowiki.org/images/db/item/507.png",
      },
      {
        name: "materials.yggdrasilSeed",
        quantity: 5,
        icon: "https://irowiki.org/images/db/item/608.png",
      },
    ],
  },
  blue_herb_activator: {
    name: "items.blueHerbActivator",
    itemRate: 100,
    icon: "https://irowiki.org/images/db/item/100233.png",
    skill: "special_pharmacy",
    book: "books.howToMakeHighQualityPotion",
    materials: [
      {
        name: "materials.emptyTestTube",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/1092.png",
      },
      {
        name: "materials.blueHerb",
        quantity: 15,
        icon: "https://irowiki.org/images/db/item/510.png",
      },
      {
        name: "materials.yggdrasilSeed",
        quantity: 5,
        icon: "https://irowiki.org/images/db/item/608.png",
      },
    ],
  },
  golden_x_potion: {
    name: "items.goldenXPotion",
    itemRate: 145,
    icon: "https://irowiki.org/images/db/item/100231.png",
    skill: "special_pharmacy",
    book: "books.howToMakeHighQualityPotion",
    materials: [
      {
        name: "materials.emptyTestTube",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/1092.png",
      },
      {
        name: "materials.yggdrasilBerry",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/607.png",
      },
      {
        name: "materials.gold",
        quantity: 5,
        icon: "https://irowiki.org/images/db/item/969.png",
      },
    ],
  },
  increase_hp_small: {
    name: "items.increaseHpSmall",
    itemRate: 10,
    icon: "https://irowiki.org/images/db/item/12422.png",
    skill: "special_pharmacy",
    book: "books.howToIncreaseStamina",
    materials: [
      {
        name: "materials.emptyBottle",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/713.png",
      },
      {
        name: "materials.monsterFeed",
        quantity: 5,
        icon: "https://irowiki.org/images/db/item/528.png",
      },
      {
        name: "materials.whiteHerb",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/509.png",
      },
      {
        name: "materials.spicySauce",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7455.png",
      },
    ],
  },
  increase_hp_medium: {
    name: "items.increaseHpMedium",
    itemRate: 20,
    icon: "https://irowiki.org/images/db/item/12423.png",
    skill: "special_pharmacy",
    book: "books.howToIncreaseStamina",
    materials: [
      {
        name: "materials.emptyBottle",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/713.png",
      },
      {
        name: "materials.whiteHerb",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/509.png",
      },
      {
        name: "materials.yellowHerb",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/508.png",
      },
      {
        name: "materials.spicySauce",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7455.png",
      },
    ],
  },
  increase_hp_large: {
    name: "items.increaseHpLarge",
    itemRate: 40,
    icon: "https://irowiki.org/images/db/item/12424.png",
    skill: "special_pharmacy",
    book: "books.howToIncreaseStamina",
    materials: [
      {
        name: "materials.emptyBottle",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/713.png",
      },
      {
        name: "materials.whiteHerb",
        quantity: 15,
        icon: "https://irowiki.org/images/db/item/509.png",
      },
      {
        name: "materials.mastelaFruit",
        quantity: 3,
        icon: "https://irowiki.org/images/db/item/522.png",
      },
      {
        name: "materials.holyWater",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/523.png",
      },
      {
        name: "materials.spicySauce",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7455.png",
      },
    ],
  },
  increase_sp_small: {
    name: "items.increaseSpSmall",
    itemRate: 10,
    icon: "https://irowiki.org/images/db/item/12425.png",
    skill: "special_pharmacy",
    book: "books.howToIncreaseVitality",
    materials: [
      {
        name: "materials.emptyBottle",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/713.png",
      },
      {
        name: "materials.lemon",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/568.png",
      },
      {
        name: "materials.grape",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/514.png",
      },
      {
        name: "materials.sweetSauce",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7453.png",
      },
    ],
  },
  increase_sp_medium: {
    name: "items.increaseSpMedium",
    itemRate: 15,
    icon: "https://irowiki.org/images/db/item/12426.png",
    skill: "special_pharmacy",
    book: "books.howToIncreaseVitality",
    materials: [
      {
        name: "materials.emptyBottle",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/713.png",
      },
      {
        name: "materials.honey",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/518.png",
      },
      {
        name: "materials.blueHerb",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/510.png",
      },
      {
        name: "materials.sweetSauce",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7453.png",
      },
    ],
  },
  increase_sp_large: {
    name: "items.increaseSpLarge",
    itemRate: 20,
    icon: "https://irowiki.org/images/db/item/12427.png",
    skill: "special_pharmacy",
    book: "books.howToIncreaseVitality",
    materials: [
      {
        name: "materials.emptyBottle",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/713.png",
      },
      {
        name: "materials.royalJelly",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/526.png",
      },
      {
        name: "materials.blueHerb",
        quantity: 15,
        icon: "https://irowiki.org/images/db/item/510.png",
      },
      {
        name: "materials.sweetSauce",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7453.png",
      },
    ],
  },
  // Potion Creation items
  red_potion: {
    name: "items.redPotion",
    potionRate: 20, // +15% ~ +25% average
    icon: "https://irowiki.org/images/db/item/501.png",
    skill: "potion_creation",
    book: "books.potionCreationGuide",
    materials: [
      {
        name: "materials.medicineBowl",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7134.png",
      },
      {
        name: "materials.emptyPotionBottle",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/1093.png",
      },
      {
        name: "materials.redHerb",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/507.png",
      },
    ],
  },
  yellow_potion: {
    name: "items.yellowPotion",
    potionRate: 20, // +15% ~ +25% average
    icon: "https://irowiki.org/images/db/item/503.png",
    skill: "potion_creation",
    book: "books.potionCreationGuide",
    materials: [
      {
        name: "materials.medicineBowl",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7134.png",
      },
      {
        name: "materials.emptyPotionBottle",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/1093.png",
      },
      {
        name: "materials.yellowHerb",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/508.png",
      },
    ],
  },
  white_potion: {
    name: "items.whitePotion",
    potionRate: 20, // +15% ~ +25% average
    icon: "https://irowiki.org/images/db/item/504.png",
    skill: "potion_creation",
    book: "books.potionCreationGuide",
    materials: [
      {
        name: "materials.medicineBowl",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7134.png",
      },
      {
        name: "materials.emptyPotionBottle",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/1093.png",
      },
      {
        name: "materials.whiteHerb",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/509.png",
      },
    ],
  },
  blue_potion: {
    name: "items.bluePotion",
    potionRate: -5,
    icon: "https://irowiki.org/images/db/item/505.png",
    skill: "potion_creation",
    book: "books.potionCreationGuide",
    materials: [
      {
        name: "materials.medicineBowl",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7134.png",
      },
      {
        name: "materials.emptyPotionBottle",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/1093.png",
      },
      {
        name: "materials.blueHerb",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/510.png",
      },
      {
        name: "materials.scell",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/911.png",
      },
    ],
  },
  anodyne: {
    name: "items.anodyne",
    potionRate: -5,
    icon: "https://irowiki.org/images/db/item/605.png",
    skill: "potion_creation",
    book: "books.potionCreationGuide",
    materials: [
      {
        name: "materials.medicineBowl",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7134.png",
      },
      {
        name: "materials.emptyBottle",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/713.png",
      },
      {
        name: "materials.alcohol",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/970.png",
      },
      {
        name: "materials.ment",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/708.png",
      },
    ],
  },
  aloevera: {
    name: "items.aloevera",
    potionRate: -5,
    icon: "https://irowiki.org/images/db/item/606.png",
    skill: "potion_creation",
    book: "books.potionCreationGuide",
    materials: [
      {
        name: "materials.medicineBowl",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7134.png",
      },
      {
        name: "materials.emptyBottle",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/713.png",
      },
      {
        name: "materials.honey",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/518.png",
      },
      {
        name: "materials.aloe",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/704.png",
      },
    ],
  },
  alcohol: {
    name: "items.alcohol",
    potionRate: 10, // +5% ~ +15% average
    icon: "https://irowiki.org/images/db/item/970.png",
    skill: "potion_creation",
    book: "books.alcoholCreationGuide",
    materials: [
      {
        name: "materials.medicineBowl",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7134.png",
      },
      {
        name: "materials.emptyTestTube",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/1092.png",
      },
      {
        name: "materials.emptyBottle",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/713.png",
      },
      {
        name: "materials.stem",
        quantity: 5,
        icon: "https://irowiki.org/images/db/item/905.png",
      },
      {
        name: "materials.poisonSpore",
        quantity: 5,
        icon: "https://irowiki.org/images/db/item/7033.png",
      },
    ],
  },
  embryo: {
    name: "items.embryo",
    potionRate: -5,
    icon: "https://irowiki.org/images/db/item/7142.png",
    skill: "potion_creation",
    book: "books.potionCreationGuide",
    materials: [
      {
        name: "materials.medicineBowl",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7134.png",
      },
      {
        name: "materials.morningDewOfYggdrasil",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7141.png",
      },
      {
        name: "materials.seedOfLife",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7140.png",
      },
      {
        name: "materials.glassTube",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7143.png",
      },
    ],
  },
  homunculus_tablet: {
    name: "items.homunculusTablet",
    potionRate: -5,
    icon: "https://irowiki.org/images/db/item/100371.png",
    skill: "potion_creation",
    book: "books.potionCreationGuide",
    materials: [
      {
        name: "materials.medicineBowl",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7134.png",
      },
      {
        name: "materials.yellowHerb",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/508.png",
      },
      {
        name: "materials.seedOfLife",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7140.png",
      },
      {
        name: "materials.emptyBottle",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/713.png",
      },
    ],
  },
  condensed_red_potion: {
    name: "items.condensedRedPotion",
    potionRate: -5,
    icon: "https://irowiki.org/images/db/item/545.png",
    skill: "potion_creation",
    book: "books.condensedPotionCreationGuide",
    materials: [
      {
        name: "materials.medicineBowl",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7134.png",
      },
      {
        name: "materials.emptyTestTube",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/1092.png",
      },
      {
        name: "materials.redPotion",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/501.png",
      },
      {
        name: "materials.cactusNeedle",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/952.png",
      },
    ],
  },
  condensed_yellow_potion: {
    name: "items.condensedYellowPotion",
    potionRate: -7, // -10% ~ -5% average
    icon: "https://irowiki.org/images/db/item/546.png",
    skill: "potion_creation",
    book: "books.condensedPotionCreationGuide",
    materials: [
      {
        name: "materials.medicineBowl",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7134.png",
      },
      {
        name: "materials.emptyTestTube",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/1092.png",
      },
      {
        name: "materials.yellowPotion",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/503.png",
      },
      {
        name: "materials.moleWhiskers",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/1017.png",
      },
    ],
  },
  condensed_white_potion: {
    name: "items.condensedWhitePotion",
    potionRate: -10, // -15% ~ -5% average
    icon: "https://irowiki.org/images/db/item/547.png",
    skill: "potion_creation",
    book: "books.condensedPotionCreationGuide",
    materials: [
      {
        name: "materials.medicineBowl",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7134.png",
      },
      {
        name: "materials.emptyTestTube",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/1092.png",
      },
      {
        name: "materials.whitePotion",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/504.png",
      },
      {
        name: "materials.witchStarsand",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/1061.png",
      },
    ],
  },
  acid_bottle: {
    name: "items.acidBottle",
    potionRate: 0, // -5% ~ +5% average
    icon: "https://irowiki.org/images/db/item/7136.png",
    skill: "potion_creation",
    book: "books.acidBottleCreationGuide",
    materials: [
      {
        name: "materials.medicineBowl",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7134.png",
      },
      {
        name: "materials.emptyBottle",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/713.png",
      },
      {
        name: "materials.immortalHeart",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/929.png",
      },
    ],
  },
  bottle_grenade: {
    name: "items.bottleGrenade",
    potionRate: 0, // -5% ~ +5% average
    icon: "https://irowiki.org/images/db/item/7135.png",
    skill: "potion_creation",
    book: "books.bottleGrenadeCreationGuide",
    materials: [
      {
        name: "materials.medicineBowl",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7134.png",
      },
      {
        name: "materials.emptyBottle",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/713.png",
      },
      {
        name: "materials.fabric",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/1059.png",
      },
      {
        name: "materials.alcohol",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/970.png",
      },
    ],
  },
  marine_sphere_bottle: {
    name: "items.marineSphereBottle",
    potionRate: 0, // -5% ~ +5% average
    icon: "https://irowiki.org/images/db/item/7138.png",
    skill: "potion_creation",
    book: "books.marineSphereCreationGuide",
    materials: [
      {
        name: "materials.medicineBowl",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7134.png",
      },
      {
        name: "materials.emptyBottle",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/713.png",
      },
      {
        name: "materials.tendon",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/1050.png",
      },
      {
        name: "materials.detonator",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/1051.png",
      },
    ],
  },
  plant_bottle: {
    name: "items.plantBottle",
    potionRate: 0, // -5% ~ +5% average
    icon: "https://irowiki.org/images/db/item/7137.png",
    skill: "potion_creation",
    book: "books.plantBottleCreationGuide",
    materials: [
      {
        name: "materials.medicineBowl",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7134.png",
      },
      {
        name: "materials.emptyBottle",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/713.png",
      },
      {
        name: "materials.maneaterBlossom",
        quantity: 2,
        icon: "https://irowiki.org/images/db/item/1032.png",
      },
    ],
  },
  glistening_coat: {
    name: "items.glisteningCoat",
    potionRate: -10, // -15% ~ -5% average
    icon: "https://irowiki.org/images/db/item/7139.png",
    skill: "potion_creation",
    book: "books.glisteningCoatCreationGuide",
    materials: [
      {
        name: "materials.medicineBowl",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7134.png",
      },
      {
        name: "materials.emptyBottle",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/713.png",
      },
      {
        name: "materials.mermaidHeart",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/950.png",
      },
      {
        name: "materials.zenorcFang",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/1044.png",
      },
      {
        name: "materials.alcohol",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/970.png",
      },
    ],
  },
  coldproof_potion: {
    name: "items.coldproofPotion",
    potionRate: -5,
    icon: "https://irowiki.org/images/db/item/12119.png",
    skill: "potion_creation",
    book: "books.elementalPotionCreationGuide",
    materials: [
      {
        name: "materials.medicineBowl",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7134.png",
      },
      {
        name: "materials.emptyPotionBottle",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/1093.png",
      },
      {
        name: "materials.blueGemstone",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/717.png",
      },
      {
        name: "materials.mermaidHeart",
        quantity: 3,
        icon: "https://irowiki.org/images/db/item/950.png",
      },
    ],
  },
  earthproof_potion: {
    name: "items.earthproofPotion",
    potionRate: -5,
    icon: "https://irowiki.org/images/db/item/12120.png",
    skill: "potion_creation",
    book: "books.elementalPotionCreationGuide",
    materials: [
      {
        name: "materials.medicineBowl",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7134.png",
      },
      {
        name: "materials.emptyPotionBottle",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/1093.png",
      },
      {
        name: "materials.yellowGemstone",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/715.png",
      },
      {
        name: "materials.largeJellopy",
        quantity: 2,
        icon: "https://irowiki.org/images/db/item/7126.png",
      },
    ],
  },
  thunderproof_potion: {
    name: "items.thunderproofPotion",
    potionRate: -5,
    icon: "https://irowiki.org/images/db/item/12121.png",
    skill: "potion_creation",
    book: "books.elementalPotionCreationGuide",
    materials: [
      {
        name: "materials.medicineBowl",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7134.png",
      },
      {
        name: "materials.emptyPotionBottle",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/1093.png",
      },
      {
        name: "materials.blueGemstone",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/717.png",
      },
      {
        name: "materials.mothDust",
        quantity: 3,
        icon: "https://irowiki.org/images/db/item/1057.png",
      },
    ],
  },
  fireproof_potion: {
    name: "items.fireproofPotion",
    potionRate: -5,
    icon: "https://irowiki.org/images/db/item/12118.png",
    skill: "potion_creation",
    book: "books.elementalPotionCreationGuide",
    materials: [
      {
        name: "materials.medicineBowl",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7134.png",
      },
      {
        name: "materials.emptyPotionBottle",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/1093.png",
      },
      {
        name: "materials.redGemstone",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/716.png",
      },
      {
        name: "materials.frill",
        quantity: 2,
        icon: "https://irowiki.org/images/db/item/1012.png",
      },
    ],
  },
  // Mixed Cooking items
  savage_bbq: {
    name: "items.savageBbq",
    itemRate: 15,
    icon: "https://irowiki.org/images/db/item/12429.png",
    skill: "mixed_cooking",
    book: "books.cookingBookMixCooking",
    materials: [
      {
        name: "materials.melangePot",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/6248.png",
      },
      {
        name: "materials.cookingSkewer",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/6250.png",
      },
      {
        name: "materials.blackCharcoal",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/6251.png",
      },
      {
        name: "materials.savageMeat",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/6249.png",
      },
    ],
  },
  warg_blood_cocktail: {
    name: "items.wargBloodCocktail",
    itemRate: 15,
    icon: "https://irowiki.org/images/db/item/12430.png",
    skill: "mixed_cooking",
    book: "books.cookingBookMixCooking",
    materials: [
      {
        name: "materials.melangePot",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/6248.png",
      },
      {
        name: "materials.coldIce",
        quantity: 2,
        icon: "https://irowiki.org/images/db/item/6253.png",
      },
      {
        name: "materials.bloodOfWolf",
        quantity: 3,
        icon: "https://irowiki.org/images/db/item/6252.png",
      },
    ],
  },
  minor_brisket: {
    name: "items.minorBrisket",
    itemRate: 15,
    icon: "https://irowiki.org/images/db/item/12431.png",
    skill: "mixed_cooking",
    book: "books.cookingBookMixCooking",
    materials: [
      {
        name: "materials.melangePot",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/6248.png",
      },
      {
        name: "materials.largeCookpot",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/6255.png",
      },
      {
        name: "materials.beefHead",
        quantity: 2,
        icon: "https://irowiki.org/images/db/item/6254.png",
      },
    ],
  },
  siroma_icetea: {
    name: "items.siromaIcetea",
    itemRate: 15,
    icon: "https://irowiki.org/images/db/item/12432.png",
    skill: "mixed_cooking",
    book: "books.cookingBookMixCooking",
    materials: [
      {
        name: "materials.melangePot",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/6248.png",
      },
      {
        name: "materials.comodoTropicalFruit",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/6258.png",
      },
      {
        name: "materials.iceCrystal",
        quantity: 2,
        icon: "https://irowiki.org/images/db/item/6257.png",
      },
      {
        name: "materials.icePiece",
        quantity: 3,
        icon: "https://irowiki.org/images/db/item/6256.png",
      },
    ],
  },
  drosera_herb_stew: {
    name: "items.droseraHerbStew",
    itemRate: 15,
    icon: "https://irowiki.org/images/db/item/12433.png",
    skill: "mixed_cooking",
    book: "books.cookingBookMixCooking",
    materials: [
      {
        name: "materials.melangePot",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/6248.png",
      },
      {
        name: "materials.largeCookpot",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/6255.png",
      },
      {
        name: "materials.redHerb",
        quantity: 3,
        icon: "https://irowiki.org/images/db/item/507.png",
      },
      {
        name: "materials.whiteHerb",
        quantity: 3,
        icon: "https://irowiki.org/images/db/item/509.png",
      },
      {
        name: "materials.blueHerb",
        quantity: 3,
        icon: "https://irowiki.org/images/db/item/510.png",
      },
      {
        name: "materials.droseraTenatcle",
        quantity: 3,
        icon: "https://irowiki.org/images/db/item/6259.png",
      },
    ],
  },
  petite_tail_noodles: {
    name: "items.petiteTailNoodles",
    itemRate: 15,
    icon: "https://irowiki.org/images/db/item/12434.png",
    skill: "mixed_cooking",
    book: "books.cookingBookMixCooking",
    materials: [
      {
        name: "materials.melangePot",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/6248.png",
      },
      {
        name: "materials.coolGravy",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/6262.png",
      },
      {
        name: "materials.fineNoodle",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/6261.png",
      },
      {
        name: "materials.petiteTail",
        quantity: 2,
        icon: "https://irowiki.org/images/db/item/6260.png",
      },
    ],
  },
};

export const FORM_STORAGE_KEY = "ragnarok-potion-simulator-FORM_STORAGE_KEY";
export const SELECTED_ITEM_STORAGE_KEY =
  "ragnarok-potion-simulator-SELECTED_ITEM_STORAGE_KEY";
export const LANGUAGE_STORAGE_KEY =
  "ragnarok-potion-simulator-LANGUAGE_STORAGE_KEY";
