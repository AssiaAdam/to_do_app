import React, { useState } from "react";
import styled from "styled-components";
import Input from "../Input/Input";
import Select from "../Select/Select";
import Button from "../Button/Button";
import Task from "../Task/Task";

// הסרגל שמתחת לכרטיסים . סרגל החיפוש, מסננים, מיון, הוספה
const Bar = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  box-sizing: border-box;

  input {
    flex: 1;
    height: 44px;
    padding: 0 15px;
    border: 1px solid #e5e5e5;
    border-radius: 10px;
    background-color: #fafafa;
    color: #333;
    font-size: 15px;
    box-sizing: border-box;
  }
  input::placeholder {
    color: #9a9a9a;
  }

  select {
    height: 44px;
    padding: 0 15px;
    border: 1px solid #e5e5e5;
    border-radius: 10px;
    background-color: #ffffff;
    color: #333;
    font-size: 15px;
    cursor: pointer;
  }
`;
// פרופס: onAdd בנוסף לכל  (value) של המסנן וה setter (מעדכן את הערך) שלו
// (`search`/`setSearch`,`category`/`setCategory`, `priority`/`setPriority`, `status`/`setStatus`, `sortBy`/`setSortBy`)
// state עצמאי משלו, האם חלון המודאל ליצירת משימה חדשה פתוח?
const FilterToolBar = ({
  onAdd,
  search,
  setSearch,
  category,
  setCategory,
  priority,
  setPriority,
  status,
  setStatus,
  sortBy,
  setSortBy,
}) => {
  const [showAdd, setShowAdd] = useState(false);
// הוא מרנדר (מציג) את האינפוט של החיפוש, ארבעה רכיבי select (קטגוריות, עדיפות, ססטוס, מיון לפי) ואת הכפתור הכחול של "+Add Task "
// רכיב בשם Bar הוא קופסת עיצוב שמקיפה את כל התיבות שבתוכה. מעצב את אלמנטי input and select המוכלים בתוכו כדי שכולם יהיו אחידים
  return (
    <>
      <Bar>
        <Input
          cn="searchInput"
          ph="Search tasks by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          cn="categories"
          name="category"
          id="category"
          title="All Categories"
          items={["Study", "Online Teaching", "Shopping", "Car", "Leisure", "Family", "Friends", "Emails", "Sports", "Appointments", "Errands", "Travel", "Other"]}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Select
          cn="prioritySelect"
          name="priority"
          id="priority"
          title="All Priority"
          items={["High", "Medium", "Low"]}
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        />
        <Select
          cn="statusSelect"
          name="status"
          id="status"
          title="All Status"
          items={["To Do", "In Progress", "Completed"]}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <Select
          cn="sortSelect"
          name="sort"
          id="sort"
          title="Sort by"
          items={["Due Date", "Priority", "Category"]}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        />
        <Button cn="blueButton" text="+ Add Task" onClick={() => setShowAdd(true)} />
      </Bar>
      {showAdd && (
        <Task
          onClose={() => setShowAdd(false)}
          onSave={(newTask) => {
            onAdd(newTask);
            setShowAdd(false);
          }}
        />
      )}
    </>
  );
};
// כאשר לוחצים על  +הוסף משימה, showAdd הופך ל true ומציג המודאל של task. שמירה מפעילה את onAdd(newTAsk)
//  (שהוא בעצם ה addTask מ TodoApp) וסוגרת את המודאל
// שינוי בקטגוריות כאן מחייב גם שינוי בתיקיית טאסק

export default FilterToolBar;
