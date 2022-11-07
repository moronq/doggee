import React from 'react'

export interface CacheContextProps {
  cache: $TSFixMe
  setCache: React.Dispatch<React.SetStateAction<$TSFixMe>>
}

export const CacheContext = React.createContext<CacheContextProps>({
  cache: {},
  setCache: () => {}
})
