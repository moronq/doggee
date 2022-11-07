import React from 'react'

import { CacheContext } from './CacheContext'

interface CacheProviderProps {
  children: React.ReactNode
}

export const CacheProvider: React.FC<CacheProviderProps> = ({ children }) => {
  const [cache, setCache] = React.useState({})
  const value = React.useMemo(() => ({ cache, setCache }), [cache])
  return <CacheContext.Provider value={value}>{children}</CacheContext.Provider>
}
