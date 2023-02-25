import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const CacheContext = createContext({});
export interface ICacheContext {
  getCache: (id: string, fn: () => any) => any;
  triggerCache: (id: any, data: any) => void;
  clearCache: () => void;
}
export const CacheProvider = ({ children }: { children: any }) => {
  //* using useLocalStorage to useState, save information in cache name
  const [cache, setcache] = useLocalStorage<{ id: string; data: any }[]>(
    "cache",
    []
  );
  //* trigger to update cache
  const triggerCache = async (id: string, fn: any) => {
    if (typeof fn == "function") {
      const data = await fn();
      const res = cache.filter((x) => x.id != id);
      res.push({ data, id });
      setcache([...res]);
      return;
    }
    if (typeof fn != "function") {
      const res = cache.filter((x) => x.id != id);
      res.push({ data: fn, id });
      setcache([...res]);
      return;
    }
  };
  //* funcion for clear cache
  const clearCache = () => {
    setcache([]);
  };
  //* function for get data information
  const getCache = async (id: any, fn: () => any) => {
    const res = cache?.find((x) => x.id == id);
    if (res == undefined) {
      const rs = await fn();
      cache.push({ data: rs, id });
      setcache([...cache]);
      return rs;
    } else {
      return res.data;
    }
  };

  return (
    <CacheContext.Provider value={{ getCache, triggerCache, clearCache }}>
      {children}
    </CacheContext.Provider>
  );
};
