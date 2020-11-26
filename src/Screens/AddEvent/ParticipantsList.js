import React, { useState } from 'react';
import styled from "styled-components";
import { REMOVE_PARTICIPANTS } from './AddEvent';

export const Ul = styled.ul`
    display: flex;
    flex-wrap:wrap;
    margin-top: 10px;
    margin-bottom: 30px; 
    height: 200px;
    overflow-y: scroll;
    align-content: flex-start;
`
export const Li = styled.li`
    border: none;
    background: #4F42A7;
    border-radius: 14px;
    color: #FFFFFF;
    margin: 5px 6px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 5px 15px; 
`
export const Name = styled.p`
    margin-right: 10px;
`

const ParticipantsList = ({p_list, dispatch}) => {

    const onDelete = (uid) => {
        var r = window.confirm(uid+"삭제");
        if (r == true) {
            dispatch({ type: REMOVE_PARTICIPANTS, uid });
        }
    }

    return(
        <Ul>
            {p_list.map(p => {
                return (<Li>
                    <Name>{p.name}</Name>
                    <p onClick={e => onDelete(p.uid)}>x</p>
                </Li>)
            })}
        </Ul>
    )
}

export default ParticipantsList;