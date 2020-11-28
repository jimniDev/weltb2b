import React from "react";
import ReactDOM from "react-dom";
import { Chart, Legend, Line, Point, Tooltip } from "bizcharts";
import JSON from "../assets/data/data.json";

const mountNode = document.getElementById("root");

const LineChart = ({ count, data, num }) => {
  //const { data } = JSON;

  //console.log(data);
  if (num == 1) {
    return (
      <Chart
        scale={{ count: { min: 0, max: 25000 } }}
        padding={[30, 0, 70, 40]}
        autoFit
        height={320}
        data={data}
        interactions={["element-active"]}
      >
        <Legend position={"top-left"}></Legend>
        <Line shape="line" position="month*count" color="year" label={""} />
        <Point position="month*count" color="year" />
        <Tooltip shared showCrosshairs />
      </Chart>
    );
  }
  if (num == 2) {
    return (
      <Chart
        scale={{ count: { min: 0, max: 25000 } }}
        padding={[30, 0, 70, 40]}
        autoFit
        height={320}
        data={data}
        interactions={["element-active"]}
      >
        <Legend position={"top-left"}></Legend>
        <Line shape="line" position="timeid*rank" color="name" label={""} />
        <Point position="timeid*rank" color="name" />
        <Tooltip shared showCrosshairs />
      </Chart>
    );
  }
};

ReactDOM.render(LineChart, mountNode);

export default LineChart;
