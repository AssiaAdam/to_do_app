import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

// לפני כל בדיקה מנקים את localStorage כדי שכל בדיקה תתחיל בלי משימות
beforeEach(() => {
  localStorage.clear();
});

// פונקציית עזר: מוסיפה משימה חדשה דרך הטופס
const addTask = (name, dueDate = "2999-01-01") => {
  fireEvent.click(screen.getByText("+ Add Task"));
  fireEvent.change(screen.getByPlaceholderText("e.g. Redesign homepage hero"), {
    target: { value: name },
  });
  // יש שני שדות תאריך, השני הוא תאריך היעד
  const dateInputs = document.querySelectorAll('input[type="date"]');
  fireEvent.change(dateInputs[1], { target: { value: dueDate } });
  fireEvent.click(screen.getByText("Save Task"));
};

test("האפליקציה מציגה את הכותרת", () => {
  render(<App />);
  expect(screen.getByText("DoListic")).toBeInTheDocument();
});

test("הוספת משימה חדשה", () => {
  render(<App />);
  addTask("Buy milk");
  expect(screen.getByText("Buy milk")).toBeInTheDocument();
  expect(screen.getByText("Showing 1 of 1 tasks")).toBeInTheDocument();
});

test("אי אפשר לשמור משימה בלי שם", () => {
  render(<App />);
  fireEvent.click(screen.getByText("+ Add Task"));
  fireEvent.click(screen.getByText("Save Task"));
  expect(screen.getByText("Please enter a task name.")).toBeInTheDocument();
});

test("לחיצה על הסטטוס מעבירה לסטטוס הבא", () => {
  render(<App />);
  addTask("Buy milk");
  const status = screen.getByTitle("Click to change status");
  expect(status).toHaveTextContent("To Do");
  fireEvent.click(status);
  expect(status).toHaveTextContent("In Progress");
});

test("מחיקת משימה", () => {
  render(<App />);
  addTask("Buy milk");
  // כפתור המחיקה בשורה
  fireEvent.click(screen.getByText("Delete"));
  // כפתור המחיקה בחלון האישור
  const deleteButtons = screen.getAllByText("Delete");
  fireEvent.click(deleteButtons[deleteButtons.length - 1]);
  expect(screen.queryByText("Buy milk")).not.toBeInTheDocument();
});

test("חיפוש משימה לפי שם", () => {
  render(<App />);
  addTask("Buy milk");
  addTask("Call mom");
  fireEvent.change(screen.getByPlaceholderText("Search tasks by name..."), {
    target: { value: "milk" },
  });
  expect(screen.getByText("Buy milk")).toBeInTheDocument();
  expect(screen.queryByText("Call mom")).not.toBeInTheDocument();
});

// בדיקות לתאריכים (formatDate ו isOverdue שנמצאות ב TodoItem)
test("תאריך היעד מוצג בצורה קריאה", () => {
  render(<App />);
  addTask("Buy milk", "2999-07-16");
  expect(screen.getByText("Jul 16, 2999")).toBeInTheDocument();
});

test("משימה שתאריך היעד שלה עבר מסומנת Overdue", () => {
  render(<App />);
  addTask("Old task", "2020-01-01");
  expect(screen.getByText(/Overdue/)).toBeInTheDocument();
});

test("משימה בתאריך עתידי לא מסומנת Overdue", () => {
  render(<App />);
  addTask("New task", "2999-01-01");
  expect(screen.queryByText(/Overdue/)).not.toBeInTheDocument();
});

test("משימה שהושלמה לא מסומנת Overdue", () => {
  render(<App />);
  addTask("Old task", "2020-01-01");
  const status = screen.getByTitle("Click to change status");
  fireEvent.click(status); // In Progress
  fireEvent.click(status); // Completed
  expect(screen.queryByText(/Overdue/)).not.toBeInTheDocument();
});

// בדיקות ללוגים
test("הוספת משימה נכתבת ללוג", () => {
  render(<App />);
  addTask("Buy milk");
  const logs = JSON.parse(localStorage.getItem("appLogs"));
  expect(logs[logs.length - 1]).toContain('INFO Task added: "Buy milk"');
});

test("שגיאה בשמירה נכתבת ללוג", () => {
  render(<App />);
  fireEvent.click(screen.getByText("+ Add Task"));
  fireEvent.click(screen.getByText("Save Task"));
  const logs = JSON.parse(localStorage.getItem("appLogs"));
  expect(logs[logs.length - 1]).toContain("ERROR Save failed: missing task name");
});

// בדיקות לאבטחה
test("אי אפשר לשמור משימה עם שם ארוך מדי", () => {
  render(<App />);
  addTask("a".repeat(101));
  expect(screen.getByText("Task name can be up to 100 characters.")).toBeInTheDocument();
});

test("האפליקציה לא קורסת כשהמידע ב localStorage פגום", () => {
  localStorage.setItem("todoTasks", "not json");
  render(<App />);
  expect(screen.getByText("Showing 0 of 0 tasks")).toBeInTheDocument();
});
