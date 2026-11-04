import React from "react";
import styled from "styled-components";
// תפריט נפתח , הרכיב הזה הוא לשימוש חוזר, המשמש עבור כל התפריטים הנפתחים בסרגל הכלים
const StyledSelect = styled.select`
  border-radius: 5px;
`;
// props: cn, name, title (אפשרות ברירת המחדל "ALL ..."), id, items (רשימת האפשרויות), value, onChange
// ה <option value= "" > הראשון הוא title בחירה בו פירושה ללא סינון 
//הוא מפעיל .map() על items כדי ליצור את שאר האפשרויות 
// הוא מבוקר כמו אינפוט
const Select = ({ cn, name, title, id, items, value, onChange }) => {
  return (
    <StyledSelect className={cn} id={id} name={name} value={value} onChange={onChange}>
      <option value="">{title}</option>
      {items.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </StyledSelect>
  );
};

export default Select;
