import React from "react";
import styled from "styled-components";
import Card from "../Card/Card";
// שורת ארבעת הכרטיסים, מציג את ארבעת כרטיסי הסיכום ומחשב את המספרים שלהם
const List = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  padding: 20px;
  box-sizing: border-box;
`;
// פרופס: הרשימה המלאה טאסקס

const CardList = ({ tasks }) => {
  // הוא סופר total = tasks.length ומשתמש ב .filter(...).length כדי לספור כמה משימות הם בסטטוס completed, todo, in progress 
  const total = tasks.length;
  const todo = tasks.filter((t) => t.status === "To Do").length;
  const inProgress = tasks.filter((t) => t.status === "In Progress").length;
  const completed = tasks.filter((t) => t.status === "Completed").length;
//  הוא מעביר את המספרים הללו לתוך ארבעה רכיבי קארד מכיוון שהספירות מחושבות מתוך תאסקס, הן מתעדכנות באופן אוטומטי 
// בכל פעם שמשימה נוספת נמחקת או משנה סטטוס
  return (
    <List>
      <Card cn="purple" title="TOTAL TASKS" num={total} />
      <Card cn="white" title="TO DO" num={todo} />
      <Card cn="blue" title="IN PROGRESS" num={inProgress} />
      <Card cn="green" title="COMPLETED" num={completed} />
    </List>
  );
};

export default CardList;
