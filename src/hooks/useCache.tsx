import { useContext, useEffect, useState } from "react";
import { CacheContext, ICacheContext } from "../context/CacheContext";
function useCache<T>(
  key: string,
  funct: () => Promise<T>,
  defaultValue: any = undefined
): [data: T, trigger: (fn?: any) => void] {
  const { getCache, triggerCache } = useContext(CacheContext) as ICacheContext;
  const trigger = (fn?: any) => {
    if (fn != undefined) {
      triggerCache(key, fn);
      return;
    }
    if (fn == undefined) {
      triggerCache(key, funct);
      return;
    }
  };
  const [data, setData] = useState<T>(defaultValue);
  const getData = async () => {
    const res = await getCache(key, funct);
    setData(res);
  };
  useEffect(() => {
    getData();
  }, [key]);
  return [data, trigger];
}

export default useCache;
