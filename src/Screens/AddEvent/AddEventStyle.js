import Search from "antd/lib/input/Search";
import styled from "styled-components";

export const AddEventBackground = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
`;

export const AddEventModal = styled.div`
  width: 66%;
  height: 76%;
  background-color: white;
  position: relative;
  box-sizing: border-box;
  margin: 120px auto;
  padding: 20px;
  border-radius: 30px;
  background: #fff;
`;

export const AddEventTitle = styled.h1`
  font-size: 24px;
  margin: 40px auto 50px auto;
  text-align: center;
  color: #707070;
`;

export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  text-align: left;
  font-size: 18px;
  flex-direction: column;
  width: 80%;
  margin: auto;
`;

export const FormItem = styled.div`
  margin: 10px;
  display: flex;
`;

export const FormLabel = styled.span`
  width: 15%;
  font-size: 18px;
  color: #707070;
  text-algin: left;
  margin-right: 15px;
  height: 30px;
  line-height: 30px;
`;

export const FormTextInput = styled.input`
  width: 80%;
  border: none;
  border-bottom: 1px solid #000000;
`;

export const CheckboxInput = styled.input.attrs({ type: "checkbox" })`
  display: none;
`;

export const CheckboxLabelDefault = styled.label`
  border: 1px solid #cccccc;
  border-radius: 16px;
  text-align: center;
  margin: auto 10px;
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  background-color: ${(props) => (props.isChecked ?  "#4F42A7":"#fff")};
  color: ${(props) => (props.isChecked ?  "#fff":"#707070")};

  &:checked::before {
    background-color: "#4F42A7";
  }
`;

export const CheckBoxUl = styled.ul`
  display: flex;
`;

export const CancelButton = styled.p`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #fff;
  color: #707070;
  border: 1px solid #cccccc;
  border-radius: 16px;
  display: inline-block;
  margin: 5px;
`;
export const SubmitButton = styled.p`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4f42a7;
  color: #fff;
  border: 1px solid #cccccc;
  border-radius: 16px;
  display: inline-block;
  margin: 5px;
`;

export const ButtonWrapper = styled.div`
  text-align: center;
  margin-top: 50px;
  position: absolute;
  bottom: 44px;
  right: 0;
  left: 0;
`;

export const SearchBox = styled.div`
  border: 1px solid #cccccc;
  border-radius: 6px;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
`;

export const SearchInput = styled.input`
  width: 90%;
  border: none;
`;
