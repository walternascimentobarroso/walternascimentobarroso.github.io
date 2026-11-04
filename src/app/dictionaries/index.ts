import en from "./en.json";
import pt from "./pt.json";

export const locales = ["en", "pt"] as const;
export type Locale = (typeof locales)[number];
export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = { en, pt };

export const getDictionary = (lang: Locale) => dictionaries[lang];
