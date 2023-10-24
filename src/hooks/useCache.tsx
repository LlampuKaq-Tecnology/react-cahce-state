import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
export default function useCache<T>(
  key: string,
  defaultValue: T | undefined = undefined
): [data: T | undefined, s: (value: any) => void] {
  const [data, setData] = useLocalStorage<T | undefined>(key, defaultValue);
  const triggerCache = (value: any): void => {
    setData(value);
  };
  useEffect(() => {
    const d = data;
    if (d != undefined) {
      const res = isData(d);
      if (res === "string" || res === "boolean") {
        setData(d);
      }
      if (res === "array") {
        //@ts-ignore
        setData([...d]);
      }
      if (res === "object") {
        setData({ ...d });
      }
    }
  }, []);
  return [data, triggerCache];
}
export function isData(data: any) {
  if (typeof data === "string") {
    return "string";
  } else if (typeof data === "boolean") {
    return "boolean";
  } else if (Array.isArray(data)) {
    return "array";
  } else if (typeof data === "object" && data !== null) {
    return "object";
  } else {
    return "unknown";
  }
}
