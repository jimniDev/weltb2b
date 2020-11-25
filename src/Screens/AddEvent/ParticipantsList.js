import React, { useState } from 'react';
import styled from "styled-components";

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

const ParticipantsList = ({list}) => {

    const [plist, setPlist] = useState(list)
    const onDelete = () => {
        alert("삭제");
    }

    return(
        <Ul>
            {plist.map(p => {
                console.log(p);
                return (<Li>
                    <Name>{p}</Name>
                    <p onClick={onDelete}>x</p>
                </Li>)
            })}
        </Ul>
    )
}

export default ParticipantsList;