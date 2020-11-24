import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 48px;
  background-color: #4f42a7;
  z-index: 10;
  box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.8);
`;

const List = styled.ul`
  display: flex;
  margin-left: 20px;
`;

const Item = styled.li`
  width: 200px;
  height: 50px;
`;

const SLink = styled(Link)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.div`
  width: 100%;
  height: 50%;
  background-image: url("https://static.wixstatic.com/media/1768c4_e2ce640f6dbe49a69873c7f0a9c3e5cf~mv2.png/v1/fill/w_165,h_30,al_c,q_85,usm_0.66_1.00_0.01/png%20logo_W.webp");
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
`;

const Header = ({ location: { pathname } }) => {
  return (
    <StyledHeader>
      <List>
        <Item current={pathname === "/"}>
          <SLink to="/">
            <Image aria-label="logo Image" />
          </SLink>
        </Item>
      </List>
    </StyledHeader>
  );
};

export default withRouter(Header);
