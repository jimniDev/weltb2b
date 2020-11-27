import React, { useState } from 'react';
import styled from "styled-components";
import {users} from '../../user_info.json'; //전체 유저
import { ADD_PARTICIPANTS, REMOVE_PARTICIPANTS } from './AddEvent';

const Wrapper = styled.ul`
    height: 150px;
    border: 1px solid #CCCCCC;
    overflow-y: scroll;
    position: absolute;
    top: 0; left: 0;
    background-color: white;
    z-index: 1;
    width: 100%;
`;

const Li = styled.li`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 7px 14px;
`

const SearchList = ({visibility, p_list, keyword, dispatch}) => {
    const [ulist, setUList] = useState(users);

    const onSelect = (uid, isChecked, userObj) => {
        if(isChecked){
            isChecked = false
            dispatch({ type: REMOVE_PARTICIPANTS, uid });
        }else{
            isChecked = true
            dispatch({ type: ADD_PARTICIPANTS, userObj });
        }
    }

    const Row = ({userObj, uid, name, email, isChecked}) => {
        return (
            <Li key={uid}>
                <p styled={{color: "#707070"}}>{name}({email})</p>
                <p onClick={e => onSelect(uid, isChecked, userObj)}>{isChecked? "선택": "미선택"}</p>
            </Li>
        )
    }

    return (
        <>
            {visibility &&
                <Wrapper>
                    {ulist.map(user => {
                        var show = ((user.name).includes(keyword) || (user.email).includes(keyword));
                        var isChecked = p_list.includes(user)
                        return(
                            show? (<Row userObj={user} uid={user.uid} name={user.name} email={user.email} isChecked={isChecked} />):(<></>)
                        )
                    })}
                </Wrapper>
            }
        </>
    )
}

export default SearchList;