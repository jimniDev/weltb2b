import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import styled from "styled-components";

const LoadingContainer = styled.div`
  width: 100%;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
`;

const Loader = () => {
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 60, color: "#4f42a7" }} spin />
  );
  return (
    <LoadingContainer>
      <Spin indicator={antIcon} />
    </LoadingContainer>
  );
};

export default Loader;
