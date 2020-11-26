import React, { useState } from 'react';
import styled from "styled-components";
import {users} from '../../user_info.json'; //전체 유저

const Wrapper = styled.ul`
    height: 150px;
    border: 1px solid #CCCCCC;
    overflow-y: scroll;
`;

const Li = styled.li`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 7px 14px;
`

const SearchList = ({visibility, p_list, keyword}) => {
    const [ulist, setUList] = useState(users);

    const onSelect = (uid, isChecked, userObj) => {
        console.log("uid: "+ uid);
        console.log("isChecked: "+ isChecked);

        if(isChecked){
            //uid로 찾아서 p_list에서 제거
            isChecked = false
            for(let i = 0; i < p_list.length; i++){ 
                if ( p_list[i].uid === uid) { 
                    console.log(p_list[i].name);
                    p_list.splice(i, 1); 
                }
            }
        }else{
            //p_list에 추가
            p_list.push(userObj);
            isChecked = true
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