import React from "react";
import styled from "styled-components";

const LoadingContainer = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const Loader = () => {
  return <LoadingContainer>Loading...</LoadingContainer>;
};

export default Loader;
