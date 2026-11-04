import React, { useState } from "react";
import Title from "../Title/Title";
import CardList from "../CardList/CardList";
import FilterToolBar from "../FilterToolbar/FilterToolBar";
import TodoList from "../TodoList/TodoList";
import { useLocalStorage } from "../../Hooks/useLocalStorage";
  
// המוח של האפליקציה, זה המקום שבו הנתונים והלוגיקה החשובים מתגוררים
const initialTasks = [];

const priorityRank = { High: 0, Medium: 1, Low: 2 };

const ToDoApp = () => {
  // שבבעלותו STATES ה
  // tasks מערך של כל המשימות נשמר באמצעות useLocalStorage 
  const [tasks, setTasks] = useLocalStorage("todoTasks", initialTasks);
// search, categoryFilter, priorityFilter, statusFilter, sortBy, הערכים שנבחרו בסרגל הכלים toolbar
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  
  // פונקציות שהוא מגדיר ומעביר למטה בתור פרופס
  // addTask(task) מוסיף משימה חדשה לסוף הרשימה ומעניק לה id ייחודי באמצעות Date.now()
  const addTask = (task) => {
    setTasks((prev) => [...prev, { ...task, id: Date.now() }]);
  };
 // updateTask(updated) מחליף את המשימה שה id שלה תואם בגרסה הערוכה (משמש בביצוע עריכה וגם בלחיצה על תווית הסטטוס)
  const updateTask = (updated) => {
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };
  // deleteTask(id) מסיר את המשימה בעלת ה id הזה
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // ערכים מחושבים
    // filteredTasks לוקח את ה tasks ומפעיל בשרשור .filter() ארבע פעמים, לפי טקסט חיפוש, קטגוריה, עדיפות, וסטטוס
  const filteredTasks = tasks
    .filter((t) => t.task.toLowerCase().includes(search.trim().toLowerCase()))
    .filter((t) => (categoryFilter ? t.category === categoryFilter : true))
    .filter((t) => (priorityFilter ? t.priority === priorityFilter : true))
    .filter((t) => (statusFilter ? t.status === statusFilter : true));

  // visibleTasks עותק של filteredTasks שמוין לאחר מכן לפי ה sortBy שנבחר (תאריך יעד עדיפות או קטגוריה)
  // אנחנו ממינים עותק כדי לעולם לא לשנות את הסדר המקורי של טאסקס
  const visibleTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "Due Date") return new Date(a.dueDate) - new Date(b.dueDate);
    if (sortBy === "Priority") return priorityRank[a.priority] - priorityRank[b.priority];
    if (sortBy === "Category") return a.category.localeCompare(b.category);
    return 0;
  });

    // מהו מרנדר (מציג)? 
    // title, cardList (מקבל את ה tasks המלא כדי שהספירות יציגו סך הכל אמיתי), FilterToolBar (מקבל את ערכי המסננים, הפונקציות לעדכונים setters ו addTask) 
    // TodoList מקבל את ה visibleTasks כך שהטבלה תציג את התצוגה המסוננת הממוינת
  return (
    <>
      <Title />
      <CardList tasks={tasks} />
      <FilterToolBar
        onAdd={addTask}
        search={search}
        setSearch={setSearch}
        category={categoryFilter}
        setCategory={setCategoryFilter}
        priority={priorityFilter}
        setPriority={setPriorityFilter}
        status={statusFilter}
        setStatus={setStatusFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <TodoList tasks={visibleTasks} onUpdate={updateTask} onDelete={deleteTask} />
      <small>Showing {visibleTasks.length} of {tasks.length} tasks</small>
    </>
  );
};

export default ToDoApp;
