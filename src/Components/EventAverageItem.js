import React from "react";
import styled from "styled-components";

const ZERO = "0.00";

const AverageContainer = styled.div`
  margin-right: 8px;
  width: 100%;
  height: 91px;
  border-right: 1px solid #c9c9c9;
  font-family: "KoPubWorld Dotum Medium";
`;

const ContentText = styled.h6`
  font-size: 30px;
  color: #707070;
  height: 47px;
  line-height: 47px;
`;

const CateTitle = styled.h6`
  font-size: 12px;
  height: 19px;
  color: #707070;
  line-height: 19px;

`;

const PercentText = styled.h6`
  font-size: 12px;
  height: 19px;
  // color: #E60000;
  line-height: 19px;
  margin-left: 4px;
  color: ${(props) => {
    const { percent } = props;
    if (percent === ZERO) {
      return "#020202";
    }
    return percent > 0 ? "#EA2027" : "#0652DD";
  }};

`;

const PercentContainer = styled.div`
  padding: auto;
  display: flex;

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
  let statisticIcon;
  if (percent === ZERO) 
    statisticIcon = "";
  else if (percent > 0) statisticIcon = "▲"; 
  else statisticIcon = "▼";
    

  return (
    <AverageContainer>
      <CateTitle>{title}</CateTitle>
      <ContentText>{value}</ContentText>
      <PercentContainer>
        <CateTitle>어제 대비</CateTitle>
        <PercentText percent={percent}>{percent}%{statisticIcon}</PercentText>
        {/* <TriangleIcon/> */}

      </PercentContainer>
    </AverageContainer>
  );
};

export default EventAverageItem;