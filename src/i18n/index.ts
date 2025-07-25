import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import pt from "./locales/pt.json";
import { LANGUAGE_STORAGE_KEY } from "../constants";

const resources = {
  en: {
    translation: en,
  },
  pt: {
    translation: pt,
  },
};

const getSavedLanguage = (): string => {
  try {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return savedLanguage && ["en", "pt"].includes(savedLanguage)
      ? savedLanguage
      : "en";
  } catch (error) {
    console.error("Error loading saved language:", error);
    return "en";
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: getSavedLanguage(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
