import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const CacheContext = createContext({});
export interface ICacheContext {
  getCache: (id: string, fn?: () => any) => any;
  triggerCache: (id: any, data: any) => void;
  clearCache: () => void;
  cache?: any;
}
export const CacheProvider = ({ children }: { children: any }) => {
  //* using useLocalStorage to useState, save information in cache name
  const [cache, setcache] = useLocalStorage<{ id: string; data: any }[]>(
    "cache",
    []
  );
  return (
    <CacheContext.Provider value={{ cache, setcache }}>
      {children}
    </CacheContext.Provider>
  );
};
