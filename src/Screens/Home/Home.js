import React from "react";
import styled from "styled-components";
import { Button, DatePicker, Space } from "antd";
import { InfoCircleOutlined, PlusOutlined } from "@ant-design/icons";
import PieChart from "../../Components/PieChart";
import LineChart from "../../Components/LineChart";
import Ranking from "../../Components/Ranking";
import moment from "moment";
import { Link } from "react-router-dom";
import MainHeader from "../../Components/MainHeader";
import Helmet from "react-helmet";
import data from "../../data.json";

const DailyAverageHeaderContainer = styled.div`
  width: 100%;
  height: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
`;

const DailyAverageTitle = styled.h2`
  height: 100%;
  font-size: 16px;
  display: flex;
  align-items: center;
  opacity: 0.73;
`;

const DailyAverageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 186px;
  width: 100%;
  margin: 6px 0px 20px 0px;
`;

const DailyAverageItem = styled.div`
  height: 186px;
  width: 267.5px;
  border: 1px solid #c9c9c9;
  border-radius: 6px;
  padding: 11px;
  font-size: 11px;
`;

const RankingContaier = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StepContainer = styled.div`
  border: 1px solid #c9c9c9;
  width: 727px;
  height: 343px;
  border-radius: 6px;
  padding: 20px;
  font-size: 15px;
`;

const StepHeaderContainer = styled.div`
  margin-bottom: 8px;
  display: flex;
  align-items: center;
`;

const PersonalRankingContainer = styled.div`
  border: 1px solid #c9c9c9;
  width: 390px;
  height: 343px;
  border-radius: 6px;
  padding: 12px 20px;
`;

const EventContainer = styled.div`
  border: 1px solid #c9c9c9;
  width: 100%;
  height: 32vh;
  border-radius: 6px;
  margin: 20px 0px 24px 0px;
  padding: 18px 24px;
`;

const EventHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EventHeaderName = styled.h2``;

// get Date function
const onChangeDate = (event) => {
  // evnet Handler Error
  if (typeof event !== Object) return;

  const { _d } = event;
};

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home | WELT</title>
      </Helmet>
      <MainHeader />
      <DailyAverageHeaderContainer>
        <DailyAverageTitle>총 수치 (평균 수치)</DailyAverageTitle>
        <Space>
          <DatePicker
            onChange={onChangeDate}
            bordered={false}
            defaultValue={moment("2020-10-05", "YYYY-MM-DD")}
          />
        </Space>
      </DailyAverageHeaderContainer>
      <DailyAverageContainer>
        <DailyAverageItem>
          걸음 거리
          <PieChart percent={28} color={"#2496EF"} />
        </DailyAverageItem>
        <DailyAverageItem>
          허리 둘레
          <PieChart percent={48} color={"#EA3869"} />
        </DailyAverageItem>
        <DailyAverageItem>
          소모 칼로리
          <PieChart percent={27} color={"#FFC54E"} />
        </DailyAverageItem>
        <DailyAverageItem>
          걸음 속도
          <PieChart percent={22} color={"#52DDE1"} />
        </DailyAverageItem>
      </DailyAverageContainer>
      <RankingContaier>
        <StepContainer>
          <StepHeaderContainer>
            걸음 수{" "}
            <InfoCircleOutlined style={{ fontSize: 14, marginLeft: 4 }} />
          </StepHeaderContainer>
          <LineChart />
        </StepContainer>
        <PersonalRankingContainer>
          <Ranking />
        </PersonalRankingContainer>
      </RankingContaier>
      <EventContainer>
        <EventHeaderContainer>
          <EventHeaderName>이벤트</EventHeaderName>
          <Link to="event/add">
            <Button
              icon={<PlusOutlined />}
              style={{
                borderRadius: 4,
                color: "#4F42A7",
                border: `2px solid #4F42A7`,
              }}
              size="small"
            ></Button>
          </Link>
        </EventHeaderContainer>
      </EventContainer>
    </>
  );
};

export default Home;
