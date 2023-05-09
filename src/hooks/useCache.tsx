import { useState, useContext } from "react";
import CryptoJS from "crypto-js";
import { CacheContext } from "../context/CacheContext";

interface CacheItem {
  id: string;
  data: any;
}

export default function useCache<T>(key: string, defaultValue: T) {
  const [data, setData] = useState<T>(defaultValue);
  const { cache, setcache } = useContext(CacheContext) as any;

  const encryptedKey = CryptoJS.AES.encrypt(key, "secret-key").toString();

  const triggerCache = async (value: T) => {
    const res = cache.filter((x: CacheItem) => x.id !== encryptedKey);
    const encryptedValue = CryptoJS.AES.encrypt(
      JSON.stringify(value),
      "secret-key"
    ).toString();
    res.push({ data: encryptedValue, id: encryptedKey });
    setcache([...res]);
  };

  const getCache = async () => {
    const res = cache?.find((x: CacheItem) => x.id === encryptedKey);
    if (res === undefined) {
      setData(defaultValue);
    } else {
      const decryptedData = CryptoJS.AES.decrypt(
        res.data,
        "secret-key"
      ).toString(CryptoJS.enc.Utf8);
      setData(JSON.parse(decryptedData));
    }
  };

  getCache();

  return [data, triggerCache];
}
