import React, { useEffect, useState, useCallback } from "react";
import { Table} from 'antd';
import styled from "styled-components";
import { dbService } from "../fbase";
import "./EventTable.css";

const Status = styled.div`
  display: flex;
  margin-left:auto;
  margin-right:auto;
  justify-content: center;
  align-items: center;
  height: 22px;
  width: 60px;
  color: #f6f6f6;
  font-size: 10px;
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
  const date = new Date();
  let today = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + String(date.getDate()).padStart(2, '0');
  let dataSet = [];
  const [eventdataset, setEventData] = useState([]);
  const fetchData = useCallback(async () => {
    try {
      await dbService
        .collection("event")
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            let o = {};
            let size = doc.data().participants.length;
            let startDate = doc.data().startdate;
            let endDate = doc.data().enddate;
            if(startDate > today){
              o.status = 0;
            }
            else if(endDate < today){
              o.status = 2;
            }
            else{
              o.status = 1;
            }
            
            o.title = doc.data().title;
            o.participants = size;
            o.startDate = startDate;
            o.endDate = endDate;
            dataSet.push(o);
          });
        });
    } catch (error) {
      console.log(error);
    } finally {
      setEventData(dataSet)
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, []);
    return (
      <Table
        className="EVENT_TABLE_DESIGN"
        dataSource={eventdataset}
        columns = {columns}
        pagination={{ hideOnSinglePage: true }} 
        scroll={{ y: 180}}
      >   
      </Table>
    );
   
};
export default EventTable;