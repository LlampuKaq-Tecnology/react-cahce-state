import { createContext, useState } from "react";
import useStorageState from "react-use-storage-state";
export const CacheContext = createContext({});
export interface ICacheContext {
  getCache: (id: any, fn: () => any) => any;
  triggerCache: (id: any, data: any) => void;
  clearCache: () => void;
}
export const CacheProvider = ({ children }: { children: any }) => {
  const [cache, setcache] = useStorageState<any[]>("cache", []);
  const triggerCache = async (id: any, fn: any) => {
    if (typeof fn == "function") {
      const data = await fn();
      const res = cache.filter((x) => x.id == id);
      res.push({ data, id });
      setcache([...res]);
      return;
    }
    if (typeof fn != "function") {
      const res = cache.filter((x) => x.id == id);
      res.push({ fn, id });
      setcache([...res]);
      return;
    }
  };
  const clearCache = () => {
    setcache([]);
  };
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
