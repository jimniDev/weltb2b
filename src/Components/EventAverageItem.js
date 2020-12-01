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
  line-height: 19px;
  margin-left: 4px;
  color: ${(props) => {
    const { percent } = props;
    if (percent === ZERO || percent === 0) {
      return "#020202";
    }
    return percent > 0 ? "#EA2027" : "#0652DD";
  }};
`;

const PercentContainer = styled.div`
  padding: auto;
  display: flex;
`;

const EventAverageItem = ({ title, value, percent }) => {
  let statisticIcon;
  const setStatisticIcon = (() => {
    if (percent === ZERO || percent === 0) {
      return (statisticIcon = "");
    }
    return percent > 0 ? (statisticIcon = "▲") : (statisticIcon = "▼");
  })();

  return (
    <AverageContainer>
      <CateTitle>{title}</CateTitle>
      <ContentText>{value}</ContentText>
      <PercentContainer>
        <CateTitle>어제 대비</CateTitle>
        <PercentText percent={percent}>
          {percent}%{statisticIcon}
        </PercentText>
      </PercentContainer>
    </AverageContainer>
  );
};

export default EventAverageItem;
