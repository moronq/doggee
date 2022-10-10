import React from 'react'

import type { ThemeContextProps } from './ThemeContext'
import { ThemeContext } from './ThemeContext'

import darkTheme from '../themes/dark.module.css'
import lightTheme from '../themes/light.module.css'

type ThemeProviderProps = Omit<ThemeContextProps, 'setTheme'> & {
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ theme, children }) => {
  const [currentTheme, setCurrentTheme] = React.useState(theme)
  const value = React.useMemo(
    () => ({ theme: currentTheme, setTheme: setCurrentTheme }),
    [currentTheme]
  )

  return (
    <ThemeContext.Provider value={value}>
      <div className={currentTheme === 'dark' ? darkTheme.container : lightTheme.container}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}
