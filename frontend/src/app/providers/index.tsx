import React from 'react';
import { store, StoreContext } from '@/entities/user';


export const AppProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <StoreContext.Provider value={{store}}>
      { children }
    </StoreContext.Provider>
  );
}