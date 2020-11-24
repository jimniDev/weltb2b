import React from "react";
import styled from "styled-components";

const AverageContainer = styled.div`
  margin-bottom: 28px;
  width: 160px;
  height: 91px;
  border-right: 1px solid #c9c9c9;
`;

const CateTitle = styled.h6`
  font-size: 12px;
  margin: 4px 0px 12px 0px;
  opacity: 0.7;
`;

const ContentText = styled.h6`
  font-size: 30px;
  color: #707070
`;

const PercentText = styled.h6`
  font-size: 12px;
  margin: 4px 0px 12px 4px;
  color:#E60000
`;

const PercentContainer = styled.div`
padding: 4px 0px 12px 0px;
margin-top: 8px;
display: flex
`;

const TriangleIcon = styled.div`
  margin-left: 4px;
  width: 4px;
  height: 6px;
  border-bottom: 6px solid #E60000;
  border-top: 6px solid transparent;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;

`;

const EventAverageItem = ({ title, value, percent}) => {
  return (
    <AverageContainer>
      <CateTitle>{title}</CateTitle>
      <ContentText>{value}</ContentText>
      <PercentContainer>
        <CateTitle>어제 대비</CateTitle>
        <PercentText>{percent}%</PercentText>
        <TriangleIcon/>

      </PercentContainer>
    </AverageContainer>
  );
};

export default EventAverageItem;
