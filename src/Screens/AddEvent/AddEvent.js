import React, {useState, useEffect} from "react";
import { DatePicker } from "antd";
import moment from "moment";
import MainHeader from "../../Components/MainHeader";
import Helmet from "react-helmet";
import { AddEventBackground, AddEventModal, AddEventTitle,
  Form, FormItem, FormLabel, FormTextInput, CheckboxInput, CheckboxLabelDefault, CheckBoxUl,
  CancelButton, SubmitButton, ButtonWrapper } from "./AddEventStyle";
import { useHistory } from "react-router-dom";


const AddEvent = () => {
  const history = useHistory();
  
  const [title, setTitle] = useState("");
  const [selectedDataList, setSelectedDataList] = useState([]);
  const [startdate, setStartdate] = useState(new Date());
  const [enddate, setEnddate] = useState(new Date());
  const [participants, setParticipants] = useState([]);
  const [memo, setMemo] = useState("");

  const [dataInfo, setDataInfo] = useState([
    {id: 1, name: "step", value:"걸음 수", isChecked: false},
    {id: 2, name: "waist", value: "허리둘레", isChecked: false},
    {id: 3, name: "calories", value: "소모칼로리", isChecked: true},
    {id: 4, name: "distance", value: "걸음거리", isChecked: false},
    {id: 5, name: "gaitSpeed", value: "걸음속도", isChecked: false},
  ]);

  useEffect(() => {
    return () => {
    }
  }, [dataInfo])

  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    switch (event.target.name) {
      case "title":
        setTitle(value);
        break;
      case "memo":
        setMemo(value);
        break;
      default:
        break;
    }
  };

  const onChangeDate = (event, name) => {
    // if (typeof event !== Object) return; // 이거하면 날짜 안바뀜..

    const { _d } = event;
    
    console.log("event name: "+name);
    if(name === "startDate"){
      setStartdate(_d);
      console.log("startdate: "+startdate);
    }else if(name === "endDate"){
      setEnddate(_d);
      console.log("enddate: "+enddate);
    }
    
  };

  const onCancelBtn = ()=>{
    history.goBack();
  }

  const onSubmitBtn = () => {
    console.log(
      "이벤트명: "+title,
      "사용데이터: (순서대로)" +JSON.stringify(dataInfo),
      "기간1: "+startdate, 
      "기간2: "+enddate,
      "참가자리스트: ",
      "메모: "+memo
    )
    // history.goBack()
  }

  const CheckBox = props => {
      return (
        <li>
        <CheckboxInput
         key={props.id} 
         type="checkbox" 
         checked={props.isChecked}
         value={props.value} 
         name={props.name}
        /> 
        <CheckboxLabelDefault 
          onClick={props.handleCheckChieldElement}
          isChecked={props.isChecked}>
            {props.value}
        </CheckboxLabelDefault>
        </li>
      )
  }

  const handleCheckChieldElement = (event) => {
    let _dataInfo = dataInfo;
    _dataInfo.forEach(data => {
       if (data.value === event.target.value) data.isChecked = event.target.checked
    });
    setDataInfo(_dataInfo);
  }

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
              <FormTextInput type="text" name="title" value={title} onChange={onChange} placeholder="이벤트 명을 입력해주세요."/>
            </FormItem>
            <FormItem>
              <FormLabel>사용 데이터</FormLabel>
              <CheckBoxUl>
              {
                dataInfo.map((data) => {
                  return (<CheckBox handleCheckChieldElement={handleCheckChieldElement} {...data} />)
                })
              }
              </CheckBoxUl>
            </FormItem>
            <FormItem>
              <FormLabel>기간</FormLabel>
              <DatePicker
                selected={startdate}
                onChange={date => onChangeDate(date, 'startDate')}
                bordered={false}
                defaultValue={moment()}
              />
              <DatePicker
                selected={enddate}
                onChange={date => onChangeDate(date, 'endDate')}
                bordered={false}
                defaultValue={moment()}
              />
            </FormItem>
            <FormItem>
              <FormLabel>참가자</FormLabel>
              <input type="text" name="participant" />
            </FormItem>
            <FormItem>
              <FormLabel>메모</FormLabel>
              <FormTextInput type="text" name="memo" value={memo} onChange={onChange} placeholder="메모를 입력해주세요."/>
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
