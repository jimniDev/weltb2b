import React, { useState } from "react";
import styled from "styled-components";
import { REMOVE_PARTICIPANTS } from "./AddEvent";

export const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-bottom: 30px;
  height: 100%;
  overflow-y: scroll;
  align-content: flex-start;
  position: absolute;
  top: 0;
  left: 0;
  width: 575px;
`;
export const Li = styled.li`
  border: none;
  background: #4f42a7;
  border-radius: 14px;
  color: #ffffff;
  margin: 5px 6px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 5px 15px;
`;
export const Name = styled.p`
  margin-right: 10px;
`;

const ParticipantsList = ({ p_list, dispatch }) => {
  const onDelete = (uid, name, email) => {
    var r = window.confirm(`${name}(${email})님을 삭제하시겠습니까?`);
    if (r == true) {
      dispatch({ type: REMOVE_PARTICIPANTS, uid });
    }
  };

  return (
    <Ul>
      {p_list.map((p) => {
        return (
          <Li>
            <Name>{p.name}</Name>
            <p onClick={(e) => onDelete(p.uid, p.name, p.email)}>x</p>
          </Li>
        );
      })}
    </Ul>
  );
};

export default ParticipantsList;
