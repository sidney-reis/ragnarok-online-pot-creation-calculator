import React, { useState, useEffect } from "react";
import {
  Form,
  InputNumber,
  Card,
  Row,
  Col,
  Typography,
  Space,
  Divider,
  Statistic,
  Input,
  Select,
} from "antd";
import { useTranslation } from "react-i18next";
import i18n from "./i18n";
import "./App.css";

const { Title, Text } = Typography;

interface FormValues {
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
  itemType: string;
}

interface SpecialPharmacyData {
  specificValue: number;
  maxPotions: number;
}

const specialPharmacyTable: Record<number, SpecialPharmacyData> = {
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

interface ItemTypeData {
  name: string;
  itemRate?: number; // For Special Pharmacy and Mixed Cooking items
  potionRate?: number; // For Potion Creation items
  icon: string;
  skill: "special_pharmacy" | "potion_creation" | "mixed_cooking";
  book?: string;
  materials?: Array<{
    name: string;
    quantity: number;
    icon?: string;
  }>;
}

const itemTypes: Record<string, ItemTypeData> = {
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

interface SimulationResult {
  creation: number;
  difficulty: number;
  difference: number;
  potionsCreated: number;
  successRate: string;
  skill: "special_pharmacy" | "potion_creation" | "mixed_cooking";
}

const STORAGE_KEY = "ragnarok-potion-simulator";

function App() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [results, setResults] = useState<SimulationResult[]>([]);
  const [selectedItemType, setSelectedItemType] = useState<string>(
    "enriched_white_potionz"
  );
  const [searchText, setSearchText] = useState<string>("");
  const [skillFilter, setSkillFilter] = useState<string>("all");
  const [isFormulaCollapsed, setIsFormulaCollapsed] = useState<boolean>(true);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Load saved data from localStorage
  const loadSavedData = () => {
    try {
      console.log(
        "Attempting to load data from localStorage with key:",
        STORAGE_KEY
      );
      const savedData = localStorage.getItem(STORAGE_KEY);
      console.log("Raw data from localStorage:", savedData);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        console.log("Parsed data from localStorage:", parsedData);
        return parsedData;
      } else {
        console.log("No data found in localStorage");
      }
    } catch (error) {
      console.error("Error loading saved data:", error);
    }
    return null;
  };

  // Save data to localStorage
  const saveData = (data: {
    selectedItemType: string;
    formValues: Partial<FormValues>;
    isFormulaCollapsed: boolean;
  }) => {
    try {
      console.log("Attempting to save data:", data);
      const jsonString = JSON.stringify(data);
      console.log("JSON string to save:", jsonString);
      localStorage.setItem(STORAGE_KEY, jsonString);
      console.log(
        "Data saved successfully to localStorage with key:",
        STORAGE_KEY
      );

      // Verify the save by immediately reading it back
      const verification = localStorage.getItem(STORAGE_KEY);
      console.log(
        "Verification - data read back from localStorage:",
        verification
      );
    } catch (error) {
      console.error("Error saving data:", error);
      console.error("Data that failed to save:", data);
    }
  };

  // Initialize form with saved data
  useEffect(() => {
    const initializeApp = async () => {
      const savedData = loadSavedData();

      const defaultFormValues = {
        int: 99,
        dex: 99,
        luk: 99,
        jobLevel: 50,
        baseLevel: 99,
        potionResearchLevel: 10,
        fullChemicalProtectionLevel: 5,
        specialPharmacyLevel: 10,
        preparePotionLevel: 10,
        instructionChangeLevel: 5,
        itemType: "enriched_white_potionz",
      };

      if (savedData && savedData.selectedItemType) {
        console.log("Loading saved data:", savedData);

        // Set selected item type first
        const savedItemType = savedData.selectedItemType;
        setSelectedItemType(savedItemType);

        // Set form values including the saved itemType
        const formValues = {
          ...defaultFormValues,
          itemType: savedItemType,
          ...savedData.formValues, // Override with saved values
        };

        // Use a small delay to ensure state is updated
        setTimeout(() => {
          form.setFieldsValue(formValues);
        }, 50);

        // Set formula collapse preference
        if (typeof savedData.isFormulaCollapsed === "boolean") {
          setIsFormulaCollapsed(savedData.isFormulaCollapsed);
        }
      } else {
        console.log("No saved data found, using defaults");
        // No saved data at all, set default values
        form.setFieldsValue(defaultFormValues);
      }

      setIsInitialized(true);
    };

    initializeApp();
  }, [form]);

  // Save data whenever form values or selected item changes (only after initialization)
  useEffect(() => {
    if (!isInitialized) return;

    const formValues = form.getFieldsValue();
    const cleanFormValues = {
      int: formValues.int,
      dex: formValues.dex,
      luk: formValues.luk,
      jobLevel: formValues.jobLevel,
      baseLevel: formValues.baseLevel,
      potionResearchLevel: formValues.potionResearchLevel,
      fullChemicalProtectionLevel: formValues.fullChemicalProtectionLevel,
      specialPharmacyLevel: formValues.specialPharmacyLevel,
      preparePotionLevel: formValues.preparePotionLevel,
      instructionChangeLevel: formValues.instructionChangeLevel,
      itemType: formValues.itemType,
    };
    const dataToSave = {
      selectedItemType,
      formValues: cleanFormValues,
      isFormulaCollapsed,
    };
    saveData(dataToSave);
  }, [selectedItemType, isFormulaCollapsed, isInitialized]);

  const calculateBaseCreation = (values: FormValues): number => {
    return (
      values.int +
      Math.floor(values.dex / 2) +
      values.luk +
      values.jobLevel +
      (values.baseLevel - 100) +
      values.potionResearchLevel * 5
    );
  };

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

  const calculateMixedCookingCreation = (values: FormValues): number => {
    return (
      Math.floor(values.jobLevel / 4) +
      Math.floor(values.dex / 3) +
      Math.floor(values.luk / 2)
    );
  };

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

  const calculatePreciseResults = (values: FormValues): SimulationResult[] => {
    const itemData = itemTypes[values.itemType];
    const results: SimulationResult[] = [];

    if (itemData.skill === "special_pharmacy") {
      // Special Pharmacy precise calculation
      const pharmacyData = specialPharmacyTable[values.specialPharmacyLevel];
      const difficulty = pharmacyData.specificValue + (itemData.itemRate || 0);
      const baseCreation = calculateBaseCreation(values);

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
          const potionsCreated = calculatePotionsCreated(
            difference,
            pharmacyData.maxPotions
          );

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
      // Potion Creation precise calculation
      const brewingRate =
        calculateBrewingRate(values) + (itemData.potionRate || 0);
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
      // Mixed Cooking precise calculation
      const creation = calculateMixedCookingCreation(values);
      const itemRate = itemData.itemRate || 0;

      // Calculate outcomes for difficulty range 30-150 + itemRate
      const outcomes: Record<number, number> = {};

      for (let baseDifficulty = 30; baseDifficulty <= 150; baseDifficulty++) {
        const totalDifficulty = baseDifficulty + itemRate;
        const difference = creation - totalDifficulty;
        const dishesCreated = calculateMixedCookingDishes(difference);

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

  const onFinish = async (values: FormValues) => {
    // Calculate precise results
    const preciseResults = calculatePreciseResults(values);
    setResults(preciseResults);
  };

  const statistics = results.length > 0 ? calculateStatistics(results) : [];
  const avgCreation =
    results.length > 0
      ? (
          results.reduce((sum, r) => sum + r.creation, 0) / results.length
        ).toFixed(2)
      : 0;
  const avgPotions =
    results.length > 0
      ? (
          results.reduce((sum, r) => sum + r.potionsCreated, 0) / results.length
        ).toFixed(2)
      : 0;

  const skillUsed = results.length > 0 ? results[0].skill : null;
  const selectedItemData =
    selectedItemType && itemTypes[selectedItemType]
      ? itemTypes[selectedItemType]
      : itemTypes["enriched_white_potionz"];

  const handleItemSelect = (itemKey: string) => {
    setSelectedItemType(itemKey);
    form.setFieldValue("itemType", itemKey);

    // Immediately save to localStorage when item is selected
    if (isInitialized) {
      const formValues = form.getFieldsValue();
      const cleanFormValues = {
        int: formValues.int,
        dex: formValues.dex,
        luk: formValues.luk,
        jobLevel: formValues.jobLevel,
        baseLevel: formValues.baseLevel,
        potionResearchLevel: formValues.potionResearchLevel,
        fullChemicalProtectionLevel: formValues.fullChemicalProtectionLevel,
        specialPharmacyLevel: formValues.specialPharmacyLevel,
        preparePotionLevel: formValues.preparePotionLevel,
        instructionChangeLevel: formValues.instructionChangeLevel,
        itemType: itemKey,
      };
      const dataToSave = {
        selectedItemType: itemKey,
        formValues: cleanFormValues,
        isFormulaCollapsed,
      };
      console.log("Saving data:", dataToSave);
      saveData(dataToSave);

      // Automatically submit the form when item is selected
      form.submit();
    }
  };

  // Filter items based on search text and skill filter
  const getFilteredItems = () => {
    return Object.entries(itemTypes).filter(([, value]) => {
      // Text search filter
      const matchesSearch = value.name
        .toLowerCase()
        .includes(searchText.toLowerCase());

      // Skill filter
      const matchesSkill = skillFilter === "all" || value.skill === skillFilter;

      return matchesSearch && matchesSkill;
    });
  };

  const filteredItems = getFilteredItems();

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    // Save language preference to localStorage
    try {
      localStorage.setItem("ragnarok-simulator-language", language);
    } catch (error) {
      console.error("Error saving language preference:", error);
    }
  };

  // Helper function to translate item names and book names
  const translateText = (text: string): string => {
    if (
      text.startsWith("items.") ||
      text.startsWith("books.") ||
      text.startsWith("materials.")
    ) {
      return t(text);
    }
    return text;
  };

  return (
    <div style={{ padding: 16, paddingBottom: 0 }}>
      <div
        style={{
          display: "flex",
          marginBottom: 16,
          justifyContent: "space-between",
        }}
      >
        <Title
          level={3}
          style={{
            textAlign: "center",
            margin: 0,
          }}
        >
          {t("app.title")}
        </Title>
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            justifyContent: "flex-end",
          }}
        >
          <Space>
            <Text>{t("app.language")}:</Text>
            <Select
              value={i18n.language}
              onChange={handleLanguageChange}
              style={{ width: 120 }}
              size="small"
              options={[
                { value: "en", label: t("app.english") },
                { value: "pt", label: t("app.portuguese") },
              ]}
            />
          </Space>
        </div>
      </div>

      <Row gutter={[24, 24]} style={{ height: "calc(100vh - 64px)" }}>
        <Col xs={24} lg={12} style={{ maxWidth: "600px", height: "100%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              height: "100%",
            }}
          >
            <Card title={t("characterStats.title")} size="small">
              <Form
                form={form}
                layout="vertical"
                requiredMark={false}
                onFinish={onFinish}
                onValuesChange={() => {
                  // Save form data whenever any field changes and auto-calculate results
                  if (isInitialized) {
                    setTimeout(() => {
                      const formValues = form.getFieldsValue();
                      const cleanFormValues = {
                        int: formValues.int,
                        dex: formValues.dex,
                        luk: formValues.luk,
                        jobLevel: formValues.jobLevel,
                        baseLevel: formValues.baseLevel,
                        potionResearchLevel: formValues.potionResearchLevel,
                        fullChemicalProtectionLevel:
                          formValues.fullChemicalProtectionLevel,
                        specialPharmacyLevel: formValues.specialPharmacyLevel,
                        preparePotionLevel: formValues.preparePotionLevel,
                        instructionChangeLevel:
                          formValues.instructionChangeLevel,
                        itemType: formValues.itemType,
                      };
                      const dataToSave = {
                        selectedItemType,
                        formValues: cleanFormValues,
                        isFormulaCollapsed,
                      };
                      saveData(dataToSave);

                      // Auto-calculate results when form values change
                      const preciseResults =
                        calculatePreciseResults(cleanFormValues);
                      setResults(preciseResults);
                    }, 100);
                  }
                }}
              >
                <Form.Item name="itemType" style={{ display: "none" }}>
                  <input type="hidden" />
                </Form.Item>

                <Row gutter={8}>
                  <Col span={5}>
                    <Form.Item
                      label={t("characterStats.int")}
                      name="int"
                      rules={[
                        {
                          required: true,
                          message: t("validation.intRequired"),
                        },
                      ]}
                    >
                      <InputNumber
                        min={1}
                        max={999}
                        style={{ width: "100%" }}
                        size="small"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Form.Item
                      label={t("characterStats.dex")}
                      name="dex"
                      rules={[
                        {
                          required: true,
                          message: t("validation.dexRequired"),
                        },
                      ]}
                    >
                      <InputNumber
                        min={1}
                        max={999}
                        style={{ width: "100%" }}
                        size="small"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Form.Item
                      label={t("characterStats.luk")}
                      name="luk"
                      rules={[
                        {
                          required: true,
                          message: t("validation.lukRequired"),
                        },
                      ]}
                    >
                      <InputNumber
                        min={1}
                        max={999}
                        style={{ width: "100%" }}
                        size="small"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Form.Item
                      label={t("characterStats.baseLevel")}
                      name="baseLevel"
                      rules={[
                        {
                          required: true,
                          message: t("validation.baseLevelRequired"),
                        },
                      ]}
                    >
                      <InputNumber
                        min={1}
                        max={999}
                        style={{ width: "100%" }}
                        size="small"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      label={t("characterStats.jobLevel")}
                      name="jobLevel"
                      rules={[
                        {
                          required: true,
                          message: t("validation.jobLevelRequired"),
                        },
                      ]}
                    >
                      <InputNumber
                        min={1}
                        max={70}
                        style={{ width: "100%" }}
                        size="small"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={8} style={{ marginTop: "4px" }}>
                  <Col span={5}>
                    <Form.Item
                      label={t("characterStats.potionResearchLevel")}
                      name="potionResearchLevel"
                      rules={[
                        {
                          required: true,
                          message: t("validation.potionResearchRequired"),
                        },
                      ]}
                    >
                      <InputNumber
                        min={0}
                        max={10}
                        style={{ width: "100%" }}
                        size="small"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Form.Item
                      label={t("characterStats.fullChemicalProtectionLevel")}
                      name="fullChemicalProtectionLevel"
                      rules={[
                        {
                          required: true,
                          message: t("validation.fcpRequired"),
                        },
                      ]}
                    >
                      <InputNumber
                        min={0}
                        max={5}
                        style={{ width: "100%" }}
                        size="small"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Form.Item
                      label={t("characterStats.specialPharmacyLevel")}
                      name="specialPharmacyLevel"
                      rules={[
                        {
                          required: true,
                          message: t("validation.specialPharmacyRequired"),
                        },
                      ]}
                    >
                      <InputNumber
                        min={1}
                        max={10}
                        style={{ width: "100%" }}
                        size="small"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Form.Item
                      label={t("characterStats.preparePotionLevel")}
                      name="preparePotionLevel"
                      rules={[
                        {
                          required: true,
                          message: t("validation.preparePotionRequired"),
                        },
                      ]}
                    >
                      <InputNumber
                        min={0}
                        max={10}
                        style={{ width: "100%" }}
                        size="small"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      label={t("characterStats.instructionChangeLevel")}
                      name="instructionChangeLevel"
                      rules={[
                        {
                          required: true,
                          message: t("validation.instructionChangeRequired"),
                        },
                      ]}
                    >
                      <InputNumber
                        min={0}
                        max={5}
                        style={{ width: "100%" }}
                        size="small"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Card>

            <div
              style={{
                flex: "1 1 0",
                display: "flex",
                flexDirection: "column",
                border: "1px solid #f0f0f0",
                padding: 10,
                borderRadius: 8,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  flex: "1 1 0",
                }}
              >
                <Input
                  placeholder={t("itemSelection.searchPlaceholder")}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  allowClear
                />
                <Select
                  style={{ width: "100%" }}
                  placeholder={t("itemSelection.filterPlaceholder")}
                  value={skillFilter}
                  onChange={setSkillFilter}
                  optionRender={(option) => {
                    if (option.value === "all") {
                      return <span>{t("itemSelection.allSkills")}</span>;
                    }
                    let iconUrl = "";
                    let skillName = "";

                    if (option.value === "special_pharmacy") {
                      iconUrl =
                        "https://irowiki.org/w/images/1/13/Special_Pharmacy.png";
                      skillName = t("itemSelection.specialPharmacy");
                    } else if (option.value === "potion_creation") {
                      iconUrl =
                        "https://irowiki.org/w/images/5/53/Prepare_Potion.png";
                      skillName = t("itemSelection.potionCreation");
                    } else if (option.value === "mixed_cooking") {
                      iconUrl =
                        "https://irowiki.org/w/images/3/35/Mixed_Cooking.png";
                      skillName = t("itemSelection.mixedCooking");
                    }

                    return (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <img
                          src={iconUrl}
                          alt={skillName}
                          style={{ width: "16px", height: "16px" }}
                        />
                        <span>{skillName}</span>
                      </div>
                    );
                  }}
                  options={[
                    { value: "all", label: t("itemSelection.allSkills") },
                    {
                      value: "special_pharmacy",
                      label: t("itemSelection.specialPharmacy"),
                    },
                    {
                      value: "potion_creation",
                      label: t("itemSelection.potionCreation"),
                    },
                    {
                      value: "mixed_cooking",
                      label: t("itemSelection.mixedCooking"),
                    },
                  ]}
                />

                <Divider style={{ margin: "12px 0" }} />
                <div
                  style={{
                    flex: "1 1 0",
                    overflowY: "auto",
                    overflowX: "hidden",
                  }}
                >
                  {filteredItems.length === 0 ? (
                    <div
                      style={{
                        textAlign: "center",
                        padding: "20px",
                        color: "#999",
                      }}
                    >
                      {t("itemSelection.noItemsFound")}
                    </div>
                  ) : (
                    <Row gutter={[8, 8]}>
                      {filteredItems.map(([key, value]) => {
                        const rate = value.itemRate || value.potionRate || 0;
                        const skillName =
                          value.skill === "special_pharmacy"
                            ? t("itemSelection.specialPharmacy")
                            : value.skill === "potion_creation"
                            ? t("itemSelection.potionCreation")
                            : t("itemSelection.mixedCooking");
                        const isSelected = selectedItemType === key;

                        return (
                          <Col span={12} key={key}>
                            <Card
                              size="small"
                              hoverable
                              onClick={() => handleItemSelect(key)}
                              style={{
                                cursor: "pointer",
                                border: isSelected
                                  ? "2px solid #1890ff"
                                  : "1px solid #d9d9d9",
                                backgroundColor: isSelected
                                  ? "#f0f8ff"
                                  : "white",
                                height: "100%",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                }}
                              >
                                <img
                                  src={value.icon}
                                  alt={value.name}
                                  style={{ width: "24px", height: "24px" }}
                                />
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <div
                                    style={{
                                      fontWeight: "bold",
                                      fontSize: "12px",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    {translateText(value.name)}
                                  </div>
                                  <div
                                    style={{ color: "#666", fontSize: "10px" }}
                                  >
                                    {skillName}
                                  </div>
                                  <div
                                    style={{
                                      color: rate >= 0 ? "#52c41a" : "#ff4d4f",
                                      fontSize: "10px",
                                    }}
                                  >
                                    Rate: {rate > 0 ? "+" : ""}
                                    {rate}
                                  </div>
                                </div>
                              </div>
                            </Card>
                          </Col>
                        );
                      })}
                    </Row>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Col>

        <Col xs={24} lg={8}>
          {results.length > 0 && (
            <Space direction="vertical" style={{ width: "100%" }} size="large">
              <Card title={t("calculationResults.title")} size="small">
                <Row gutter={16}>
                  <Col span={24}>
                    <Statistic
                      title={t("calculationResults.skillUsed")}
                      value={
                        skillUsed === "special_pharmacy"
                          ? t("itemSelection.specialPharmacy")
                          : skillUsed === "potion_creation"
                          ? t("itemSelection.potionCreation")
                          : t("itemSelection.mixedCooking")
                      }
                      formatter={(value) => (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            justifyContent: "center",
                          }}
                        >
                          <img
                            src={
                              skillUsed === "special_pharmacy"
                                ? "https://irowiki.org/w/images/1/13/Special_Pharmacy.png"
                                : skillUsed === "potion_creation"
                                ? "https://irowiki.org/w/images/5/53/Prepare_Potion.png"
                                : "https://irowiki.org/w/images/3/35/Mixed_Cooking.png"
                            }
                            alt={
                              skillUsed === "special_pharmacy"
                                ? t("itemSelection.specialPharmacy")
                                : skillUsed === "potion_creation"
                                ? t("itemSelection.potionCreation")
                                : t("itemSelection.mixedCooking")
                            }
                            style={{ width: "20px", height: "20px" }}
                          />
                          <span>{value}</span>
                        </div>
                      )}
                    />
                  </Col>
                </Row>
                <Row gutter={16} style={{ marginTop: "16px" }}>
                  <Col span={12}>
                    <Statistic
                      title={t("calculationResults.averageCreationValue")}
                      value={avgCreation}
                      precision={2}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title={t("calculationResults.averageItemsCreated")}
                      value={avgPotions}
                      precision={2}
                    />
                  </Col>
                </Row>
              </Card>

              <Card
                title={t("calculationResults.probabilityTitle")}
                size="small"
              >
                <Space direction="vertical" style={{ width: "100%" }}>
                  {statistics.map((stat) => {
                    // Determine color based on skill type and relative performance
                    let colorType: "success" | "warning" | "error" | "neutral" =
                      "neutral";

                    if (skillUsed === "potion_creation") {
                      // For potion creation: 1 = success (green), 0 = failure (red)
                      colorType = stat.potions === 1 ? "success" : "error";
                    } else if (skillUsed === "special_pharmacy") {
                      // For special pharmacy: relative to max possible (7-12 depending on level)
                      const maxPossible = Math.max(
                        ...statistics.map((s) => s.potions)
                      );
                      const minPossible = Math.min(
                        ...statistics.map((s) => s.potions)
                      );
                      const range = maxPossible - minPossible;

                      if (
                        stat.potions >=
                        maxPossible - Math.floor(range * 0.2)
                      ) {
                        colorType = "success"; // Top 20% of results
                      } else if (
                        stat.potions >=
                        maxPossible - Math.floor(range * 0.6)
                      ) {
                        colorType = "warning"; // Middle 40% of results
                      } else {
                        colorType = "error"; // Bottom 40% of results
                      }
                    } else if (skillUsed === "mixed_cooking") {
                      // For mixed cooking: relative performance, 0 = failure
                      if (stat.potions === 0) {
                        colorType = "error"; // Complete failure
                      } else if (stat.potions >= 10) {
                        colorType = "success"; // Good results
                      } else if (stat.potions >= 8) {
                        colorType = "warning"; // Decent results
                      } else {
                        colorType = "error"; // Poor results
                      }
                    }

                    const colors = {
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

                    return (
                      <div
                        key={stat.potions}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "12px 16px",
                          backgroundColor: colors[colorType].bg,
                          border: `1px solid ${colors[colorType].border}`,
                          borderRadius: "6px",
                          marginBottom: "8px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              backgroundColor: colors[colorType].dot,
                            }}
                          />
                          <Text strong>
                            {stat.potions} {t("calculationResults.potions")}
                          </Text>
                        </div>
                        <Text strong style={{ fontSize: "16px" }}>
                          {stat.percentage}%
                        </Text>
                      </div>
                    );
                  })}
                </Space>
              </Card>

              <Card title={t("formulaInfo.title")} size="small">
                {skillUsed === "special_pharmacy" ? (
                  <>
                    <Text>
                      <strong>
                        {t("formulaInfo.specialPharmacy.creationFormula")}
                      </strong>
                      <br />
                      {t("formulaInfo.specialPharmacy.creationFormulaText")}
                    </Text>
                    <br />
                    <br />
                    <Text>
                      <strong>
                        {t("formulaInfo.specialPharmacy.difficultyFormula")}
                      </strong>
                      <br />
                      {t("formulaInfo.specialPharmacy.difficultyFormulaText")}
                    </Text>
                    <br />
                    <br />
                    <Text>
                      <strong>
                        {t("formulaInfo.specialPharmacy.successConditions")}
                      </strong>
                      <br />• {t("formulaInfo.specialPharmacy.condition1")}
                      <br />• {t("formulaInfo.specialPharmacy.condition2")}
                      <br />• {t("formulaInfo.specialPharmacy.condition3")}
                      <br />• {t("formulaInfo.specialPharmacy.condition4")}
                      <br />• {t("formulaInfo.specialPharmacy.condition5")}
                    </Text>
                  </>
                ) : skillUsed === "potion_creation" ? (
                  <>
                    <Text>
                      <strong>
                        {t("formulaInfo.potionCreation.brewingRateFormula")}
                      </strong>
                      <br />
                      {t("formulaInfo.potionCreation.brewingRateFormulaText")}
                    </Text>
                    <br />
                    <br />
                    <Text>
                      <strong>
                        {t("formulaInfo.potionCreation.successCondition")}
                      </strong>
                      <br />
                      {t("formulaInfo.potionCreation.successConditionText1")}
                      <br />
                      {t("formulaInfo.potionCreation.successConditionText2")}
                    </Text>
                  </>
                ) : (
                  <>
                    <Text>
                      <strong>
                        {t("formulaInfo.mixedCooking.creationFormula")}
                      </strong>
                      <br />
                      {t("formulaInfo.mixedCooking.creationFormulaText")}
                    </Text>
                    <br />
                    <br />
                    <Text>
                      <strong>
                        {t("formulaInfo.mixedCooking.difficultyFormula")}
                      </strong>
                      <br />
                      {t("formulaInfo.mixedCooking.difficultyFormulaText")}
                    </Text>
                    <br />
                    <br />
                    <Text>
                      <strong>
                        {t("formulaInfo.mixedCooking.successConditions")}
                      </strong>
                      <br />• {t("formulaInfo.mixedCooking.condition1")}
                      <br />• {t("formulaInfo.mixedCooking.condition2")}
                      <br />• {t("formulaInfo.mixedCooking.condition3")}
                      <br />• {t("formulaInfo.mixedCooking.condition4")}
                      <br />• {t("formulaInfo.mixedCooking.condition5")}
                    </Text>
                  </>
                )}
              </Card>

              {/* Materials and Requirements Section */}
              {selectedItemData.materials &&
                selectedItemData.materials.length > 0 && (
                  <Card title={t("materialsSection.title")} size="small">
                    <Space
                      direction="vertical"
                      style={{ width: "100%" }}
                      size="small"
                    >
                      {selectedItemData.book && (
                        <div>
                          <Text strong>
                            {t("materialsSection.requiredBook")}
                          </Text>
                          <div
                            style={{
                              marginTop: "8px",
                              padding: "8px",
                              backgroundColor: "#f5f5f5",
                              borderRadius: "4px",
                            }}
                          >
                            <Text>{translateText(selectedItemData.book)}</Text>
                          </div>
                        </div>
                      )}

                      <div>
                        <Text strong>
                          {t("materialsSection.materialsNeeded")}
                        </Text>
                        <div style={{ marginTop: "8px" }}>
                          <Space
                            direction="vertical"
                            style={{ width: "100%" }}
                            size="small"
                          >
                            {selectedItemData.materials.map(
                              (material, index) => (
                                <div
                                  key={index}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                    padding: "8px",
                                    backgroundColor: "#fafafa",
                                    borderRadius: "4px",
                                    border: "1px solid #e8e8e8",
                                  }}
                                >
                                  {material.icon && (
                                    <img
                                      src={material.icon}
                                      alt={material.name}
                                      style={{ width: "24px", height: "24px" }}
                                    />
                                  )}
                                  <div style={{ flex: 1 }}>
                                    <Text>{translateText(material.name)}</Text>
                                  </div>
                                  <div>
                                    <Text strong>×{material.quantity}</Text>
                                  </div>
                                </div>
                              )
                            )}
                          </Space>
                        </div>
                      </div>
                    </Space>
                  </Card>
                )}
            </Space>
          )}

          {results.length === 0 && (
            <Card>
              <div style={{ textAlign: "center", padding: "48px 0" }}>
                <Text type="secondary">
                  {t("calculationResults.noResults")}
                </Text>
              </div>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default App;
