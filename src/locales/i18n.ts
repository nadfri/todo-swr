import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from '@/locales/enGB.json';
import frTranslation from '@/locales/fr.json';
import arTranslation from '@/locales/ar.json';
import { fr, ar, enGB } from 'date-fns/locale';

const resources = {
  fr: frTranslation,
  ar: arTranslation,
  enGB: enTranslation,
};
export type LangType = keyof typeof resources;

export const langs = Object.keys(resources) as LangType[];
export const dateFnsLocales = {
  fr,
  ar,
  enGB,
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    supportedLngs: langs /*Only langs present in ressources*/,
    fallbackLng: 'enGB',
    detection: {
      order: ['localStorage', 'navigator'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
