import React, { useState } from "react";
import styled from "styled-components";
import MainHeader from "../../Components/MainHeader";
import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Select, DatePicker } from "antd";
import LineChart from "../../Components/LineChart";
import Ranking from "../../Components/Ranking";
import Helmet from "react-helmet";
import EventAverageItem from "../../Components/EventAverageItem";
import JSON from "../../data.json";
import moment from "moment";

const StatusObj = {
  0: {
    status: "시작 전",
    color: "#3778CF",
  },
  1: {
    status: "진행중",
    color: "#37CF65",
  },
  2: {
    status: "종 료",
    color: "#CF3737",
  },
};

const EventContainer = styled.div`
  width: 100%;
  height: 76px;
  border: 1px solid #c9c9c9;
  border-radius: 6px;
  padding: 0px 32px 0px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "KoPubWorld Dotum Medium";
  font-size: 15px;
`;

const EventTitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Status = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
  width: 60px;
  color: #f6f6f6;
  font-size: 12px;
  border-radius: 3px;
`;

const EventDetailContainer = styled.div`
  width: 400px;
  display: flex;
  justify-content: space-between;
`;

const EventDetail = styled.div``;

const EventAverageContainer = styled.div`
  height: 200px;
  width: 100%;
  justify-content: space-between;
  border: 1px solid #c9c9c9;
  border-radius: 6px;
  margin: 24px 0px;
  padding: 20px 16px;
`;

const EventAverageContentContainer = styled.h3`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 24px 0px;
`;

const EventAverageTitleContainer = styled.div`
  height: 25px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const Event = () => {
  const { eventData } = JSON;
  const [eventDetail, setEventDetail] = useState(eventData[0]);

  const onChangeDate = (event) => {
    // evnet Handler Error
    if (typeof event !== Object) return;
    const { _d } = event;
  };

  const onChangeEvent = (value) => {
    if (typeof value !== "string") return;
    setEventDetail(eventData.find((event) => event.title === value));
  };

  return (
    <>
      <Helmet>
        <title>Event | WELT</title>
      </Helmet>
      <MainHeader />
      <EventContainer>
        <EventTitleContainer>
          이벤트 :{"  "}
          <Select
            style={{
              width: 264,
              height: 32,
              marginLeft: 12,
              marginRight: 20,
              borderRadius: 6,
              color: "#707070",
            }}
            defaultValue={eventData[0].title}
            onChange={onChangeEvent}
          >
            {eventData &&
              eventData.map((event) => (
                <Select.Option
                  value={event.title}
                  key={event.title + event.status}
                >
                  {event.title}
                </Select.Option>
              ))}
          </Select>
          <Status
            style={{
              backgroundColor: StatusObj[eventDetail.status].color,
            }}
          >
            {StatusObj[eventDetail.status].status}
          </Status>
        </EventTitleContainer>
        <EventDetailContainer>
          <EventDetail>참여인원 : {eventDetail.participants}명</EventDetail>
          <EventDetail>
            날짜 : {eventDetail.startDate} ~ {eventDetail.endDate}
          </EventDetail>
          <DeleteOutlined style={{ fontSize: 16 }} />
        </EventDetailContainer>
      </EventContainer>

      <EventAverageContainer>
        <EventAverageTitleContainer>
          평균 수치{" "}
          <DatePicker
            bordered={false}
            onChange={onChangeDate}
            picker="month"
            defaultValue={moment("2020-10", "YYYY-MM")}
            style={{ color: "#707070" }}
          />
        </EventAverageTitleContainer>

        <EventAverageContentContainer>
          <EventAverageItem title="걸음 수" value="15300" percent="2.04" />
          <EventAverageItem title="허리둘레" value="32" percent="2.04" />
          <EventAverageItem title="소모 칼로리" value="4033" percent="2.04" />
          <EventAverageItem title="걸음 거리" value="15" percent="2.04" />
          <EventAverageItem title="걸음 속도" value="3.4" percent="2.04" />
        </EventAverageContentContainer>
      </EventAverageContainer>
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
    </>
  );
};

export default Event;
