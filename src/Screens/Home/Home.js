import React, { useEffect, useState } from "react";
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
import user from "../../userdata.json";
import mon from "../../monthlyData.json";

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

const Home = () => {
  const [date, setDate] = useState("2020-11-05");
  let userData = Object.entries(user).filter(
    (person, index, array) => index <= 2
  );
  console.log(userData);

  const [dailyAvg, setDailyAvg] = useState(0);

  // get Date function
  const onChangeDate = (event) => {
    // error Handle
    if (!event && typeof event !== "object") return;

    const { _d } = event;

    setDate(moment(_d).format("YYYY-MM-DD"));
  };

  useEffect(() => {
    // 여기서 setDaily에 date값 넣어서 조절해주면 될듯?
    // userData.map((person) => person.reduce());
    // let s;
    // for (var i = 0; i < 30; i++) {
    //   if (user["1nhBflpO9ehPOndqzldvHWB3ILS2"][i].timeid == date) {
    //     s = user["1nhBflpO9ehPOndqzldvHWB3ILS2"][i].step;
    //   }
    // }
    // setDailyAvg();
    return () => {};
  }, []);

  console.log(user["1nhBflpO9ehPOndqzldvHWB3ILS2"]);

  // 각 날짜 별 user의 평균 데이터
  const DailyPersonAverage = Object.values(user).map((el) => {
    return [
      el[date.slice(-2) - 1].step,
      el[date.slice(-2) - 1].waist,
      el[date.slice(-2) - 1].calories,
      el[date.slice(-2) - 1].gaitSpeed,
      el[date.slice(-2) - 1].distance,
    ];
  });

  const YesPersonAverage = Object.values(user).map((el) => {
    return [
      el[date.slice(-2) - 2].step,
      el[date.slice(-2) - 2].waist,
      el[date.slice(-2) - 2].calories,
      el[date.slice(-2) - 2].gaitSpeed,
      el[date.slice(-2) - 2].distance,
    ];
  });

  let DailyPeopleAverage = DailyPersonAverage.reduce((acc, cur) => {
    cur.forEach(
      (e, i) => (acc[i] = acc[i] ? acc[i] + parseInt(e) : parseInt(e))
    );
    return acc;
  }, []).map((e) => e / DailyPersonAverage.length);

  console.log(DailyPersonAverage);

  let YesPeopleAverage = YesPersonAverage.reduce((acc, cur) => {
    cur.forEach(
      (e, i) => (acc[i] = acc[i] ? acc[i] + parseInt(e) : parseInt(e))
    );
    return acc;
  }, []).map((e) => e / YesPersonAverage.length);

  // 일 user 전체 평균 data
  //console.log(DailyPeopleAverage);

  for (var i = 0; i < mon["monthlyData"].length; i++) {
    if (date.slice(0, 7) == mon["monthlyData"][i].timeid) {
      var avg_dis = mon["monthlyData"][i].distance;
      var today_dis = DailyPeopleAverage[4];
      var yes_dis = YesPeopleAverage[4];

      var avg_waist = mon["monthlyData"][i].waist;
      var today_waist = DailyPeopleAverage[1];
      var yes_waist = YesPeopleAverage[1];

      var avg_kal = mon["monthlyData"][i].calories;
      var today_kal = DailyPeopleAverage[2];
      var yes_kal = YesPeopleAverage[2];

      var avg_v = mon["monthlyData"][i].gaitSpeed;
      var today_v = DailyPeopleAverage[3];
      var yes_v = YesPeopleAverage[3];

      break;
    }
  }

  var LineArray = new Array();
  for (var i = 0; i < mon["monthlyData"].length; i++) {
    var d = new Object();

    d.month = mon["monthlyData"][i].timeid.slice(-2);
    d.year = mon["monthlyData"][i].timeid.slice(0, 4);
    d.count = mon["monthlyData"][i].step;
    LineArray.push(d);
  }

  console.log(LineArray[0]);

  return (
    <>
      <Helmet>
        <title>Home | WELT</title>
      </Helmet>
      <MainHeader />
      <DailyAverageHeaderContainer>
        <DailyAverageTitle>
          총 수치 (평균 수치){date} prevstate : {dailyAvg}
        </DailyAverageTitle>
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
          <PieChart
            percent={((today_dis / avg_dis) * 50).toFixed(2)}
            color={"#2496EF"}
            con={(((today_dis - yes_dis) / today_dis) * 100).toFixed(2)}
            num={1}
          />
        </DailyAverageItem>
        <DailyAverageItem>
          허리 둘레
          <PieChart
            percent={((today_waist / avg_waist) * 50).toFixed(2)}
            color={"#EA3869"}
            con={(((today_waist - yes_waist) / today_waist) * 100).toFixed(2)}
            num={2}
          />
        </DailyAverageItem>
        <DailyAverageItem>
          소모 칼로리
          <PieChart
            percent={((today_kal / avg_kal) * 50).toFixed(2)}
            color={"#FFC54E"}
            con={(((today_kal - yes_kal) / today_kal) * 100).toFixed(2)}
            num={3}
          />
        </DailyAverageItem>
        <DailyAverageItem>
          걸음 속도
          <PieChart
            percent={((today_v / avg_v) * 50).toFixed(2)}
            color={"#52DDE1"}
            con={(((today_v - yes_v) / today_v) * 100).toFixed(2)}
            num={4}
          />
        </DailyAverageItem>
      </DailyAverageContainer>
      <RankingContaier>
        <StepContainer>
          <StepHeaderContainer>
            걸음 수{" "}
            <InfoCircleOutlined style={{ fontSize: 14, marginLeft: 4 }} />
          </StepHeaderContainer>
          <LineChart data={LineArray} num={1} />
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
