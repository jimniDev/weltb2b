import React, { useState, useEffect } from "react";
import { DatePicker } from "antd";
import moment from "moment";
import MainHeader from "../../Components/MainHeader";
import Helmet from "react-helmet";
import {
  AddEventBackground,
  AddEventModal,
  AddEventTitle,
  Form,
  FormItem,
  FormLabel,
  FormTextInput,
  CheckboxInput,
  CheckboxLabelDefault,
  CheckBoxUl,
  CancelButton,
  SubmitButton,
  ButtonWrapper,
  SearchBox,
  SearchInput,
} from "./AddEventStyle";
import { useHistory } from "react-router-dom";
import SearchImg from "../../assets/img/SearchImg";
import ParticipantsList from "./ParticipantsList";
import SearchList from "./SearchList";
import {users} from '../../user_info.json';
import { dbService } from "../../fbase";


const AddEvent = () => {
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [selectedDataList, setSelectedDataList] = useState([]);
  const [startdate, setStartdate] = useState(new Date());
  const [enddate, setEnddate] = useState(new Date());
  const [keyword, setKeyword] = useState("");
  const [participants, setParticipants] = useState([]);
  const [memo, setMemo] = useState("");
  const [dataInfo, setDataInfo] = useState([
    { id: 1, name: "step", value: "걸음 수", isChecked:false },
    { id: 2, name: "waist", value: "허리둘레", isChecked:false },
    { id: 3, name: "calories", value: "소모칼로리", isChecked:false },
    { id: 4, name: "distance", value: "걸음거리", isChecked:false },
    { id: 5, name: "gaitSpeed", value: "걸음속도", isChecked:false },
  ]);

  useEffect(() => {
    if (keyword == "") {
      //전체 보여주기
    } else {
      // 검색
      console.log(keyword + " 검색");
    }
    return () => {};
  }, [keyword, dataInfo, participants]);

  const onChange = (event) => {
    const {
      target: { value, name },
    } = event;

    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "memo":
        setMemo(value);
        break;
      case "keyword":
        setKeyword(value);
        break;
      default:
        break;
    }
  };

  const onChangeDate = (event, name) => {
    if (!event && typeof event !== "object") return;

    const { _d } = event;

    console.log("event name: " + name);
    if (name === "startDate") {
      setStartdate(_d);
      console.log("startdate: " + startdate);
    } else if (name === "endDate") {
      setEnddate(_d);
      console.log("enddate: " + enddate);
    }
  };

  const onCancelBtn = () => {
    history.goBack();
  };

  const onSubmitBtn = () => {
    let selectedList = isSelected();

    var str =
      "이벤트명: " +
      title +
      "\n" +
      "사용데이터: (순서대로)" +
      selectedList +
      "\n" +
      "기간1: " +
      startdate +
      "\n" +
      "기간2: " +
      enddate +
      "\n" +
      "참가자리스트: " + participants +
      "\n" +
      "메모: " +
      memo;

    console.log(str);

    if (title === "") {
      alert("이벤트명을 입력해주세요.");
    } else if (selectedList.length <= 0) {
      alert("사용데이터를 선택해주세요.");
    } else if (startdate === null || enddate === null) {
      alert("기간을 선택해주세요.");
    } else {
      alert(str + "등록 완료");
      const eventObj = {
        title: title,
        selectedList: selectedList,
        startdate: startdate,
        enddate: enddate,
        participants: participants,
        memo: memo
      };
      dbService
        .collection("event")
        .add(eventObj)
        .then((docRef) => {
          history.goBack()
        });
    }
    // 빈 참가리스트 예외처리

    // history.goBack()
  };

  const isSelected = () => {
    var selectedList = [];
    dataInfo.forEach((data) => {
      if (data.isChecked === true) {
        selectedList.push(data.name);
      }
    });
    // console.log(selectedList);
    return selectedList;
  };

  const CheckBox = (props) => {
    return (
      <li>
        <CheckboxLabelDefault htmlFor={props.name} isChecked={props.isChecked}>
          {props.value}
        </CheckboxLabelDefault>
        <CheckboxInput
          name={props.name}
          key={props.id}
          type="checkbox"
          checked={props.isChecked}
          value={props.value}
          id={props.name}
          onChange={props.handleCheckbox}
        />
      </li>
    );
  };

  const handleCheckbox = (event) => {
    let {
      target: { value, checked },
    } = event;
    setDataInfo((prevState) =>
      prevState.map((data) =>
        data.value === value ? { ...data, isChecked: checked } : data
      )
    );
  };

  return (
    <>
      <Helmet>
        <title>AddEvent | WELT</title>
      </Helmet>
      <AddEventBackground>
        <AddEventModal>
          <AddEventTitle>이벤트추가</AddEventTitle>
          <Form>
            <FormItem>
              <FormLabel>이벤트 명</FormLabel>
              <FormTextInput
                type="text"
                name="title"
                value={title}
                onChange={onChange}
                placeholder="이벤트 명을 입력해주세요."
              />
            </FormItem>
            <FormItem>
              <FormLabel>사용 데이터</FormLabel>
              <CheckBoxUl>
                {dataInfo.map((data) => {
                  return (
                    <CheckBox
                      key={data.id}
                      handleCheckbox={handleCheckbox}
                      {...data}
                    />
                  );
                })}
              </CheckBoxUl>
            </FormItem>
            <FormItem>
              <FormLabel>기간</FormLabel>
              <DatePicker
                selected={startdate}
                onChange={(date) => onChangeDate(date, "startDate")}
                bordered={false}
                defaultValue={moment()}
              ></DatePicker>
              <DatePicker
                selected={enddate}
                onChange={(date) => onChangeDate(date, "endDate")}
                bordered={false}
                defaultValue={moment()}
              ></DatePicker>
            </FormItem>
            <FormItem>
              <FormLabel>참가자</FormLabel>
              <div style={{ width: "60%" }}>
                <SearchBox>
                  <SearchInput
                    type="text"
                    name="keyword"
                    value={keyword}
                    onChange={onChange}
                  />
                  <SearchImg />
                </SearchBox>
                <div>
                  {(keyword != "") &&
                    <SearchList visibility={true} p_list={participants} keyword={keyword}/>
                  }
                  <ParticipantsList p_list={participants} />
                </div>
              </div>
            </FormItem>
            <FormItem>
              <FormLabel>메모</FormLabel>
              <FormTextInput
                type="text"
                name="memo"
                value={memo}
                onChange={onChange}
                placeholder="메모를 입력해주세요."
              ></FormTextInput>
            </FormItem>
          </Form>
          <ButtonWrapper>
            <CancelButton onClick={onCancelBtn}>취소하기</CancelButton>
            <SubmitButton onClick={onSubmitBtn}>등록하기</SubmitButton>
          </ButtonWrapper>
        </AddEventModal>
      </AddEventBackground>
      <MainHeader />
    </>
  );
};

export default AddEvent;
