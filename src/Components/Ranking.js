import React, { useState } from "react";
import styled from "styled-components";
import { Button, DatePicker, Progress, Select } from "antd";
import { SwapOutlined } from "@ant-design/icons";
import moment from "moment";
import JSON from "../data.json";

const PRItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const RankContainer = styled.div`
  overflow: auto;
  width: 100%;
  height: 240px;
  margin-top: 12px;
`;
const RankItemContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  font-family: "KoPubWorld Dotum Medium";
  margin-bottom: 20px;
`;

const RankNum = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 1px;
  font-size: 12px;
  border-radius: 50%;
  height: 18px;
  width: 18px;
  color: white;
  background-color: #707070;
`;

const RankName = styled.span`
  margin-left: 18px;
  margin-right: 44px;
`;

const RankItem = styled.span`
  font-size: 11px;
  margin-left: 12px;
`;

const sortAscObj = (a, b) => {
  return a.item > b.item ? -1 : a.item < b.item ? 1 : 0;
};

const sortDescObj = (a, b) => {
  return a.item < b.item ? -1 : a.item > b.item ? 1 : 0;
};

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

let firstItem = 0;

const Ranking = () => {
  const { userData } = JSON;
  const [sort, setSort] = useState(true);

  const onClickHandler = (event) => {
    event.preventDefault();
    setSort(!sort);
  };

  const onChangeRank = (event) => {
    if (typeof event !== String) return;
  };

  const onChangeDate = (event) => {
    // evnet Handler Error
    if (typeof event !== Object) return;
    const { _d } = event;
  };

  return (
    <>
      <PRItemContainer>
        랭킹{" "}
        <DatePicker
          bordered={false}
          onChange={onChangeDate}
          picker="month"
          defaultValue={moment("2020-10", "YYYY-MM")}
        />
      </PRItemContainer>
      <PRItemContainer>
        <Select
          style={{ width: 300, height: 32, borderRadius: 6 }}
          defaultValue={"걸음 수"}
          onChange={onChangeRank}
        >
          <Select.Option value="걸음 수">걸음 수</Select.Option>
          <Select.Option value="소모 칼로리">소모 칼로리</Select.Option>
          <Select.Option value="허리 둘레">허리 둘레</Select.Option>
          <Select.Option value="걸음 속도">걸음 속도</Select.Option>
          <Select.Option value="걸은 거리">걸은 거리</Select.Option>
        </Select>
        <Button
          type="primary"
          icon={<SwapOutlined style={{ color: "#020202" }} rotate={90} />}
          size={"middle"}
          ghost
          style={{
            border: "1px solid black",
            marginLeft: 12,
            borderRadius: 4,
          }}
          onClick={onClickHandler}
        />
      </PRItemContainer>
      <RankContainer>
        {userData.sort(sort ? sortAscObj : sortDescObj).map((user, index) => {
          firstItem = sort
            ? userData[0].item
            : userData[userData.length - 1].item;
          return (
            <RankItemContainer key={user.id}>
              <RankNum>{index + 1}</RankNum>
              <RankName>{user.name}</RankName>
              <Progress
                style={{ width: 140 }}
                showInfo={false}
                strokeColor={"#4F42A7"}
                percent={(user.item / firstItem) * 100}
                strokeWidth={10}
              />
              <RankItem>{numberWithCommas(user.item)} 걸음</RankItem>
            </RankItemContainer>
          );
        })}
      </RankContainer>
    </>
  );
};

export default Ranking;
