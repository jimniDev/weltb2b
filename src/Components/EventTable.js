import React, { useEffect, useState, useCallback } from "react";
import { Table } from "antd";
import styled from "styled-components";
import { dbService } from "../fbase";
import "./EventTable.css";
import { Link } from "react-router-dom";
import moment, { isDuration } from "moment";

const Status = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
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
    title: "EVENT",
    width: 100,
    dataIndex: "title",
    key: "title",
    render: (text, record) => (
      <Link style={{ fontSize: 14 }} to={`/event/${record.id}`}>
        {text}
      </Link>
    ),
  },
  {
    title: "STATUS",
    width: 50,
    dataIndex: "status",
    key: "status",
    render(text, record) {
      return {
        children: (
          <Status
            style={{
              backgroundColor: StatusObj[text].color,
              fontSize: 12,
            }}
          >
            {StatusObj[text].status}
          </Status>
        ),
      };
    },
  },
  {
    title: "MEMBERS",
    width: 50,
    dataIndex: "participants",
    key: "participants",
    render: (text, record) => (
      <span style={{ fontSize: 12 }}>{record.participants}</span>
    ),
  },
  {
    title: "PERIOD",
    width: 100,
    dataIndex: "date",
    key: "date",
    render: (text, record) => (
      <span style={{ fontSize: 12 }}>
        {record.startDate} ~ {record.endDate}
      </span>
    ),
  },
];

const EventTable = () => {
  const [today, setToday] = useState(moment(new Date(), "YYYY-MM-DD"));
  const [eventdataset, setEventData] = useState([]);

  let dataSet = [];

  const setStatus = (startDate, endDate) => {
    const { _milliseconds: startDiff } = moment.duration(
      moment(today).diff(moment(startDate))
    );

    const { _milliseconds: endDiff } = moment.duration(
      moment(today).diff(moment(endDate))
    );

    if (startDiff < 0) return 0;
    if (endDiff > 0) return 2;
    return 1;
  };

  const fetchData = useCallback(async () => {
    try {
      await dbService
        .collection("event")
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            let o = {};
            let startDate = doc.data().startdate;
            let endDate = doc.data().enddate;
            o.status = setStatus(startDate, endDate);
            o.id = doc.id;
            o.title = doc.data().title;
            o.participants = doc.data().participants.length;
            o.startDate = startDate;
            o.endDate = endDate;
            dataSet.push(o);
          });
        });
    } catch (error) {
      console.log(error);
    } finally {
      setEventData(dataSet);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Table
      className="EVENT_TABLE_DESIGN"
      dataSource={eventdataset}
      columns={columns}
      pagination={{ hideOnSinglePage: true }}
      scroll={{ y: 180 }}
      size={"middle"}
    ></Table>
  );
};
export default EventTable;
