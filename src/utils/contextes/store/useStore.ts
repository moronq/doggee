import React from 'react'

import { StoreContext } from './StoreContext'

export const useStore = () => {
  const store = React.useContext(StoreContext)
  return { ...store, setStore: store.setStore }
}
