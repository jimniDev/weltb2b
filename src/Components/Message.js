import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
`;

const Text = styled.span`
  color: ${(props) => props.color};
  font-size: 24px;
`;

const Message = ({ text, color }) => {
  return (
    <Container>
      <Text color={color}>{text} 😥</Text>
    </Container>
  );
};

Message.propTypes = {
  text: propTypes.string.isRequired,
  color: propTypes.string.isRequired,
};

export default Message;
