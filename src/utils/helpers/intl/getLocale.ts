const ACCEPT_LOCALES = ['ru', 'en-US'] as const
export const DEFAULT_LOCALE = ACCEPT_LOCALES[0]

export const getLocale = (): typeof ACCEPT_LOCALES[number] => {
  if (ACCEPT_LOCALES.find((el) => el === navigator.language)) {
    return navigator.language as typeof ACCEPT_LOCALES[number]
  }
  return DEFAULT_LOCALE
}
