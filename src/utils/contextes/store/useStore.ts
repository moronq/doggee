import React from 'react'

import { StoreContext } from './StoreConext'

export const useStore = () => {
  const store = React.useContext(StoreContext)
  return { ...store, setStore: store.setStore }
}
