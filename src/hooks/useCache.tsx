import { useState, useEffect, useContext } from "react";
import CryptoJS from "crypto-js";
import { CacheContext } from "../context/CacheContext";
interface CacheItem {
  id: string;
  data: any;
}

export default function useCache<T>(
  key: string,
  defaultValue: T | undefined = undefined
): [data: T, fn: (data: any) => void] {
  const [data, setData] = useState<T | undefined>(defaultValue);
  const { cache, setcache } = useContext(CacheContext) as {
    cache: CacheItem[];
    setcache: (cache: CacheItem[]) => void;
  };

  const triggerCache = (value: T): void => {
    const encryptedValue = CryptoJS.AES.encrypt(
      JSON.stringify(value),
      "secret-key"
    ).toString();
    const res = cache?.filter((x: CacheItem) => x.id !== key);
    res.push({ data: encryptedValue, id: key });
    setcache([...res]);
    setData(value);
  };

  useEffect(() => {
    const res = cache?.find((x: CacheItem) => x.id === key);
    if (res === undefined) {
      setData(defaultValue);

      const encryptedValue = CryptoJS.AES.encrypt(
        JSON.stringify(defaultValue),
        "secret-key"
      ).toString();

      const newCache = [...cache, { data: encryptedValue, id: key }];
      setcache(newCache);
    } else {
      const decryptedData = CryptoJS.AES.decrypt(
        res.data,
        "secret-key"
      ).toString(CryptoJS.enc.Utf8);

      const parsedData = JSON.parse(decryptedData);
      if (parsedData !== data) {
        setData(parsedData);
      }
    }
  }, []);
  //@ts-ignore
  return [data, triggerCache];
}
