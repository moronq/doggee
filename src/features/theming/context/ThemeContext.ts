import React from 'react'

type Theme = 'light' | 'dark'

export interface ThemeContextProps {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const ThemeContext = React.createContext<ThemeContextProps>({
  theme: 'light',
  setTheme: () => {}
})
