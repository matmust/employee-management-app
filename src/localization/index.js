import { en } from './en.js';
import { tr } from './tr.js';

// Available locales
const locales = {
  en,
  tr
};

// Default locale
const DEFAULT_LOCALE = 'en';

// Custom event for language changes
export const LANGUAGE_CHANGE_EVENT = 'language-changed';

// Get current locale from HTML lang attribute
export function getLocale() {
  const htmlLang = document.documentElement.lang.toLowerCase();
  return htmlLang === 'tr' ? 'tr' : 'en';
}

// Set locale and dispatch event
export function setLocale(lang) {
  document.documentElement.lang = lang;
  window.dispatchEvent(new CustomEvent(LANGUAGE_CHANGE_EVENT, { 
    detail: { locale: lang } 
  }));
}

// Get translation by key
export function t(key, locale = getLocale()) {
  const translations = locales[locale] || locales[DEFAULT_LOCALE];
  const keys = key.split('.');
  
  let result = translations;
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k];
    } else {
      console.warn(`Translation missing for key: ${key} in locale ${locale}`);
      // Fall back to English
      if (locale !== DEFAULT_LOCALE) {
        return t(key, DEFAULT_LOCALE);
      }
      return key;
    }
  }
  return result;
}

// Format date according to locale
export function formatDate(dateString, locale = getLocale()) {
  if (!dateString) return '';
  
  // Parse the date (assuming date format is DD/MM/YYYY)
  const parts = dateString.split('/');
  if (parts.length !== 3) return dateString;
  
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Months are 0-indexed
  const year = parseInt(parts[2], 10);
  
  const date = new Date(year, month, day);
  
  // Format based on locale
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Intl.DateTimeFormat(locale === 'tr' ? 'tr-TR' : 'en-US', options).format(date);
}

// Format phone number according to locale
export function formatPhone(phone, locale = getLocale()) {
  if (!phone) return '';
  
  // Simple formatting for demonstration
  return phone;
}
