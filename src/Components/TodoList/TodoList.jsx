import React, { useState } from "react";
import styled from "styled-components";
import TodoItem, {
  Row,
  Num,
  TaskName,
  Category,
  DueDate,
  PriorityCol,
  StatusCol,
  Actions,
} from "../TodoItem/TodoItem";
import Task from "../Task/Task";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
// מציג את שורת הכותרת ושורת תודואייתם אחת עבור כל משימה, ומנהל את החלונות הקופצים של העריכה והמחיקה
const List = styled.div`
  margin: 20px;
  background-color: #ffffff;
  border: 1px solid #eef0f2;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  /*  */
  ${Row}:last-child {
    border-bottom: none;
  }
`;
// אלמנט ה List בשם styled.div משתמש בכלל העיצוב ${Row}:last-child {border-bottom: none}; כדי שלשורה האחרונה לא יהיה גבול תחתון. 
//ה Header משתמש מחדש באותם חלקי עמודות שיוצאו מתוך TodoItem  כך שטקסט הכותרת מתיישר בצורה מושלמת מול התאים בשורה
const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  border-bottom: 1px solid #eef0f2;
  background-color: #fbfbfc;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: #8a94a6;
`;
// statusOrder+ nextStatus קובעים את הסטטוס הבא בעת לחיצה על תווית הסטטוס  ("To Do"=> "In Progress"=> "Completed"=back to Todo> )
const statusOrder = ["To Do", "In Progress", "Completed"];
const nextStatus = (current) => {
  const i = statusOrder.indexOf(current);
  return statusOrder[(i + 1) % statusOrder.length];
};
// PROPS: TASKS לאחרי סינון ומיון , ONUPDATE, ONDELETE
const TodoList = ({ tasks, onUpdate, onDelete }) => {
  // עצמאי משלו: אדיתתאסק (המשימה שנערכת כעת, או נאל) STATE
  const [editTask, setEditTask] = useState(null);
  // (המשימה הממתינה לאישור מחיקה , או נאל) TASKTODELETE
  // באותו דפוס בדיוק משתמשים פעמיים: הערך הוא נאל כאשר החלון הקופץ סגור, ומכיל משימה כאשר הוא פתוח
  const [taskToDelete, setTaskToDelete] = useState(null);
// הוא מפעיל MAP() על משימות כדי לרנדר את השורות
// מספר השורה NUM הוא המיקום ברשימה INDEX+1 מרופד בשתי ("01" "02" ...) ספרות 
//כל שורה מקבלת: onEdit (פותח את מודאל העריכה עבור אותה משימה), onDelete (פותח את חלון אישור המחיקה), onToggleStatus (מפעיל את onUpdate עם הסטטוס הבא)
  return (
    <List>
      <Header>
        <Num>#</Num>
        <TaskName>TASK NAME</TaskName>
        <Category>CATEGORY</Category>
        <DueDate>DUE DATE</DueDate>
        <PriorityCol>PRIORITY</PriorityCol>
        <StatusCol>STATUS</StatusCol>
        <Actions>ACTIONS</Actions>
      </Header>

      {tasks.map((t, index) => (
        <TodoItem
          key={t.id}
          num={String(index + 1).padStart(2, "0")}
          task={t.task}
          category={t.category}
          dueDate={t.dueDate}
          priority={t.priority}
          status={t.status}
          onEdit={() => setEditTask(t)}
          onDelete={() => setTaskToDelete(t)}
          onToggleStatus={() => onUpdate({ ...t, status: nextStatus(t.status) })}
        />
      ))}

      {editTask && (
        <Task
          task={editTask}
          onClose={() => setEditTask(null)}
          onSave={(updated) => {
            onUpdate({ ...updated, id: editTask.id });
            setEditTask(null);
          }}
        />
      )}

      {taskToDelete && (
        <ConfirmDialog
          title="Delete task?"
          message={`Are you sure you want to delete "${taskToDelete.task}"? This can't be undone.`}
          onCancel={() => setTaskToDelete(null)}
          onConfirm={() => {
            onDelete(taskToDelete.id);
            setTaskToDelete(null);
          }}
        />
      )}
    </List>
  );
};
// בחלק התחתון או האחרון ממש למעלה הוא מציג התנייתית את מודאל ה Task  (עבור עריכה) ואת ה confirmDialog (עבור מחיקה)

export default TodoList;
