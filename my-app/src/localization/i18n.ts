import i18n from 'i18next';
import languageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import translationEN from './en';
import translationRU from './ru';

const resources = {
  en: {
    translation: translationEN,
  },
  ru: {
    translation: translationRU,
  },
};
i18n
  .use(Backend)
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV !== 'production',
    detection: {
      order: ['queryString', 'cookie'],
      caches: ['cookie'],
    },
    keySeparator: '.',
    interpolation: { escapeValue: false },
  });

export default i18n;
