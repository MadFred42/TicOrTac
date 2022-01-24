import { createContext, ReactNode, useContext } from 'react';
import { userStore, TStore } from './userStore';
import { useLocalObservable } from 'mobx-react-lite';

const StoreContext = createContext<TStore | null>(null);

export const StoreProvider = (props: { children: ReactNode }) => {
  const store = useLocalObservable(userStore);
  
  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const store = useContext(StoreContext);
  
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.')
  }

  return store;
}