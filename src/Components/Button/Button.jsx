import React from "react";
import styled from "styled-components";

//כפתור לשימוש חוזר, רכיב כפתור ייחודי המשמש בכל מקום באפליקציה (הוספה, עריכה, מחיקה, ביטול, שמירה)
const BlueButton = styled.button`
  height: 44px;
  padding: 0 20px;
  border-radius: 10px;
  border: 0;
  background-color: #2f6bff;
  color: white;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  &:hover {
    background-color: #1f57e0;
  }
`;

const RedButton = styled(BlueButton)`
  background-color: #ff6868;
  &:hover {
    background-color: #ff0000;
  }
`;

const WhiteButton = styled.button`
  border-radius: 5px;
  border: 0;
  background-color: rgb(230, 236, 236);
  color: gray;
  cursor: pointer;

  &:hover {
    background-color: white;
  }
`;
// props: cn באיזה סגנון עיצוב להשתמש, text התווית הטקסט הטבלה , onClick מה לעשות בעת לחיצה 
// בתוכו ישנם שלושה כפתורים מעוצבים:
// כפתור כחול, כפתור אדום( מרחיב את הכחול אך בצבע אדום) ו כפתור לבן
// בהתאם לערך של CN הרכיב מחזיר את הכפתור המתאים. זה שומר על מראה אחיד ועקבי לכל הכפתורים באפליקציה
const Button = ({ cn, text, onClick }) => {
  if (cn === "redButton") {
    return <RedButton onClick={onClick}>{text}</RedButton>;
  }
  if (cn === "whiteButton") {
    return <WhiteButton onClick={onClick}>{text}</WhiteButton>;
  }
  return <BlueButton onClick={onClick}>{text}</BlueButton>;
};

export default Button;
