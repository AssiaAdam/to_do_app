import React, { useState } from "react";
import styled from "styled-components";
import Button from "../Button/Button";
import { logError } from "../../logger";
// מודאל הוספה עריכה. טופס בחלון קופץ (פופ אפ) המשמש גם ליצירת משימה חדשה וגם לעריכת משימה קיימת.
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const Modal = styled.div`
  width: 460px;
  max-width: 90%;
  background-color: #ffffff;
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  color: #1f2733;
`;

const ModalSubtitle = styled.p`
  margin: 4px 0 0;
  font-size: 14px;
  color: #8a94a6;
`;

const CloseBtn = styled.button`
  border: 0;
  background: transparent;
  font-size: 22px;
  color: #8a94a6;
  cursor: pointer;
  line-height: 1;
`;

const Field = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.span`
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`;

const Req = styled.span`
  color: #e5484d;
`;

//
const ErrorText = styled.p`
  margin: 6px 0 0;
  font-size: 13px;
  color: #e5484d;
`;

//
const Control = styled.input`
  width: 100%;
  box-sizing: border-box;
  height: 44px;
  padding: 0 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  background-color: #fafafa;
  color: #1f2733;

  &:focus {
    outline: none;
    border-color: #2f6bff;
    background-color: #ffffff;
  }
`;

const Segment = styled.div`
  display: flex;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
`;

//
const SegmentBtn = styled.button`
  flex: 1;
  padding: 10px 0;
  border: 0;
  border-left: 1px solid #e5e7eb;
  background-color: ${(props) => (props.$active ? props.$activeColor : "#ffffff")};
  color: ${(props) => (props.$active ? "#ffffff" : "#4b5563")};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:first-child {
    border-left: 0;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 8px;
`;

const priorities = ["Low", "Medium", "High"];
const statuses = ["To Do", "In Progress", "Completed"];

// הפונקציה todayISO() מחזירה את התאריך של היום בפורמט YYYY-MM-DD כך שתאריך ההתחלה של משימה חדשה מוגדר כברירת מחדל להיום
const todayISO = () => {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
};
/**
 * פרופס: task (המשימה לעריכה או undefined בעת הוספה)
 * כאשר מעבירים בפרופס "טאסק" נתונים ז"א שאנחנו במצב עריכה, אם לא אז אנחנו במצב הוספת חדש
 */
const Task = ({ task, onClose, onSave }) => {
  // state (אחד עבור כל שדה) name, category, startDate, dueDate, priority, status, and error (הודעת אימות)
  // אם הועברה משימה, השדות מתחילים עם הערכים שלה (מצב עריכה), אחרת הם מתחילים ריקים או עם ערכי ברירת מחדל (מצב הוספה)
  const [name, setName] = useState(task ? task.task : "");
  const [category, setCategory] = useState(task ? task.category : "Study");
  const [startDate, setStartDate] = useState(task ? task.startDate || todayISO() : todayISO());
  const [dueDate, setDueDate] = useState(task ? task.dueDate : "");
  const [priority, setPriority] = useState(task ? task.priority : "Medium");
  const [status, setStatus] = useState(task ? task.status : "To Do");
  const [error, setError] = useState("");
// בדיקת התקינות קלט(האימות)
// מפעיל name.trim() כדי שרווחים בלבד ייחשבו כשדה ריק. 
// אם השם ריק מוצגת ההודעה "Please enter a task name" 
// ופעולת ה return נעצרת ללא שמירה
// אם אין תאריך יעד מוצגת ההודעה "Please choose a due date"  והפעולה נעצרת
// אחרת הרכיב מנקה את הודעת השגיאה ומפעיל onSave({...}) עם נתוני המשימה
  const handleSave = () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("Please enter a task name.");
      logError("Save failed: missing task name");
      return;
    }
    // הגבלת אורך השם כדי שלא יישמר טקסט ארוך מדי
    if (trimmedName.length > 100) {
      setError("Task name can be up to 100 characters.");
      logError("Save failed: task name is too long");
      return;
    }
    if (!dueDate) {
      setError("Please choose a due date.");
      logError("Save failed: missing due date");
      return;
    }
    setError("");
    onSave({ task: trimmedName, category, startDate, dueDate, priority, status });
  };

  // לחיצה על enter בשדה השם מפעילה handleSave כך שניתן להוסיף משימה באמצעות המקלדת
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };
// הטופס: שדה טקסט עבור השם  (עם autofocus) 
// תפריט נפתח לקטגוריה. בוחר תאריכים עבור תאריך התחלה ותאירך יעד, ושתי שורות של כפתורים מופרדים עבור עדיפות וסטטוס (הכפתור שנבחר מודגש) 
// בתחתית: ביטול (מפעיל את ה onClose) ושמירת משימה (מפעיל את handleSave) 
// הכותרת מציגה "Create new task" or "Edit Task" בהתאם לשאלה אם הועברה משימה
  return (
    <Overlay>
      <Modal>
        <ModalHeader>
          <div>
            <ModalTitle>{task ? "Edit Task" : "Create New Task"}</ModalTitle>
            <ModalSubtitle>Fill in the details to add a task.</ModalSubtitle>
          </div>
          <CloseBtn onClick={onClose}>×</CloseBtn>
        </ModalHeader>

        <Field>
          <Label>
            Task Name <Req>*</Req>
          </Label>
          <Control
            type="text"
            placeholder="e.g. Redesign homepage hero"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </Field>

        <Field>
          <Label>Category</Label>
          <Control
            as="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Study</option>
            <option>Online Teaching</option>
            <option>Shopping</option>
            <option>Car </option>
            <option>Leisure</option>
            <option>Family</option>
            <option>Friends</option>
            <option>Emails</option>
            <option>Sports</option>
            <option>Appointments</option>
            <option>Errands</option>
            <option>Travel</option>
            <option>Other</option>
          </Control>
        </Field>

        <Field>
          <Label>Start Date</Label>
          <Control
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Field>

        <Field>
          <Label>
            Due Date <Req>*</Req>
          </Label>
          <Control
            type="date"
            value={dueDate}
            onChange={(e) => {
              setDueDate(e.target.value);
              setError("");
            }}
          />
        </Field>

        <Field>
          <Label>Priority</Label>
          <Segment>
            {priorities.map((p) => (
              <SegmentBtn
                key={p}
                $active={priority === p}
                $activeColor="#f5a623"
                onClick={() => setPriority(p)}
              >
                {p}
              </SegmentBtn>
            ))}
          </Segment>
        </Field>

        <Field>
          <Label>Status</Label>
          <Segment>
            {statuses.map((s) => (
              <SegmentBtn
                key={s}
                $active={status === s}
                $activeColor="#64748b"
                onClick={() => setStatus(s)}
              >
                {s}
              </SegmentBtn>
            ))}
          </Segment>
        </Field>

        {error && <ErrorText>{error}</ErrorText>}

        <Footer>
          <Button cn="whiteButton" text="Cancel" onClick={onClose} />
          <Button cn="blueButton" text="Save Task" onClick={handleSave} />
        </Footer>
      </Modal>
    </Overlay>
  );
};
// מודאל זה מוצג רק בעת צורך
//FilterToolBar מציג אותו עבור הוספה 
// TodoList מציג אותו עבור עריכה
// מכיוון שהוא כל פעם מורכב מחדש בכל פעם שהוא נפתח.
// state שלו מתאפס בצורה תקינה
export default Task;
