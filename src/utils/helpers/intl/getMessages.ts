import { DEFAULT_LOCALE } from './getLocale'

const messages = {
  'en-US': { 'button.signIn': 'Sign In' },
  ru: { 'button.signIn': 'Войти' }
}

export const getMessages = (locale: keyof typeof messages) => {
  if (!messages[locale]) return messages[DEFAULT_LOCALE]
  return messages[locale]
}
