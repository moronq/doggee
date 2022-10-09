import React from 'react'

import { IntlContext } from '@features'

export interface TranslateMessage {
  path: string
  values?: Record<string, string | number | boolean>
}

export const useIntl = () => {
  const intl = React.useContext(IntlContext)

  const translateMessage = (
    path: TranslateMessage['path'],
    values?: TranslateMessage['values']
  ) => {
    if (!intl.messages[path]) return path
    if (!values) return intl.messages[path]

    let translate = intl.messages[path]
    for (const key in values) {
      translate = translate.replace(`${key}`, String(values[key]))
    }
    return translate
  }
  return { ...intl, translateMessage }
}
