import React from "react";
import styled from "styled-components";
// סרגל הכותרת בראש העמוד. עיצוב טהור ללא לוגיקה. מדובר ב דיב מעוצב שתוכו ממוקמת כותרת מעוצבת 
const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60px;
  background-color: #FCFBEB;
  background: linear-gradient(to bottom, #FFFFFF 0%, #F5F2EC 100%);
`;

const HeaderTitle = styled.h1`
  color: cadetblue;
  margin: 0;
`;

const Title = () => {
  return (
    <Header>
      <HeaderTitle>DoListic</HeaderTitle>
    </Header>
  );
};

export default Title;
