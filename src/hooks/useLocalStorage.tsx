import { useState, useEffect } from "react";

import CryptoJS from "crypto-js";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const localStorageItem = window.localStorage.getItem(key);
      const sessionStorageItem = window.sessionStorage.getItem(key);

      if (localStorageItem) {
        // Decrypt stored value
        try {
          const bytes = CryptoJS.AES.decrypt(localStorageItem, "encryptionKey");
          const decryptedItem = bytes.toString(CryptoJS.enc.Utf8);
          const parsedItem = JSON.parse(decryptedItem);
          return parsedItem;
        } catch (error) {
          console.log("Error while decrypting or parsing JSON:", error);
        }
      } else if (sessionStorageItem) {
        // Move data from sessionStorage to localStorage
        try {
          const bytes = CryptoJS.AES.decrypt(
            sessionStorageItem,
            "encryptionKey"
          );
          const decryptedItem = bytes.toString(CryptoJS.enc.Utf8);
          const parsedItem = JSON.parse(decryptedItem);
          // Store the data in localStorage
          const encryptedValue = CryptoJS.AES.encrypt(
            decryptedItem,
            "encryptionKey"
          ).toString();
          window.localStorage.setItem(key, encryptedValue);
          // Remove the data from sessionStorage
          window.sessionStorage.removeItem(key);
          return parsedItem;
        } catch (error) {
          console.log("Error while decrypting or parsing JSON:", error);
        }
      }

      return initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      const valueToStore =
        typeof storedValue === "object"
          ? JSON.stringify(storedValue)
          : storedValue;
      // Encrypt the value before storing it
      const encryptedValue = CryptoJS.AES.encrypt(
        //@ts-ignore
        valueToStore,
        "encryptionKey"
      ).toString();
      window.localStorage.setItem(key, encryptedValue);
    } catch (error) {
      console.log("Error while setting item in localStorage:", error);
    }
  }, [key, storedValue]);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
    } catch (error) {
      console.log("Error while setting item in localStorage:", error);
    }
  };

  return [storedValue, setValue] as const;
}
