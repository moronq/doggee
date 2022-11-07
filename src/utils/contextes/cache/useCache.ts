import React from 'react'

import { CacheContext } from './CacheContext'

export const useCache = () => {
  const { setCache, cache } = React.useContext(CacheContext)
  return { cache, setCache }
}
