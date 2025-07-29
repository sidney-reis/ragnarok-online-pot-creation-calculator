import type { SpecialPharmacyData, ItemTypeData } from "./types";

export const HEADER_HEIGHT = 64;

/** Magic number to break the layout. No science here, just the number that felt good. */
export const SMALL_WINDOW_WIDTH = 1120;
export const VERY_SMALL_WINDOW_WIDTH = 615;

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
  light: {
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
  },
  dark: {
    success: {
      bg: "#162312",
      border: "#274916",
      dot: "#52c41a",
    },
    warning: {
      bg: "#2b2611",
      border: "#594214",
      dot: "#faad14",
    },
    error: {
      bg: "#2a1215",
      border: "#58181c",
      dot: "#ff4d4f",
    },
    neutral: {
      bg: "#262626",
      border: "#424242",
      dot: "#8c8c8c",
    },
  },
};

export const ITEM_IMAGE_URL = "https://irowiki.org/images/db/item";

export const itemTypes: Record<string, ItemTypeData> = {
  // Special Pharmacy items
  thorn_plant_seed: {
    name: "items.thornPlantSeed",
    itemRate: 30,
    id: 6210,
    skill: "special_pharmacy",
    book: "books.howToGrowPlantGenes",
    materials: [
      {
        name: "Prickly Fruit",
        quantity: 10,
        id: 576,
      },
    ],
  },
  blood_sucker_plant_seed: {
    name: "items.bloodSuckerPlantSeed",
    itemRate: 30,
    id: 6211,
    skill: "special_pharmacy",
    book: "books.howToGrowPlantGenes",
    materials: [
      {
        name: "materials.maneaterRoot",
        quantity: 10,
        id: 1033,
      },
    ],
  },
  bomb_mushroom_spore: {
    name: "items.bombMushroomSpore",
    itemRate: 15,
    id: 6212,
    skill: "special_pharmacy",
    book: "books.howToGrowPlantGenes",
    materials: [
      {
        name: "materials.mushroomSpore",
        quantity: 10,
        id: 921,
      },
      {
        name: "materials.poisonSpore",
        quantity: 5,
        id: 7033,
      },
      {
        name: "materials.gunPowder",
        quantity: 2,
        id: 6244,
      },
    ],
  },
  enriched_white_potionz: {
    name: "items.enrichedWhitePotionz",
    itemRate: 10,
    id: 12428,
    skill: "special_pharmacy",
    book: "books.howToMakeHighQualityPotion",
    materials: [
      {
        name: "materials.emptyTestTube",
        quantity: 10,
        id: 1092,
      },
      {
        name: "materials.whitePotion",
        quantity: 20,
        id: 504,
      },
      {
        name: "materials.whiteHerb",
        quantity: 10,
        id: 509,
      },
      {
        name: "materials.alcohol",
        quantity: 1,
        id: 970,
      },
    ],
  },
  vitata500: {
    name: "items.vitata500",
    itemRate: 20,
    id: 12436,
    skill: "special_pharmacy",
    book: "books.howToMakeHighQualityPotion",
    materials: [
      {
        name: "materials.emptyTestTube",
        quantity: 10,
        id: 1092,
      },
      {
        name: "materials.grape",
        quantity: 10,
        id: 514,
      },
      {
        name: "materials.honey",
        quantity: 10,
        id: 518,
      },
      {
        name: "materials.blueHerb",
        quantity: 10,
        id: 510,
      },
    ],
  },
  enrich_celermine_juice: {
    name: "items.enrichCelermineJuice",
    itemRate: 30,
    id: 12437,
    skill: "special_pharmacy",
    book: "books.howToMakeHighQualityPotion",
    materials: [
      {
        name: "materials.emptyTestTube",
        quantity: 10,
        id: 1092,
      },
      {
        name: "materials.concentrationPotion",
        quantity: 5,
        id: 645,
      },
      {
        name: "materials.awakeningPotion",
        quantity: 5,
        id: 656,
      },
      {
        name: "materials.spicySauce",
        quantity: 5,
        id: 7455,
      },
    ],
  },
  cure_free: {
    name: "items.cureFree",
    itemRate: 40,
    id: 12475,
    skill: "special_pharmacy",
    book: "books.howToMakeHighQualityPotion",
    materials: [
      {
        name: "materials.emptyTestTube",
        quantity: 10,
        id: 1092,
      },
      {
        name: "materials.panacea",
        quantity: 5,
        id: 525,
      },
      {
        name: "materials.greenHerb",
        quantity: 20,
        id: 511,
      },
      {
        name: "materials.mastelaFruit",
        quantity: 1,
        id: 522,
      },
      {
        name: "materials.yggdrasilLeaf",
        quantity: 1,
        id: 610,
      },
    ],
  },
  concentrated_red_syrup: {
    name: "items.concentratedRedSyrup",
    itemRate: 100,
    id: 1100003,
    skill: "special_pharmacy",
    book: "books.howToMakeHighQualityPotion",
    materials: [
      {
        name: "materials.emptyPotionBottle",
        quantity: 5,
        id: 1093,
      },
      {
        name: "materials.emptyBottle",
        quantity: 10,
        id: 713,
      },
      {
        name: "materials.redSyrup",
        quantity: 15,
        id: 11621,
      },
    ],
  },
  concentrated_blue_syrup: {
    name: "items.concentratedBlueSyrup",
    itemRate: 130,
    id: 1100004,
    skill: "special_pharmacy",
    book: "books.howToMakeHighQualityPotion",
    materials: [
      {
        name: "materials.emptyPotionBottle",
        quantity: 5,
        id: 1093,
      },
      {
        name: "materials.emptyBottle",
        quantity: 10,
        id: 713,
      },
      {
        name: "materials.blueSyrup",
        quantity: 15,
        id: 11624,
      },
    ],
  },
  concentrated_golden_syrup: {
    name: "items.concentratedGoldenSyrup",
    itemRate: 150,
    id: 1100005,
    skill: "special_pharmacy",
    book: "books.howToMakeHighQualityPotion",
    materials: [
      {
        name: "materials.emptyPotionBottle",
        quantity: 5,
        id: 1093,
      },
      {
        name: "materials.emptyBottle",
        quantity: 10,
        id: 713,
      },
      {
        name: "materials.whiteSyrup",
        quantity: 10,
        id: 11623,
      },
      {
        name: "materials.yellowSyrup",
        quantity: 10,
        id: 11622,
      },
    ],
  },
  red_herb_activator: {
    name: "items.redHerbActivator",
    itemRate: 100,
    id: 100232,
    skill: "special_pharmacy",
    book: "books.howToMakeHighQualityPotion",
    materials: [
      {
        name: "materials.emptyTestTube",
        quantity: 10,
        id: 1092,
      },
      {
        name: "materials.redHerb",
        quantity: 45,
        id: 507,
      },
      {
        name: "materials.yggdrasilSeed",
        quantity: 5,
        id: 608,
      },
    ],
  },
  blue_herb_activator: {
    name: "items.blueHerbActivator",
    itemRate: 100,
    id: 100233,
    skill: "special_pharmacy",
    book: "books.howToMakeHighQualityPotion",
    materials: [
      {
        name: "materials.emptyTestTube",
        quantity: 10,
        id: 1092,
      },
      {
        name: "materials.blueHerb",
        quantity: 15,
        id: 510,
      },
      {
        name: "materials.yggdrasilSeed",
        quantity: 5,
        id: 608,
      },
    ],
  },
  golden_x_potion: {
    name: "items.goldenXPotion",
    itemRate: 145,
    id: 100231,
    skill: "special_pharmacy",
    book: "books.howToMakeHighQualityPotion",
    materials: [
      {
        name: "materials.emptyTestTube",
        quantity: 10,
        id: 1092,
      },
      {
        name: "materials.yggdrasilBerry",
        quantity: 10,
        id: 607,
      },
      {
        name: "materials.gold",
        quantity: 5,
        id: 969,
      },
    ],
  },
  increase_hp_small: {
    name: "items.increaseHpSmall",
    itemRate: 10,
    id: 12422,
    skill: "special_pharmacy",
    book: "books.howToIncreaseStamina",
    materials: [
      {
        name: "materials.emptyBottle",
        quantity: 10,
        id: 713,
      },
      {
        name: "materials.monsterFeed",
        quantity: 5,
        id: 528,
      },
      {
        name: "materials.whiteHerb",
        quantity: 10,
        id: 509,
      },
      {
        name: "materials.spicySauce",
        quantity: 1,
        id: 7455,
      },
    ],
  },
  increase_hp_medium: {
    name: "items.increaseHpMedium",
    itemRate: 20,
    id: 12423,
    skill: "special_pharmacy",
    book: "books.howToIncreaseStamina",
    materials: [
      {
        name: "materials.emptyBottle",
        quantity: 10,
        id: 713,
      },
      {
        name: "materials.whiteHerb",
        quantity: 10,
        id: 509,
      },
      {
        name: "materials.yellowHerb",
        quantity: 10,
        id: 508,
      },
      {
        name: "materials.spicySauce",
        quantity: 1,
        id: 7455,
      },
    ],
  },
  increase_hp_large: {
    name: "items.increaseHpLarge",
    itemRate: 40,
    id: 12424,
    skill: "special_pharmacy",
    book: "books.howToIncreaseStamina",
    materials: [
      {
        name: "materials.emptyBottle",
        quantity: 10,
        id: 713,
      },
      {
        name: "materials.whiteHerb",
        quantity: 15,
        id: 509,
      },
      {
        name: "materials.mastelaFruit",
        quantity: 3,
        id: 522,
      },
      {
        name: "materials.holyWater",
        quantity: 1,
        id: 523,
      },
      {
        name: "materials.spicySauce",
        quantity: 1,
        id: 7455,
      },
    ],
  },
  increase_sp_small: {
    name: "items.increaseSpSmall",
    itemRate: 10,
    id: 12425,
    skill: "special_pharmacy",
    book: "books.howToIncreaseVitality",
    materials: [
      {
        name: "materials.emptyBottle",
        quantity: 10,
        id: 713,
      },
      {
        name: "materials.lemon",
        quantity: 10,
        id: 568,
      },
      {
        name: "materials.grape",
        quantity: 10,
        id: 514,
      },
      {
        name: "materials.sweetSauce",
        quantity: 1,
        id: 7453,
      },
    ],
  },
  increase_sp_medium: {
    name: "items.increaseSpMedium",
    itemRate: 15,
    id: 12426,
    skill: "special_pharmacy",
    book: "books.howToIncreaseVitality",
    materials: [
      {
        name: "materials.emptyBottle",
        quantity: 10,
        id: 713,
      },
      {
        name: "materials.honey",
        quantity: 10,
        id: 518,
      },
      {
        name: "materials.blueHerb",
        quantity: 10,
        id: 510,
      },
      {
        name: "materials.sweetSauce",
        quantity: 1,
        id: 7453,
      },
    ],
  },
  increase_sp_large: {
    name: "items.increaseSpLarge",
    itemRate: 20,
    id: 12427,
    skill: "special_pharmacy",
    book: "books.howToIncreaseVitality",
    materials: [
      {
        name: "materials.emptyBottle",
        quantity: 10,
        id: 713,
      },
      {
        name: "materials.royalJelly",
        quantity: 10,
        id: 526,
      },
      {
        name: "materials.blueHerb",
        quantity: 15,
        id: 510,
      },
      {
        name: "materials.sweetSauce",
        quantity: 1,
        id: 7453,
      },
    ],
  },
  // Potion Creation items
  red_potion: {
    name: "items.redPotion",
    potionRate: 20, // +15% ~ +25% average
    id: 501,
    skill: "potion_creation",
    book: "books.potionCreationGuide",
    materials: [
      {
        name: "materials.medicineBowl",
        quantity: 1,
        id: 7134,
      },
      {
        name: "materials.emptyPotionBottle",
        quantity: 1,
        id: 1093,
      },
      {
        name: "materials.redHerb",
        quantity: 1,
        id: 507,
      },
    ],
  },
  yellow_potion: {
    name: "items.yellowPotion",
    potionRate: 20, // +15% ~ +25% average
    id: 503,
    skill: "potion_creation",
    book: "books.potionCreationGuide",
    materials: [
      {
        name: "materials.medicineBowl",
        quantity: 1,
        id: 7134,
      },
      {
        name: "materials.emptyPotionBottle",
        quantity: 1,
        id: 1093,
      },
      {
        name: "materials.yellowHerb",
        quantity: 1,
        id: 508,
      },
    ],
  },
  white_potion: {
    name: "items.whitePotion",
    potionRate: 20, // +15% ~ +25% average
    id: 504,
    skill: "potion_creation",
    book: "books.potionCreationGuide",
    materials: [
      {
        name: "materials.medicineBowl",
        quantity: 1,
        id: 7134,
      },
      {
        name: "materials.emptyPotionBottle",
        quantity: 1,
        id: 1093,
      },
      {
        name: "materials.whiteHerb",
        quantity: 1,
        id: 509,
      },
    ],
  },
  blue_potion: {
    name: "items.bluePotion",
    potionRate: -5,
    id: 505,
    skill: "potion_creation",
    book: "books.potionCreationGuide",
    materials: [
      {
        name: "materials.medicineBowl",
        quantity: 1,
        id: 7134,
      },
      {
        name: "materials.emptyPotionBottle",
        quantity: 1,
        id: 1093,
      },
      {
        name: "materials.blueHerb",
        quantity: 1,
        id: 510,
      },
      {
        name: "materials.scell",
        quantity: 1,
        id: 911,
      },
    ],
  },
  anodyne: {
    name: "items.anodyne",
    potionRate: -5,
    id: 605,
    skill: "potion_creation",
    book: "books.potionCreationGuide",
    materials: [
      {
        name: "materials.medicineBowl",
        quantity: 1,
        id: 7134,
      },
      {
        name: "materials.emptyBottle",
        quantity: 1,
        id: 713,
      },
      {
        name: "materials.alcohol",
        quantity: 1,
        id: 970,
      },
      {
        name: "materials.ment",
        quantity: 1,
        id: 708,
      },
    ],
  },
  aloevera: {
    name: "items.aloevera",
    potionRate: -5,
    id: 606,
    skill: "potion_creation",
    book: "books.potionCreationGuide",
    materials: [
      {
        name: "materials.medicineBowl",
        quantity: 1,
        id: 7134,
      },
      {
        name: "materials.emptyBottle",
        quantity: 1,
        id: 713,
      },
      {
        name: "materials.honey",
        quantity: 1,
        id: 518,
      },
      {
        name: "materials.aloe",
        quantity: 1,
        id: 704,
      },
    ],
  },
  alcohol: {
    name: "items.alcohol",
    potionRate: 10, // +5% ~ +15% average
    id: 970,
    skill: "potion_creation",
    book: "books.alcoholCreationGuide",
    materials: [
      {
        name: "materials.medicineBowl",
        quantity: 1,
        id: 7134,
      },
      {
        name: "materials.emptyTestTube",
        quantity: 1,
        id: 1092,
      },
      {
        name: "materials.emptyBottle",
        quantity: 1,
        id: 713,
      },
      {
        name: "materials.stem",
        quantity: 5,
        id: 905,
      },
      {
        name: "materials.poisonSpore",
        quantity: 5,
        id: 7033,
      },
    ],
  },
  embryo: {
    name: "items.embryo",
    potionRate: -5,
    id: 7142,
    skill: "potion_creation",
    book: "books.potionCreationGuide",
    materials: [
      {
        name: "materials.medicineBowl",
        quantity: 1,
        id: 7134,
      },
      {
        name: "materials.morningDewOfYggdrasil",
        quantity: 1,
        id: 7141,
      },
      {
        name: "materials.seedOfLife",
        quantity: 1,
        id: 7140,
      },
      {
        name: "materials.glassTube",
        quantity: 1,
        id: 7143,
      },
    ],
  },
  homunculus_tablet: {
    name: "items.homunculusTablet",
    potionRate: -5,
    id: 100371,
    skill: "potion_creation",
    book: "books.potionCreationGuide",
    materials: [
      {
        name: "materials.medicineBowl",
        quantity: 1,
        id: 7134,
      },
      {
        name: "materials.yellowHerb",
        quantity: 1,
        id: 508,
      },
      {
        name: "materials.seedOfLife",
        quantity: 1,
        id: 7140,
      },
      {
        name: "materials.emptyBottle",
        quantity: 1,
        id: 713,
      },
    ],
  },
  condensed_red_potion: {
    name: "items.condensedRedPotion",
    potionRate: -5,
    id: 545,
    skill: "potion_creation",
    book: "books.condensedPotionCreationGuide",
    materials: [
      {
        name: "materials.medicineBowl",
        quantity: 1,
        id: 7134,
      },
      {
        name: "materials.emptyTestTube",
        quantity: 1,
        id: 1092,
      },
      {
        name: "materials.redPotion",
        quantity: 1,
        id: 501,
      },
      {
        name: "materials.cactusNeedle",
        quantity: 1,
        id: 952,
      },
    ],
  },
  condensed_yellow_potion: {
    name: "items.condensedYellowPotion",
    potionRate: -7, // -10% ~ -5% average
    id: 546,
    skill: "potion_creation",
    book: "books.condensedPotionCreationGuide",
    materials: [
      {
        name: "materials.medicineBowl",
        quantity: 1,
        id: 7134,
      },
      {
        name: "materials.emptyTestTube",
        quantity: 1,
        id: 1092,
      },
      {
        name: "materials.yellowPotion",
        quantity: 1,
        id: 503,
      },
      {
        name: "materials.moleWhiskers",
        quantity: 1,
        id: 1017,
      },
    ],
  },
  condensed_white_potion: {
    name: "items.condensedWhitePotion",
    potionRate: -10, // -15% ~ -5% average
    id: 547,
    skill: "potion_creation",
    book: "books.condensedPotionCreationGuide",
    materials: [
      {
        name: "materials.medicineBowl",
        quantity: 1,
        id: 7134,
      },
      {
        name: "materials.emptyTestTube",
        quantity: 1,
        id: 1092,
      },
      {
        name: "materials.whitePotion",
        quantity: 1,
        id: 504,
      },
      {
        name: "materials.witchStarsand",
        quantity: 1,
        id: 1061,
      },
    ],
  },
  acid_bottle: {
    name: "items.acidBottle",
    potionRate: 0, // -5% ~ +5% average
    id: 7136,
    skill: "potion_creation",
    book: "books.acidBottleCreationGuide",
    materials: [
      {
        name: "materials.medicineBowl",
        quantity: 1,
        id: 7134,
      },
      {
        name: "materials.emptyBottle",
        quantity: 1,
        id: 713,
      },
      {
        name: "materials.immortalHeart",
        quantity: 1,
        id: 929,
      },
    ],
  },
  bottle_grenade: {
    name: "items.bottleGrenade",
    potionRate: 0, // -5% ~ +5% average
    id: 7135,
    skill: "potion_creation",
    book: "books.bottleGrenadeCreationGuide",
    materials: [
      {
        name: "materials.medicineBowl",
        quantity: 1,
        id: 7134,
      },
      {
        name: "materials.emptyBottle",
        quantity: 1,
        id: 713,
      },
      {
        name: "materials.fabric",
        quantity: 1,
        id: 1059,
      },
      {
        name: "materials.alcohol",
        quantity: 1,
        id: 970,
      },
    ],
  },
  marine_sphere_bottle: {
    name: "items.marineSphereBottle",
    potionRate: 0, // -5% ~ +5% average
    id: 7138,
    skill: "potion_creation",
    book: "books.marineSphereCreationGuide",
    materials: [
      {
        name: "materials.medicineBowl",
        quantity: 1,
        id: 7134,
      },
      {
        name: "materials.emptyBottle",
        quantity: 1,
        id: 713,
      },
      {
        name: "materials.tendon",
        quantity: 1,
        id: 1050,
      },
      {
        name: "materials.detonator",
        quantity: 1,
        id: 1051,
      },
    ],
  },
  plant_bottle: {
    name: "items.plantBottle",
    potionRate: 0, // -5% ~ +5% average
    id: 7137,
    skill: "potion_creation",
    book: "books.plantBottleCreationGuide",
    materials: [
      {
        name: "materials.medicineBowl",
        quantity: 1,
        id: 7134,
      },
      {
        name: "materials.emptyBottle",
        quantity: 1,
        id: 713,
      },
      {
        name: "materials.maneaterBlossom",
        quantity: 2,
        id: 1032,
      },
    ],
  },
  glistening_coat: {
    name: "items.glisteningCoat",
    potionRate: -10, // -15% ~ -5% average
    id: 7139,
    skill: "potion_creation",
    book: "books.glisteningCoatCreationGuide",
    materials: [
      {
        name: "materials.medicineBowl",
        quantity: 1,
        id: 7134,
      },
      {
        name: "materials.emptyBottle",
        quantity: 1,
        id: 713,
      },
      {
        name: "materials.mermaidHeart",
        quantity: 1,
        id: 950,
      },
      {
        name: "materials.zenorcFang",
        quantity: 1,
        id: 1044,
      },
      {
        name: "materials.alcohol",
        quantity: 1,
        id: 970,
      },
    ],
  },
  coldproof_potion: {
    name: "items.coldproofPotion",
    potionRate: -5,
    id: 12119,
    skill: "potion_creation",
    book: "books.elementalPotionCreationGuide",
    materials: [
      {
        name: "materials.medicineBowl",
        quantity: 1,
        id: 7134,
      },
      {
        name: "materials.emptyPotionBottle",
        quantity: 1,
        id: 1093,
      },
      {
        name: "materials.blueGemstone",
        quantity: 1,
        id: 717,
      },
      {
        name: "materials.mermaidHeart",
        quantity: 3,
        id: 950,
      },
    ],
  },
  earthproof_potion: {
    name: "items.earthproofPotion",
    potionRate: -5,
    id: 12120,
    skill: "potion_creation",
    book: "books.elementalPotionCreationGuide",
    materials: [
      {
        name: "materials.medicineBowl",
        quantity: 1,
        id: 7134,
      },
      {
        name: "materials.emptyPotionBottle",
        quantity: 1,
        id: 1093,
      },
      {
        name: "materials.yellowGemstone",
        quantity: 1,
        id: 715,
      },
      {
        name: "materials.largeJellopy",
        quantity: 2,
        id: 7126,
      },
    ],
  },
  thunderproof_potion: {
    name: "items.thunderproofPotion",
    potionRate: -5,
    id: 12121,
    skill: "potion_creation",
    book: "books.elementalPotionCreationGuide",
    materials: [
      {
        name: "materials.medicineBowl",
        quantity: 1,
        id: 7134,
      },
      {
        name: "materials.emptyPotionBottle",
        quantity: 1,
        id: 1093,
      },
      {
        name: "materials.blueGemstone",
        quantity: 1,
        id: 717,
      },
      {
        name: "materials.mothDust",
        quantity: 3,
        id: 1057,
      },
    ],
  },
  fireproof_potion: {
    name: "items.fireproofPotion",
    potionRate: -5,
    id: 12118,
    skill: "potion_creation",
    book: "books.elementalPotionCreationGuide",
    materials: [
      {
        name: "materials.medicineBowl",
        quantity: 1,
        id: 7134,
      },
      {
        name: "materials.emptyPotionBottle",
        quantity: 1,
        id: 1093,
      },
      {
        name: "materials.redGemstone",
        quantity: 1,
        id: 716,
      },
      {
        name: "materials.frill",
        quantity: 2,
        id: 1012,
      },
    ],
  },
  // Mixed Cooking items
  savage_bbq: {
    name: "items.savageBbq",
    itemRate: 15,
    id: 12429,
    skill: "mixed_cooking",
    book: "books.cookingBookMixCooking",
    materials: [
      {
        name: "materials.melangePot",
        quantity: 1,
        id: 6248,
      },
      {
        name: "materials.cookingSkewer",
        quantity: 1,
        id: 6250,
      },
      {
        name: "materials.blackCharcoal",
        quantity: 1,
        id: 6251,
      },
      {
        name: "materials.savageMeat",
        quantity: 1,
        id: 6249,
      },
    ],
  },
  warg_blood_cocktail: {
    name: "items.wargBloodCocktail",
    itemRate: 15,
    id: 12430,
    skill: "mixed_cooking",
    book: "books.cookingBookMixCooking",
    materials: [
      {
        name: "materials.melangePot",
        quantity: 1,
        id: 6248,
      },
      {
        name: "materials.coldIce",
        quantity: 2,
        id: 6253,
      },
      {
        name: "materials.bloodOfWolf",
        quantity: 3,
        id: 6252,
      },
    ],
  },
  minor_brisket: {
    name: "items.minorBrisket",
    itemRate: 15,
    id: 12431,
    skill: "mixed_cooking",
    book: "books.cookingBookMixCooking",
    materials: [
      {
        name: "materials.melangePot",
        quantity: 1,
        id: 6248,
      },
      {
        name: "materials.largeCookpot",
        quantity: 1,
        id: 6255,
      },
      {
        name: "materials.beefHead",
        quantity: 2,
        id: 6254,
      },
    ],
  },
  siroma_icetea: {
    name: "items.siromaIcetea",
    itemRate: 15,
    id: 12432,
    skill: "mixed_cooking",
    book: "books.cookingBookMixCooking",
    materials: [
      {
        name: "materials.melangePot",
        quantity: 1,
        id: 6248,
      },
      {
        name: "materials.comodoTropicalFruit",
        quantity: 1,
        id: 6258,
      },
      {
        name: "materials.iceCrystal",
        quantity: 2,
        id: 6257,
      },
      {
        name: "materials.icePiece",
        quantity: 3,
        id: 6256,
      },
    ],
  },
  drosera_herb_stew: {
    name: "items.droseraHerbStew",
    itemRate: 15,
    id: 12433,
    skill: "mixed_cooking",
    book: "books.cookingBookMixCooking",
    materials: [
      {
        name: "materials.melangePot",
        quantity: 1,
        id: 6248,
      },
      {
        name: "materials.largeCookpot",
        quantity: 1,
        id: 6255,
      },
      {
        name: "materials.redHerb",
        quantity: 3,
        id: 507,
      },
      {
        name: "materials.whiteHerb",
        quantity: 3,
        id: 509,
      },
      {
        name: "materials.blueHerb",
        quantity: 3,
        id: 510,
      },
      {
        name: "materials.droseraTenatcle",
        quantity: 3,
        id: 6259,
      },
    ],
  },
  petite_tail_noodles: {
    name: "items.petiteTailNoodles",
    itemRate: 15,
    id: 12434,
    skill: "mixed_cooking",
    book: "books.cookingBookMixCooking",
    materials: [
      {
        name: "materials.melangePot",
        quantity: 1,
        id: 6248,
      },
      {
        name: "materials.coolGravy",
        quantity: 1,
        id: 6262,
      },
      {
        name: "materials.fineNoodle",
        quantity: 1,
        id: 6261,
      },
      {
        name: "materials.petiteTail",
        quantity: 2,
        id: 6260,
      },
    ],
  },
};

export const FORM_STORAGE_KEY = "ragnarok-potion-simulator-FORM_STORAGE_KEY";
export const SELECTED_ITEM_STORAGE_KEY =
  "ragnarok-potion-simulator-SELECTED_ITEM_STORAGE_KEY";
export const LANGUAGE_STORAGE_KEY =
  "ragnarok-potion-simulator-LANGUAGE_STORAGE_KEY";
export const THEME_STORAGE_KEY = "ragnarok-potion-simulator-THEME_STORAGE_KEY";
export const MATERIAL_COSTS_STORAGE_KEY =
  "ragnarok-potion-simulator-MATERIAL_COSTS_STORAGE_KEY";
