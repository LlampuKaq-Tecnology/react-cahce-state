import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
export const CacheContext = createContext({});
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
