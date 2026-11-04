import { useState, useEffect } from "react";
import { logError } from "../logger";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);

    if (stored) {
      // אם המידע השמור פגום JSON.parse זורק שגיאה, ואז מתחילים מחדש במקום שהאפליקציה תקרוס
      try {
        return JSON.parse(stored);
      } catch (e) {
        logError(`Could not read "${key}" from localStorage`);
        return initialValue;
      }
    }

    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
