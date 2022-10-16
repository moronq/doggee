import React from 'react'

import type { Store, StoreContextProps } from './StoreConext'
import { StoreContext } from './StoreConext'

type StoreProviderProps = Omit<StoreContextProps, 'setStore'> & {
  children: React.ReactNode
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ user, children }) => {
  const [store, setStore] = React.useState<Store>({ user })
  const value = React.useMemo(() => ({ ...store, setStore }), [user])
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
