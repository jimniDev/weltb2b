import { Pie } from "ant-design-pro/lib/Charts";
import { useState } from "react";
import { AiOutlineEnvironment, AiTwotoneFire } from "react-icons/ai";
import { BiWalk } from "react-icons/bi";
import { GiBelt } from "react-icons/gi";
import styled from "styled-components";

const ZERO = "0.00";

const PercentContainer = styled.span`
  color: ${(props) => {
    const { percent } = props;
    if (percent === ZERO) {
      return "#020202";
    }
    return percent > 0 ? "#EA2027" : "#0652DD";
  }};
`;

const PieChart = ({ percent, color, content, item, num }) => {
  let statisticIcon;
  const setStatisticIcon = (() => {
    if (percent === ZERO) {
      return (statisticIcon = "");
    }
    return percent > 0 ? (statisticIcon = "▲") : (statisticIcon = "▼");
  })();

  if (num === 1) {
    return (
      <Pie
        percent={content}
        color={color}
        total={
          <div style={{ fontSize: 8, marginTop: 20 }}>
            어제 대비{" "}
            <PercentContainer percent={percent}>
              {percent}%{statisticIcon}
            </PercentContainer>
            <div style={{ fontSize: 14, marginTop: 4 }}>{item}</div>
          </div>
        }
        subTitle={
          <AiOutlineEnvironment style={{ fontSize: 36, color: "#020202" }} />
        }
      ></Pie>
    );
  } else if (num === 2) {
    return (
      <Pie
        percent={content}
        color={color}
        total={
          <div style={{ fontSize: 8, marginTop: 20 }}>
            어제 대비{" "}
            <PercentContainer percent={percent}>
              {percent}%{statisticIcon}
            </PercentContainer>
            <div style={{ fontSize: 14, marginTop: 4 }}>{item}</div>
          </div>
        }
        subTitle={<GiBelt style={{ fontSize: 36, color: "#020202" }} />}
      ></Pie>
    );
  } else if (num === 3) {
    return (
      <Pie
        percent={content}
        color={color}
        total={
          <div style={{ fontSize: 8, marginTop: 20 }}>
            어제 대비{" "}
            <PercentContainer percent={percent}>
              {percent}%{statisticIcon}
            </PercentContainer>
            <div style={{ fontSize: 14, marginTop: 4 }}>{item}</div>
          </div>
        }
        subTitle={<AiTwotoneFire style={{ fontSize: 36, color: "#020202" }} />}
      ></Pie>
    );
  } else if (num === 4) {
    return (
      <Pie
        percent={content}
        color={color}
        total={
          <div style={{ fontSize: 8, marginTop: 20 }}>
            어제 대비{" "}
            <PercentContainer percent={percent}>
              {percent}%{statisticIcon}
            </PercentContainer>
            <div style={{ fontSize: 14, marginTop: 4 }}>{item}</div>
          </div>
        }
        subTitle={<BiWalk style={{ fontSize: 36, color: "#020202" }} />}
      ></Pie>
    );
  }
};

export default PieChart;
