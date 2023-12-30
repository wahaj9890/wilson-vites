import { createI18n } from 'vue-i18n'
import en from './en.json'
import de from './de.json'
import sk from './sk.json'

function loadLocaleMessages() {
  const locales = [{ "en-GB": en}, { "de-DE": de }, { "sk-SK": sk }]
  const messages = {}
  locales.forEach(lang => {
    const key = Object.keys(lang)
    messages[key] = lang[key]
  })
  return messages
}

export default createI18n({
  locale: 'en-GB',
  fallbackLocale: 'en-GB',
  messages: loadLocaleMessages()
})













