import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enTranslations from './Language/en/en.json'
import viTranslations from './Language/vn/vi.json'

const resources = {
  en: {
    translation: enTranslations
  },
  vi: {
    translation: viTranslations
  }
}

i18n
  .use(initReactI18next) 
  .init({
    resources,
    supportedLngs: ['en', 'vi'],
    lng: 'vi', 
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

export default i18n
