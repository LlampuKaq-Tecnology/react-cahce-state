import React, { useContext } from "react";
import { CacheContext, ICacheContext } from "../context/CacheContext";
function useCache(key: string, funct: () => void) {
  const { getCache, triggerCache } = useContext(CacheContext) as ICacheContext;
  const trigger = (fn: any) => {
    if (fn != undefined) {
      triggerCache(key, fn);
      return;
    }
    if (fn == undefined) {
      triggerCache(key, funct);
      return;
    }
  };
  return [getCache(key, funct), trigger];
}

export default useCache;
