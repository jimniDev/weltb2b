import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import MainHeader from "../../Components/MainHeader";
import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Select, DatePicker } from "antd";
import LineChart from "../../Components/LineChart";
import Ranking from "../../Components/Ranking";
import Helmet from "react-helmet";
import { dbService } from "../../fbase";
import user from "../../assets/data/userdata.json";
import Loader from "../../Components/Loader";
import EventAverageItem from "../../Components/EventAverageItem";
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
  const [eventDetail, setEventDetail] = useState(null);
  const [allEventData, setAllEventData] = useState([]);
  const [rankingData, setRankingData] = useState([]);
  const [walkData, setWalkData] = useState(null);
  const [waistData, setWaistData] = useState(null);
  const [calData, setCalData] = useState(null);
  const [disData, setDisData] = useState(null);
  const [speedData, setSpeedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    "2020-11-05"
  );
  // id 이거 쓰시면 됩니다.
  const { id } = useParams();

  let dataSet = [];
  let walkDataSet = {};
  let waistDataSet = {};
  let calDataSet = {};
  let disDataSet = {};
  let speedDataSet = {};
  let selectedEvent = {};

  const updateAverageChange = (event, date) => {
    let walk_sum = 0;
    let waist_sum = 0;
    let cal_sum = 0;
    let dis_sum = 0;
    let speed_sum = 0;
    let y_walk_sum = 0;
    let y_waist_sum = 0;
    let y_cal_sum = 0;
    let y_dis_sum = 0;
    let y_speed_sum = 0;
    console.log(event);
    let parLength = event.participants.length;
    let sList = event.selectedList;
    for (let i = 0; i < parLength; i++) {
      console.log(i);
      console.log(event.participants[i].uid);
      console.log(date.slice(-2) - 1);      
      let t_user = user[event.participants[i].uid][date.slice(-2) - 1];
      let y_user = user[event.participants[i].uid][date.slice(-2) - 2];
      for (let j = 0;j<sList.length;j++){
        switch(sList[j]){
          case "step":
            walk_sum += t_user.step;
            y_walk_sum += y_user.step;
            break;
          case "calories":
            cal_sum += parseFloat(t_user.calories);
            y_cal_sum += parseFloat(y_user.calories);
            break;
          case "waist":
            waist_sum += t_user.waist;
            y_waist_sum += y_user.waist;
            break;
          case "speed":
            speed_sum += parseFloat(t_user.gaitSpeed);
            y_speed_sum += parseFloat(y_user.gaitSpeed);
            break;
          case "distance":
            y_dis_sum += parseFloat(y_user.distance);
            dis_sum += parseFloat(t_user.distance);
            break;
        }
      }
    }
    setWalkData(null);
    setCalData(null);
    setWaistData(null);
    setSpeedData(null);
    setDisData(null);
    for (let j = 0;j<sList.length;j++){
      console.log(sList[j]);
      switch(sList[j]){
        case "step":
          walkDataSet.value = (walk_sum / parLength).toFixed(0);
          walkDataSet.percent = ((walk_sum / y_walk_sum - 1) * 100).toFixed(2);
          setWalkData(walkDataSet);
          break;
        case "calories":
          calDataSet.value = (cal_sum / parLength).toFixed(0);
          calDataSet.percent = ((cal_sum / y_cal_sum - 1) * 100).toFixed(2);
          setCalData(calDataSet);
          break;
        case "waist":
          waistDataSet.value = (waist_sum / parLength).toFixed(2);
          waistDataSet.percent = ((waist_sum / y_waist_sum - 1) * 100).toFixed(2);
          setWaistData(waistDataSet);
          break;
        case "speed":
          speedDataSet.value = (speed_sum / parLength).toFixed(1);
          speedDataSet.percent = ((speed_sum / y_speed_sum - 1) * 100).toFixed(2);
          setSpeedData(speedDataSet);
          break;
        case "distance":
          disDataSet.value = (dis_sum / parLength).toFixed(1);
          disDataSet.percent = ((dis_sum / y_dis_sum - 1) * 100).toFixed(2);
          setDisData(disDataSet);
          break;
      }
    }
  };

  const updateRankGraph = (event, date) => {
          let tempUserList = userList.filter((user) =>
            event.participants.find(
              (participant) => participant.uid === user
            )
          );

          let tempUserData = userData.filter((user) =>
            tempUserList.find((userId) => userId === user[0])
          );

          const tempStartDay = moment(event.startDate).get("Date");
          const tempEndDay = moment(event.endDate).get("Date");

          tempUserData = tempUserData.map((user) => {
            return [user[0], user[1].slice(tempStartDay - 1, tempEndDay)];
          });

          let endDay =
            moment(event.endDate).diff(moment(date)) >= 0
              ? date
              : event.endDate;

          endDay = "2020-11-30";
          let timeDifference =
            moment(endDay).diff(moment(event.startDate), "days") + 1;
            

          let tempDate =
            moment(event.endDate).diff(moment(date)) >= 0
              ? date
              : event.endDate;
          setSelectedDate(tempDate);

          //3차원 배열 생성
          let arr = new Array(event.participants.length);
          let rank = new Array(event.participants.length);
          let avg_rank = new Array(event.participants.length);
          let avg_rank_point = new Array(event.participants.length);
          for (let i = 0; i < arr.length; i++) {
            arr[i] = new Array(timeDifference);
            rank[i] = new Array(timeDifference);
            avg_rank[i] = new Array(timeDifference);
            avg_rank_point[i] = new Array(timeDifference);
            for (let j = 0; j < arr[i].length; j++) {
              arr[i][j] = new Array(event.selectedList.length);
              rank[i][j] = new Array(event.selectedList.length);
              avg_rank_point[i][j] = 1;
              for (let k = 0; k < event.selectedList.length; k++) {
                rank[i][j][k] = 1;
              }
            }
          }

          let cnt = 0; //기간 내 카운트
          let day_index;
          let flag = true;

          //배열에 데이터 저장
          for (
            let i = 0;
            i < user[event.participants[0].uid].length;
            i++
          ) {
            if (
              user[event.participants[0].uid][i].timeid >=
              event.startDate
            ) {
              if (flag) {
                day_index = i;
                flag = false;
              }
              if (cnt < timeDifference) {
                for (let j = 0; j < event.participants.length; j++) {
                  for (let k = 0; k < event.selectedList.length; k++) {
                    arr[j][cnt][k] =
                      user[event.participants[j].uid][i][
                        event.selectedList[k]
                      ];
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
                o.timeid =
                  user[event.participants[i].uid][j + day_index].timeid;
                o.name = event.participants[i].name;
                o.rank = 1;
                dataSet.push(o);
              }
              if (avg_rank_point[i][j] === 2) {
                let o = {};
                o.timeid =
                  user[event.participants[i].uid][j + day_index].timeid;
                o.name = event.participants[i].name;
                o.rank = 2;
                dataSet.push(o);
              }
              if (avg_rank_point[i][j] === 3) {
                let o = {};
                o.timeid =
                  user[event.participants[i].uid][j + day_index].timeid;
                o.name = event.participants[i].name;
                o.rank = 3;
                dataSet.push(o);
              }
            }
            setRankingData(dataSet);
            //setEventDetail(event);

            // setAllEventData((prevState) => {
            //   return allEventData;
            // });
          }
  }

  const onChangeEvent = (value) => {
    if (typeof value !== "string") return;
    setEventDetail(allEventData.find((event) => event.title === value));
    
    updateRankGraph(allEventData.find((event) => event.title === value), selectedDate);
    updateAverageChange(allEventData.find((event) => event.title === value), selectedDate);
  };

  const onChangeDate = (event) => {
    // evnet Handler Error
    if (!event && typeof event !== Object) return;
    let { _d } = event;
    _d = moment(_d).format("YYYY-MM-DD");
    if (!checkDate(_d, eventDetail.startDate, eventDetail.endDate)) {
      alert(`${_d}에 해당하는 데이터가 없습니다.`);
      return;
    }
    setSelectedDate(_d);
    updateRankGraph(eventDetail, _d);
    updateAverageChange(eventDetail, _d);
  };

  const checkDate = (_d, startDate, endDate) => {
    const { _milliseconds: startDiff } = moment.duration(
      moment(_d).diff(moment(startDate))
    );

    const { _milliseconds: endDiff } = moment.duration(
      moment(_d).diff(moment(endDate))
    );

    const { _milliseconds: dataEndDiff } = moment.duration(
      moment(_d).diff(moment("2020-11-30"))
    );

    if (startDiff < 0) return false;
    if (endDiff > 0) return false;
    console.log("durl");
    if (dataEndDiff > 0) return false;
    return true;
  };

  const setStatus = (startDate, endDate) => {
    console.log(selectedDate);
    const { _milliseconds: startDiff } = moment.duration(
      moment(selectedDate).diff(moment(startDate))
    );
    const { _milliseconds: endDiff } = moment.duration(
      moment(selectedDate).diff(moment(endDate))
    );
    const { _milliseconds: dataEndDiff } = moment.duration(
      moment(endDate).diff(moment("2020-11-05"))
    );

    if (dataEndDiff < 0) return 2;
    if (startDiff < 0) return 0;
    if (endDiff > 0) return 2;
    return 1;
  };

  let userData = Object.entries(user);
  let userList = Object.keys(user);

  const fetchData = useCallback(async () => {
    try {
      await dbService
        .collection("event")
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            allEventData.push({
              id: doc.id,
              title: doc.data().title,
              participants: doc.data().participants,
              selectedList: doc.data().selectedList,
              startDate: doc.data().startdate,
              endDate: doc.data().enddate,
              status: setStatus(doc.data().startdate, doc.data().enddate),
            });
          });

          selectedEvent = allEventData.filter((data) => data.id === id)[0];

          let tempUserList = userList.filter((user) =>
            selectedEvent.participants.find(
              (participant) => participant.uid === user
            )
          );

          let tempUserData = userData.filter((user) =>
            tempUserList.find((userId) => userId === user[0])
          );

          const tempStartDay = moment(selectedEvent.startDate).get("Date");
          const tempEndDay = moment(selectedEvent.endDate).get("Date");

          tempUserData = tempUserData.map((user) => {
            return [user[0], user[1].slice(tempStartDay - 1, tempEndDay)];
          });

          let endDay =
            moment(selectedEvent.endDate).diff(moment(selectedDate)) >= 0
              ? selectedDate
              : selectedEvent.endDate;

          endDay = "2020-11-30";
          let timeDifference =
            moment(endDay).diff(moment(selectedEvent.startDate), "days") + 1;

          let tempDate =
            moment(selectedEvent.endDate).diff(moment(selectedDate)) >= 0
              ? selectedDate
              : selectedEvent.endDate;
          setSelectedDate(tempDate);

          //3차원 배열 생성
          let arr = new Array(selectedEvent.participants.length);
          let rank = new Array(selectedEvent.participants.length);
          let avg_rank = new Array(selectedEvent.participants.length);
          let avg_rank_point = new Array(selectedEvent.participants.length);
          for (let i = 0; i < arr.length; i++) {
            arr[i] = new Array(timeDifference);
            rank[i] = new Array(timeDifference);
            avg_rank[i] = new Array(timeDifference);
            avg_rank_point[i] = new Array(timeDifference);
            for (let j = 0; j < arr[i].length; j++) {
              arr[i][j] = new Array(selectedEvent.selectedList.length);
              rank[i][j] = new Array(selectedEvent.selectedList.length);
              avg_rank_point[i][j] = 1;
              for (let k = 0; k < selectedEvent.selectedList.length; k++) {
                rank[i][j][k] = 1;
              }
            }
          }

          let cnt = 0; //기간 내 카운트
          let day_index;
          let flag = true;

          //배열에 데이터 저장
          for (
            let i = 0;
            i < user[selectedEvent.participants[0].uid].length;
            i++
          ) {
            if (
              user[selectedEvent.participants[0].uid][i].timeid >=
              selectedEvent.startDate
            ) {
              if (flag) {
                day_index = i;
                flag = false;
              }
              if (cnt < timeDifference) {
                for (let j = 0; j < selectedEvent.participants.length; j++) {
                  for (let k = 0; k < selectedEvent.selectedList.length; k++) {
                    arr[j][cnt][k] =
                      user[selectedEvent.participants[j].uid][i][
                        selectedEvent.selectedList[k]
                      ];
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
                o.timeid =
                  user[selectedEvent.participants[i].uid][j + day_index].timeid;
                o.name = selectedEvent.participants[i].name;
                o.rank = 1;
                dataSet.push(o);
              }
              if (avg_rank_point[i][j] === 2) {
                let o = {};
                o.timeid =
                  user[selectedEvent.participants[i].uid][j + day_index].timeid;
                o.name = selectedEvent.participants[i].name;
                o.rank = 2;
                dataSet.push(o);
              }
              if (avg_rank_point[i][j] === 3) {
                let o = {};
                o.timeid =
                  user[selectedEvent.participants[i].uid][j + day_index].timeid;
                o.name = selectedEvent.participants[i].name;
                o.rank = 3;
                dataSet.push(o);
              }
            }
            // setEventDetail(selectedEvent);
            // setAllEventData((prevState) => {
            //   return allEventData;
            // });
          }
          console.log(selectedEvent);
          console.log(tempDate);
          updateAverageChange(selectedEvent, tempDate);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setRankingData(dataSet);
      // setWalkData(walkDataSet);
      // setWaistData(waistDataSet);
      // setCalData(calDataSet);
      // setDisData(disDataSet);
      // setSpeedData(speedDataSet);
      setEventDetail(selectedEvent);
      setLoading(false);
      console.log(disDataSet);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const onDeleteEvent = async (problem) => {
    const ok = window.confirm('정말 삭제하시겠습니까??');
    if (ok) {
        await dbService.doc(`event/${eventDetail.id}`).delete();
    }
  };
  

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
                defaultValue={eventDetail.title}
                onChange={onChangeEvent}
              >
                {allEventData &&
                  allEventData.map((event) => (
                    <Select.Option
                      value={event.title}
                      key={event.title + event.status}
                    >
                      {event.title}
                    </Select.Option>
                  ))}
              </Select>
              {eventDetail && (
                <Status
                  style={{
                    backgroundColor: StatusObj[eventDetail.status].color,
                  }}
                >
                  {StatusObj[eventDetail.status].status}
                </Status>
              )}
            </EventTitleContainer>
            <EventDetailContainer>
              {eventDetail && (
                <>
                  <EventDetail>
                    참여인원 : {eventDetail.participants.length}명
                  </EventDetail>
                  <EventDetail>
                    날짜 : {eventDetail.startDate} ~ {eventDetail.endDate}
                  </EventDetail>
                </>
              )}
              <Link to = "/">
              <DeleteOutlined 
              onClick={onDeleteEvent}
              style={{ fontSize: 16 }} />
              </Link>
            </EventDetailContainer>
          </EventContainer>
          <EventAverageContainer>
            <EventAverageTitleContainer>
              평균 수치
              <DatePicker
                onChange={onChangeDate}
                bordered={false}
                defaultValue={moment(selectedDate, "YYYY-MM-DD")}
              />
            </EventAverageTitleContainer>

            <EventAverageContentContainer>
              {walkData != null && (
              <EventAverageItem
                title="걸음 수"
                value={walkData.value}
                percent={walkData.percent}
              />)}
              {waistData != null && (
              <EventAverageItem
                title="허리둘레"
                value={waistData.value}
                percent={waistData.percent}
              />)}
              {calData != null && (
              <EventAverageItem
                title="소모 칼로리"
                value={calData.value}
                percent={calData.percent}
                />)}

              {disData != null && (
                <EventAverageItem
                title="걸음 거리"
                value={disData.value}
                percent={disData.percent}
                />)}
              
              {speedData != null && (
                <EventAverageItem
                title="걸음 속도"
                value={speedData.value}
                percent={speedData.percent}
                />)}

            </EventAverageContentContainer>
          </EventAverageContainer>
          <RankingContaier>
            <StepContainer>
              <StepHeaderContainer>
                순위 그래프{" "}
                <InfoCircleOutlined style={{ fontSize: 14, marginLeft: 4 }} />
              </StepHeaderContainer>
              <LineChart data={rankingData} num={2} />
            </StepContainer>
            <PersonalRankingContainer>
              <Ranking isDetail={true} />
            </PersonalRankingContainer>
          </RankingContaier>
        </>
      )}
    </>
  );
};

export default Event;