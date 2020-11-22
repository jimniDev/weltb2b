import React from "react";
import JSON from "../data.json";
import { Table} from 'antd';
import styled from "styled-components";

const Status = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
  width: 60px;
  color: #f6f6f6;
  font-size: 12px;
  border-radius: 3px;
`;
const StatusObj = {
    0: {
      status: "시작 전",
      color: "#3778CF",
    },
    1: {
      status: "진행중",
      color: "#37CF65",
    },
    2: {
      status: "종 료",
      color: "#CF3737",
    },
};

const columns = [
    {
      title: 'EVENT',
      width: 100,
      dataIndex: 'title',
      key: 'name',
      background: '.red',
    },
    {
        title: 'STATUS',
        width: 50,
        dataIndex: 'status',
        key: 'status',
        render(text, record) {
            return {
              children:  <Status
              style={{
                backgroundColor: StatusObj[text].color,
              }}
            >
              {StatusObj[text].status}
            </Status>
            };
        }
       
    },
    {
        title: 'MEMBERS',
        width: 50,
        dataIndex: 'participants',
        key: 'participants',
    },
    {
        title: 'PERIOD',
        width: 100,
        dataIndex: 'date',
        key: 'date',
        render: (text, record) => <span>{record.startDate} ~ {record.startDate}</span>,
    },
]
const EventTable = () => {
    const { eventData } = JSON;
    return (
      <Table
        dataSource={eventData}
        columns = {columns}
        pagination={{ hideOnSinglePage: true }} 
        scroll={{ y: 200}}
      >   
      </Table>
    );
};
export default EventTable;

 