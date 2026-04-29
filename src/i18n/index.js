import { createI18n } from 'vue-i18n'
import es from './es.json'
import en from './en.json'

export const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('userIdioma') || 'es',
  fallbackLocale: 'es',
  messages: { es, en },
})
