import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import MainHeader from "../../Components/MainHeader";
import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Select } from "antd";
import LineChart from "../../Components/LineChart";
import Ranking from "../../Components/Ranking";
import Helmet from "react-helmet";
import data from "../../data.json";
import { firestore } from "../../firebase";
import user from "../../userdata.json";
import Loader from "../../Components/Loader";

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
  border: 1px solid #c9c9c9;
  border-radius: 6px;
  margin: 24px 0px;
  padding: 20px 16px;
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
  const { eventData } = data;
  const [eventDetail, setEventDetail] = useState(eventData[0]);
  const [taskData, setTaskData] = useState([]);
  const [rankingData, setRankingData] = useState([]);
  const [loading, setLoading] = useState(true);

  const onChangeEvent = (value) => {
    if (typeof value !== "string") return;
    setEventDetail(eventData.find((event) => event.title === value));
  };

  let dataSet = [];

  let event_index;
  const date = new Date();
  let today =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  console.log(today);
  const fetchData = useCallback(async () => {
    try {
      await firestore
        .collection("event")
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            taskData.push({
              title: doc.data().title,
              participants: doc.data().participants,
              selectedList: doc.data().selectedList,
              id: doc.id,
              startdate: doc.data().startdate,
              enddate: doc.data().enddate,
            });
            console.log(taskData.length);
          });
          for (let i = 0; i < taskData.length; i++) {
            if (/*eventDetail.title*/ "ㅁㅁ" === taskData[i].title) {
              //여기서 이벤트 타이틀만 ㅁㅁ 대신 넣어주면 끝
              event_index = i;
              break;
            }
          }
          let end;
          if (taskData[event_index].enddate > today) end = today;
          else end = taskData[event_index].enddate;
          let ev = taskData[event_index];
          console.log(ev);
          let term = end.slice(-2) - ev.startdate.slice(-2) + 1;
          // console.log(user[ev.participants[0].uid][i].timeid);

          //3차원 배열 생성
          let arr = new Array(ev.participants.length);
          let rank = new Array(ev.participants.length);
          let avg_rank = new Array(ev.participants.length);
          let avg_rank_point = new Array(ev.participants.length);
          for (let i = 0; i < arr.length; i++) {
            arr[i] = new Array(term);
            rank[i] = new Array(term);
            avg_rank[i] = new Array(term);
            avg_rank_point[i] = new Array(term);
            for (let j = 0; j < arr[i].length; j++) {
              arr[i][j] = new Array(ev.selectedList.length);
              rank[i][j] = new Array(ev.selectedList.length);
              avg_rank_point[i][j] = 1;
              for (let k = 0; k < ev.selectedList.length; k++) {
                rank[i][j][k] = 1;
              }
            }
          }

          let cnt = 0; //기간 내 카운트
          let day_index;
          let flag = true;

          //배열에 데이터 저장
          for (let i = 0; i < user[ev.participants[0].uid].length; i++) {
            if (user[ev.participants[0].uid][i].timeid >= ev.startdate) {
              if (flag) {
                day_index = i;
                flag = false;
              }
              if (cnt < term) {
                for (let j = 0; j < ev.participants.length; j++) {
                  for (let k = 0; k < ev.selectedList.length; k++) {
                    arr[j][cnt][k] =
                      user[ev.participants[j].uid][i][ev.selectedList[k]];
                    console.log(arr[j][cnt][k]);
                  }
                }
                cnt += 1;
              } else break;
            }
          }
          //카테고리 별 랭크 산출
          for (let k = 0; k < arr[0][0].length; k++) {
            for (let j = 0; j < arr[0].length; j++) {
              for (let i = 0; i < arr.length - 1; i++) {
                for (let x = i + 1; x < arr.length; x++) {
                  if (arr[i][j][k] < arr[x][j][k]) rank[i][j][k] += 1;
                  else rank[x][j][k] += 1;
                }
              }
            }
          }
          //카테고리 별 랭크의 평균
          for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
              let sum = 0;
              for (let k = 0; k < arr[i][j].length; k++) {
                sum += rank[i][j][k];
              }
              avg_rank[i][j] = sum / arr[i][j].length;
            }
          }
          //랭크 평균의 랭크 산출
          for (let j = 0; j < arr[0].length; j++) {
            for (let i = 0; i < arr.length - 1; i++) {
              for (let x = i + 1; x < arr.length; x++) {
                if (avg_rank[i][j] < avg_rank[x][j]) avg_rank_point[i][j] += 1;
                else avg_rank_point[x][j] += 1;
              }
            }
          }
          //dataSet 생성
          for (let j = 0; j < arr[0].length; j++) {
            for (let i = 0; i < arr.length; i++) {
              if (avg_rank_point[i][j] === 1) {
                let o = {};
                o.timeid = user[ev.participants[i].uid][j + day_index].timeid;
                o.name = ev.participants[i].name;
                o.rank = 1;
                dataSet.push(o);
              }
              if (avg_rank_point[i][j] === 2) {
                let o = {};
                o.timeid = user[ev.participants[i].uid][j + day_index].timeid;
                o.name = ev.participants[i].name;
                o.rank = 2;
                dataSet.push(o);
              }
              if (avg_rank_point[i][j] === 3) {
                let o = {};
                o.timeid = user[ev.participants[i].uid][j + day_index].timeid;
                o.name = ev.participants[i].name;
                o.rank = 3;
                dataSet.push(o);
              }
            }
          }
        });
    } catch (error) {
      console.log(error);
    } finally {
      setRankingData(dataSet);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Event | WELT</title>
      </Helmet>
      <MainHeader />
      {loading ? (
        <Loader />
      ) : (
        <>
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
          <EventAverageContainer>평균 수치</EventAverageContainer>
          <RankingContaier>
            <StepContainer>
              <StepHeaderContainer>
                순위 그래프{" "}
                <InfoCircleOutlined style={{ fontSize: 14, marginLeft: 4 }} />
              </StepHeaderContainer>
              <LineChart data={rankingData} num={2} />
            </StepContainer>
            <PersonalRankingContainer>
              <Ranking />
            </PersonalRankingContainer>
          </RankingContaier>
        </>
      )}
    </>
  );
};

export default Event;
