import React from 'react'

import { setCookie } from '@utils/helpers'

import type { Theme, ThemeContextProps } from './ThemeContext'
import { ThemeContext } from './ThemeContext'

import darkTheme from '@static/theme/dark/dark.module.css'
import lightTheme from '@static/theme/light/light.module.css'

type ThemeProviderProps = Omit<ThemeContextProps, 'setTheme'> & {
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ theme, children }) => {
  const [currentTheme, setCurrentTheme] = React.useState(theme)

  const setTheme = (theme: Theme) => {
    setCookie('doggee-theme', theme)
    setCurrentTheme(theme)
  }

  const value = React.useMemo(() => ({ theme: currentTheme, setTheme }), [currentTheme])

  return (
    <ThemeContext.Provider value={value}>
      <div className={currentTheme === 'dark' ? darkTheme.container : lightTheme.container}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}
