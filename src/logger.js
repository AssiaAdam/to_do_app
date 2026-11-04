// כתיבת לוגים: כל הודעה מקבלת תאריך ושעה, מודפסת ל console ונשמרת ב localStorage תחת המפתח appLogs

const saveLog = (line) => {
  let logs = [];
  // אם הלוגים השמורים פגומים מתחילים רשימה חדשה
  try {
    logs = JSON.parse(localStorage.getItem("appLogs") || "[]");
  } catch (e) {
    logs = [];
  }
  logs.push(line);
  localStorage.setItem("appLogs", JSON.stringify(logs));
};

// logInfo לפעולות רגילות (הוספה, עריכה, מחיקה)
export const logInfo = (message) => {
  const line = `${new Date().toISOString()} INFO ${message}`;
  console.log(line);
  saveLog(line);
};

// logError לשגיאות
export const logError = (message) => {
  const line = `${new Date().toISOString()} ERROR ${message}`;
  console.error(line);
  saveLog(line);
};
