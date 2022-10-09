import React from 'react'

import type { TranslateMessage } from '@features'
import { useIntl } from '@features'

interface IntlTextProps extends TranslateMessage {
  children?: (message: string) => React.ReactNode
}

export const IntlText: React.FC<IntlTextProps> = ({ path, values, children }) => {
  const intl = useIntl()
  if (children && typeof children === 'function') {
    return <>{children(intl.translateMessage(path, values))}</>
  }

  return <>{intl.translateMessage(path, values)}</>
}
