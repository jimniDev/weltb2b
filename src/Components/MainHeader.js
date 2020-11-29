import React from "react";
import styled from "styled-components";

const EnterpriseContainer = styled.div`
  margin-bottom: 28px;
`;

const TeamTitle = styled.h6`
  font-size: 14px;
  margin: 4px 0px 12px 0px;
  opacity: 0.7;
`;

const EnterpriseTitle = styled.div`
  font-size: 26px;
`;

const MainHeader = () => {
  return (
    <EnterpriseContainer>
      <TeamTitle>산학협력프로젝트2 현세콤달콤</TeamTitle>
      <EnterpriseTitle>기업명 : 웰트</EnterpriseTitle>
    </EnterpriseContainer>
  );
};

export default MainHeader;
