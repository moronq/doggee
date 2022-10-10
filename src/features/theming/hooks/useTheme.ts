import React from 'react'

import { ThemeContext } from '@features'

export const useTheme = () => {
  const theme = React.useContext(ThemeContext)
  return theme
}
