import React from 'react';
import { store, StoreContext } from '@/entities/user/store';


export const AppProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <StoreContext.Provider value={{store}}>
      { children }
    </StoreContext.Provider>
  );
}