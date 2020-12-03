import React, { useReducer } from "react";
import { DatePicker } from "antd";
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
import SearchImg from "../../assets/images/SearchImg";
import ParticipantsList from "./ParticipantsList";
import SearchList from "./SearchList";
import { dbService } from "../../fbase";

const { RangePicker } = DatePicker;

const initialState = {
  title: "",
  usedata: [
    { id: 1, name: "step", value: "걸음 수", isChecked: false },
    { id: 2, name: "waist", value: "허리둘레", isChecked: false },
    { id: 3, name: "calories", value: "소모칼로리", isChecked: false },
    { id: 4, name: "distance", value: "걸음거리", isChecked: false },
    { id: 5, name: "gaitSpeed", value: "걸음속도", isChecked: false },
  ],
  startdate: "",
  enddate: "",
  keyword: "",
  participants: [],
  memo: "",
};

export const SET_TITLE = "SET_TITLE";
export const SET_USEDATA = "SET_USEDATA";
export const SET_STARTDATE = "SET_STARTDATE";
export const SET_ENDDATE = "SET_ENDDATE";
export const SET_KEYWORD = "SET_KEYWORD";
export const ADD_PARTICIPANTS = "ADD_PARTICIPANTS";
export const REMOVE_PARTICIPANTS = "REMOVE_PARTICIPANTS";
export const SET_MEMO = "SET_MEMO";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_TITLE:
      return {
        ...state,
        title: action.title,
      };
    case SET_USEDATA: {
      const usedata = [...state.usedata];
      usedata.map((data) => {
        if (data.value === action.value) {
          data.isChecked = action.checked;
        }
      });
      return {
        ...state,
        usedata,
      };
    }
    case SET_STARTDATE:
      return {
        ...state,
        startdate: action.startdate,
      };
    case SET_ENDDATE:
      return {
        ...state,
        enddate: action.enddate,
      };
    case SET_KEYWORD:
      return {
        ...state,
        keyword: action.keyword,
      };
    case SET_MEMO:
      return {
        ...state,
        memo: action.memo,
      };
    case REMOVE_PARTICIPANTS: {
      const participants = [...state.participants];
      for (let i = 0; i < participants.length; i++) {
        if (participants[i].uid === action.uid) {
          participants.splice(i, 1);
        }
      }
      return {
        ...state,
        participants,
      };
    }
    case ADD_PARTICIPANTS: {
      const participants = [...state.participants, action.userObj];
      return {
        ...state,
        participants,
      };
    }
    default:
      break;
  }
};

const AddEvent = () => {
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    title,
    usedata,
    startdate,
    enddate,
    keyword,
    participants,
    memo,
  } = state;

  const onChange = (event) => {
    const {
      target: { value, name },
    } = event;

    switch (name) {
      case "title":
        dispatch({ type: SET_TITLE, title: value });
        break;
      case "memo":
        dispatch({ type: SET_MEMO, memo: value });
        break;
      case "keyword":
        dispatch({ type: SET_KEYWORD, keyword: value });
        break;
      default:
        break;
    }
  };

  const onChangeDate = (e, d) => {
    if (e === null || d === null) return;
    dispatch({ type: SET_STARTDATE, startdate: d[0] });
    dispatch({ type: SET_ENDDATE, enddate: d[1] });
  };

  const onCancelBtn = () => {
    history.goBack();
  };

  const onSubmitBtn = () => {
    let selectedList = isSelected();

    var str =
      `이벤트명: ${title} \n` +
      `사용데이터: (순서대로) ` +
      selectedList +
      "\n" +
      `기간1: ${startdate} \n` +
      `기간2: ${enddate} \n` +
      `참가자리스트: ` +
      `${participants.map((user) => user.name)}` +
      "\n" +
      `메모: ${memo} \n`;
    console.log(str);

    if (title === "") {
      alert("이벤트명을 입력해주세요.");
    } else if (selectedList.length <= 0) {
      alert("사용데이터를 선택해주세요.");
    } else if (startdate === "" || enddate === "") {
      alert("기간을 선택해주세요.");
    } else if (participants.length <= 0) {
      alert("참가자를 추가해주세요.");
    } else {
      alert(str + "등록 완료");
      const eventObj = {
        title: title,
        selectedList: selectedList,
        startdate: startdate,
        enddate: enddate,
        participants: participants,
        memo: memo,
      };
      dbService
        .collection("event")
        .add(eventObj)
        .then((docRef) => {
          history.goBack();
        });
    }
  };

  const isSelected = () => {
    var selectedList = [];
    usedata.forEach((data) => {
      if (data.isChecked === true) {
        selectedList.push(data.name);
      }
    });
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
    dispatch({ type: SET_USEDATA, value, checked });

    // setDataInfo((prevState) =>
    //   prevState.map((data) =>
    //     data.value === value ? { ...data, isChecked: checked } : data
    //   )
    // );
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
                {usedata.map((data) => {
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
              <RangePicker onChange={(e, d) => onChangeDate(e, d)} />
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
                <div style={{ position: "relative", height: "200px" }}>
                  {keyword !== "" && (
                    <SearchList
                      visibility={true}
                      p_list={participants}
                      keyword={keyword}
                      dispatch={dispatch}
                    />
                  )}
                  <ParticipantsList p_list={participants} dispatch={dispatch} />
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
