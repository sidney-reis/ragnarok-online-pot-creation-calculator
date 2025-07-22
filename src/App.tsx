import React, { useState, useEffect } from "react";
import {
  Form,
  InputNumber,
  Button,
  Card,
  Row,
  Col,
  Typography,
  Space,
  Divider,
  Alert,
  Statistic,
  Input,
  Select,
  Collapse,
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
    name: "Thorn Plant Seed",
    itemRate: 30,
    icon: "https://irowiki.org/images/db/item/6210.png",
    skill: "special_pharmacy",
    book: "How To Grow Plant Genes",
    materials: [
      {
        name: "Prickly Fruit",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/576.png",
      },
    ],
  },
  blood_sucker_plant_seed: {
    name: "Blood Sucker Plant Seed",
    itemRate: 30,
    icon: "https://irowiki.org/images/db/item/6211.png",
    skill: "special_pharmacy",
    book: "How To Grow Plant Genes",
    materials: [
      {
        name: "Maneater Root",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/1033.png",
      },
    ],
  },
  bomb_mushroom_spore: {
    name: "Bomb Mushroom Spore",
    itemRate: 15,
    icon: "https://irowiki.org/images/db/item/6212.png",
    skill: "special_pharmacy",
    book: "How To Grow Plant Genes",
    materials: [
      {
        name: "Mushroom Spore",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/921.png",
      },
      {
        name: "Poison Spore",
        quantity: 5,
        icon: "https://irowiki.org/images/db/item/7033.png",
      },
      {
        name: "Gun Powder",
        quantity: 2,
        icon: "https://irowiki.org/images/db/item/6244.png",
      },
    ],
  },
  enriched_white_potionz: {
    name: "Enriched White PotionZ",
    itemRate: 10,
    icon: "https://irowiki.org/images/db/item/12428.png",
    skill: "special_pharmacy",
    book: "How To Make High Quality Potion",
    materials: [
      {
        name: "Empty Test Tube",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/1092.png",
      },
      {
        name: "White Potion",
        quantity: 20,
        icon: "https://irowiki.org/images/db/item/504.png",
      },
      {
        name: "White Herb",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/509.png",
      },
      {
        name: "Alcohol",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/970.png",
      },
    ],
  },
  vitata500: {
    name: "Vitata500",
    itemRate: 20,
    icon: "https://irowiki.org/images/db/item/12436.png",
    skill: "special_pharmacy",
    book: "How To Make High Quality Potion",
    materials: [
      {
        name: "Empty Test Tube",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/1092.png",
      },
      {
        name: "Grape",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/514.png",
      },
      {
        name: "Honey",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/518.png",
      },
      {
        name: "Blue Herb",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/510.png",
      },
    ],
  },
  enrich_celermine_juice: {
    name: "Enrich Celermine Juice",
    itemRate: 30,
    icon: "https://irowiki.org/images/db/item/12437.png",
    skill: "special_pharmacy",
    book: "How To Make High Quality Potion",
    materials: [
      {
        name: "Empty Test Tube",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/1092.png",
      },
      {
        name: "Concentration Potion",
        quantity: 5,
        icon: "https://irowiki.org/images/db/item/645.png",
      },
      {
        name: "Awakening Potion",
        quantity: 5,
        icon: "https://irowiki.org/images/db/item/656.png",
      },
      {
        name: "Spicy Sauce",
        quantity: 5,
        icon: "https://irowiki.org/images/db/item/7455.png",
      },
    ],
  },
  cure_free: {
    name: "Cure Free",
    itemRate: 40,
    icon: "https://irowiki.org/images/db/item/12475.png",
    skill: "special_pharmacy",
    book: "How To Make High Quality Potion",
    materials: [
      {
        name: "Empty Test Tube",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/1092.png",
      },
      {
        name: "Panacea",
        quantity: 5,
        icon: "https://irowiki.org/images/db/item/525.png",
      },
      {
        name: "Green Herb",
        quantity: 20,
        icon: "https://irowiki.org/images/db/item/511.png",
      },
      {
        name: "Mastela Fruit",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/522.png",
      },
      {
        name: "Yggdrasil Leaf",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/610.png",
      },
    ],
  },
  concentrated_red_syrup: {
    name: "Concentrated Red Syrup Potion",
    itemRate: 100,
    icon: "https://irowiki.org/images/db/item/1100003.png",
    skill: "special_pharmacy",
    book: "How To Make High Quality Potion",
    materials: [
      {
        name: "Empty Potion Bottle",
        quantity: 5,
        icon: "https://irowiki.org/images/db/item/1093.png",
      },
      {
        name: "Empty Bottle",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/713.png",
      },
      {
        name: "Red Syrup",
        quantity: 15,
        icon: "https://irowiki.org/images/db/item/11621.png",
      },
    ],
  },
  concentrated_blue_syrup: {
    name: "Concentrated Blue Syrup Potion",
    itemRate: 130,
    icon: "https://irowiki.org/images/db/item/1100004.png",
    skill: "special_pharmacy",
    book: "How To Make High Quality Potion",
    materials: [
      {
        name: "Empty Potion Bottle",
        quantity: 5,
        icon: "https://irowiki.org/images/db/item/1093.png",
      },
      {
        name: "Empty Bottle",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/713.png",
      },
      {
        name: "Blue Syrup",
        quantity: 15,
        icon: "https://irowiki.org/images/db/item/11624.png",
      },
    ],
  },
  concentrated_golden_syrup: {
    name: "Concentrated Golden Syrup Potion",
    itemRate: 150,
    icon: "https://irowiki.org/images/db/item/1100005.png",
    skill: "special_pharmacy",
    book: "How To Make High Quality Potion",
    materials: [
      {
        name: "Empty Potion Bottle",
        quantity: 5,
        icon: "https://irowiki.org/images/db/item/1093.png",
      },
      {
        name: "Empty Bottle",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/713.png",
      },
      {
        name: "White Syrup",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/11623.png",
      },
      {
        name: "Yellow Syrup",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/11622.png",
      },
    ],
  },
  red_herb_activator: {
    name: "Red Herb Activator",
    itemRate: 100,
    icon: "https://irowiki.org/images/db/item/100232.png",
    skill: "special_pharmacy",
    book: "How To Make High Quality Potion",
    materials: [
      {
        name: "Empty Test Tube",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/1092.png",
      },
      {
        name: "Red Herb",
        quantity: 45,
        icon: "https://irowiki.org/images/db/item/507.png",
      },
      {
        name: "Yggdrasil Seed",
        quantity: 5,
        icon: "https://irowiki.org/images/db/item/608.png",
      },
    ],
  },
  blue_herb_activator: {
    name: "Blue Herb Activator",
    itemRate: 100,
    icon: "https://irowiki.org/images/db/item/100233.png",
    skill: "special_pharmacy",
    book: "How To Make High Quality Potion",
    materials: [
      {
        name: "Empty Test Tube",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/1092.png",
      },
      {
        name: "Blue Herb",
        quantity: 15,
        icon: "https://irowiki.org/images/db/item/510.png",
      },
      {
        name: "Yggdrasil Seed",
        quantity: 5,
        icon: "https://irowiki.org/images/db/item/608.png",
      },
    ],
  },
  golden_x_potion: {
    name: "Golden X Potion",
    itemRate: 145,
    icon: "https://irowiki.org/images/db/item/100231.png",
    skill: "special_pharmacy",
    book: "How To Make High Quality Potion",
    materials: [
      {
        name: "Empty Test Tube",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/1092.png",
      },
      {
        name: "Yggdrasil Berry",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/607.png",
      },
      {
        name: "Gold",
        quantity: 5,
        icon: "https://irowiki.org/images/db/item/969.png",
      },
    ],
  },
  increase_hp_small: {
    name: "Increase HP Potion (Small)",
    itemRate: 10,
    icon: "https://irowiki.org/images/db/item/12422.png",
    skill: "special_pharmacy",
    book: "How To Increase Stamina",
    materials: [
      {
        name: "Empty Bottle",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/713.png",
      },
      {
        name: "Monster Feed",
        quantity: 5,
        icon: "https://irowiki.org/images/db/item/528.png",
      },
      {
        name: "White Herb",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/509.png",
      },
      {
        name: "Spicy Sauce",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7455.png",
      },
    ],
  },
  increase_hp_medium: {
    name: "Increase HP Potion (Medium)",
    itemRate: 20,
    icon: "https://irowiki.org/images/db/item/12423.png",
    skill: "special_pharmacy",
    book: "How To Increase Stamina",
    materials: [
      {
        name: "Empty Bottle",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/713.png",
      },
      {
        name: "White Herb",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/509.png",
      },
      {
        name: "Yellow Herb",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/508.png",
      },
      {
        name: "Spicy Sauce",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7455.png",
      },
    ],
  },
  increase_hp_large: {
    name: "Increase HP Potion (Large)",
    itemRate: 40,
    icon: "https://irowiki.org/images/db/item/12424.png",
    skill: "special_pharmacy",
    book: "How To Increase Stamina",
    materials: [
      {
        name: "Empty Bottle",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/713.png",
      },
      {
        name: "White Herb",
        quantity: 15,
        icon: "https://irowiki.org/images/db/item/509.png",
      },
      {
        name: "Mastela Fruit",
        quantity: 3,
        icon: "https://irowiki.org/images/db/item/522.png",
      },
      {
        name: "Holy Water",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/523.png",
      },
      {
        name: "Spicy Sauce",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7455.png",
      },
    ],
  },
  increase_sp_small: {
    name: "Increase SP Potion (Small)",
    itemRate: 10,
    icon: "https://irowiki.org/images/db/item/12425.png",
    skill: "special_pharmacy",
    book: "How To Increase Vitality",
    materials: [
      {
        name: "Empty Bottle",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/713.png",
      },
      {
        name: "Lemon",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/568.png",
      },
      {
        name: "Grape",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/514.png",
      },
      {
        name: "Sweet Sauce",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7453.png",
      },
    ],
  },
  increase_sp_medium: {
    name: "Increase SP Potion (Medium)",
    itemRate: 15,
    icon: "https://irowiki.org/images/db/item/12426.png",
    skill: "special_pharmacy",
    book: "How To Increase Vitality",
    materials: [
      {
        name: "Empty Bottle",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/713.png",
      },
      {
        name: "Honey",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/518.png",
      },
      {
        name: "Blue Herb",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/510.png",
      },
      {
        name: "Sweet Sauce",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7453.png",
      },
    ],
  },
  increase_sp_large: {
    name: "Increase SP Potion (Large)",
    itemRate: 20,
    icon: "https://irowiki.org/images/db/item/12427.png",
    skill: "special_pharmacy",
    book: "How To Increase Vitality",
    materials: [
      {
        name: "Empty Bottle",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/713.png",
      },
      {
        name: "Royal Jelly",
        quantity: 10,
        icon: "https://irowiki.org/images/db/item/526.png",
      },
      {
        name: "Blue Herb",
        quantity: 15,
        icon: "https://irowiki.org/images/db/item/510.png",
      },
      {
        name: "Sweet Sauce",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7453.png",
      },
    ],
  },
  // Potion Creation items
  red_potion: {
    name: "Red Potion",
    potionRate: 20, // +15% ~ +25% average
    icon: "https://irowiki.org/images/db/item/501.png",
    skill: "potion_creation",
    book: "Potion Creation Guide",
    materials: [
      {
        name: "Medicine Bowl",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7134.png",
      },
      {
        name: "Empty Potion Bottle",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/1093.png",
      },
      {
        name: "Red Herb",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/507.png",
      },
    ],
  },
  yellow_potion: {
    name: "Yellow Potion",
    potionRate: 20, // +15% ~ +25% average
    icon: "https://irowiki.org/images/db/item/503.png",
    skill: "potion_creation",
    book: "Potion Creation Guide",
    materials: [
      {
        name: "Medicine Bowl",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7134.png",
      },
      {
        name: "Empty Potion Bottle",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/1093.png",
      },
      {
        name: "Yellow Herb",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/508.png",
      },
    ],
  },
  white_potion: {
    name: "White Potion",
    potionRate: 20, // +15% ~ +25% average
    icon: "https://irowiki.org/images/db/item/504.png",
    skill: "potion_creation",
    book: "Potion Creation Guide",
    materials: [
      {
        name: "Medicine Bowl",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7134.png",
      },
      {
        name: "Empty Potion Bottle",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/1093.png",
      },
      {
        name: "White Herb",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/509.png",
      },
    ],
  },
  blue_potion: {
    name: "Blue Potion",
    potionRate: -5,
    icon: "https://irowiki.org/images/db/item/505.png",
    skill: "potion_creation",
    book: "Potion Creation Guide",
    materials: [
      {
        name: "Medicine Bowl",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7134.png",
      },
      {
        name: "Empty Potion Bottle",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/1093.png",
      },
      {
        name: "Blue Herb",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/510.png",
      },
      {
        name: "Scell",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/911.png",
      },
    ],
  },
  anodyne: {
    name: "Anodyne",
    potionRate: -5,
    icon: "https://irowiki.org/images/db/item/605.png",
    skill: "potion_creation",
    book: "Potion Creation Guide",
    materials: [
      {
        name: "Medicine Bowl",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7134.png",
      },
      {
        name: "Empty Bottle",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/713.png",
      },
      {
        name: "Alcohol",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/970.png",
      },
      {
        name: "Ment",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/708.png",
      },
    ],
  },
  aloevera: {
    name: "Aloevera",
    potionRate: -5,
    icon: "https://irowiki.org/images/db/item/606.png",
    skill: "potion_creation",
    book: "Potion Creation Guide",
    materials: [
      {
        name: "Medicine Bowl",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7134.png",
      },
      {
        name: "Empty Bottle",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/713.png",
      },
      {
        name: "Honey",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/518.png",
      },
      {
        name: "Aloe",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/704.png",
      },
    ],
  },
  alcohol: {
    name: "Alcohol",
    potionRate: 10, // +5% ~ +15% average
    icon: "https://irowiki.org/images/db/item/970.png",
    skill: "potion_creation",
    book: "Alcohol Creation Guide",
    materials: [
      {
        name: "Medicine Bowl",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7134.png",
      },
      {
        name: "Empty Test Tube",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/1092.png",
      },
      {
        name: "Empty Bottle",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/713.png",
      },
      {
        name: "Stem",
        quantity: 5,
        icon: "https://irowiki.org/images/db/item/905.png",
      },
      {
        name: "Poison Spore",
        quantity: 5,
        icon: "https://irowiki.org/images/db/item/7033.png",
      },
    ],
  },
  embryo: {
    name: "Embryo",
    potionRate: -5,
    icon: "https://irowiki.org/images/db/item/7142.png",
    skill: "potion_creation",
    book: "Potion Creation Guide",
    materials: [
      {
        name: "Medicine Bowl",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7134.png",
      },
      {
        name: "Morning Dew of Yggdrasil",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7141.png",
      },
      {
        name: "Seed of Life",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7140.png",
      },
      {
        name: "Glass Tube",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7143.png",
      },
    ],
  },
  homunculus_tablet: {
    name: "Homunculus Tablet",
    potionRate: -5,
    icon: "https://irowiki.org/images/db/item/100371.png",
    skill: "potion_creation",
    book: "Potion Creation Guide",
    materials: [
      {
        name: "Medicine Bowl",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7134.png",
      },
      {
        name: "Yellow Herb",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/508.png",
      },
      {
        name: "Seed of Life",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7140.png",
      },
      {
        name: "Empty Bottle",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/713.png",
      },
    ],
  },
  condensed_red_potion: {
    name: "Condensed Red Potion",
    potionRate: -5,
    icon: "https://irowiki.org/images/db/item/545.png",
    skill: "potion_creation",
    book: "Condensed Potion Creation Guide",
    materials: [
      {
        name: "Medicine Bowl",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7134.png",
      },
      {
        name: "Empty Test Tube",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/1092.png",
      },
      {
        name: "Red Potion",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/501.png",
      },
      {
        name: "Cactus Needle",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/952.png",
      },
    ],
  },
  condensed_yellow_potion: {
    name: "Condensed Yellow Potion",
    potionRate: -7, // -10% ~ -5% average
    icon: "https://irowiki.org/images/db/item/546.png",
    skill: "potion_creation",
    book: "Condensed Potion Creation Guide",
    materials: [
      {
        name: "Medicine Bowl",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7134.png",
      },
      {
        name: "Empty Test Tube",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/1092.png",
      },
      {
        name: "Yellow Potion",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/503.png",
      },
      {
        name: "Mole Whiskers",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/1017.png",
      },
    ],
  },
  condensed_white_potion: {
    name: "Condensed White Potion",
    potionRate: -10, // -15% ~ -5% average
    icon: "https://irowiki.org/images/db/item/547.png",
    skill: "potion_creation",
    book: "Condensed Potion Creation Guide",
    materials: [
      {
        name: "Medicine Bowl",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7134.png",
      },
      {
        name: "Empty Test Tube",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/1092.png",
      },
      {
        name: "White Potion",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/504.png",
      },
      {
        name: "Witch Starsand",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/1061.png",
      },
    ],
  },
  acid_bottle: {
    name: "Acid Bottle",
    potionRate: 0, // -5% ~ +5% average
    icon: "https://irowiki.org/images/db/item/7136.png",
    skill: "potion_creation",
    book: "Acid Bottle Creation Guide",
    materials: [
      {
        name: "Medicine Bowl",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7134.png",
      },
      {
        name: "Empty Bottle",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/713.png",
      },
      {
        name: "Immortal Heart",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/929.png",
      },
    ],
  },
  bottle_grenade: {
    name: "Bottle Grenade",
    potionRate: 0, // -5% ~ +5% average
    icon: "https://irowiki.org/images/db/item/7135.png",
    skill: "potion_creation",
    book: "Bottle Grenade Creation Guide",
    materials: [
      {
        name: "Medicine Bowl",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7134.png",
      },
      {
        name: "Empty Bottle",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/713.png",
      },
      {
        name: "Fabric",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/1059.png",
      },
      {
        name: "Alcohol",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/970.png",
      },
    ],
  },
  marine_sphere_bottle: {
    name: "Marine Sphere Bottle",
    potionRate: 0, // -5% ~ +5% average
    icon: "https://irowiki.org/images/db/item/7138.png",
    skill: "potion_creation",
    book: "Marine Sphere Creation Guide",
    materials: [
      {
        name: "Medicine Bowl",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7134.png",
      },
      {
        name: "Empty Bottle",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/713.png",
      },
      {
        name: "Tendon",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/1050.png",
      },
      {
        name: "Detonator",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/1051.png",
      },
    ],
  },
  plant_bottle: {
    name: "Plant Bottle",
    potionRate: 0, // -5% ~ +5% average
    icon: "https://irowiki.org/images/db/item/7137.png",
    skill: "potion_creation",
    book: "Plant Bottle Creation Guide",
    materials: [
      {
        name: "Medicine Bowl",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7134.png",
      },
      {
        name: "Empty Bottle",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/713.png",
      },
      {
        name: "Maneater Blossom",
        quantity: 2,
        icon: "https://irowiki.org/images/db/item/1032.png",
      },
    ],
  },
  glistening_coat: {
    name: "Glistening Coat",
    potionRate: -10, // -15% ~ -5% average
    icon: "https://irowiki.org/images/db/item/7139.png",
    skill: "potion_creation",
    book: "Glistening Coat Creation Guide",
    materials: [
      {
        name: "Medicine Bowl",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7134.png",
      },
      {
        name: "Empty Bottle",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/713.png",
      },
      {
        name: "Mermaid's Heart",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/950.png",
      },
      {
        name: "Zenorc's Fang",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/1044.png",
      },
      {
        name: "Alcohol",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/970.png",
      },
    ],
  },
  coldproof_potion: {
    name: "Coldproof Potion",
    potionRate: -5,
    icon: "https://irowiki.org/images/db/item/12119.png",
    skill: "potion_creation",
    book: "Elemental Potion Creation Guide",
    materials: [
      {
        name: "Medicine Bowl",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7134.png",
      },
      {
        name: "Empty Potion Bottle",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/1093.png",
      },
      {
        name: "Blue Gemstone",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/717.png",
      },
      {
        name: "Mermaid's Heart",
        quantity: 3,
        icon: "https://irowiki.org/images/db/item/950.png",
      },
    ],
  },
  earthproof_potion: {
    name: "Earthproof Potion",
    potionRate: -5,
    icon: "https://irowiki.org/images/db/item/12120.png",
    skill: "potion_creation",
    book: "Elemental Potion Creation Guide",
    materials: [
      {
        name: "Medicine Bowl",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7134.png",
      },
      {
        name: "Empty Potion Bottle",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/1093.png",
      },
      {
        name: "Yellow Gemstone",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/715.png",
      },
      {
        name: "Large Jellopy",
        quantity: 2,
        icon: "https://irowiki.org/images/db/item/7126.png",
      },
    ],
  },
  thunderproof_potion: {
    name: "Thunderproof Potion",
    potionRate: -5,
    icon: "https://irowiki.org/images/db/item/12121.png",
    skill: "potion_creation",
    book: "Elemental Potion Creation Guide",
    materials: [
      {
        name: "Medicine Bowl",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7134.png",
      },
      {
        name: "Empty Potion Bottle",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/1093.png",
      },
      {
        name: "Blue Gemstone",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/717.png",
      },
      {
        name: "Moth Dust",
        quantity: 3,
        icon: "https://irowiki.org/images/db/item/1057.png",
      },
    ],
  },
  fireproof_potion: {
    name: "Fireproof Potion",
    potionRate: -5,
    icon: "https://irowiki.org/images/db/item/12118.png",
    skill: "potion_creation",
    book: "Elemental Potion Creation Guide",
    materials: [
      {
        name: "Medicine Bowl",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/7134.png",
      },
      {
        name: "Empty Potion Bottle",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/1093.png",
      },
      {
        name: "Red Gemstone",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/716.png",
      },
      {
        name: "Frill",
        quantity: 2,
        icon: "https://irowiki.org/images/db/item/1012.png",
      },
    ],
  },
  // Mixed Cooking items
  savage_bbq: {
    name: "Savage BBQ",
    itemRate: 15,
    icon: "https://irowiki.org/images/db/item/12429.png",
    skill: "mixed_cooking",
    book: "Cooking Book: Mix Cooking",
    materials: [
      {
        name: "Melange Pot",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/6248.png",
      },
      {
        name: "Cooking Skewer",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/6250.png",
      },
      {
        name: "Black Charcoal",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/6251.png",
      },
      {
        name: "Savage Meat",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/6249.png",
      },
    ],
  },
  warg_blood_cocktail: {
    name: "Warg Blood Cocktail",
    itemRate: 15,
    icon: "https://irowiki.org/images/db/item/12430.png",
    skill: "mixed_cooking",
    book: "Cooking Book: Mix Cooking",
    materials: [
      {
        name: "Melange Pot",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/6248.png",
      },
      {
        name: "Cold Ice",
        quantity: 2,
        icon: "https://irowiki.org/images/db/item/6253.png",
      },
      {
        name: "Blood Of Wolf",
        quantity: 3,
        icon: "https://irowiki.org/images/db/item/6252.png",
      },
    ],
  },
  minor_brisket: {
    name: "Minor Brisket",
    itemRate: 15,
    icon: "https://irowiki.org/images/db/item/12431.png",
    skill: "mixed_cooking",
    book: "Cooking Book: Mix Cooking",
    materials: [
      {
        name: "Melange Pot",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/6248.png",
      },
      {
        name: "Large Cookpot",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/6255.png",
      },
      {
        name: "Beef Head",
        quantity: 2,
        icon: "https://irowiki.org/images/db/item/6254.png",
      },
    ],
  },
  siroma_icetea: {
    name: "Siroma Icetea",
    itemRate: 15,
    icon: "https://irowiki.org/images/db/item/12432.png",
    skill: "mixed_cooking",
    book: "Cooking Book: Mix Cooking",
    materials: [
      {
        name: "Melange Pot",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/6248.png",
      },
      {
        name: "Comodo Tropical Fruit",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/6258.png",
      },
      {
        name: "Ice Crystal",
        quantity: 2,
        icon: "https://irowiki.org/images/db/item/6257.png",
      },
      {
        name: "Ice Piece",
        quantity: 3,
        icon: "https://irowiki.org/images/db/item/6256.png",
      },
    ],
  },
  drosera_herb_stew: {
    name: "Drosera Herb Stew",
    itemRate: 15,
    icon: "https://irowiki.org/images/db/item/12433.png",
    skill: "mixed_cooking",
    book: "Cooking Book: Mix Cooking",
    materials: [
      {
        name: "Melange Pot",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/6248.png",
      },
      {
        name: "Large Cookpot",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/6255.png",
      },
      {
        name: "Red Herb",
        quantity: 3,
        icon: "https://irowiki.org/images/db/item/507.png",
      },
      {
        name: "White Herb",
        quantity: 3,
        icon: "https://irowiki.org/images/db/item/509.png",
      },
      {
        name: "Blue Herb",
        quantity: 3,
        icon: "https://irowiki.org/images/db/item/510.png",
      },
      {
        name: "Drosera Tentacle",
        quantity: 3,
        icon: "https://irowiki.org/images/db/item/6259.png",
      },
    ],
  },
  petite_tail_noodles: {
    name: "Petite Tail Noodles",
    itemRate: 15,
    icon: "https://irowiki.org/images/db/item/12434.png",
    skill: "mixed_cooking",
    book: "Cooking Book: Mix Cooking",
    materials: [
      {
        name: "Melange Pot",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/6248.png",
      },
      {
        name: "Cool Gravy",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/6262.png",
      },
      {
        name: "Fine Noodle",
        quantity: 1,
        icon: "https://irowiki.org/images/db/item/6261.png",
      },
      {
        name: "Petite's Tail",
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
  const [isCalculating, setIsCalculating] = useState(false);
  const [selectedItemType, setSelectedItemType] = useState<string>(
    "enriched_white_potionz"
  );
  const [searchText, setSearchText] = useState<string>("");
  const [skillFilter, setSkillFilter] = useState<string>("all");
  const [isFormulaCollapsed, setIsFormulaCollapsed] = useState<boolean>(true);

  // Load saved data from localStorage
  const loadSavedData = () => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        return parsedData;
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // Initialize form with saved data
  useEffect(() => {
    const savedData = loadSavedData();
    if (savedData) {
      // Set selected item type
      if (savedData.selectedItemType) {
        setSelectedItemType(savedData.selectedItemType);
      }

      // Set form values
      if (savedData.formValues) {
        form.setFieldsValue(savedData.formValues);
      }

      // Set formula collapse preference
      if (typeof savedData.isFormulaCollapsed === "boolean") {
        setIsFormulaCollapsed(savedData.isFormulaCollapsed);
      }
    }
  }, [form]);

  // Save data whenever form values or selected item changes
  useEffect(() => {
    const formValues = form.getFieldsValue();
    const dataToSave = {
      selectedItemType,
      formValues,
      isFormulaCollapsed,
    };
    saveData(dataToSave);
  }, [selectedItemType, isFormulaCollapsed, form]);

  const getRandomInRange = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const calculateCreation = (values: FormValues): number => {
    const randomBonus = getRandomInRange(30, 150);
    const fcp = values.fullChemicalProtectionLevel * getRandomInRange(4, 10);

    return (
      values.int +
      Math.floor(values.dex / 2) +
      values.luk +
      values.jobLevel +
      randomBonus +
      (values.baseLevel - 100) +
      values.potionResearchLevel * 5 +
      fcp
    );
  };

  const calculatePotionsCreated = (
    creation: number,
    difficulty: number,
    maxPotions: number
  ): number => {
    const difference = creation - difficulty;

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
    return (
      values.preparePotionLevel * 3 +
      values.potionResearchLevel +
      values.instructionChangeLevel +
      values.jobLevel * 0.2 +
      values.dex * 0.1 +
      values.luk * 0.1 +
      values.int * 0.05
    );
  };

  const calculateMixedCookingCreation = (values: FormValues): number => {
    return (
      Math.floor(values.jobLevel / 4) +
      Math.floor(values.dex / 3) +
      Math.floor(values.luk / 2)
    );
  };

  const calculateMixedCookingDishes = (
    creation: number,
    difficulty: number
  ): number => {
    const difference = creation - difficulty;

    if (difference >= 30) {
      return getRandomInRange(10, 12); // 10~12 dishes
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

  const runSimulation = (
    values: FormValues,
    iterations: number = 1000
  ): SimulationResult[] => {
    const itemData = itemTypes[values.itemType];
    const results: SimulationResult[] = [];

    if (itemData.skill === "special_pharmacy") {
      // Special Pharmacy logic
      const pharmacyData = specialPharmacyTable[values.specialPharmacyLevel];
      const difficulty = pharmacyData.specificValue + (itemData.itemRate || 0);

      for (let i = 0; i < iterations; i++) {
        const creation = calculateCreation(values);
        const difference = creation - difficulty;
        const potionsCreated = calculatePotionsCreated(
          creation,
          difficulty,
          pharmacyData.maxPotions
        );

        results.push({
          creation,
          difficulty,
          difference,
          potionsCreated,
          successRate: "",
          skill: itemData.skill,
        });
      }
    } else if (itemData.skill === "potion_creation") {
      // Potion Creation logic
      const brewingRate =
        calculateBrewingRate(values) + (itemData.potionRate || 0);

      for (let i = 0; i < iterations; i++) {
        const success = Math.random() * 100 < brewingRate;

        results.push({
          creation: brewingRate,
          difficulty: 0,
          difference: brewingRate,
          potionsCreated: success ? 1 : 0,
          successRate: `${brewingRate.toFixed(1)}%`,
          skill: itemData.skill,
        });
      }
    } else {
      // Mixed Cooking logic
      for (let i = 0; i < iterations; i++) {
        const creation = calculateMixedCookingCreation(values);
        const randomDifficulty =
          getRandomInRange(30, 150) + (itemData.itemRate || 0);
        const dishesCreated = calculateMixedCookingDishes(
          creation,
          randomDifficulty
        );

        results.push({
          creation,
          difficulty: randomDifficulty,
          difference: creation - randomDifficulty,
          potionsCreated: dishesCreated,
          successRate: "",
          skill: itemData.skill,
        });
      }
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
    setIsCalculating(true);

    // Run simulation
    const simulationResults = runSimulation(values, 10000);
    setResults(simulationResults);

    setIsCalculating(false);
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
  const selectedItemData = itemTypes[selectedItemType];

  const handleItemSelect = (itemKey: string) => {
    setSelectedItemType(itemKey);
    form.setFieldValue("itemType", itemKey);
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
  };

  return (
    <div style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px",
        }}
      >
        <div style={{ flex: 1 }} />
        <Title level={1} style={{ textAlign: "center", margin: 0, flex: 1 }}>
          {t("app.title")}
        </Title>
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <Space>
            <Text>{t("app.language")}:</Text>
            <Select
              value={i18n.language}
              onChange={handleLanguageChange}
              style={{ width: 120 }}
              options={[
                { value: "en", label: t("app.english") },
                { value: "pt", label: t("app.portuguese") },
              ]}
            />
          </Space>
        </div>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={8}>
          <Card title={t("itemSelection.title")} size="small">
            <Space direction="vertical" style={{ width: "100%" }} size="small">
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
            </Space>

            <Divider style={{ margin: "12px 0" }} />

            <div style={{ maxHeight: "500px", overflowY: "auto" }}>
              <Space
                direction="vertical"
                style={{ width: "100%" }}
                size="small"
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
                  filteredItems.map(([key, value]) => {
                    const rate = value.itemRate || value.potionRate || 0;
                    const skillName =
                      value.skill === "special_pharmacy"
                        ? "Special Pharmacy"
                        : value.skill === "potion_creation"
                        ? "Potion Creation"
                        : "Mixed Cooking";
                    const isSelected = selectedItemType === key;

                    return (
                      <Card
                        key={key}
                        size="small"
                        hoverable
                        onClick={() => handleItemSelect(key)}
                        style={{
                          cursor: "pointer",
                          border: isSelected
                            ? "2px solid #1890ff"
                            : "1px solid #d9d9d9",
                          backgroundColor: isSelected ? "#f0f8ff" : "white",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          <img
                            src={value.icon}
                            alt={value.name}
                            style={{ width: "32px", height: "32px" }}
                          />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: "bold" }}>
                              {value.name}
                            </div>
                            <div style={{ color: "#666", fontSize: "12px" }}>
                              {skillName}
                            </div>
                            <div
                              style={{
                                color: rate >= 0 ? "#52c41a" : "#ff4d4f",
                                fontSize: "12px",
                              }}
                            >
                              Rate: {rate > 0 ? "+" : ""}
                              {rate}
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })
                )}
              </Space>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            title={`${t("characterStats.title")} - ${
              selectedItemData.skill === "special_pharmacy"
                ? t("itemSelection.specialPharmacy")
                : selectedItemData.skill === "potion_creation"
                ? t("itemSelection.potionCreation")
                : t("itemSelection.mixedCooking")
            }`}
            size="small"
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              onValuesChange={() => {
                // Save form data whenever any field changes
                setTimeout(() => {
                  const formValues = form.getFieldsValue();
                  const dataToSave = {
                    selectedItemType,
                    formValues,
                    isFormulaCollapsed,
                  };
                  saveData(dataToSave);
                }, 100);
              }}
              initialValues={{
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
                itemType: selectedItemType,
              }}
            >
              <Form.Item name="itemType" style={{ display: "none" }}>
                <input type="hidden" />
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label={t("characterStats.int")}
                    name="int"
                    rules={[
                      { required: true, message: t("validation.intRequired") },
                    ]}
                  >
                    <InputNumber min={1} max={999} style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label={t("characterStats.dex")}
                    name="dex"
                    rules={[
                      { required: true, message: t("validation.dexRequired") },
                    ]}
                  >
                    <InputNumber min={1} max={999} style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label={t("characterStats.luk")}
                    name="luk"
                    rules={[
                      { required: true, message: t("validation.lukRequired") },
                    ]}
                  >
                    <InputNumber min={1} max={999} style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
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
                    <InputNumber min={1} max={70} style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              </Row>

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
                <InputNumber min={1} max={999} style={{ width: "100%" }} />
              </Form.Item>

              <Divider>{t("characterStats.skills")}</Divider>

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
                <InputNumber min={0} max={10} style={{ width: "100%" }} />
              </Form.Item>

              {selectedItemData.skill === "special_pharmacy" && (
                <>
                  <Form.Item
                    label={t("characterStats.fullChemicalProtectionLevel")}
                    name="fullChemicalProtectionLevel"
                    rules={[
                      { required: true, message: t("validation.fcpRequired") },
                    ]}
                  >
                    <InputNumber min={0} max={5} style={{ width: "100%" }} />
                  </Form.Item>

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
                    <InputNumber min={1} max={10} style={{ width: "100%" }} />
                  </Form.Item>
                </>
              )}

              {selectedItemData.skill === "potion_creation" && (
                <>
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
                    <InputNumber min={0} max={10} style={{ width: "100%" }} />
                  </Form.Item>

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
                    <InputNumber min={0} max={5} style={{ width: "100%" }} />
                  </Form.Item>
                </>
              )}

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isCalculating}
                  size="large"
                  style={{ width: "100%" }}
                >
                  {t("characterStats.calculateButton")}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          {results.length > 0 && (
            <Space direction="vertical" style={{ width: "100%" }} size="large">
              <Card title={t("simulationResults.title")} size="small">
                <Row gutter={16}>
                  <Col span={24}>
                    <Statistic
                      title={t("simulationResults.skillUsed")}
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
                      title={t("simulationResults.averageCreationValue")}
                      value={avgCreation}
                      precision={2}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title={t("simulationResults.averageItemsCreated")}
                      value={avgPotions}
                      precision={2}
                    />
                  </Col>
                </Row>
              </Card>

              <Card
                title={t("simulationResults.probabilityTitle")}
                size="small"
              >
                <Space direction="vertical" style={{ width: "100%" }}>
                  {statistics.map((stat) => (
                    <Alert
                      key={stat.potions}
                      message={`${stat.potions} ${t(
                        "simulationResults.potions"
                      )}: ${stat.percentage}%`}
                      description={`${stat.count} ${t(
                        "simulationResults.outOf"
                      )} ${results.length} ${t(
                        "simulationResults.simulations"
                      )}`}
                      type={
                        stat.potions >= 8
                          ? "success"
                          : stat.potions >= 5
                          ? "warning"
                          : "error"
                      }
                      showIcon
                    />
                  ))}
                </Space>
              </Card>

              <Collapse
                size="small"
                activeKey={isFormulaCollapsed ? [] : ["formula"]}
                onChange={(keys) => {
                  const isOpen = keys.includes("formula");
                  setIsFormulaCollapsed(!isOpen);
                }}
                items={[
                  {
                    key: "formula",
                    label: t("formulaInfo.title"),
                    children:
                      skillUsed === "special_pharmacy" ? (
                        <>
                          <Text>
                            <strong>
                              {t("formulaInfo.specialPharmacy.creationFormula")}
                            </strong>
                            <br />
                            {t(
                              "formulaInfo.specialPharmacy.creationFormulaText"
                            )}
                          </Text>
                          <br />
                          <br />
                          <Text>
                            <strong>
                              {t(
                                "formulaInfo.specialPharmacy.difficultyFormula"
                              )}
                            </strong>
                            <br />
                            {t(
                              "formulaInfo.specialPharmacy.difficultyFormulaText"
                            )}
                          </Text>
                          <br />
                          <br />
                          <Text>
                            <strong>
                              {t(
                                "formulaInfo.specialPharmacy.successConditions"
                              )}
                            </strong>
                            <br />•{" "}
                            {t("formulaInfo.specialPharmacy.condition1")}
                            <br />•{" "}
                            {t("formulaInfo.specialPharmacy.condition2")}
                            <br />•{" "}
                            {t("formulaInfo.specialPharmacy.condition3")}
                            <br />•{" "}
                            {t("formulaInfo.specialPharmacy.condition4")}
                            <br />•{" "}
                            {t("formulaInfo.specialPharmacy.condition5")}
                          </Text>
                        </>
                      ) : skillUsed === "potion_creation" ? (
                        <>
                          <Text>
                            <strong>
                              {t(
                                "formulaInfo.potionCreation.brewingRateFormula"
                              )}
                            </strong>
                            <br />
                            {t(
                              "formulaInfo.potionCreation.brewingRateFormulaText"
                            )}
                          </Text>
                          <br />
                          <br />
                          <Text>
                            <strong>
                              {t("formulaInfo.potionCreation.successCondition")}
                            </strong>
                            <br />
                            {t(
                              "formulaInfo.potionCreation.successConditionText1"
                            )}
                            <br />
                            {t(
                              "formulaInfo.potionCreation.successConditionText2"
                            )}
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
                            {t(
                              "formulaInfo.mixedCooking.difficultyFormulaText"
                            )}
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
                      ),
                  },
                ]}
              />
            </Space>
          )}

          {results.length === 0 && (
            <Card>
              <div style={{ textAlign: "center", padding: "48px 0" }}>
                <Text type="secondary">{t("simulationResults.noResults")}</Text>
              </div>
            </Card>
          )}

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
                      <Text strong>{t("materialsSection.requiredBook")}</Text>
                      <div
                        style={{
                          marginTop: "8px",
                          padding: "8px",
                          backgroundColor: "#f5f5f5",
                          borderRadius: "4px",
                        }}
                      >
                        <Text>{selectedItemData.book}</Text>
                      </div>
                    </div>
                  )}

                  <div>
                    <Text strong>{t("materialsSection.materialsNeeded")}</Text>
                    <div style={{ marginTop: "8px" }}>
                      <Space
                        direction="vertical"
                        style={{ width: "100%" }}
                        size="small"
                      >
                        {selectedItemData.materials.map((material, index) => (
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
                              <Text>{material.name}</Text>
                            </div>
                            <div>
                              <Text strong>×{material.quantity}</Text>
                            </div>
                          </div>
                        ))}
                      </Space>
                    </div>
                  </div>
                </Space>
              </Card>
            )}
        </Col>
      </Row>
    </div>
  );
}

export default App;
