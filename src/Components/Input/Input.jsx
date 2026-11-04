import React from "react";
import styled from "styled-components";
// תיבת חיפוש, אלמנט <input> מעוצב וקטן
const StyledInput = styled.input`
  border-radius: 5px;
`;
// props: cn, placeholer, value, onChange
// מדובר בקלט מבוקר: הטקסט שלו מגיע מתוך value והקלדה מפעילה את onChange. 
// בתוך FilterToolBar the value הוא מצב חיפוש and onChange מעדכן אותו
const Input = ({ cn, ph, value, onChange }) => {
  return (
    <StyledInput
      className={cn}
      placeholder={ph}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
