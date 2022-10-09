import React from 'react'

import type { IntlContextProps } from './IntlContext'
import { IntlContext } from './IntlContext'

type IntlProviderProps = IntlContextProps & { children: React.ReactNode }

export const IntlProvider: React.FC<IntlProviderProps> = ({ locale, messages, children }) => {
  const [intlValues, setIntlValues] = React.useState({ locale, messages })
  return <IntlContext.Provider value={intlValues}>{children}</IntlContext.Provider>
}
