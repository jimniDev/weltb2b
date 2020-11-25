import React, { useState } from 'react';
import styled from "styled-components";

const Wrapper = styled.ul`
    height: 150px;
    border: 1px solid #CCCCCC;
    overflow-y: scroll;
`;

const SearchList = ({visibility}) => {
    const [list, setList] = useState([
        {id: 1, name: "김지민", email: "abc@gmail.com"},
        {id: 2, name: "김지민", email: "abc@gmail.com"},
        {id: 3, name: "김지민", email: "abc@gmail.com"},
        {id: 4, name: "김지민", email: "abc@gmail.com"},
    ]);

    return (
        <>
            {visibility &&
                <Wrapper>
                    {list.map(l => (
                            <li>
                                <p>{l.name}</p>
                                <p>{l.email}</p>
                            </li>
                        )
                    )}
                </Wrapper>
            }
        </>
    )
}

export default SearchList;