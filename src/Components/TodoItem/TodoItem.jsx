import React from "react";
import styled from "styled-components";
import Button from "../Button/Button";
// שורה אחת, מציג משימה בודדת ואת הכפתורים שלה
// רכיבי עיצוב מיוצרים: row, num, TaskName, Category, DueDate, PrirityCol, StatusCol, Actions. 
// הם מיוצאים כדי ששורת הכותרת של TodoList  תוכל להשתמש בהם מחדש ןלהישאר מיושרות
export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  border-bottom: 1px solid #eef0f2;
  font-size: 14px;
  color: #4b5563;
  opacity: ${(props) => (props.$done ? 0.6 : 1)};
`;

//
const Col = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
`;
export const Num = styled(Col)`
  width: 40px;
  color: #9aa1ac;
`;
export const TaskName = styled(Col)`
  flex: 2;
  color: #1f2733;
  font-weight: 700;
  /*  */
  min-width: 0;
  overflow-wrap: anywhere;
  text-decoration: ${(props) => (props.$done ? "line-through" : "none")};
`;
export const Category = styled(Col)`
  flex: 1;
  color: #6b7ba6;
`;
//
export const DueDate = styled(Col)`
  flex: 1;
  color: ${(props) => (props.$overdue ? "#e5484d" : "inherit")};
  font-weight: ${(props) => (props.$overdue ? 600 : 400)};
`;
export const PriorityCol = styled(Col)`
  width: 120px;
`;
export const StatusCol = styled(Col)`
  width: 130px;
`;
export const Actions = styled(Col)`
  width: 170px;
  gap: 8px;
`;

// מיפוי צבעים colours maps : priority Colors and statusColors מעיניקים לכל דרגה עדיפות או סטטוס את צבעי התווית (פיל) שלהם
const Pill = styled.span`
  padding: 4px 12px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 13px;
  color: ${(props) => props.$color};
  background-color: ${(props) => props.$bg};
  cursor: ${(props) => (props.$clickable ? "pointer" : "default")};
`;

const priorityColors = {
  High: { color: "#e5484d", bg: "#fdeef0" },
  Medium: { color: "#c98a00", bg: "#fdf6e3" },
  Low: { color: "#16a34a", bg: "#eafaf0" },
};
const statusColors = {
  "To Do": { color: "#6b7280", bg: "#f3f4f6" },
  "In Progress": { color: "#2563eb", bg: "#eaf1ff" },
  Completed: { color: "#16a34a", bg: "#eafaf0" },
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// פונקציית עזר: formatDate תאריך קריא ונוח עבור הטבלה Jul 16, 2026
const formatDate = (value) => {
  if (!value) return "—";
  const d = new Date(value);
  if (isNaN(d.getTime())) return value;
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
};

// פונקציית עזר : isOverdue(dueDate, Status) מחזיר true אם תאריך היעד כבר עבר והמשימה אינה בסטטוס הושלמה. 
const isOverdue = (dueDate, status) => {
  if (!dueDate || status === "Completed") return false;
  const due = new Date(dueDate);
  if (isNaN(due.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);
  return due < today;
};
// PROPS:
const TodoItem = ({
  num,
  task,
  category,
  dueDate,
  priority,
  status,
  onEdit,
  onDelete,
  onToggleStatus,
}) => {
  const p = priorityColors[priority] || priorityColors.Medium;
  const s = statusColors[status] || statusColors["To Do"];
  const done = status === "Completed";
  const overdue = isOverdue(dueDate, status);
// מהו מרנדר\מציג?
//strikethroughושם המשימה מקבל קו חוצה $ done שם המשימה, כאשר המשימה בסטטוס הושלמה כל השורה מוחלשת\מטושטשת  
// תאריך היעד כאשר המשימה באיחור התאריך הופך לאדום ומציג overdue 
//תווית עדיפות ותווית סטטוס, תווית הסטטוס ניתנת ללחיצה, לחיצה עליה מפעילה את onToggleStatus כדי לעבור לסטטוס הבא
// כפתורי עריכה ומחיקה המפעילים את onEdit and onDelete
  return (
    <Row $done={done}>
      <Num>{num}</Num>
      <TaskName $done={done}>{task}</TaskName>
      <Category>{category}</Category>
      <DueDate $overdue={overdue}>
        {formatDate(dueDate)}
        {overdue && " • Overdue"}
      </DueDate>
      <PriorityCol>
        <Pill $color={p.color} $bg={p.bg}>
          {priority}
        </Pill>
      </PriorityCol>
      <StatusCol>
        <Pill
          $color={s.color}
          $bg={s.bg}
          $clickable
          title="Click to change status"
          onClick={onToggleStatus}
        >
          {status}
        </Pill>
      </StatusCol>
      <Actions>
        <Button cn="blueButton" text="Edit" onClick={onEdit} />
        <Button cn="redButton" text="Delete" onClick={onDelete} />
      </Actions>
    </Row>
  );
};

export default TodoItem;
