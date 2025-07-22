import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import pt from "./locales/pt.json";

const resources = {
  en: {
    translation: en,
  },
  pt: {
    translation: pt,
  },
};

// Get saved language from localStorage or default to 'en'
const getSavedLanguage = (): string => {
  try {
    const savedLanguage = localStorage.getItem("ragnarok-simulator-language");
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
  lng: getSavedLanguage(), // use saved language or default
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
