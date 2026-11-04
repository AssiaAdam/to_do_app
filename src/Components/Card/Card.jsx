import React from "react";
import styled from "styled-components";
//  כרטיס סיכום בודד, כרטיס סטטיסטיקה צבעוני יחיד (למשל, Total Tasks 8)
// CardBox מחזיק את המראה המשותף (סגול, לבן, כחול, ירוק) מרחיבים אותו עם הצבעים שלהם
const CardBox = styled.div`
  flex: 1;
  padding: 20px;
  border-radius: 10px;
  box-sizing: border-box;

  h2 {
    color: gray;
    font-size: 14px;
    margin: 0 0 10px 0;
  }
  h1 {
    margin: 0;
  }
`;


const Purple = styled(CardBox)`
  border: 1px solid purple;
  background-color: rgb(250, 224, 250);
  h1 {
    color: purple;
  }
`;
const White = styled(CardBox)`
  border: 1px solid wheat;
  background-color: rgb(255, 249, 237);
  h1 {
    color: gray;
  }
`;
const Blue = styled(CardBox)`
  border: 1px solid blue;
  background-color: rgb(200, 200, 255);
  h1 {
    color: blue;
  }
`;
const Green = styled(CardBox)`
  border: 1px solid rgb(0, 128, 0);
  background-color: rgb(205, 255, 205);
  h1 {
    color: rgb(0, 128, 0);
  }
`;
// אובייקט מיפוי קטן lookup projects בשם variants בוחר את הקופסה הצבעונית הנכונה לפי ה פרופ של ה cn ואז מציג את title and num
const variants = { purple: Purple, white: White, blue: Blue, green: Green };
// פרופס: cn (צבע: סגול , לבן, כחול ירוק), title, num
const Card = ({ cn, title, num }) => {
  const Box = variants[cn] || Purple;
  return (
    <Box>
      <h2>{title}</h2>
      <h1>{num}</h1>
    </Box>
  );
};

export default Card;
