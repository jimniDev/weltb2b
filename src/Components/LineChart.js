import React from "react";
import ReactDOM from "react-dom";
import { Chart, Legend, Line, Point, Tooltip } from "bizcharts";

const mountNode = document.getElementById("root");

const data = [
  {
    month: "Jan",
    year: "2018",
    count: 5314,
  },
  {
    month: "Jan",
    year: "2019",
    count: 10200,
  },
  {
    month: "Jan",
    year: "2020",
    count: 9800,
  },
  {
    month: "Feb",
    year: "2020",
    count: 10234,
  },
  {
    month: "Feb",
    year: "2018",
    count: 10534,
  },
  {
    month: "Feb",
    year: "2019",
    count: 12340,
  },
  {
    month: "Mar",
    year: "2020",
    count: 11345,
  },
  {
    month: "Mar",
    year: "2018",
    count: 8984,
  },
  {
    month: "Mar",
    year: "2019",
    count: 9134,
  },
  {
    month: "Apr",
    year: "2020",
    count: 14513,
  },
  {
    month: "Apr",
    year: "2019",
    count: 13462,
  },
  {
    month: "May",
    year: "2020",
    count: 18421,
  },
  {
    month: "May",
    year: "2019",
    count: 11945,
  },
  {
    month: "Jun",
    year: "2020",
    count: 21532,
  },
  {
    month: "Jun",
    year: "2019",
    count: 15211,
  },
  {
    month: "Jul",
    year: "2020",
    count: 24231,
  },
  {
    month: "Jul",
    year: "2019",
    count: 13457,
  },
  {
    month: "Aug",
    year: "2020",
    count: 21134,
  },
  {
    month: "Aug",
    year: "2019",
    count: 16672,
  },
  {
    month: "Sep",
    year: "2020",
    count: 23378,
  },
  {
    month: "Sep",
    year: "2019",
    count: 14235,
  },
  {
    month: "Oct",
    year: "2020",
    count: 18314,
  },
  {
    month: "Oct",
    year: "2019",
    count: 10394,
  },
  {
    month: "Nov",
    year: "2020",
    count: 13984,
  },
  {
    month: "Nov",
    year: "2019",
    count: 9814,
  },
  {
    month: "Dec",
    year: "2020",
    count: 9625,
  },
  {
    month: "Dec",
    year: "2019",
    count: 17814,
  },
];

const LineChart = ({ count }) => {
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
};

ReactDOM.render(LineChart, mountNode);

export default LineChart;
