import React from "react";
import styled from "styled-components";
import Button from "../Button/Button";
// חלון קופץ "האם אתה בטוח?" דיאלוג קטן לשימוש חוזר של כן\לא
// הוא אינו יודע דבר על משימות, רכיב האב (שקרא לפונקציה מתודואייתם) הוא שמחליט מה עושה האישור
// רכיב זה הוא מה שממלא את הדרישה "לבקש אישור לפני מחיקה
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const Box = styled.div`
  width: 380px;
  max-width: 90%;
  background-color: #ffffff;
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  margin: 0 0 8px;
  font-size: 18px;
  color: #1f2733;
`;

const Message = styled.p`
  margin: 0 0 20px;
  font-size: 14px;
  color: #6b7280;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

//פרופס: title, message, onCancel, onConfirm
// TodoList משתמש בו עבור מחיקה: Cancel רק סוגר אותו Delete מוחקת בפועל את המשימה 
const ConfirmDialog = ({ title, message, onCancel, onConfirm }) => {
  return (
    <Overlay>
      <Box>
        <Title>{title}</Title>
        <Message>{message}</Message>
        <Footer>
          <Button cn="whiteButton" text="Cancel" onClick={onCancel} />
          <Button cn="redButton" text="Delete" onClick={onConfirm} />
        </Footer>
      </Box>
    </Overlay>
  );
};

export default ConfirmDialog;
